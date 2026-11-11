"""週に1回、まだ送っていない Claude の最新情報を Chatwork に送る。

assets/news.js を読み、tools/chatwork_sent.json に無い記事だけを
「見出し＋短い要約＋リンク」で1通にまとめて送る。送ったら ID を記録する。
あわせて anthropics/claude-code の公式セキュリティ情報（GitHub Security Advisories）
のうち未送信のものを同じ1通の先頭に載せる（ID は "ghsa:GHSA-xxxx" で記録）。

  python tools/notify_chatwork.py            # 送る（CHATWORK_TOKEN / CHATWORK_ROOM_ID が必要）
  python tools/notify_chatwork.py --dry-run  # 送らずに本文だけ表示
  python tools/notify_chatwork.py --seed     # いまある記事を全部「送信済み」にする（送らない）
"""
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NEWS_JS = ROOT / "assets" / "news.js"
SENT = ROOT / "tools" / "chatwork_sent.json"
PORTAL = "https://takeda-png.github.io/sinmido-ai-tools-portal/portal.html"
ADVISORIES = "https://api.github.com/repos/anthropics/claude-code/security-advisories?per_page=100"
NPM_LATEST = "https://registry.npmjs.org/@anthropic-ai/claude-code/latest"
SEVERITY = {"critical": "緊急", "high": "高", "medium": "中", "low": "低"}
SUMMARY_MAX = 70   # 要約は短めに
JST = timezone(timedelta(hours=9))


def load_news():
    text = NEWS_JS.read_text(encoding="utf-8")
    m = re.search(r"var NEWS\s*=\s*(\[.*\]);", text, re.S)
    if not m:
        raise SystemExit("assets/news.js から NEWS が読めません")
    return json.loads(m.group(1))


def load_sent():
    if SENT.exists():
        return set(json.loads(SENT.read_text(encoding="utf-8")))
    return set()


def save_sent(ids):
    SENT.write_text(json.dumps(sorted(ids), ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


def fetch_json(url):
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "portal-notify"}
    tok = os.environ.get("GITHUB_TOKEN")
    if tok and "api.github.com" in url:
        headers["Authorization"] = f"Bearer {tok}"
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def load_advisories():
    """取れなくても記事の通知は止めない（空で返す）。"""
    try:
        advs = fetch_json(ADVISORIES)
    except Exception as e:
        print(f"セキュリティ情報を取得できませんでした: {e}")
        return []
    out = []
    for a in advs:
        vulns = a.get("vulnerabilities") or []
        targets = []
        for v in vulns:
            name = (v.get("package") or {}).get("name") or "?"
            if name == "@anthropic-ai/claude-code":
                name = "Claude Code"
            targets.append(f"{name} {v.get('vulnerable_version_range') or ''}"
                           f" → 修正版 {v.get('patched_versions') or '未定'}")
        out.append({
            "id": "ghsa:" + a["ghsa_id"],
            "date": (a.get("published_at") or "")[:10],
            "sev": SEVERITY.get(a.get("severity") or "", a.get("severity") or "?"),
            "summary": a.get("summary") or "",
            "targets": targets,
            "url": a.get("html_url") or "",
        })
    out.sort(key=lambda x: x["date"])
    return out


def latest_cli():
    try:
        return fetch_json(NPM_LATEST).get("version")
    except Exception:
        return None


def short(s, n=SUMMARY_MAX):
    s = re.sub(r"\s+", " ", (s or "")).strip()
    return s if len(s) <= n else s[: n - 1].rstrip() + "…"


def build(items, advs=()):
    today = datetime.now(JST).strftime("%m/%d")
    lines = []
    if advs:
        lines.append(f"🔴 セキュリティ（公式の脆弱性情報・{len(advs)}件）")
        for a in advs:
            lines.append(f"■ [重要度:{a['sev']}] {a['summary']}（{a['date']}公開）")
            for tg in a["targets"]:
                lines.append(f"　対象: {tg}")
            lines.append(f"　{a['url']}")
            lines.append("")
        ver = latest_cli()
        if ver:
            lines.append(f"Claude Code の最新版は {ver}。手元の版は `claude --version` で確認し、修正版より古ければ更新してください。")
        lines.append("")
        if items:
            lines.append("――― 最新情報 ―――")
    for it in items:
        label = "Claude Code" if it.get("src") == "claudecode" else "Anthropic"
        lines.append(f"■ [{label}] {it.get('titleJa') or it['title']}")
        summ = short(it.get("summaryJa") or it.get("summary"))
        if summ:
            lines.append(f"　{summ}")
        lines.append(f"　{it['url']}")
        lines.append("")
    lines.append(f"一覧: {PORTAL}")
    body = "\n".join(lines)
    sec = f"・🔴セキュリティ{len(advs)}件" if advs else ""
    return f"[info][title]Claude 最新情報（週次 {today}・{len(items)}件{sec}）[/title]{body}[/info]"


def post(token, room, body):
    data = urllib.parse.urlencode({"body": body}).encode("utf-8")
    req = urllib.request.Request(
        f"https://api.chatwork.com/v2/rooms/{room}/messages",
        data=data,
        headers={"X-ChatWorkToken": token},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status


def main():
    news = load_news()
    sent = load_sent()
    advs = load_advisories()

    if "--seed" in sys.argv:
        save_sent(sent | {it["id"] for it in news} | {a["id"] for a in advs})
        print(f"記事{len(news)}件・セキュリティ{len(advs)}件を送信済みにしました。")
        return

    new = [it for it in news if it["id"] not in sent]
    new_advs = [a for a in advs if a["id"] not in sent]
    if not new and not new_advs:
        print("新しい記事もセキュリティ情報もありません。送りません。")
        return

    body = build(new, new_advs)
    if "--dry-run" in sys.argv:
        print(body)
        return

    token = os.environ.get("CHATWORK_TOKEN")
    room = os.environ.get("CHATWORK_ROOM_ID")
    if not token or not room:
        raise SystemExit("CHATWORK_TOKEN / CHATWORK_ROOM_ID が設定されていません")
    status = post(token, room, body)
    print(f"Chatwork に 記事{len(new)}件・セキュリティ{len(new_advs)}件を送りました（HTTP {status}）")
    save_sent(sent | {it["id"] for it in new} | {a["id"] for a in new_advs})


if __name__ == "__main__":
    main()
