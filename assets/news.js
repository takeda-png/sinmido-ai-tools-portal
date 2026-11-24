/* ==========================================================================
   Sinmido AI Tools Portal — Claude 最新情報
   --------------------------------------------------------------------------
   ⚠️ このファイルは自動生成です。手で編集しないでください。
      GitHub Actions（.github/workflows/update-news.yml）が毎日つくり直します。
      手元で作り直すときは  python tools/fetch_news.py

   最終取得: 2026-11-24
   ========================================================================== */

var NEWS_META = {
  "updated": "2026-11-24T14:40:50+09:00",
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
    "id": "claudecode:2026-11-23",
    "src": "claudecode",
    "date": "2026-11-23",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（11/23）",
    "summary": "1 回リリース（v2.1.331〜v2.1.331）。新機能 8件・修正 32件・改善 95件。",
    "bullets": [
      "Added Code Mode support in terminal sessions on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry and Claude Platform on AWS",
      "Added oidc.groups_jsonpath to the Claude apps gateway, to read groups from the matching entries of a list of objects with a small subset of JSONPath (RFC 9535)",
      "Added an API connectivity section to claude doctor that reports whether the API can be reached, with the HTTP status or the error, or says why it wasn't tested"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
  },
  {
    "id": "claudecode:2026-11-16",
    "src": "claudecode",
    "date": "2026-11-20",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（11/16〜11/20）",
    "summary": "5 回リリース（v2.1.326〜v2.1.330）。新機能 38件・修正 531件・改善 387件。",
    "bullets": [
      "Added sign-in to organizations managed in Anthropic's Enterprise Admin Console: after claude auth login, Claude Code applies the organization's settings and uses its cloud provider or gateway",
      "Added easel, a built-in mod that draws charts when asked and under MCP metrics results, on Pro, Max and, where available, Team and Enterprise on macOS and Linux; turn automatic charts off in /config",
      "Added CLAUDE_CODE_FULL_SIGN_IN_LINK=1 to print the full sign-in link, if the short one shows an error or a script reads values from it"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
  },
  {
    "id": "claudecode:2026-11-09",
    "src": "claudecode",
    "date": "2026-11-13",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（11/9〜11/13）",
    "summary": "4 回リリース（v2.1.321〜v2.1.325）。新機能 22件・修正 304件・改善 226件。",
    "bullets": [
      "Added a spinner tip in VS Code and similar integrated terminals about re-running a notebook cell, shown once Claude has read or edited a Jupyter notebook",
      "Added a line under the error shown when your organization's policy blocks a request, saying how to continue: run /rewind and change the message, or run /clear",
      "Added a note for Claude when a sandboxed git checkout, git stash or autostash pull cannot update protected files such as those in .claude"
    ],
    "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    "srcJa": true
  },
  {
    "id": "claudecode:2026-11-02",
    "src": "claudecode",
    "date": "2026-11-06",
    "cat": "Release notes",
    "catJa": "更新",
    "title": "Claude Code の更新（11/2〜11/6）",
    "summary": "3 回リリース（v2.1.317〜v2.1.319）。新機能 29件・修正 164件・改善 124件。",
    "bullets": [
      "Added support for MCP tasks in the terminal: when an MCP server runs a tool call as a task, Claude Code moves it to the background right away and tells Claude the result when it finishes",
      "Added the CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND environment variable to make Claude Code wait for an MCP task inside its tool call instead of moving it to the background right away",
      "Added permissions.denyInsteadOfPrompting setting: a tool call that would wait on a permission prompt is denied and the turn continues, in terminal sessions, subagents and teammates"
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
    "id": "anthropic:roadshow-launch",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Anthropic launches roadshow for proposed initial public offering",
    "summary": "Today Anthropic, PBC launched the roadshow for its proposed initial public offering of its Class A common stock.",
    "url": "https://www.anthropic.com/news/roadshow-launch"
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
    "id": "anthropic:ipo-close",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Anthropic announces closing of initial public offering, including full exercise of underwriters’ option to purchase additional shares, and closing of concurrent private placement",
    "summary": "Today Anthropic, PBC announced the closing of its initial public offering of an aggregate of 1,127,000,000 shares of its Class A common stock at a public offering price of $83.00 per share, including the full exercise by the underwriters of their option to purchase an additional 147,000,000 shares of Class A common stock from Anthropic at the initial public offering price.",
    "url": "https://www.anthropic.com/news/ipo-close"
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
    "id": "anthropic:anthropic-prices-initial-public-offering",
    "src": "anthropic",
    "date": "",
    "cat": "",
    "catJa": "ニュース",
    "title": "Anthropic prices initial public offering",
    "summary": "Today Anthropic, PBC priced its initial public offering of its Class A common stock.",
    "url": "https://www.anthropic.com/news/anthropic-prices-initial-public-offering"
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
