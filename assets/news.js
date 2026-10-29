/* ==========================================================================
   Sinmido AI Tools Portal — Claude 最新情報
   --------------------------------------------------------------------------
   ⚠️ このファイルは自動生成です。手で編集しないでください。
      GitHub Actions（.github/workflows/update-news.yml）が毎日つくり直します。
      手元で作り直すときは  python tools/fetch_news.py

   最終取得: 2026-10-29
   ========================================================================== */

var NEWS_META = {
  "updated": "2026-10-29T10:24:17+09:00",
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
    "id": "claudecode:2026-10-26",
    "src": "claudecode",
    "date": "2026-10-27",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（10/26〜10/27）",
    "summary": "2 回リリース（v2.1.311〜v2.1.312）。新機能 4件・修正 60件・改善 67件。",
    "bullets": [
      "Added oidc.user_id_claim to the Claude apps gateway, to identify people by an id_token claim other than sub, such as Microsoft Entra ID's oid",
      "Added click to send: in fullscreen, clicking the \"to send now\" hint under a queued message sends it right away, as its key does",
      "Added --hold-idle-file and --max-hold-min to self-hosted-runner, to keep an idle session while your host reports processes it left running"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
  },
  {
    "id": "claudecode:2026-10-19",
    "src": "claudecode",
    "date": "2026-10-23",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（10/19〜10/23）",
    "summary": "7 回リリース（v2.1.304〜v2.1.310）。新機能 12件・修正 113件・改善 140件。",
    "bullets": [
      "Added the Monitor tool and plugin monitors on Bedrock, Vertex, and Foundry, and when telemetry or nonessential traffic is disabled; long foreground sleeps are now blocked there too",
      "Added /claude-api api-version to move Claude API code to API version 2026-10-21",
      "Added the claude_code.safety_event OpenTelemetry event for each tool call a permission rule, auto mode, a safety check, a hook or the sandbox stopped, prompted or sent back"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
  },
  {
    "id": "claudecode:2026-10-12",
    "src": "claudecode",
    "date": "2026-10-18",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（10/14〜10/18）",
    "summary": "5 回リリース（v2.1.299〜v2.1.303）。新機能 34件・修正 205件・改善 154件。",
    "bullets": [
      "Added CLAUDE_CODE_AUTO_MODE_MODEL to choose the model the client-side auto mode classifier uses; it does not change the model for server-side auto mode",
      "Added an Idle compaction row to /config for turning idle compaction off or back on; the notices shown after an idle compaction now say how to turn it off",
      "Added a notice to /design-sync and /design-login that standalone Claude Design (claude.ai/design) closes by December 14, 2026"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
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
    "id": "anthropic:singapore-office-opening",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Anthropic opens Singapore office and signs MOU with the Government of Singapore",
    "summary": "Anthropic opens its fifth Asia-Pacific office in Singapore and signs an MOU with the government on AI safety, evaluation, and responsible adoption.",
    "url": "https://www.anthropic.com/news/singapore-office-opening"
  },
  {
    "id": "anthropic:s1-sec",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Anthropic files S-1 with the SEC for proposed initial public offering",
    "summary": "Today, Anthropic, PBC filed a registration statement on Form S-1 with the U.S. Securities and Exchange Commission relating to its proposed initial public offering of its Class A common stock.",
    "url": "https://www.anthropic.com/news/s1-sec"
  },
  {
    "id": "anthropic:public-benefit-fund",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Investing in the public benefit",
    "summary": "We’re committing a portion of Anthropic’s shares to the Anthropic Public Benefit Fund, a new entity with a structure that increases the stake as the company grows.",
    "url": "https://www.anthropic.com/news/public-benefit-fund"
  },
  {
    "id": "anthropic:open-call-guest-investigators-life-sciences",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Open call for guest investigators in the life sciences",
    "summary": "Today, we’re inviting members of the life sciences community to apply to work with us on special projects.",
    "url": "https://www.anthropic.com/news/open-call-guest-investigators-life-sciences"
  },
  {
    "id": "anthropic:genesis-mission-commitment",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Building on our commitment to American scientific discovery",
    "summary": "Anthropic is committing $150 million over three years to the Genesis Mission, a federal initiative to accelerate scientific and technological discovery through AI.",
    "url": "https://www.anthropic.com/news/genesis-mission-commitment"
  },
  {
    "id": "anthropic:expanding-partnership-gsa",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Expanding our partnership with GSA to bring Claude to all levels of government",
    "summary": "",
    "url": "https://www.anthropic.com/news/expanding-partnership-gsa"
  },
  {
    "id": "anthropic:donating-agent-skills-to-the-agentic-ai-foundation",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Donating Agent Skills to the Agentic AI Foundation",
    "summary": "",
    "url": "https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation"
  },
  {
    "id": "anthropic:distillation-defenses",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Strengthening our defenses against distillation attacks",
    "summary": "Illicit distillation allows model developers to copy frontier AI capabilities without creating proportionally robust safeguards. Here, we describe how we’ve reduced the rate of distillation by more than 90%.",
    "url": "https://www.anthropic.com/news/distillation-defenses"
  },
  {
    "id": "anthropic:cyber-verification-program",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Expanding the Cyber Verification Program",
    "summary": "We’re launching a new, expanded version of our Cyber Verification Program, which makes advanced cyber capabilities and reduced blocking classifiers available to qualifying security professionals.",
    "url": "https://www.anthropic.com/news/cyber-verification-program"
  },
  {
    "id": "anthropic:claude-frontier-academy",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Anthropic invests $100 million to train 10,000 engineers and tackle the enterprise AI talent gap",
    "summary": "Claude Frontier Academy trains Frontier Deployed Engineers to the standard of Anthropic’s own — a $100 million commitment to train 10,000 by the end of 2027.",
    "url": "https://www.anthropic.com/news/claude-frontier-academy"
  },
  {
    "id": "anthropic:christopher-stubbs-joins-long-term-benefit-trust",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Physicist Christopher Stubbs joins Anthropic's Long-Term Benefit Trust",
    "summary": "Dr. Christopher Stubbs, an experimental physicist and former Dean of Science at Harvard University, has joined Anthropic’s Long-Term Benefit Trust. He brings to the Trust decades of scientific expertise across observational cosmology and precision measurement. He has also advised the US government on national security and arms control. “I am honored to join Anthropic’s Long-Term Benefit Trust and to help the company deliver on its public benefit mission,” said Stubbs. “I use AI tools in my research every day and see what they make possible, and as an educator I have confronted some of the hard questions they raise. As a grandfather, I want to help ensure that AI is developed and deployed for the long-term benefit of humanity.” Stubbs is the Samuel C. Moncher Professor of Physics and of Astronomy at Harvard, where he served as Dean of Science from 2018 to 2024. In 1998, as a member of the High-Z Supernova Search Team, he helped discover the accelerating expansion of the universe, work that later earned the team the Breakthrough Prize in Fundamental Physics. He was also the inaugural project scientist for what is now the Vera C. Rubin Observatory, which started a 10-year survey of the southern sky in June. One of its aims is to study the accelerating expansion he helped discover. More recently, he’s written about how to keep AI-assisted research reproducible when models can give different answers to the same question. He’s a member of JASON, an independent group of scientists who have advised the US government on defense and technology since 1960. \"When Chris found evidence that the universe was expanding at a rate no one expected, he and his team followed the data even when it went against the prevailing wisdom of the field. As AI starts to transform how science itself is done, Chris’s intellectual honesty, rigor, and commitment to the truth are the values we want shaping the future of this technology, and I’m grateful he’s bringing his deep expertise to the Trust,\" said Daniela Amodei, Co-founder and President of Anthropic. Anthropic is a Public Benefit Corporation, which means we’re structured to balance commercial growth with our public benefit purpose. The Trust exists to help us hold that balance over the long term. It has the authority to appoint a majority of Anthropic’s board, and Trustees advise the board and our leadership on critical decisions, particularly those involving risks and societal impacts of AI. This week we published our first Public Benefit Report [link], a public account of how we’re working toward our mission and where we’re falling short. The Trustees helped define the five mission pillars it measures us against, and the report closes with their assessment of our progress to date. Subject to stockholder approval, we’ve also committed to setting aside a portion of Anthropic’s shares to Anthropic Public Benefit Fund, a new entity with a structure that increases the stake as the company grows. “Anthropic's Public Benefit Report sets out what we’re all working toward: helping the world build powerful AI safely, and making sure the technology drives advances that meaningfully improve people’s lives and society as a whole,” added Neil Buddy Shah, Chair of the Long-Term Benefit Trust. “Both goals depend on a deep understanding of frontier science and leading with integrity. Not only has Chris worked on some of the hardest problems in science, but he has consistently been a high-integrity leader of large, complex, collaborative scientific endeavors across academia, government, and the national laboratories. That will be of great value to the Trust as we support Anthropic in developing AI for the long-term benefit of humanity.” Stubbs, the Trust’s first physicist, joins Shah, national security expert Richard Fontaine, and former Federal Reserve Chair Ben Bernanke. Trustees are independent of the company’s management and investors.",
    "url": "https://www.anthropic.com/news/christopher-stubbs-joins-long-term-benefit-trust"
  },
  {
    "id": "anthropic:anthropic-cyber-mission",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Introducing the Anthropic Cyber Mission",
    "summary": "",
    "url": "https://www.anthropic.com/news/anthropic-cyber-mission"
  },
  {
    "id": "anthropic:an-update-on-independent-evaluators",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "An update on independent evaluators",
    "summary": "Anthropic announces updates to embedding independent evaluators",
    "url": "https://www.anthropic.com/news/an-update-on-independent-evaluators"
  },
  {
    "id": "anthropic:ai-for-science-expands-foundations-research-institutions",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "AI for Science expands to foundations and research institutions",
    "summary": "We’re highlighting 20 scientific foundations, institutions, and research groups from around the world that we’ve partnered with in an expansion of our AI for Science program.",
    "url": "https://www.anthropic.com/news/ai-for-science-expands-foundations-research-institutions"
  },
  {
    "id": "anthropic:2026-usage-policy-update",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "2026 Usage Policy update",
    "summary": "We’re publishing a new version of our Usage Policy. In this post, we summarize the changes we’ve made.",
    "url": "https://www.anthropic.com/news/2026-usage-policy-update"
  },
  {
    "id": "anthropic:2026-us-midterms",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Preparing for the 2026 US midterms",
    "summary": "Earlier this year, we shared an update on our election safeguards. Here, we outline how we’ve continued to strengthen these safeguards ahead of this year’s US midterms.",
    "url": "https://www.anthropic.com/news/2026-us-midterms"
  }
];
