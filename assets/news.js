/* ==========================================================================
   Sinmido AI Tools Portal — Claude 最新情報
   --------------------------------------------------------------------------
   ⚠️ このファイルは自動生成です。手で編集しないでください。
      GitHub Actions（.github/workflows/update-news.yml）が毎日つくり直します。
      手元で作り直すときは  python tools/fetch_news.py

   最終取得: 2026-09-26
   ========================================================================== */

var NEWS_META = {
  "updated": "2026-09-26T09:15:46+09:00",
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
    "id": "claudecode:2026-08-31",
    "src": "claudecode",
    "date": "2026-09-06",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（8/31〜9/6）",
    "summary": "7 回リリース（v2.1.252〜v2.1.263）。新機能 22件・修正 154件・改善 105件。",
    "bullets": [
      "Added an \"Organization policy\" line to /status and claude doctor that says why your organization's policy could not be loaded, such as a proxy not passing the endpoint through",
      "Added bashOutputMaxChars and taskOutputMaxChars settings to raise how much command and background-task output Claude receives inline before it is saved to a file, up to 128K characters",
      "Added --append-subagent-system-prompt-file to read the subagent system prompt from a file, for prompts too large to pass on the command line"
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
  },
  {
    "id": "anthropic:claude-text-watermark",
    "src": "anthropic",
    "date": "2026-08-14",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "How Claude’s text watermark works",
    "summary": "In this article, we share answers to some of the questions we’ve received about how our chosen watermarking method works, whether it affects Claude’s outputs, and why we’re making this change.",
    "url": "https://www.anthropic.com/news/claude-text-watermark"
  },
  {
    "id": "anthropic:improving-fable-5-s-biology-safeguards",
    "src": "anthropic",
    "date": "2026-08-07",
    "cat": "Product",
    "catJa": "製品",
    "title": "Improving Fable 5's biology safeguards",
    "summary": "We’re making updates to Claude Fable 5’s biology safeguards in a way that substantially reduces false positives. Fable 5 users will now experience many fewer “fallbacks”—where the system switches to a less capable model after they make a biology-related query.",
    "url": "https://www.anthropic.com/news/improving-fable-5-s-biology-safeguards"
  }
];
