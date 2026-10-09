/* ==========================================================================
   Sinmido AI Tools Portal — Claude 最新情報
   --------------------------------------------------------------------------
   ⚠️ このファイルは自動生成です。手で編集しないでください。
      GitHub Actions（.github/workflows/update-news.yml）が毎日つくり直します。
      手元で作り直すときは  python tools/fetch_news.py

   最終取得: 2026-10-09
   ========================================================================== */

var NEWS_META = {
  "updated": "2026-10-09T10:33:39+09:00",
  "lang": "en",
  "sources": [
    {
      "id": "anthropic",
      "label": "Anthropic 公式",
      "url": "https://www.anthropic.com/news"
    },
    {
      "id": "claudecode",
      "label": "Claude Code の更新",
      "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
    }
  ]
};

var NEWS = [
  {
    "id": "claudecode:2026-10-05",
    "src": "claudecode",
    "date": "2026-10-08",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（10/5〜10/8）",
    "summary": "6 回リリース（v2.1.290〜v2.1.295）。新機能 35件・修正 285件・改善 165件。",
    "bullets": [
      "Added onFailure: \"block\" for command and HTTP hooks: a hook that can't start, times out, or exits with an unexpected code blocks the action instead of letting it through",
      "Added Program Status Protocol (OSC 7501) support: terminals that implement it can show whether Claude Code is working, waiting on you, or done",
      "Added quoted text to the /copy picker, so a drafted message copies without its > markers"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
  },
  {
    "id": "anthropic:genesis-mission-commitment",
    "src": "anthropic",
    "date": "2026-10-08",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Building on our commitment to American scientific discovery",
    "summary": "Anthropic is committing $150 million over three years to the Genesis Mission, a federal initiative to accelerate scientific and technological discovery through AI.",
    "url": "https://www.anthropic.com/news/genesis-mission-commitment"
  },
  {
    "id": "anthropic:anthropic-cyber-mission",
    "src": "anthropic",
    "date": "2026-10-08",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Introducing the Anthropic Cyber Mission",
    "summary": "",
    "url": "https://www.anthropic.com/news/anthropic-cyber-mission"
  },
  {
    "id": "anthropic:2026-usage-policy-update",
    "src": "anthropic",
    "date": "2026-10-08",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "2026 Usage Policy update",
    "summary": "We’re publishing a new version of our Usage Policy. In this post, we summarize the changes we’ve made.",
    "url": "https://www.anthropic.com/news/2026-usage-policy-update"
  },
  {
    "id": "anthropic:cyber-verification-program",
    "src": "anthropic",
    "date": "2026-10-06",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Expanding the Cyber Verification Program",
    "summary": "We’re launching a new, expanded version of our Cyber Verification Program, which makes advanced cyber capabilities and reduced blocking classifiers available to qualifying security professionals.",
    "url": "https://www.anthropic.com/news/cyber-verification-program"
  },
  {
    "id": "claudecode:2026-09-28",
    "src": "claudecode",
    "date": "2026-10-03",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（9/28〜10/3）",
    "summary": "6 回リリース（v2.1.284〜v2.1.289）。新機能 30件・修正 266件・改善 250件。",
    "bullets": [
      "Added agent.spawn for teammates, one agent id across plugin hook events, and idle and waiting states in $.agent.list()",
      "Added $.ui.selection() for mods: returns the text you last selected in fullscreen mode and, when the selection lies within one transcript row, that row",
      "Added a built-in gh api to cloud sessions whose image has no GitHub CLI, and fixed the built-in sending control characters from file names, jq filters or GitHub errors to the terminal"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
  },
  {
    "id": "anthropic:claude-frontier-academy",
    "src": "anthropic",
    "date": "2026-10-02",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Anthropic invests $100 million to train 10,000 engineers and tackle the enterprise AI talent gap",
    "summary": "Claude Frontier Academy trains Frontier Deployed Engineers to the standard of Anthropic’s own — a $100 million commitment to train 10,000 by the end of 2027.",
    "url": "https://www.anthropic.com/news/claude-frontier-academy"
  },
  {
    "id": "anthropic:barclays-scales-claude",
    "src": "anthropic",
    "date": "2026-10-01",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Barclays scales Claude to upgrade operations and improve client experience",
    "summary": "Barclays, the British universal bank, is expanding its strategic collaboration with Anthropic to integrate secure, enterprise-grade AI systems across its global operations.",
    "url": "https://www.anthropic.com/news/barclays-scales-claude"
  },
  {
    "id": "claudecode:2026-09-21",
    "src": "claudecode",
    "date": "2026-09-25",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（9/22〜9/25）",
    "summary": "4 回リリース（v2.1.280〜v2.1.283）。新機能 27件・修正 224件・改善 220件。",
    "bullets": [
      "Added x-claude-code-prompt-id to the gateway hint headers so LLM gateways can group the requests that serve one user prompt; opt in with CLAUDE_CODE_GATEWAY_HINT_HEADERS=1",
      "Added availableModelsMatch managed setting: with \"exact\", an availableModels entry allows only the model version it names, so new releases stay blocked until listed",
      "Added deniedModels managed setting to block specific models, even when availableModels allows them"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
  },
  {
    "id": "anthropic:claude-discovers-novel-enzyme-system",
    "src": "anthropic",
    "date": "2026-09-23",
    "cat": "Science",
    "catJa": "Science",
    "title": "Claude discovers a novel enzyme system with CRISPR-like repeats",
    "summary": "In early results from our new life sciences research lab, Claude agents found an enzyme system whose function is still unknown.",
    "url": "https://www.anthropic.com/news/claude-discovers-novel-enzyme-system"
  },
  {
    "id": "claudecode:2026-09-14",
    "src": "claudecode",
    "date": "2026-09-19",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（9/14〜9/19）",
    "summary": "8 回リリース（v2.1.271〜v2.1.278）。新機能 29件・修正 182件・改善 243件。",
    "bullets": [
      "Added an Auto mode server row to /status showing whether this session's auto mode classifier runs on the server",
      "Added AGENTS.md support: in a project with no CLAUDE.md, Claude Code reads AGENTS.md instead; change it under \"Project instructions\" in /config",
      "Added CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1 for Claude apps gateways whose only egress is a forward proxy: every outbound request hands the proxy the hostname instead of resolving it locally"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
  },
  {
    "id": "anthropic:accenture-embedded-evaluation",
    "src": "anthropic",
    "date": "2026-09-18",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Partnering with Accenture on embedded evaluation",
    "summary": "We’re partnering with Accenture on independent evaluation of frontier AI—part of our recent commitment to embed evaluators at Anthropic. Both we and Accenture expect to invest at least $1 billion to build capacity in this area over the next five years.",
    "url": "https://www.anthropic.com/news/accenture-embedded-evaluation"
  },
  {
    "id": "anthropic:life-sciences-verification-program",
    "src": "anthropic",
    "date": "2026-09-17",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Introducing the Life Sciences Verification Program",
    "summary": "",
    "url": "https://www.anthropic.com/news/life-sciences-verification-program"
  },
  {
    "id": "anthropic:enterprise-frontier-safeguards",
    "src": "anthropic",
    "date": "2026-09-01",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Developing Enterprise Frontier Safeguards with our customers",
    "summary": "",
    "url": "https://www.anthropic.com/news/enterprise-frontier-safeguards"
  }
];
