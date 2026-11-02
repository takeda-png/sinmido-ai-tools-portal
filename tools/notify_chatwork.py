"""週に1回、まだ送っていない Claude の最新情報を Chatwork に送る。

assets/news.js を読み、tools/chatwork_sent.json に無い記事だけを
「見出し＋短い要約＋リンク」で1通にまとめて送る。送ったら ID を記録する。

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


def short(s, n=SUMMARY_MAX):
    s = re.sub(r"\s+", " ", (s or "")).strip()
    return s if len(s) <= n else s[: n - 1].rstrip() + "…"


def build(items):
    today = datetime.now(JST).strftime("%m/%d")
    lines = []
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
    return f"[info][title]Claude 最新情報（週次 {today}・{len(items)}件）[/title]{body}[/info]"


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

    if "--seed" in sys.argv:
        save_sent(sent | {it["id"] for it in news})
        print(f"{len(news)}件を送信済みにしました。")
        return

    new = [it for it in news if it["id"] not in sent]
    if not new:
        print("新しい記事はありません。送りません。")
        return

    body = build(new)
    if "--dry-run" in sys.argv:
        print(body)
        return

    token = os.environ.get("CHATWORK_TOKEN")
    room = os.environ.get("CHATWORK_ROOM_ID")
    if not token or not room:
        raise SystemExit("CHATWORK_TOKEN / CHATWORK_ROOM_ID が設定されていません")
    status = post(token, room, body)
    print(f"Chatwork に {len(new)}件を送りました（HTTP {status}）")
    save_sent(sent | {it["id"] for it in new})


if __name__ == "__main__":
    main()
