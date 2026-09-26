"use strict";
const CATEGORIES = [
  { id: "all", label: "Everything" },
  { id: "express", label: "Express myself", icon: "✳" },
  { id: "find", label: "Find something", icon: "⌕" },
  { id: "filter", label: "Less noise", icon: "◌" },
  { id: "organize", label: "Get organized", icon: "▤" },
  { id: "notice", label: "Notice what matters", icon: "↗" },
  { id: "check", label: "Catch a mistake", icon: "✓" },
  { id: "understand", label: "See the patterns", icon: "▦" },
  { id: "react", label: "Make it respond", icon: "↔" },
];
// A curated editorial dataset. Built = source-listed implementation, not verified adoption.
const USE_CASES = [
  {
    id: "emoji",
    category: "express",
    title: "The right emoji, without the hunt.",
    description:
      "A thought becomes a few fitting reactions. Less scrolling through tiny faces.",
    status: "Built",
    name: "Realtime emoji demo",
    source:
      "https://www.linkedin.com/posts/shreeharib_i-built-a-realtime-emoji-suggestion-tool-activity-7508508025523945473-Vyke",
    before: "Scroll a picker or search for an exact emoji name.",
    after: "Rank a bounded set of emoji using the meaning of a message.",
    benefit:
      "A small expressive convenience that can live inside an existing input, without a chat window.",
    limit:
      "The author reports stronger handling of complex examples with Jev and faster local responses with Laya-MLX. No quantitative quality test was supplied. Google has offered AI emoji suggestions since 2018.",
    evidence:
      "Original builder post inspected. Qualitative demo comparison; not independently reproduced.",
  },
  {
    id: "canvas",
    category: "express",
    title: "Say it. Point. Put it there.",
    description:
      "A canvas that turns a spoken request into a bounded drawing action.",
    status: "Built",
    name: "jev-canvas",
    source: "https://github.com/gaborishka/jev-canvas",
    before: "Find a tool, choose a shape, set a color, place it.",
    after:
      "Classify the requested action, shape and target; let code update the canvas.",
    benefit:
      "Natural interaction for repetitive editing gestures. The action stays inside a defined set of controls.",
    limit:
      "Speech transcription, pointing and execution still need their own systems. Ambiguous references can select the wrong object.",
    evidence:
      "Community catalog describes an implementation. Its source code and latency claims have not been independently tested here.",
  },
  {
    id: "reply",
    category: "express",
    title: "Your words, ready when needed.",
    description:
      "Choose the saved reply that fits, without drafting a new message.",
    status: "Idea",
    name: "Saved-reply selector",
    source: null,
    before: "Search through canned responses or write the same answer again.",
    after: "Choose among approved, user-written replies, including “none fit.”",
    benefit:
      "Reuse your own wording without a generation step. Especially useful for repetitive, low-stakes questions.",
    limit:
      "A fitting topic does not guarantee a fitting tone or commitment. Preview before sending; selection is not permission to send.",
    evidence: "Editorial proposal. No measured implementation claimed.",
  },
  {
    id: "stickers",
    category: "express",
    title: "A reaction that gets the joke.",
    description:
      "Find the sticker or GIF that matches the feeling, not just a keyword.",
    status: "Idea",
    name: "Contextual reaction picker",
    source: null,
    before: "Guess the keyword a sticker collection uses.",
    after:
      "Retrieve a short list, then score the described reactions against the message.",
    benefit:
      "Makes a large personal collection feel easier to reach. Works best when candidate descriptions are useful.",
    limit:
      "Needs retrieval and descriptions; this proposal does not assume Jev understands raw GIFs. Humor and cultural context make relevance subjective.",
    evidence:
      "Editorial extension of bounded selection. No new model result claimed.",
  },
  {
    id: "site-search",
    category: "find",
    title: "Search that gets the question.",
    description:
      "Keep instant keyword hits. Then move the useful answer to the top.",
    status: "Measured",
    name: "jevsearch",
    source: "https://github.com/kylemclaren/jevsearch#benchmarks",
    before: "Order pages by matching words.",
    after: "Rerank 20 retrieved candidates against the visitor’s intent.",
    benefit:
      "Builder reports Hit@1 rising from 41% to 83% on 41 labeled queries. Median uncached latency: 278 ms, with roughly $0.26 per 1,000 searches.",
    limit:
      "One small test on TypeSafe documentation. A relevant page outside the candidate pool still cannot appear.",
    evidence:
      "Original repository benchmark inspected. Author-run, not independently reproduced.",
  },
  {
    id: "pdf",
    category: "find",
    title: "The useful line in a long PDF.",
    description: "Ask a question. Highlight the passages that might answer it.",
    status: "Built",
    name: "JevPDF",
    source: "https://github.com/kylemclaren/jevpdf",
    before: "Search literal words and inspect each match.",
    after: "Judge extracted lines for their relevance to a question.",
    benefit:
      "Turns semantic relevance into a visual reading aid, with the source text still in view.",
    limit:
      "Text extraction and passage context can fail. A highlighted line is a candidate answer, not a verified conclusion.",
    evidence:
      "Public implementation listed in the community catalog; quality not verified here.",
  },
  {
    id: "menu",
    category: "find",
    title: "“Where’s that setting again?”",
    description:
      "A command palette that connects what you mean to an existing menu item.",
    status: "Built",
    name: "DWIM",
    source: "https://github.com/rohit9mehta/dwim",
    before: "Remember the exact menu label and where it lives.",
    after: "Rank actual menu commands against a plain-language request.",
    benefit:
      "Brings contextual selection into software you already use, without inventing new commands.",
    limit:
      "Accessibility exposure and command descriptions constrain the options. Destructive actions need additional handling.",
    evidence:
      "Catalog-listed macOS implementation. No completion-rate benchmark verified here.",
  },
  {
    id: "code-search",
    category: "find",
    title: "Find the code by what it does.",
    description:
      "A narrow code search first. A contextual relevance pass second.",
    status: "Built",
    name: "Oko",
    source: "https://github.com/bartlomein/oko",
    before: "Try several search strings and read many nearby matches.",
    after:
      "Shortlist with lexical search, then judge function-level candidates.",
    benefit:
      "Can reduce irrelevant context handed to a coding agent or a human reader.",
    limit:
      "The first pass determines what can be found. Repository access, freshness and excerpt quality remain separate concerns.",
    evidence:
      "Public implementation described in the community catalog. No general code-search superiority established.",
  },
  {
    id: "clutter",
    category: "filter",
    title: "A quieter corner of the web.",
    description:
      "Hide distracting page elements. Keep the part you came to read.",
    status: "Built",
    name: "unclutter",
    source: "https://github.com/kitze/unclutter",
    before: "Dismiss overlays or maintain site-specific hiding rules.",
    after:
      "Classify bounded page descriptions and reuse reversible hiding rules.",
    benefit:
      "A judgment can become a reusable rule, avoiding a new model call on every visit.",
    limit:
      "Hiding an ad does not block its network or tracking requests. Hiding a consent dialog does not reject consent. Sensitive page snippets may still leave the device.",
    evidence:
      "Original repository documentation inspected. Behavior not live-tested here.",
  },
  {
    id: "spoilers",
    category: "filter",
    title: "Comments, minus the ending.",
    description: "Keep a comment covered until it passes your spoiler check.",
    status: "Built",
    name: "PlotVeil",
    source: "https://github.com/Dearest/plotveil",
    before: "Avoid the entire comment section—or risk learning the ending.",
    after: "Classify whether comments reveal a protected story event.",
    benefit: "A tiny contextual check at the exact moment it is useful.",
    limit:
      "False negatives spoil the story; false positives hide harmless discussion. Coverage depends on the supplied title and context.",
    evidence:
      "Catalog-listed extension. No independently checked spoiler-detection accuracy.",
  },
  {
    id: "sponsors",
    category: "filter",
    title: "Spot the sponsor segment.",
    description:
      "Score caption segments before you watch, then show them on the timeline.",
    status: "Built",
    name: "jev-skip",
    source: "https://github.com/valentynkit/jev-skip",
    before: "Skip manually or wait for crowdsourced markers.",
    after: "Judge caption segments for sponsorship and mark likely sections.",
    benefit:
      "Can cover videos that have not yet received community annotations.",
    limit:
      "Caption availability and incorrect skips matter. The repository contains a small evaluation; this atlas does not elevate its partial extraction into a verified result.",
    evidence:
      "Repository located and partially inspected. Treated as a build, not a validated performance claim.",
  },
  {
    id: "focus",
    category: "filter",
    title: "A feed with your own rules.",
    description: "“Show me useful ideas. Less promotion today.”",
    status: "Built",
    name: "sift",
    source: "https://github.com/bohutang/sift",
    before: "Accept the feed ordering or mute broad keywords.",
    after: "Label posts by a defined content type and apply your own filter.",
    benefit:
      "Puts a small piece of the attention policy back in the reader’s hands.",
    limit:
      "Subjective labels are not objective quality. A model cannot prove authorship or truth from writing style.",
    evidence:
      "Catalog-listed extension; no accuracy or user-benefit study verified.",
  },
  {
    id: "issues",
    category: "organize",
    title: "An issue queue with a first pass.",
    description:
      "Group, prioritize and flag duplicates before a maintainer opens the queue.",
    status: "Built",
    name: "typeful-triage",
    source: "https://github.com/cephalization/jev-triage",
    before: "Read each issue to work out its type and urgency.",
    after:
      "Answer separate classification questions and preserve human corrections.",
    benefit:
      "Takes repetitive first-pass sorting out of the way while leaving review visible.",
    limit:
      "A wrongly downgraded urgent issue is more costly than an extra review. Measure those errors separately.",
    evidence: "Catalog-listed dashboard; operational savings not established.",
  },
  {
    id: "memory",
    category: "organize",
    title: "Memories that land in the right place.",
    description:
      "Sort agent memories into the categories a user actually wants.",
    status: "Built",
    name: "Space memory organization",
    source:
      "https://www.linkedin.com/posts/hugo-sequier_we-benchmarked-typesafe-ais-jev-against-share-7506569072633905152-WIK5",
    before: "Manual classification or a generative model for every assignment.",
    after:
      "Choose a project, section or category, with user correction and pinning.",
    benefit: "Flexible organization around a user’s own taxonomy.",
    limit:
      "Builder describes a staging integration. The published relevance benchmark is a separate task, not a measure of categorization quality.",
    evidence:
      "Original builder post inspected; staging status, not verified broad deployment.",
  },
  {
    id: "records",
    category: "organize",
    title: "Two records. The same thing?",
    description:
      "Help resolve ambiguous duplicates after exact matching has done its work.",
    status: "Built",
    name: "jlink",
    source: "https://github.com/keltokhy/jlink",
    before: "Maintain fuzzy match rules and review candidate pairs manually.",
    after: "Judge plausible pairs under a written match criterion.",
    benefit:
      "Adds semantic judgment where names differ but records may refer to the same entity.",
    limit:
      "A false merge can contaminate many records. Candidate blocking, exact IDs and reversible review still matter.",
    evidence:
      "Catalog-listed implementation, not a verified entity-resolution benchmark.",
  },
  {
    id: "downloads",
    category: "organize",
    title: "A downloads folder that makes sense.",
    description:
      "Suggest a home for a file from its name and a little context.",
    status: "Idea",
    name: "Personal file sorter",
    source: null,
    before: "Leave everything in Downloads or drag files into folders.",
    after: "Choose among existing folders, with “leave here” as an option.",
    benefit: "A low-stakes suggestion that can save a few repetitive gestures.",
    limit:
      "Filenames can be misleading. Preview moves, preserve undo, and do not assume full file understanding.",
    evidence:
      "Editorial proposal. No working implementation or time saving measured.",
  },
  {
    id: "papers",
    category: "notice",
    title: "A reading list that knows your interests.",
    description:
      "Rank new papers against a question you’re actually investigating.",
    status: "Built",
    name: "Paper Radar",
    source: "https://github.com/Eliot5566/JEV-Paper-Radar",
    before: "Scan a broad publication feed or rely on exact keywords.",
    after: "Score new paper metadata against explicit research interests.",
    benefit:
      "Helps prioritize reading without requiring a generated summary for every item.",
    limit:
      "Relevance is not research quality. Abstracts can omit useful findings, and filtering can hide surprising work.",
    evidence:
      "Catalog-listed daily feed. No retrieval-quality benchmark verified here.",
  },
  {
    id: "tweets",
    category: "notice",
    title: "Three useful posts in a noisy feed.",
    description: "Surface a small shortlist that fits a reader’s current goal.",
    status: "Built",
    name: "Tweet Radar",
    source: "https://github.com/kelaocai/tweet-radar",
    before: "Scroll an undifferentiated timeline.",
    after: "Score loaded posts against interests, then rank eligible matches.",
    benefit:
      "A personal layer of relevance over the content already available.",
    limit:
      "Only sees the supplied posts. A relevance score is not a factual assessment or a guarantee of value.",
    evidence:
      "Public catalog entry; no independent user-time or ranking evaluation.",
  },
  {
    id: "notifications",
    category: "notice",
    title: "Interrupt me only when it matters.",
    description: "Separate “needs me now” from “nice to know later.”",
    status: "Idea",
    name: "Contextual notification queue",
    source: null,
    before:
      "Mute everything or accept a stream of inbox and app notifications.",
    after: "Classify urgency under user-defined criteria and defer the rest.",
    benefit:
      "A candidate for reducing small attention switches throughout the day.",
    limit:
      "Missing one critical alert may outweigh many correctly deferred ones. Emergency rules should not depend on a model.",
    evidence:
      "Editorial proposal; attention savings and miss rates unmeasured.",
  },
  {
    id: "meeting",
    category: "notice",
    title: "That sounded like a follow-up.",
    description: "Flag possible commitments while a transcript is still fresh.",
    status: "Idea",
    name: "Follow-up candidate detector",
    source: null,
    before: "Reread the entire transcript for decisions and commitments.",
    after: "Score transcript spans as possible actions for later review.",
    benefit:
      "Directs attention to useful moments without needing to generate a whole meeting summary.",
    limit:
      "A statement can be hypothetical, negated or assigned to someone else. A flag is not an accepted task.",
    evidence:
      "Editorial proposal. Requires transcription and human confirmation.",
  },
  {
    id: "citations",
    category: "check",
    title: "Does the citation actually support it?",
    description:
      "Distinguish real support from a source that merely shares the topic.",
    status: "Built",
    name: "citation-verifier",
    source: "https://github.com/MarissaFamularo/citation-verifier",
    before: "Open every citation or trust a plausible-looking reference.",
    after: "Judge a claim against a located source passage, with human review.",
    benefit: "Makes a narrow evidence check easier to apply repeatedly.",
    limit:
      "Source retrieval, passage selection and factual reliability remain separate. The checker can still misread the evidence.",
    evidence:
      "Catalog describes a hybrid implementation using generation and Jev. Quality not independently verified.",
  },
  {
    id: "tool-risk",
    category: "check",
    title: "One more check before a tool runs.",
    description: "Add a contextual signal to a permission policy.",
    status: "Built",
    name: "LangChain Auto Mode",
    source: "https://www.langchain.com/blog/building-a-harness-with-jev",
    before: "Use a generative judge for each action, or only rigid rules.",
    after:
      "Classify a proposed tool call before the harness decides whether to execute.",
    benefit:
      "A documented integration point for bounded judgments in agent loops.",
    limit:
      "A model verdict is not a security boundary. Exact access controls and explicit permissions remain necessary.",
    evidence:
      "Original LangChain integration article inspected; no security guarantee or independent adversarial benchmark.",
  },
  {
    id: "review",
    category: "check",
    title: "Read the riskiest change first.",
    description:
      "Give a reviewer a useful order, not another wall of generated prose.",
    status: "Built",
    name: "Jev-Code-Reviewer",
    source: "https://github.com/egma-ai/jev-code-reviewer",
    before: "Read diffs in file order and discover important hunks late.",
    after: "Score changed units and let a local policy rank review priority.",
    benefit:
      "Can direct scarce human attention toward the parts worth inspecting closely.",
    limit:
      "A low score does not prove correctness. Tests, static analysis and careful review still do the verification.",
    evidence:
      "Catalog-listed project. No defect-detection improvement verified.",
  },
  {
    id: "attachment",
    category: "check",
    title: "“Did you mean to attach that?”",
    description:
      "A quiet prompt when the selected file doesn’t seem to fit the message.",
    status: "Idea",
    name: "Attachment mismatch prompt",
    source: null,
    before: "Notice a wrong or missing attachment after sending.",
    after:
      "Compare message intent with selected filenames and permitted metadata.",
    benefit: "A reversible nudge at a familiar point of friction.",
    limit:
      "Cannot establish file contents from metadata. False alarms should be easy to dismiss; sending stays a user action.",
    evidence: "Editorial proposal, not a validated leak-prevention feature.",
  },
  {
    id: "rows",
    category: "understand",
    title: "Ask a question of every row.",
    description: "Turn a pile of text into categories you can count.",
    status: "Measured",
    name: "MotherDuck + Jev",
    source: "https://motherduck.com/blog/motherduck-supports-jev/",
    before: "Build a custom classifier or call a text model across a dataset.",
    after: "Apply a typed topic decision in a database query.",
    benefit:
      "Vendor reports 100,000 news articles classified in 40 seconds for $0.50, with 89% accuracy.",
    limit:
      "Four-class AG News data sampled from the training split. Null outputs are excluded from reported accuracy and counted separately. Not a universal result.",
    evidence:
      "Original integration benchmark inspected. Vendor-run, not independently reproduced.",
  },
  {
    id: "labels",
    category: "understand",
    title: "A first pass over a training set.",
    description: "Label clear examples and route ambiguous ones to a person.",
    status: "Built",
    name: "jev-align",
    source: "https://github.com/sutro-sh/jev-align",
    before: "Manually label everything or maintain a bespoke classifier.",
    after:
      "Apply typed criteria to rows and preserve human audit and correction.",
    benefit: "Could lower the cost of producing a useful first labeling pass.",
    limit:
      "Teacher mistakes can become training data. Agreement, out-of-scope behavior and independent holdouts matter.",
    evidence:
      "Catalog-listed data workflow. No general labeling accuracy or labor-saving claim verified.",
  },
  {
    id: "feedback",
    category: "understand",
    title: "What are customers really asking for?",
    description:
      "Group feedback by the underlying problem, not just repeated words.",
    status: "Idea",
    name: "Feedback theme explorer",
    source: null,
    before: "Read tickets manually and maintain brittle topic keywords.",
    after: "Score each message against an editable set of problem themes.",
    benefit:
      "Lets a team ask a new question of an existing archive without training a new model first.",
    limit:
      "Predefined themes can miss emerging problems. Keep an unknown bucket and inspect samples, including rejected ones.",
    evidence:
      "Editorial proposal based on text-classification patterns; no customer deployment claimed.",
  },
  {
    id: "paper-map",
    category: "understand",
    title: "A map of a thousand papers.",
    description: "Give a large reading collection a browsable set of topics.",
    status: "Built",
    name: "1kpapers",
    source: "https://x.com/nutlope/status/2100426999546184123",
    before: "Hand-tag papers or rely on a broad subject category.",
    after: "Summarize with a generative model, then select topics with Jev.",
    benefit:
      "Shows how small decisions can create a new way to explore a collection.",
    limit:
      "Catalog quotes the author’s $0.08 classification cost versus $3.99 for summaries. Those are reported pipeline costs, not independently checked quality or total product cost.",
    evidence:
      "Builder post surfaced through a curated directory. Original benchmark not reproduced.",
  },
  {
    id: "browser",
    category: "react",
    title: "A browser that chooses its next move.",
    description:
      "Select from the actions on the page; ask another model when text is needed.",
    status: "Built",
    name: "Browser Use Jev",
    source: "https://github.com/browser-use/jev-ultrafast",
    before: "Use a generative agent for every step of a browser task.",
    after:
      "Choose bounded actions, keeping a separate path for generated text.",
    benefit:
      "Illustrates how a fast decision layer can sit inside a larger agent.",
    limit:
      "Candidate construction, page state, recovery and permissions dominate reliability. A fast click is not a completed task.",
    evidence:
      "Public implementation listed in the catalog. No general speed or reliability advantage asserted.",
  },
  {
    id: "chess",
    category: "react",
    title: "Every legal move, considered.",
    description:
      "Make a game’s available actions the model’s entire answer space.",
    status: "Built",
    name: "Jev Chess",
    source: "https://jevchess.com",
    before: "Parse a generated move and reject illegal outputs.",
    after: "Choose among legal moves supplied by the game engine.",
    benefit:
      "The interface can guarantee an allowed move while making the model’s preferences visible.",
    limit:
      "A legal move can be a terrible move. This is not evidence of strong chess play or a replacement for a chess engine.",
    evidence: "Catalog-listed game; playing strength not independently tested.",
  },
  {
    id: "adaptive",
    category: "react",
    title: "The right control, at the right moment.",
    description: "Choose components from an existing interface vocabulary.",
    status: "Built",
    name: "json-render",
    source: "https://github.com/vercel-labs/json-render",
    before: "Hard-code every branch or generate an unconstrained interface.",
    after:
      "Select from declared components and actions, then render with code.",
    benefit:
      "Contextual selection can be useful without inventing markup or interaction rules.",
    limit:
      "The catalog describes Jev in a compose path. Usability, accessibility and task completion still need product testing.",
    evidence: "Catalog-listed integration; no end-user benefit measured here.",
  },
  {
    id: "tutorial",
    category: "react",
    title: "A tutorial that knows when you’re stuck.",
    description: "Choose a useful hint from a small, authored set.",
    status: "Idea",
    name: "Adaptive hint selector",
    source: null,
    before: "Show the same tutorial at the same time to everyone.",
    after:
      "Judge the current state and select a relevant hint—or remain quiet.",
    benefit:
      "A possible way to improve help without interrupting the flow with a chatbot.",
    limit:
      "Inferred confusion can be wrong. Use observable signals, keep hints dismissible, and measure whether users actually progress.",
    evidence: "Editorial proposal. No retention or completion lift claimed.",
  },
];
const SOURCES = [
  [
    "TypeSafe",
    "Model introduction, primitives and launch limitations",
    "https://typesafe.ai/blog/introducing-system-one-models-and-jev",
  ],
  [
    "awesome-jev",
    "Community catalog; 474 URLs inventoried",
    "https://github.com/yibie/awesome-jev",
  ],
  [
    "AY Automate",
    "Discovery directory, with self-reported results",
    "https://www.ayautomate.com/jev-builds",
  ],
  [
    "LangChain",
    "Typed decisions in an agent harness",
    "https://www.langchain.com/blog/building-a-harness-with-jev",
  ],
  [
    "jevsearch",
    "41-query site-search comparison",
    "https://github.com/kylemclaren/jevsearch#benchmarks",
  ],
  [
    "MemSearch",
    "Jev and Voyage on fixed retrieval candidates",
    "https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md",
  ],
  [
    "MotherDuck",
    "100,000-row news classification benchmark",
    "https://motherduck.com/blog/motherduck-supports-jev/",
  ],
  [
    "Space",
    "81-question relevance assessment and fallback costs",
    "https://www.linkedin.com/posts/hugo-sequier_we-benchmarked-typesafe-ais-jev-against-share-7506569072633905152-WIK5",
  ],
  [
    "Shreehari Baskar",
    "Emoji suggestion demo versus local Laya-MLX",
    "https://www.linkedin.com/posts/shreeharib_i-built-a-realtime-emoji-suggestion-tool-activity-7508508025523945473-Vyke",
  ],
  [
    "Kieran Klaassen",
    "Named semantic vectors; early Cora exploration",
    "https://x.com/kieranklaassen/status/2103522599414501550",
  ],
];
