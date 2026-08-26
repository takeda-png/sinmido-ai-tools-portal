# -*- coding: utf-8 -*-
"""
Sinmido AI Tools Portal — Claude 最新情報の取得

  assets/news.js を作り直します。GitHub Actions から毎日呼ばれますが、
  手元でもそのまま動きます（外部ライブラリは一切使いません）。

    python tools/fetch_news.py            … 取得して assets/news.js を書き換える
    python tools/fetch_news.py --dry-run  … 取得して結果を表示するだけ（書かない）

  情報源
    1. Anthropic 公式ニュース   https://www.anthropic.com/news
    2. Claude Code の更新       CHANGELOG（公開日は npm レジストリから取る）

  日本語化
    環境変数 ANTHROPIC_API_KEY があるときだけ、見出し・要約を日本語に訳して
    「ここが効く」の1行を足します。訳した結果は tools/news_ja.json に貯めるので、
    2回目以降は新しい記事の分しか API を呼びません。キーが無ければ英語のまま
    出ます（画面は英語でも成立するように作ってあります）。

  壊れ方について
    取得に失敗した情報源は、前回 assets/news.js に入っていた内容をそのまま
    残します。相手のサイトが作り変わってもニュース欄が空になりません。
"""

import argparse
import datetime
import html
import json
import os
import re
import sys
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NEWS_JS = os.path.join(ROOT, "assets", "news.js")
JA_CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "news_ja.json")

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

NEWS_URL = "https://www.anthropic.com/news"
CHANGELOG_URL = "https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md"
NPM_URL = "https://registry.npmjs.org/@anthropic-ai/claude-code"
CHANGELOG_HTML = "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"

MAX_ANTHROPIC = 16      # 公式ニュースの最大掲載件数
MAX_WEEKS = 4           # Claude Code は「週まとめ」を何週ぶん出すか
MAX_BULLETS = 3         # 週まとめに載せる主な変更点の数

MODEL = os.environ.get("NEWS_MODEL", "claude-sonnet-5")

# 公式ニュースのカテゴリ表記（無いものは原文のまま出す）
CAT_JA = {
    "Product": "製品",
    "Announcements": "お知らせ",
    "Policy": "政策・提言",
    "Societal Impacts": "社会への影響",
    "Interpretability": "解釈可能性",
    "Alignment": "アラインメント",
    "Research": "研究",
    "Company": "会社",
    "Events": "イベント",
    "Customers": "導入事例",
    "Economics": "経済",
    "Economic Index": "経済指標",
    "Safeguards": "安全対策",
    "Security": "セキュリティ",
    "Education": "教育",
    "Product Updates": "製品アップデート",
}

MONTHS = {m: i + 1 for i, m in enumerate(
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])}


# --------------------------------------------------------------------------
# 小道具
# --------------------------------------------------------------------------

def log(msg):
    sys.stdout.write(msg + "\n")
    sys.stdout.flush()


def get(url, timeout=45, headers=None):
    req = urllib.request.Request(url, headers=dict(
        {"User-Agent": UA, "Accept-Language": "en"}, **(headers or {})))
    with urllib.request.urlopen(req, timeout=timeout) as res:
        return res.read().decode("utf-8", "replace")


def strip_tags(s):
    if not s:
        return ""
    s = re.sub(r"<[^>]+>", "", s)
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def parse_us_date(text):
    """'Aug 25, 2026' -> '2026-08-25'。読めなければ None。"""
    m = re.search(r"([A-Z][a-z]{2})[a-z]*\s+(\d{1,2}),?\s+(\d{4})", text or "")
    if not m or m.group(1) not in MONTHS:
        return None
    return "%04d-%02d-%02d" % (int(m.group(3)), MONTHS[m.group(1)], int(m.group(2)))


# --------------------------------------------------------------------------
# 1. Anthropic 公式ニュース
# --------------------------------------------------------------------------

# 記事ごとの description が用意されていないとき、会社紹介の定型文が返る
BOILERPLATE = "Anthropic is an AI safety and research company"


def article_summary(slug):
    """一覧に要約が無い記事は、記事ページの description を使う。"""
    page = get("https://www.anthropic.com/news/" + slug, timeout=30)
    for pat in (r'<meta[^>]+property="og:description"[^>]*content="([^"]*)"',
                r'<meta[^>]+name="description"[^>]*content="([^"]*)"'):
        m = re.search(pat, page)
        if not m:
            continue
        text = re.sub(r"\s+", " ", html.unescape(m.group(1))).strip()
        if text and not text.startswith(BOILERPLATE):
            return text
    return ""


def fetch_anthropic(previous_summaries=None):
    """
    公式ニュース一覧のHTMLから記事を拾う。

    class 名にはビルドごとに変わるハッシュが入るので、そこには頼らず
    「/news/… へのリンクの内側にある time / 見出し / 本文」という
    並びだけを見ている。
    """
    page = get(NEWS_URL)
    found = {}

    for m in re.finditer(r'<a\s[^>]*href="/news/([a-z0-9\-]+)"[^>]*>', page):
        slug = m.group(1)
        end = page.find("</a>", m.end())
        block = page[m.end(): end if end != -1 else m.end() + 4000]

        tm = re.search(r"<time[^>]*>(.*?)</time>", block, re.S)
        date = parse_us_date(strip_tags(tm.group(1))) if tm else None

        title = ""
        hm = re.search(r"<h[1-6][^>]*>(.*?)</h[1-6]>", block, re.S)
        if hm:
            title = strip_tags(hm.group(1))
        if not title:
            sm = re.search(r'<span[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)</span>',
                           block, re.S)
            if sm:
                title = strip_tags(sm.group(1))

        cat = ""
        cm = (re.search(r'<span[^>]*class="[^"]*subject[^"]*"[^>]*>(.*?)</span>',
                        block, re.S)
              or re.search(r'<span class="caption bold">(.*?)</span>', block, re.S))
        if cm:
            cat = strip_tags(cm.group(1))

        summary = ""
        pm = re.search(r'<p[^>]*class="[^"]*body[^"]*"[^>]*>(.*?)</p>', block, re.S)
        if pm:
            summary = strip_tags(pm.group(1))

        cur = found.setdefault(slug, {})
        # 同じ記事が「注目」枠と一覧の両方に出る。情報が入っている方を採る
        for key, val in (("date", date), ("title", title),
                         ("cat", cat), ("summary", summary)):
            if val and not cur.get(key):
                cur[key] = val

    items = []
    for slug, d in found.items():
        if not d.get("title"):
            continue
        cat = d.get("cat", "")
        items.append({
            "id": "anthropic:" + slug,
            "src": "anthropic",
            "date": d.get("date") or "",
            "cat": cat,
            "catJa": CAT_JA.get(cat, cat) or "ニュース",
            "title": d["title"],
            "summary": d.get("summary", ""),
            "url": "https://www.anthropic.com/news/" + slug,
        })

    items.sort(key=lambda x: x["date"], reverse=True)
    if len(items) < 3:
        raise RuntimeError("記事が %d 件しか取れませんでした（ページの作りが変わった可能性）"
                           % len(items))
    items = items[:MAX_ANTHROPIC]

    # 一覧に要約が載るのは「注目」枠の数件だけ。残りは記事ページから拾う。
    # 前回すでに取れているものは取り直さない（毎日むだに叩かないため）
    fetched = 0
    for it in items:
        if it["summary"]:
            continue
        keep = (previous_summaries or {}).get(it["id"])
        if keep:
            it["summary"] = keep
            continue
        try:
            it["summary"] = article_summary(it["id"].split(":", 1)[1])
            fetched += 1
        except Exception:                            # noqa: BLE001
            pass                                     # 1本落ちても一覧は出す
    if fetched:
        log("  記事ページから要約を取得: %d件" % fetched)

    return items


# --------------------------------------------------------------------------
# 2. Claude Code の更新（週ごとにまとめる）
# --------------------------------------------------------------------------

def parse_changelog(text):
    """'## 2.1.246' ごとに箇条書きを集める。"""
    out = []
    cur = None
    for line in text.splitlines():
        h = re.match(r"^##\s+v?([0-9][0-9A-Za-z.\-]*)\s*$", line)
        if h:
            cur = {"version": h.group(1), "bullets": []}
            out.append(cur)
            continue
        if cur is not None:
            b = re.match(r"^[-*]\s+(.+?)\s*$", line)
            if b:
                cur["bullets"].append(b.group(1))
    return out


def kind_of(bullet):
    head = bullet.strip().lower()
    if head.startswith("added") or head.startswith("new "):
        return "added"
    if head.startswith("fixed"):
        return "fixed"
    return "changed"


def md_to_text(s):
    s = re.sub(r"`([^`]*)`", r"\1", s)
    s = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", s)
    s = re.sub(r"\*\*([^*]*)\*\*", r"\1", s)
    return re.sub(r"\s+", " ", s).strip()


def fetch_claude_code():
    versions = parse_changelog(get(CHANGELOG_URL))
    if len(versions) < 3:
        raise RuntimeError("CHANGELOG からバージョンを読み取れませんでした")

    times = json.loads(get(NPM_URL)).get("time", {})

    # 週（月曜はじまり）ごとに束ねる
    weeks = {}
    for v in versions:
        ts = times.get(v["version"])
        if not ts:
            continue
        day = datetime.date(int(ts[0:4]), int(ts[5:7]), int(ts[8:10]))
        monday = day - datetime.timedelta(days=day.weekday())
        w = weeks.setdefault(monday, {"versions": [], "bullets": [],
                                      "first": day, "last": day})
        w["versions"].append(v["version"])
        w["bullets"].extend(v["bullets"])
        if day > w["last"]:
            w["last"] = day
        if day < w["first"]:
            w["first"] = day

    if not weeks:
        raise RuntimeError("npm レジストリから公開日が取れませんでした")

    items = []
    for monday in sorted(weeks, reverse=True)[:MAX_WEEKS]:
        w = weeks[monday]
        counts = {"added": 0, "fixed": 0, "changed": 0}
        for b in w["bullets"]:
            counts[kind_of(b)] += 1

        # 見出しの日付は「実際にリリースがあった日」だけを使う。
        # 月〜日で固定すると、週の途中に見たとき未来の日付が出てしまう。
        span = "%d/%d" % (w["first"].month, w["first"].day)
        if w["last"] != w["first"]:
            span += "〜%d/%d" % (w["last"].month, w["last"].day)

        highlights = [md_to_text(b) for b in w["bullets"] if kind_of(b) == "added"]
        if not highlights:
            highlights = [md_to_text(b) for b in w["bullets"]]

        items.append({
            "id": "claudecode:" + monday.isoformat(),
            "src": "claudecode",
            "date": w["last"].isoformat(),
            "cat": "Release notes",
            "catJa": "更新",
            "title": "Claude Code の更新（" + span + "）",
            "summary": "%d 回リリース（v%s〜v%s）。新機能 %d件・修正 %d件・改善 %d件。" % (
                len(w["versions"]), w["versions"][-1], w["versions"][0],
                counts["added"], counts["fixed"], counts["changed"]),
            "bullets": highlights[:MAX_BULLETS],
            "url": CHANGELOG_HTML,
            # 見出しと要約はこちらで組んだ日本語なので訳さない。
            # 箇条書きだけは原文（英語）なので翻訳に回す。
            "srcJa": True,
        })
    return items


# --------------------------------------------------------------------------
# 3. 日本語化（ANTHROPIC_API_KEY があるときだけ）
# --------------------------------------------------------------------------

PROMPT = """あなたは日本の中小企業（工務店・住宅会社が中心）向けに、AI関連のニュースを紹介する編集者です。
以下は Anthropic（Claude の開発元）の英語ニュースです。各件について日本語を作ってください。

入力に入っている項目だけを訳します。無い項目は出力しないでください。

- titleJa   : title の日本語見出し。30〜45字程度。意味を変えない。体言止めでよい。
- summaryJa : summary の要約。2〜3文、100〜150字程度。書いてないことは足さない。
- bulletsJa : bullets を同じ順番・同じ件数で訳した配列。各 40〜70字。
              開発者向けの文なので、何ができるようになったかが伝わる言い方にする。
- why       : 「経営者にとって何が変わるか」を1文（40〜60字）。

why の注意。断定できないものは「〜の可能性があります」と書く。
無理に商売に結びつけない。方針表明・研究・人事など実務との関係が薄い話題なら、
「直接の影響はありませんが〜」のように素直に書いてよい。

製品名・モデル名（Claude, Opus, Sonnet, Haiku, Claude Code など）は英語のまま残す。
誇張しない。事実だけを訳す。

出力は次の形の JSON 配列のみ。説明文は書かない。
[{"id":"...","titleJa":"...","summaryJa":"...","bulletsJa":["..."],"why":"..."}]

対象:
"""


def _payload_of(item):
    """翻訳に回す項目だけを押し込む。"""
    row = {"id": item["id"]}
    if not item.get("srcJa"):
        row["title"] = item.get("title", "")
        if item.get("summary"):
            row["summary"] = item["summary"]
    if item.get("bullets"):
        row["bullets"] = item["bullets"]
    return row


def _call_api(payload, key):
    body = json.dumps({
        "model": MODEL,
        "max_tokens": 8000,
        "messages": [{
            "role": "user",
            "content": PROMPT + json.dumps(payload, ensure_ascii=False, indent=1),
        }],
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages", data=body,
        headers={"content-type": "application/json",
                 "x-api-key": key,
                 "anthropic-version": "2023-06-01"})
    with urllib.request.urlopen(req, timeout=180) as res:
        data = json.loads(res.read().decode("utf-8"))

    text = "".join(b.get("text", "") for b in data.get("content", [])
                   if b.get("type") == "text")
    m = re.search(r"\[[\s\S]*\]", text)
    if not m:
        raise RuntimeError("翻訳の返答が JSON 配列ではありませんでした")
    return json.loads(m.group(0))


def translate(items, key):
    cache = {}
    if os.path.exists(JA_CACHE):
        try:
            with open(JA_CACHE, "r", encoding="utf-8") as f:
                cache = json.load(f)
        except ValueError:
            cache = {}

    todo = [i for i in items if i["id"] not in cache]
    if todo:
        for row in _call_api([_payload_of(i) for i in todo], key):
            if row.get("id"):
                cache[row["id"]] = {
                    "titleJa": row.get("titleJa", ""),
                    "summaryJa": row.get("summaryJa", ""),
                    "bulletsJa": row.get("bulletsJa") or [],
                    "why": row.get("why", ""),
                }
        log("  翻訳: 新規 %d件（キャッシュ済み %d件）"
            % (len(todo), len(items) - len(todo)))
    else:
        log("  翻訳: 新規なし（全件キャッシュ済み）")

    ok = 0
    for i in items:
        ja = cache.get(i["id"]) or {}
        if i.get("srcJa"):
            ok += 1                       # 見出し・要約は元から日本語
        elif ja.get("titleJa"):
            i["titleJa"] = ja["titleJa"]
            ok += 1
        if ja.get("summaryJa") and not i.get("srcJa"):
            i["summaryJa"] = ja["summaryJa"]
        if ja.get("why"):
            i["why"] = ja["why"]
        # 箇条書きは件数が合っているときだけ入れ替える
        if i.get("bullets") and len(ja.get("bulletsJa") or []) == len(i["bullets"]):
            i["bulletsJa"] = ja["bulletsJa"]

    # 使わなくなった記事の訳は捨てる（際限なく太らせない）
    live = set(i["id"] for i in items)
    for dead in [k for k in cache if k not in live]:
        del cache[dead]

    with open(JA_CACHE, "w", encoding="utf-8", newline="\n") as f:
        json.dump(cache, f, ensure_ascii=False, indent=1, sort_keys=True)

    return ok


# --------------------------------------------------------------------------
# 4. 前回の内容（取得に失敗した情報源はこれを残す）
# --------------------------------------------------------------------------

def read_previous():
    """前回の (記事一覧, meta) を返す。読めなければ空。"""
    if not os.path.exists(NEWS_JS):
        return [], {}
    with open(NEWS_JS, "r", encoding="utf-8") as f:
        src = f.read()

    def grab(pattern):
        m = re.search(pattern, src)
        if not m:
            return None
        try:
            return json.loads(m.group(1))
        except ValueError:
            return None

    items = grab(r"var NEWS\s*=\s*(\[[\s\S]*?\n\]);")
    meta = grab(r"var NEWS_META\s*=\s*(\{[\s\S]*?\n\});")
    return (items or []), (meta or {})


def keep_previous_ja(items, previous):
    """前回すでに日本語になっていた分を引き継ぐ。

    API キーを外したときや、翻訳が一時的に失敗したときに、
    せっかくの日本語が英語へ戻ってしまうのを防ぐ。
    """
    prev = dict((i.get("id"), i) for i in previous)
    for it in items:
        p = prev.get(it["id"])
        if not p:
            continue
        for k in ("titleJa", "summaryJa", "why"):
            if p.get(k) and not it.get(k):
                it[k] = p[k]
        if (not it.get("bulletsJa") and p.get("bulletsJa") and it.get("bullets")
                and len(p["bulletsJa"]) == len(it["bullets"])):
            it["bulletsJa"] = p["bulletsJa"]


# --------------------------------------------------------------------------
# 5. 書き出し
# --------------------------------------------------------------------------

HEADER = """/* ==========================================================================
   Sinmido AI Tools Portal — Claude 最新情報
   --------------------------------------------------------------------------
   ⚠️ このファイルは自動生成です。手で編集しないでください。
      GitHub Actions（.github/workflows/update-news.yml）が毎日つくり直します。
      手元で作り直すときは  python tools/fetch_news.py

   最終取得: %s
   ========================================================================== */

var NEWS_META = %s;

var NEWS = %s;
"""


def now_jst():
    return datetime.datetime.now(
        datetime.timezone(datetime.timedelta(hours=9))
    ).strftime("%Y-%m-%dT%H:%M:%S+09:00")


def write_news_js(items, lang, updated=None):
    meta = {
        "updated": updated or now_jst(),
        "lang": lang,
        "sources": [
            {"id": "anthropic", "label": "Anthropic 公式",
             "url": "https://www.anthropic.com/news"},
            {"id": "claudecode", "label": "Claude Code の更新",
             "url": CHANGELOG_HTML},
        ],
    }
    text = HEADER % (
        meta["updated"][:10],
        json.dumps(meta, ensure_ascii=False, indent=2),
        json.dumps(items, ensure_ascii=False, indent=2),
    )
    with open(NEWS_JS, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    return text


# --------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true",
                    help="取得するだけで assets/news.js を書き換えない")
    args = ap.parse_args()

    previous, prev_meta = read_previous()
    items = []

    prev_summary = dict((i["id"], i.get("summary", "")) for i in previous
                        if i.get("src") == "anthropic" and i.get("summary"))

    for name, label, fn in (("anthropic", "Anthropic 公式ニュース",
                             lambda: fetch_anthropic(prev_summary)),
                            ("claudecode", "Claude Code の更新", fetch_claude_code)):
        try:
            got = fn()
            log("%-22s %d件" % (label, len(got)))
            items.extend(got)
        except Exception as e:                       # noqa: BLE001
            kept = [i for i in previous if i.get("src") == name]
            log("%-22s 取得できませんでした（%s）→ 前回の %d件を残します"
                % (label, e, len(kept)))
            items.extend(kept)

    if not items:
        log("1件も用意できなかったので、ファイルは触りません。")
        return 1

    items.sort(key=lambda x: (x.get("date") or "", x.get("id")), reverse=True)

    key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if key:
        try:
            translate(items, key)
        except Exception as e:                       # noqa: BLE001
            log("  翻訳できませんでした（%s）→ 前回の日本語を使います" % e)
    else:
        log("  ANTHROPIC_API_KEY が無いので翻訳はしません")

    keep_previous_ja(items, previous)
    lang = "ja" if any(i.get("titleJa") or i.get("bulletsJa")
                       for i in items) else "en"

    if args.dry_run:
        log("")
        for i in items:
            log("  %s  [%s] %s" % (i.get("date", "?"), i.get("catJa") or i.get("cat"),
                                   i.get("titleJa") or i.get("title")))
        log("\n--dry-run のため assets/news.js は書き換えていません。")
        return 0

    # 中身が前回と同じなら書かない。
    # 毎回ファイルを書き直すと、更新日時が変わるだけのコミットが毎日積み上がる。
    if items == previous and lang == prev_meta.get("lang"):
        log("\n前回から変わっていません。ファイルは触りません。")
        return 0

    write_news_js(items, lang)
    log("\nassets/news.js を書き出しました（%d件・表示は%s）"
        % (len(items), "日本語" if lang == "ja" else "英語"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
