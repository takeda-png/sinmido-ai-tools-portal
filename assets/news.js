/* ==========================================================================
   Sinmido AI Tools Portal — Claude 最新情報
   --------------------------------------------------------------------------
   ⚠️ このファイルは自動生成です。手で編集しないでください。
      GitHub Actions（.github/workflows/update-news.yml）が毎日つくり直します。
      手元で作り直すときは  python tools/fetch_news.py

   最終取得: 2026-10-17
   ========================================================================== */

var NEWS_META = {
  "updated": "2026-10-17T09:03:26+09:00",
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
    "id": "claudecode:2026-10-12",
    "src": "claudecode",
    "date": "2026-10-16",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（10/14〜10/16）",
    "summary": "4 回リリース（v2.1.299〜v2.1.302）。新機能 34件・修正 205件・改善 153件。",
    "bullets": [
      "Added CLAUDE_CODE_AUTO_MODE_MODEL to choose the model the client-side auto mode classifier uses; it does not change the model for server-side auto mode",
      "Added an Idle compaction row to /config for turning idle compaction off or back on; the notices shown after an idle compaction now say how to turn it off",
      "Added a notice to /design-sync and /design-login that standalone Claude Design (claude.ai/design) closes by December 14, 2026"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
  },
  {
    "id": "anthropic:an-update-on-independent-evaluators",
    "src": "anthropic",
    "date": "2026-10-15",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "An update on independent evaluators",
    "summary": "Anthropic announces updates to embedding independent evaluators",
    "url": "https://www.anthropic.com/news/an-update-on-independent-evaluators"
  },
  {
    "id": "anthropic:singapore-office-opening",
    "src": "anthropic",
    "date": "2026-10-14",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Anthropic opens Singapore office and signs MOU with the Government of Singapore",
    "summary": "Anthropic opens its fifth Asia-Pacific office in Singapore and signs an MOU with the government on AI safety, evaluation, and responsible adoption.",
    "url": "https://www.anthropic.com/news/singapore-office-opening"
  },
  {
    "id": "anthropic:2026-us-midterms",
    "src": "anthropic",
    "date": "2026-10-14",
    "cat": "Policy",
    "catJa": "政策・提言",
    "title": "Preparing for the 2026 US midterms",
    "summary": "Earlier this year, we shared an update on our election safeguards. Here, we outline how we’ve continued to strengthen these safeguards ahead of this year’s US midterms.",
    "url": "https://www.anthropic.com/news/2026-us-midterms"
  },
  {
    "id": "claudecode:2026-10-05",
    "src": "claudecode",
    "date": "2026-10-09",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（10/5〜10/9）",
    "summary": "7 回リリース（v2.1.290〜v2.1.296）。新機能 41件・修正 325件・改善 198件。",
    "bullets": [
      "Added a code key to the Claude apps gateway's managed.policies[]: the same settings as cli, also applied in Claude Desktop's Code tab; beside desktop, it turns on Claude Desktop's gateway mode",
      "Added autoCompactWindow to subagent frontmatter and --agents definitions, so a subagent can auto-compact earlier than the main conversation's window",
      "Added CLAUDE_CODE_WORKFLOW_SUBAGENT_MODEL to run every workflow agent on one model while other subagents keep theirs"
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
  }
];
