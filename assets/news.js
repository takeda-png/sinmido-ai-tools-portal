/* ==========================================================================
   Sinmido AI Tools Portal — Claude 最新情報
   --------------------------------------------------------------------------
   ⚠️ このファイルは自動生成です。手で編集しないでください。
      GitHub Actions（.github/workflows/update-news.yml）が毎日つくり直します。
      手元で作り直すときは  python tools/fetch_news.py

   最終取得: 2026-08-26
   ========================================================================== */

var NEWS_META = {
  "updated": "2026-08-26T16:02:35+09:00",
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
    "id": "claudecode:2026-08-24",
    "src": "claudecode",
    "date": "2026-08-25",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（8/24〜8/25）",
    "summary": "3 回リリース（v2.1.243〜v2.1.246）。新機能 13件・修正 80件・改善 29件。",
    "bullets": [
      "Added a startup warning for Bash allow rules with a wildcard before the subcommand (e.g. Bash(git * main)), since they also match options inserted before the subcommand",
      "Added an Auto mode tab to /permissions for viewing and editing auto mode classifier rules",
      "Added the turn's completion time to the end-of-turn duration line, e.g. ✻ Sautéed for 23s · done 6:05 PM"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
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
    "id": "claudecode:2026-08-17",
    "src": "claudecode",
    "date": "2026-08-22",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（8/17〜8/22）",
    "summary": "8 回リリース（v2.1.234〜v2.1.241）。新機能 12件・修正 111件・改善 82件。",
    "bullets": [
      "Added the one-time fullscreen renderer offer on Bedrock, Vertex, Foundry and other previously excluded setups; new installs there now start in fullscreen",
      "Added /claude-api upgrade to migrate Python projects from anthropic 0.x to 1.x, and updated the skill's Python reference for 1.x (timeouts use anthropic.Timeout, not httpx.Timeout)",
      "Added a keybindingFlavor setting: set it to \"readline\" to make Ctrl+W in the prompt delete back to the previous whitespace, as in Bash; the default (\"classic\") is unchanged"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
  },
  {
    "id": "claudecode:2026-08-10",
    "src": "claudecode",
    "date": "2026-08-14",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（8/10〜8/14）",
    "summary": "6 回リリース（v2.1.227〜v2.1.233）。新機能 10件・修正 59件・改善 56件。",
    "bullets": [
      "Added GitLab merge request URL support to the --worktree flag and the claude agents view (where MRs display as !N)",
      "Added an opt-in forward_user_identity apps gateway setting on Anthropic upstreams that sends the signed-in user's identity as headers, so a proxy behind the gateway can attribute spend per user",
      "Added opt-in memory cgroup support for Bash tool commands on Linux (CLAUDE_CODE_TOOL_MEMORY_LIMIT) so a runaway build can't stall the session"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
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
    "id": "claudecode:2026-08-03",
    "src": "claudecode",
    "date": "2026-08-08",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（8/3〜8/8）",
    "summary": "6 回リリース（v2.1.221〜v2.1.226）。新機能 15件・修正 66件・改善 44件。",
    "bullets": [
      "Added gateway spend-limit support to Claude Code's usage warning; the limit-reached message now names the cap, its reset time, and the operator's message (requires the gateway on 2.1.225)",
      "Added a workspace trust prompt to claude agents for untrusted directories, matching the behavior of claude",
      "Added self-hosted environments: claude self-hosted-runner turns your own machines or containers into a place Claude Code web, mobile, and desktop sessions can run, on Team and Enterprise plans"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
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
  },
  {
    "id": "anthropic:tino-cuellar",
    "src": "anthropic",
    "date": "2026-08-04",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Mariano-Florentino (Tino) Cuéllar to join Anthropic as Chief Global Affairs Officer",
    "summary": "",
    "url": "https://www.anthropic.com/news/tino-cuellar"
  },
  {
    "id": "anthropic:investigating-incidents-cybersecurity-evals",
    "src": "anthropic",
    "date": "2026-07-30",
    "cat": "",
    "catJa": "ニュース",
    "title": "Investigating three real-world incidents in our cybersecurity evaluations",
    "summary": "In a review of our cybersecurity evaluation transcripts, we found three incidents in which a Claude model reached the internet from within or while interacting with a third-party evaluation environment, and then gained unauthorized access to the real systems of three different organizations. Below we describe what happened, how it happened, and what we’re changing. We encourage other AI labs to perform similar reviews.",
    "url": "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals"
  },
  {
    "id": "anthropic:position-open-weights-models",
    "src": "anthropic",
    "date": "2026-07-27",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Our position on open-weights models",
    "summary": "Anthropic CEO Dario Amodei on open-weights models",
    "url": "https://www.anthropic.com/news/position-open-weights-models"
  },
  {
    "id": "anthropic:cognizant-anthropic",
    "src": "anthropic",
    "date": "2026-07-27",
    "cat": "Announcements",
    "catJa": "お知らせ",
    "title": "Cognizant and Anthropic expand their partnership to bring Claude to enterprise clients",
    "summary": "Cognizant embeds Claude across its platforms, with 30,000+ associates trained, and becomes a Global Premier Partner in the Claude Partner Network.",
    "url": "https://www.anthropic.com/news/cognizant-anthropic"
  },
  {
    "id": "anthropic:claude-opus-5",
    "src": "anthropic",
    "date": "2026-07-24",
    "cat": "Product",
    "catJa": "製品",
    "title": "Introducing Claude Opus 5",
    "summary": "Opus 5 is a step change improvement for the Opus tier powering long-running agents while delivering improvements in coding and professional work.",
    "url": "https://www.anthropic.com/news/claude-opus-5"
  },
  {
    "id": "anthropic:economic-futures-research-fund-agenda",
    "src": "anthropic",
    "date": "2026-07-22",
    "cat": "Economics",
    "catJa": "経済",
    "title": "A research agenda for the Economic Futures Research Fund",
    "summary": "We’re committing $200 million to the Anthropic Economic Futures Research Fund to support ambitious external research.",
    "url": "https://www.anthropic.com/news/economic-futures-research-fund-agenda"
  },
  {
    "id": "anthropic:anthropic-economic-index-connector",
    "src": "anthropic",
    "date": "2026-07-22",
    "cat": "Product",
    "catJa": "製品",
    "title": "Ask Claude about the Anthropic Economic Index",
    "summary": "We're launching the Anthropic Economic Index connector for Claude, which lets anyone explore the data directly.",
    "url": "https://www.anthropic.com/news/anthropic-economic-index-connector"
  },
  {
    "id": "anthropic:claude-sonnet-5",
    "src": "anthropic",
    "date": "2026-06-30",
    "cat": "Product",
    "catJa": "製品",
    "title": "Introducing Claude Sonnet 5",
    "summary": "Sonnet 5 delivers frontier performance across coding, agents, and professional work at scale.",
    "url": "https://www.anthropic.com/news/claude-sonnet-5"
  }
];
