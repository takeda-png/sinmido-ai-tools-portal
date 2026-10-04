/* ==========================================================================
   Sinmido AI Tools Portal — Claude 最新情報
   --------------------------------------------------------------------------
   ⚠️ このファイルは自動生成です。手で編集しないでください。
      GitHub Actions（.github/workflows/update-news.yml）が毎日つくり直します。
      手元で作り直すときは  python tools/fetch_news.py

   最終取得: 2026-10-04
   ========================================================================== */

var NEWS_META = {
  "updated": "2026-10-04T09:14:11+09:00",
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
    "id": "claudecode:2026-09-07",
    "src": "claudecode",
    "date": "2026-09-12",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（9/8〜9/12）",
    "summary": "6 回リリース（v2.1.265〜v2.1.270）。新機能 19件・修正 140件・改善 140件。",
    "bullets": [
      "Added claude plugin eval: run a plugin's eval suite against Claude Code and get scored, reproducible results (JSON + HTML report); see claude plugin eval --help",
      "Added /output-style [name] to list and switch output styles, including over Remote Control and in cloud and other headless sessions",
      "Added a diff of the files a Bash command changed to the Bash tool result when the Bash tool handles file edits (setting bashEditDiffEnabled)"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
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
  },
  {
    "id": "anthropic:improving-alignment-security-efforts",
    "src": "anthropic",
    "date": "2026-08-31",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Improving our alignment and security efforts",
    "summary": "On July 30, we reported three incidents in which Claude models gained unauthorized access to real computer systems. We are conducting an in-depth analysis of both incidents, and planning to work with METR for an independent review. In the meantime, we’re sharing some of the changes we’ve made over the past month.",
    "url": "https://www.anthropic.com/news/improving-alignment-security-efforts"
  },
  {
    "id": "anthropic:model-hardware-standard-research-preview",
    "src": "anthropic",
    "date": "2026-08-27",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Previewing the Model Hardware Standard",
    "summary": "We’re opening a research preview of the Model Hardware Standard (MHS), a shared specification for AI agents to safely operate physical devices, to a first group of scientific research labs and advanced manufacturers.",
    "url": "https://www.anthropic.com/news/model-hardware-standard-research-preview"
  },
  {
    "id": "anthropic:expanding-support-for-scientists",
    "src": "anthropic",
    "date": "2026-08-27",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Expanding our support for scientists",
    "summary": "",
    "url": "https://www.anthropic.com/news/expanding-support-for-scientists"
  },
  {
    "id": "anthropic:wellbeing-research-grants",
    "src": "anthropic",
    "date": "2026-08-25",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Funding better evaluations of AI’s impact on wellbeing",
    "summary": "Anthropic is launching a $5 million grant program to fund independent research into how AI impacts users’ wellbeing.",
    "url": "https://www.anthropic.com/news/wellbeing-research-grants"
  }
];
