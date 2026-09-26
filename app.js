"use strict";
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
// Authored visual explanations, not model outputs or reproductions of source products.
const SCENES = {
  emoji: [
    "emoji",
    "That meeting could’ve been an email.",
    ["🫠", "📧", "😮‍💨"],
    "Express the feeling without hunting.",
    "Humor is subjective.",
  ],
  canvas: [
    "canvas",
    "Put a blue circle beside the square.",
    ["Square", "Circle", "Triangle"],
    "Turn a request into a drawing action.",
    "Ambiguous pointing can select the wrong object.",
  ],
  reply: [
    "choose",
    "Can we move our call to tomorrow?",
    [
      "Tomorrow works for me.",
      "Here is the invoice.",
      "Thanks for the update.",
    ],
    "Reuse your own approved wording.",
    "Preview before sending.",
  ],
  stickers: [
    "emoji",
    "Me pretending everything is fine.",
    ["😅", "🫠", "🙃"],
    "Find a reaction by its meaning.",
    "Needs descriptions of the GIFs, not just raw images.",
  ],
  "site-search": [
    "rank",
    "How do I stop paying?",
    ["Cancel a subscription", "Pricing overview", "Payment methods"],
    "Move the useful result to the top.",
    "Cannot find a page missing from the shortlist.",
  ],
  pdf: [
    "document",
    "When can I cancel?",
    [
      "The agreement begins on signing.",
      "Either party may terminate with 30 days’ notice.",
      "Fees are due on the first of each month.",
    ],
    "Point to a passage worth reading.",
    "A highlight is not a verified answer.",
  ],
  menu: [
    "choose",
    "Make everything on screen bigger.",
    ["Zoom in", "New window", "Show sidebar"],
    "Connect plain language to a real command.",
    "Only commands the app exposes can be selected.",
  ],
  "code-search": [
    "rank",
    "Where do we retry failed payments?",
    ["retryPayment()", "renderInvoice()", "formatCurrency()"],
    "Read the relevant function first.",
    "The initial search still sets the candidate pool.",
  ],
  clutter: [
    "page",
    "Keep the article. Hide the distractions.",
    ["Newsletter popup", "The article you came for", "Recommended shopping"],
    "Turn a judgment into a reusable hiding rule.",
    "Hiding a banner does not block tracking.",
  ],
  spoilers: [
    "veil",
    "I’m only on episode two.",
    [
      "Loved the soundtrack.",
      "The ending reveals who betrayed them.",
      "Great opening scene.",
    ],
    "Keep a possible spoiler covered.",
    "One missed spoiler can defeat the point.",
  ],
  sponsors: [
    "timeline",
    "Find the sponsored part of this transcript.",
    ["Introduction", "Paid partnership", "Main story"],
    "Mark a likely skip on the timeline.",
    "Wrong boundaries can skip useful content.",
  ],
  focus: [
    "page",
    "More ideas. Less promotion.",
    ["Buy my new course", "A useful technique I tried", "Limited-time offer"],
    "Apply your own feed preferences.",
    "A label does not establish quality or truth.",
  ],
  issues: [
    "route",
    "Checkout crashes after the latest update.",
    ["Bug · urgent", "Feature request", "Question"],
    "Give an issue a first-pass label.",
    "Urgent misses matter more than extra reviews.",
  ],
  memory: [
    "route",
    "For Project Atlas, use weekly summaries.",
    ["Project Atlas", "Personal preferences", "Unsorted"],
    "Keep a memory with the right project.",
    "Classification quality is not established by the separate relevance benchmark.",
  ],
  records: [
    "pair",
    "Do these records refer to the same company?",
    ["Acme Incorporated", "ACME Inc."],
    "Suggest a match after exact checks.",
    "False merges need reversible human review.",
  ],
  downloads: [
    "route",
    "invoice-acme-september.pdf",
    ["Invoices", "Photos", "Leave in Downloads"],
    "Suggest a folder you already use.",
    "A filename may misrepresent the contents.",
  ],
  papers: [
    "rank",
    "My interest: low-cost retrieval models.",
    [
      "Distilling a document retriever",
      "Robotic grasp planning",
      "A new image decoder",
    ],
    "Put promising papers first.",
    "Relevance is not research quality.",
  ],
  tweets: [
    "rank",
    "Show practical database performance tips.",
    ["How we fixed a slow query", "Our launch is live!", "My weekend photos"],
    "Surface a small, relevant shortlist.",
    "Only supplied posts can be ranked.",
  ],
  notifications: [
    "route",
    "Production checkout is failing.",
    ["Notify now", "Daily digest", "Mute"],
    "Separate an interruption from a later read.",
    "Emergency rules should not depend on a model.",
  ],
  meeting: [
    "document",
    "Find possible follow-ups.",
    [
      "The launch went well.",
      "I’ll send you the revised numbers on Friday.",
      "We might revisit the roadmap later.",
    ],
    "Flag a commitment for review.",
    "A flag is not an accepted task.",
  ],
  citations: [
    "pair",
    "Does the source support the claim?",
    ["Claim: Every user improved.", "Source: 8 of 12 users improved."],
    "Spot a claim stronger than its evidence.",
    "The checker can still misread a source.",
  ],
  "tool-risk": [
    "route",
    "Proposed action: delete the customer table.",
    ["Ask for approval", "Allow", "Deny"],
    "Add a contextual signal before execution.",
    "The model is not the security boundary.",
  ],
  review: [
    "rank",
    "Which change should I review first?",
    [
      "Authorization check changed",
      "Button spacing adjusted",
      "Comment typo fixed",
    ],
    "Prioritize limited review time.",
    "A low score never proves a change is safe.",
  ],
  attachment: [
    "pair",
    "Does this attachment fit the message?",
    ["Message: Here is the lunch menu.", "Attachment: payroll-september.csv"],
    "Catch a possible mismatch before sending.",
    "Metadata cannot establish file contents.",
  ],
  rows: [
    "buckets",
    "Give each article a topic.",
    ["Business", "Technology", "Sports"],
    "Turn text into categories you can count.",
    "The published result is specific to its dataset.",
  ],
  labels: [
    "buckets",
    "Label clear examples; send the rest to review.",
    ["Positive", "Negative", "Human review"],
    "Make a first pass over a dataset.",
    "Teacher errors can become training data.",
  ],
  feedback: [
    "buckets",
    "What problems keep coming up?",
    ["Setup friction", "Missing integration", "Unknown"],
    "Explore feedback by problem theme.",
    "Fixed themes can miss new problems.",
  ],
  "paper-map": [
    "buckets",
    "Organize this reading collection.",
    ["Retrieval", "Learning", "Robotics"],
    "Give a collection a browsable topic map.",
    "Summaries need a separate generative model.",
  ],
  browser: [
    "choose",
    "Find the order receipt.",
    ["Orders", "Account settings", "Sign out"],
    "Choose among available page actions.",
    "Choosing a click does not complete a task.",
  ],
  chess: [
    "chess",
    "Choose from the legal moves.",
    ["e2 → e4", "g1 → f3", "d2 → d4"],
    "Let code constrain the answer space.",
    "A legal move can still be a bad move.",
  ],
  adaptive: [
    "choose",
    "I need to pick a date.",
    ["Calendar", "File upload", "Color picker"],
    "Select an existing interface component.",
    "The resulting interface still needs usability testing.",
  ],
  tutorial: [
    "choose",
    "Three failed attempts to connect a data source.",
    ["Check your connection settings", "Explore advanced charts", "No hint"],
    "Offer a relevant authored hint.",
    "Inferred confusion can be wrong.",
  ],
};
function sceneMarkup(id, before = false, mini = false) {
  const [type, input, items] = SCENES[id];
  const label = mini
    ? ""
    : `<div class="scene-input"><span class="mono">CONTEXT</span><p>${esc(input)}</p></div>`;
  let art = "";
  if (type === "emoji")
    art = `<div class="scene-emoji">${(before ? ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🙂", "🙃", "😉", "😊", "😎"] : items).map((x, i) => `<span class="${!before && i === 0 ? "picked" : ""}">${x}</span>`).join("")}</div>`;
  else if (type === "canvas")
    art = `<div class="scene-canvas"><i class="draw-square"></i>${before ? "" : '<i class="draw-circle"></i>'}<span class="canvas-cursor">↖</span></div>`;
  else if (type === "chess")
    art = `<div class="scene-board">${Array.from({ length: 32 }, (_, i) => `<i class="${(Math.floor(i / 8) + (i % 8)) % 2 ? "dark" : ""} ${!before && i === 12 ? "move-target" : ""}">${i === (before ? 28 : 12) ? "♙" : i === 30 ? "♘" : ""}</i>`).join("")}</div>`;
  else if (type === "timeline")
    art = `<div class="scene-timeline"><div class="waveform">${Array.from({ length: 36 }, (_, i) => `<i style="height:${15 + ((i * 17) % 45)}px" class="${!before && i > 8 && i < 16 ? "segment" : ""}"></i>`).join("")}</div><div class="timeline-labels"><span>0:00</span><strong>${before ? "Unmarked transcript" : "Likely sponsor segment"}</strong><span>8:00</span></div></div>`;
  else if (type === "buckets")
    art = `<div class="scene-buckets ${before ? "unsorted" : ""}">${items.map((v, i) => `<div><span>${before ? "?" : esc(v)}</span><div>${Array.from({ length: [5, 3, 4][i] }, () => "<i></i>").join("")}</div></div>`).join("")}</div>`;
  else if (type === "pair")
    art = `<div class="scene-pair"><div>${esc(items[0])}</div><span>${before ? "?" : id === "records" ? "≈" : "≠"}</span><div>${esc(items[1])}</div></div>${mini ? "" : `<div class="scene-verdict">${before ? "Compare the records" : id === "records" ? "Suggested match · review before merging" : "Potential mismatch · review required"}</div>`}`;
  else if (type === "document")
    art = `<div class="scene-document"><div class="paper-lines" aria-hidden="true"></div>${items.map((v, i) => `<p class="${!before && i === 1 ? "highlight" : ""}">${esc(v)}</p>`).join("")}<div class="paper-lines" aria-hidden="true"></div></div>`;
  else if (type === "page" || type === "veil")
    art = `<div class="scene-page">${items.map((v, i) => `<div class="${!before && (type === "page" ? i !== 1 : i === 1) ? "screened" : ""}">${!before && (type === "page" ? i !== 1 : i === 1) ? `<span>${type === "veil" ? "◌ Possible spoiler · covered" : "− Hidden by your filter"}</span>` : esc(v)}</div>`).join("")}</div>`;
  else {
    const ordered =
      type === "rank" && before ? [items[1], items[2], items[0]] : items;
    art = `<div class="scene-options ${type}">${ordered.map((v, i) => `<div class="${!before && i === 0 ? "chosen" : ""}"><span class="option-marker">${type === "rank" ? i + 1 : !before && i === 0 ? "✓" : "○"}</span><span>${esc(v)}</span>${!before && i === 0 ? "<b>←</b>" : ""}</div>`).join("")}</div>`;
  }
  return `<div class="use-scene ${mini ? "scene-mini" : ""}" ${mini ? 'aria-hidden="true"' : ""}>${label}<div class="scene-art">${art}</div></div>`;
}

let category = "all",
  expanded = false;
const statusText = {
  Measured: "Reported result",
  Built: "Public build",
  Idea: "Idea to explore",
};
const categoryName = (id) => CATEGORIES.find((c) => c.id === id).label;
$(".category-list").innerHTML = CATEGORIES.map(
  (c) =>
    `<button data-category="${c.id}" class="${c.id === "all" ? "active" : ""}" aria-pressed="${c.id === "all"}">${c.label} <span>${c.id === "all" ? USE_CASES.length : USE_CASES.filter((u) => u.category === c.id).length}</span></button>`,
).join("");
$("#total-count").textContent = USE_CASES.length;
function renderAtlas() {
  const q = $("#atlas-search").value.toLowerCase().trim(),
    evidence = $("#evidence-filter").value;
  const matches = USE_CASES.filter(
    (u) =>
      (category === "all" || u.category === category) &&
      (evidence === "all" || u.status === evidence) &&
      (!q ||
        [
          u.title,
          u.description,
          u.name,
          u.before,
          u.after,
          categoryName(u.category),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q)),
  );
  const compact = category === "all" && evidence === "all" && !q && !expanded;
  const visible = compact
    ? CATEGORIES.filter((c) => c.id !== "all").map((c) =>
        matches.find((u) => u.category === c.id),
      )
    : matches;
  $("#expand-atlas").hidden = !(category === "all" && evidence === "all" && !q);
  $("#expand-atlas").innerHTML = expanded
    ? "Show the highlights <span>↑</span>"
    : "Explore all 32 possibilities <span>↓</span>";
  $("#result-count").textContent = compact
    ? "08 HIGHLIGHTS / 32 POSSIBILITIES"
    : `${String(matches.length).padStart(2, "0")} POSSIBILITIES ${category === "all" ? "TO EXPLORE" : "/ " + categoryName(category).toUpperCase()}`;
  $("#atlas-grid").innerHTML = visible
    .map(
      (u) =>
        `<button class="use-card" data-id="${u.id}" data-category="${u.category}" aria-label="Explore: ${esc(u.title)}"><div class="card-top"><span class="card-icon" aria-hidden="true">${CATEGORIES.find((c) => c.id === u.category).icon}</span><span class="card-evidence ${u.status.toLowerCase()}">${u.status === "Measured" ? "Reported" : u.status === "Built" ? "Build" : "Idea"}</span></div><h3>${u.title}</h3>${sceneMarkup(u.id, false, true)}<div class="card-bottom"><span>${esc(u.name)}</span><span aria-hidden="true">↗</span></div></button>`,
    )
    .join("");
  $("#empty-state").hidden = matches.length > 0;
}
$(".category-list").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  category = b.dataset.category;
  $$(".category-list button").forEach((x) => {
    x.classList.toggle("active", x === b);
    x.setAttribute("aria-pressed", String(x === b));
  });
  renderAtlas();
});
$("#expand-atlas").addEventListener("click", () => {
  expanded = !expanded;
  renderAtlas();
  if (!expanded) $("#atlas").scrollIntoView({ behavior: "smooth" });
});
$("#atlas-search").addEventListener("input", renderAtlas);
$("#evidence-filter").addEventListener("change", renderAtlas);
$("#clear-filters").addEventListener("click", () => {
  $("#atlas-search").value = "";
  $("#evidence-filter").value = "all";
  $(".category-list button").click();
  $("#atlas-search").focus();
});
$("#atlas-grid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-id]");
  if (!b) return;
  const u = USE_CASES.find((x) => x.id === b.dataset.id);
  const scene = SCENES[u.id];
  $("#detail-content").innerHTML =
    `<div class="detail-head"><span class="card-evidence ${u.status.toLowerCase()}">${statusText[u.status]} / ${categoryName(u.category)}</span><h2 id="detail-title">${u.title}</h2></div><div class="detail-body"><div class="scene-heading"><span class="mono">ILLUSTRATIVE EXAMPLE · NOT A LIVE MODEL</span><button id="scene-toggle" data-scene="${u.id}" aria-pressed="false">Show before</button></div><div id="scene-stage">${sceneMarkup(u.id)}</div><div class="scene-takeaways"><p><b>Useful for</b>${esc(scene[3])}</p><p><b>The catch</b>${esc(scene[4])}</p></div><details class="scene-evidence"><summary>Evidence &amp; details</summary><p>${esc(u.evidence)}</p><p><b>How it works.</b> ${esc(u.after)}</p><p>${esc(u.benefit)}</p><p><b>Limits.</b> ${esc(u.limit)}</p></details><div class="detail-source">${u.source ? `<a href="${esc(u.source)}" target="_blank" rel="noopener">Explore ${esc(u.name)} ↗</a>` : "<span>AN IDEA WORTH TESTING</span>"}</div></div>`;
  openDialog($("#detail-dialog"), b);
});
$("#detail-content").addEventListener("click", (e) => {
  const b = e.target.closest("#scene-toggle");
  if (!b) return;
  const before = b.getAttribute("aria-pressed") !== "true";
  b.setAttribute("aria-pressed", String(before));
  b.textContent = before ? "Show the decision" : "Show before";
  $("#scene-stage").innerHTML = sceneMarkup(b.dataset.scene, before);
});

function openDialog(d, opener = document.activeElement) {
  d.returnFocus = opener;
  d.showModal();
  document.body.style.overflow = "hidden";
  d.scrollTop = 0;
  $(".dialog-close", d).focus();
}
$$("dialog").forEach((d) => {
  d.addEventListener("close", () => {
    document.body.style.overflow = "";
    if (d.returnFocus?.isConnected)
      d.returnFocus.focus({ preventScroll: true });
  });
  $(".dialog-close", d).addEventListener("click", () => d.close());
  d.addEventListener("click", (e) => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        d.close();
    }
  });
});
$$(".sources-open").forEach((b) =>
  b.addEventListener("click", () => openDialog($("#sources-dialog"), b)),
);
$("#source-links").innerHTML = SOURCES.map(
  ([name, desc, url]) =>
    `<a class="source-item" href="${esc(url)}" target="_blank" rel="noopener"><div>${name}<br><span>${desc}</span></div><b aria-hidden="true">↗</b></a>`,
).join("");
document.addEventListener("keydown", (e) => {
  if (
    e.key === "/" &&
    !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName) &&
    !$("dialog[open]")
  ) {
    e.preventDefault();
    $("#atlas-search").focus();
  }
});
const examples = [
  ["That meeting could’ve<br>been an email.", ["🫠", "📧", "😮‍💨"]],
  ["Made it through<br>my first marathon.", ["🏅", "🥵", "🎉"]],
  ["Rain outside.<br>Absolutely no plans.", ["☕", "🌧️", "🛋️"]],
];
let exampleIndex = 0;
$("#next-example").addEventListener("click", () => {
  exampleIndex = (exampleIndex + 1) % examples.length;
  $("#message-text").innerHTML = examples[exampleIndex][0];
  $(".emoji-options").innerHTML = examples[exampleIndex][1]
    .map((e) => `<span>${e}</span>`)
    .join("");
  $(".demo-top>span:last-child").textContent = `0${exampleIndex + 1} / 03`;
});
const studies = {
  search: {
    label: "AUTHOR-RUN TEST / 41 QUERIES",
    title: "Understanding beats matching.<br>In this small test.",
    body: "A site-search project kept its keyword first pass, then asked Jev which pages fit the question. More of the useful answers landed first.",
    limit:
      "109 documentation pages, 443 chunks. Small, builder-labeled sample; not a general search leaderboard. Jev cannot recover a page missing from the candidate pool.",
    link: SOURCES[4][2],
    linkText: "Read the jevsearch benchmark",
    chartTitle: "CORRECT FIRST RESULT · HIT@1",
    rows: [
      ["Keyword pass only", 41, false],
      ["With Jev", 83, true],
    ],
    unit: "%",
    max: 100,
    footer:
      "Median latency: 8.7 ms → 278 ms uncached.<br>Reported Jev cost: approximately $0.26 / 1,000 searches.",
  },
  rerank: {
    label: "MEMSEARCH / 4,344 LANGUAGE-QUERY ROWS",
    title: "A reranker isn’t<br>automatically obsolete.",
    body: "Jev improved the existing order. A specialist reranker, Voyage, performed better and cost less in the same comparison. Replacement is a question to test.",
    limit:
      "2,172 questions plus translations; generated labels and fixed candidate pools. Earlier subsets informed prompt inspection. Reranking only, not full search quality.",
    link: SOURCES[5][2],
    linkText: "Read the MemSearch evaluation",
    chartTitle: "RELEVANT ITEMS IN TOP FIVE · RECALL@5",
    rows: [
      ["Original order", 74.71, false],
      ["Jev 1.13.0", 79.41, true],
      ["Voyage rerank-3", 81.87, false],
    ],
    unit: "%",
    max: 100,
    footer:
      "Estimated cost / 1,000 queries: Jev $0.171 · Voyage $0.120.<br>Evaluation-time prices; excludes the rest of the pipeline.",
  },
  fallback: {
    label: "SPACE / 81 SYNTHETIC QUESTIONS",
    title: "Eight times faster.<br>And a bigger bill.",
    body: "A Jev-first relevance check sent uncertain cases to a larger model. The median response was much faster, but some requests paid for both models.",
    limit:
      "Both configurations selected the expected results on 78 of 81 questions. Separate runs; staging integration. Measures evidence assessment only.",
    link: SOURCES[7][2],
    linkText: "Read the builder’s report",
    chartTitle: "MEDIAN ASSESSMENT TIME · LOWER IS FASTER",
    rows: [
      ["Luna alone", 5690, false],
      ["Jev + Luna fallback", 708, true],
    ],
    unit: " ms",
    max: 6000,
    footer:
      "Same reported accuracy: 78 / 81.<br>Fallback-enabled route: approximately 27% higher cost.",
  },
};
function setStudy(key) {
  const s = studies[key];
  $$(".comparison-tabs button").forEach((b) => {
    let selected = b.dataset.study === key;
    b.setAttribute("aria-selected", String(selected));
    b.tabIndex = selected ? 0 : -1;
  });
  const p = $("#comparison-panel");
  p.setAttribute("aria-labelledby", "tab-" + key);
  p.innerHTML = `<div class="study-copy"><span class="study-label">${s.label}</span><h3>${s.title}</h3><p>${s.body}</p><p class="study-limit">${s.limit}</p><a class="source-link" href="${s.link}" target="_blank" rel="noopener">${s.linkText} ↗</a></div><div class="chart" role="img" aria-label="${esc(s.chartTitle + ". " + s.rows.map((r) => r[0] + ": " + r[1] + s.unit).join("; "))}"><div class="chart-title">${s.chartTitle}</div>${s.rows.map(([label, value, highlight]) => `<div class="bar-row ${highlight ? "highlight" : ""}"><div class="bar-label"><span>${label}</span><strong>${value.toLocaleString()}${s.unit}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${(value / s.max) * 100}%"></div></div></div>`).join("")}<div class="chart-footer">${s.footer}</div></div>`;
}
$$(".comparison-tabs button").forEach((b) => {
  b.addEventListener("click", () => setStudy(b.dataset.study));
  b.addEventListener("keydown", (e) => {
    const tabs = $$(".comparison-tabs button");
    let index = tabs.indexOf(b);
    if (e.key === "ArrowRight") index = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft")
      index = (index + tabs.length - 1) % tabs.length;
    else if (e.key === "Home") index = 0;
    else if (e.key === "End") index = tabs.length - 1;
    else return;
    e.preventDefault();
    tabs[index].focus();
    setStudy(tabs[index].dataset.study);
  });
});
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const money = (x) =>
  x === 0
    ? "$0"
    : Math.abs(x) < 0.01
      ? (x < 0 ? "−$" : "$") + Math.abs(x).toFixed(5)
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: Math.abs(x) < 100 ? 2 : 0,
        }).format(x);
function bounded(id, fallback, min, max) {
  const el = $("#" + id);
  if (el.value === "") return fallback;
  const n = Number(el.value);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}
function updateScale() {
  const people = Math.round(10 ** bounded("people", 5, 0, 6)),
    decisions = bounded("decisions", 20, 1, 100),
    fallback = bounded("fallback", 0, 0, 50) / 100,
    tokens = bounded("tokens", 1000, 1, 100000),
    useful = bounded("useful", 25, 0, 100) / 100,
    seconds = bounded("seconds", 2, 0, 3600),
    fallbackCost = bounded("fallback-cost", 0.001, 0, 100),
    baseline = bounded("baseline-cost", 0.001, 0, 100);
  const calls = people * decisions,
    cost = (calls * tokens * 0.042) / 1e6,
    extra = calls * fallback * fallbackCost,
    time = decisions * useful * seconds;
  $("#people").setAttribute(
    "aria-valuetext",
    number.format(people) + " people",
  );
  $("#people-value").textContent = number.format(people);
  $("#decisions-value").textContent = number.format(decisions);
  $("#fallback-value").textContent = number.format(fallback * 100) + "%";
  $("#baseline-total").textContent = money(calls * baseline);
  $("#inference-savings").textContent = money(calls * baseline - cost - extra);
  $("#daily-decisions").textContent = number.format(calls);
  $("#per-person").textContent = `${decisions} tiny moments per person.`;
  $("#daily-cost").textContent = money(cost);
  $("#total-cost").textContent = money(cost + extra);
  $("#time-person").textContent = number.format(time) + " sec";
  $("#time-total").textContent =
    (time * people) / 3600 < 1
      ? number.format((time * people) / 60) + " min"
      : number.format((time * people) / 3600) + " hours";
  const usefulCalls = calls * useful;
  $("#scale-picture-copy").textContent =
    `${number.format(calls)} decisions a day. If ${number.format(useful * 100)}% help, that is ${number.format(usefulCalls)} useful moments. Each one saves an assumed ${number.format(seconds)} seconds.`;
  $("#mosaic-unit").textContent =
    `Each square ≈ ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(calls / 100)} decisions / day`;
  $("#decision-mosaic").innerHTML = Array.from(
    { length: 100 },
    (_, i) =>
      `<i style="--fill:${Math.max(0, Math.min(1, useful * 100 - i)) * 100}%"></i>`,
  ).join("");
  $("#scale-takeaway").textContent =
    extra > cost
      ? `The fallback adds ${money(extra)} a day—more than the Jev calls themselves. The whole workflow sets the bill.`
      : fallback > 0
        ? `Fallback adds ${money(extra)} per day. At this scale, the combined annual inference estimate is ${money((cost + extra) * 365)}.`
        : `At these assumptions, ${number.format(time)} seconds per person adds up. Jev inference alone would be ${money(cost * 365)} per year.`;
}
$$(".scale-inputs input").forEach((el) =>
  el.addEventListener("input", () => {
    $$(".preset-group button").forEach(
      (b) => (
        b.classList.remove("active"),
        b.setAttribute("aria-pressed", "false")
      ),
    );
    updateScale();
  }),
);
$$(".assumption-inputs input").forEach((el) =>
  el.addEventListener("change", () => {
    if (el.value === "" || !Number.isFinite(Number(el.value)))
      el.value = el.defaultValue;
    el.value = Math.min(
      Number(el.max),
      Math.max(Number(el.min), Number(el.value)),
    );
    updateScale();
  }),
);
$$(".preset-group button").forEach((b) =>
  b.addEventListener("click", () => {
    const v = {
      personal: [0, 20, 0],
      product: [5, 20, 0],
      platform: [6, 50, 10],
    }[b.dataset.preset];
    ["people", "decisions", "fallback"].forEach(
      (id, i) => ($("#" + id).value = v[i]),
    );
    $$(".preset-group button").forEach((x) => {
      x.classList.toggle("active", x === b);
      x.setAttribute("aria-pressed", String(x === b));
    });
    updateScale();
  }),
);
renderAtlas();
setStudy("search");
updateScale();

// Starts with authored values; the explicit live action replaces them with Jev outputs.
const INBOX_FEATURES = [
  { key: "customer", label: "Customer", color: "#758f61" },
  { key: "urgent", label: "Urgent", color: "#d97545" },
  { key: "billing", label: "Billing", color: "#71968e" },
  { key: "reply", label: "Needs reply", color: "#a48aaf" },
];
const INBOX_MESSAGES = [
  {
    id: "double",
    sender: "Alex · Acme",
    subject: "Charged twice this month",
    text: "Our card was charged twice this month. Could you check the duplicate and refund it?",
    values: [0.98, 0.55, 0.99, 0.95],
  },
  {
    id: "outage",
    sender: "Sam · Northstar",
    subject: "Our checkout is down",
    text: "Customers cannot complete a purchase. We need help restoring checkout now.",
    values: [0.97, 0.99, 0.1, 0.99],
  },
  {
    id: "invoice",
    sender: "Maya · Studio 8",
    subject: "Need a copy of the invoice",
    text: "Could you send last month’s invoice when you have a moment? It is for our records.",
    values: [0.96, 0.12, 0.98, 0.9],
  },
  {
    id: "lunch",
    sender: "Jamie · Friend",
    subject: "Lunch in twenty minutes?",
    text: "I am near your office. Want to grab lunch in twenty minutes? Let me know!",
    values: [0.02, 0.65, 0.01, 0.92],
  },
  {
    id: "thanks",
    sender: "Lee · Orchard",
    subject: "That fixed it. Thank you!",
    text: "The fix worked perfectly. We are all set, no follow-up needed. Thanks again.",
    values: [0.99, 0.02, 0.02, 0.03],
  },
  {
    id: "newsletter",
    sender: "The Weekly",
    subject: "Your weekly design reading",
    text: "Five interesting things to read this weekend. A digest, with no action requested.",
    values: [0, 0, 0, 0],
  },
];
const INBOX_PRESETS = {
  billing: [100, 25, 100, 25],
  urgent: [0, 100, 0, 100],
  customer: [100, 0, 0, 0],
};
let liveInboxMeta = null;
let inboxWeights = [...INBOX_PRESETS.billing],
  inboxMode = "weighted",
  selectedMessage = "double",
  localRankings = 1;
$("#feature-controls").className = "feature-controls-grid";
$("#feature-controls").innerHTML = INBOX_FEATURES.map(
  (f, i) =>
    `<div class="feature-control" style="--feature-color:${f.color}"><label for="priority-${f.key}"><span><i aria-hidden="true"></i>${f.label}</span><output id="priority-value-${f.key}">${inboxWeights[i]}</output></label><input id="priority-${f.key}" type="range" min="0" max="100" value="${inboxWeights[i]}" aria-label="${f.label} priority"></div>`,
).join("");
function inboxScore(values, weights, mode) {
  const dot = values.reduce((n, v, i) => n + v * weights[i], 0);
  if (mode === "cosine") {
    const denominator = Math.hypot(...values) * Math.hypot(...weights);
    return denominator ? dot / denominator : 0;
  }
  const total = weights.reduce((n, w) => n + w, 0);
  return total ? dot / total : 0;
}
function renderInbox(animate = false) {
  const oldPositions = new Map(
    $$(".inbox-row").map((e) => [
      e.dataset.message,
      e.getBoundingClientRect().top,
    ]),
  );
  const focused = document.activeElement?.dataset.message;
  const hasPriority = inboxWeights.some((w) => w > 0);
  const ranked = INBOX_MESSAGES.map((m, i) => ({
    ...m,
    index: i,
    score: inboxScore(m.values, inboxWeights, inboxMode),
  })).sort((a, b) => b.score - a.score || a.index - b.index);
  $("#inbox-top-match").textContent = hasPriority
    ? ranked[0].subject + " ↓"
    : "No priorities selected ↓";
  $("#inbox-list").innerHTML = ranked
    .map(
      (m, i) =>
        `<button class="inbox-row" data-message="${m.id}" aria-pressed="${selectedMessage === m.id}" aria-label="Inspect ${esc(m.subject)}; ${hasPriority ? "rank " + (i + 1) + ", score " + (m.score * 100).toFixed(1) : "no priorities selected"}"><span class="message-rank">0${i + 1}</span><span class="message-avatar" aria-hidden="true">${m.sender[0]}</span><span class="message-preview"><strong>${m.subject}</strong><small>${m.sender}</small></span><span class="rank-score">${hasPriority ? (m.score * 100).toFixed(1) : "—"}<small>${hasPriority ? "SCORE / 100" : "UNRANKED"}</small></span></button>`,
    )
    .join("");
  if (focused) $(`[data-message="${focused}"]`)?.focus({ preventScroll: true });
  if (animate && !matchMedia("(prefers-reduced-motion: reduce)").matches)
    $$(".inbox-row").forEach((e) => {
      const previous = oldPositions.get(e.dataset.message),
        delta = previous - e.getBoundingClientRect().top;
      if (Number.isFinite(delta) && Math.abs(delta) > 1)
        e.animate(
          [
            { transform: `translateY(${delta}px)` },
            { transform: "translateY(0)" },
          ],
          { duration: 280, easing: "cubic-bezier(.2,.75,.3,1)" },
        );
    });
  const m = ranked.find((x) => x.id === selectedMessage),
    sum = inboxWeights.reduce((a, b) => a + b, 0),
    dot = m.values.reduce((n, v, i) => n + v * inboxWeights[i], 0),
    denominator =
      inboxMode === "cosine"
        ? Math.hypot(...m.values) * Math.hypot(...inboxWeights)
        : sum;
  const contributions = m.values.map((v, i) =>
    denominator ? ((v * inboxWeights[i]) / denominator) * 100 : 0,
  );
  const equation = hasPriority
    ? `${inboxMode === "cosine" ? "Cosine: dot product ÷ vector lengths" : "Weighted score: sum of value × priority ÷ total priority"} = ${m.score.toFixed(3)}. Shown as ${(m.score * 100).toFixed(1)} / 100.`
    : "No priorities selected. All scores are zero; messages stay in their original order.";
  $("#feature-explanation").innerHTML =
    `<div class="explanation-head"><span class="mono">WHY THIS MESSAGE?</span><span>${liveInboxMeta ? "STORED JEV SCORES" : "STORED, ILLUSTRATIVE VALUES"}</span></div><blockquote>“${m.text}”</blockquote><div class="feature-axes">${INBOX_FEATURES.map((f, i) => `<div class="feature-axis" style="--feature-color:${f.color}"><span><i aria-hidden="true"></i>${f.label}</span><strong>${m.values[i].toFixed(2)}</strong><div class="feature-meter"><span style="width:${m.values[i] * 100}%"></span></div><small class="feature-contribution">${contributions[i].toFixed(1)} score points</small></div>`).join("")}</div><p class="feature-math">${equation}${inboxMode === "cosine" ? " Cosine compares direction, not absolute signal strength." : ""}</p><div class="contribution-strip" role="img" aria-label="Score contributions: ${INBOX_FEATURES.map((f, i) => f.label + " " + contributions[i].toFixed(1) + " points").join(", ")}">${INBOX_FEATURES.map((f, i) => `<span title="${f.label}: ${contributions[i].toFixed(1)} points" style="--feature-color:${f.color};width:${contributions[i]}%"></span>`).join("")}</div>`;
  $("#mode-description").textContent =
    inboxMode === "cosine"
      ? "Kieran’s proposed method: compare the direction of the stored feature vector with your query vector. Values indicate the desired mix, not simple importance."
      : "Each feature contributes its value × your priority. The score is normalized by total priority. This is our explanatory alternative to cosine.";
  $("#local-search-count").textContent = number.format(localRankings);
  INBOX_FEATURES.forEach((f, i) => {
    $("#priority-" + f.key).value = inboxWeights[i];
    $("#priority-value-" + f.key).textContent = inboxWeights[i];
  });
}
function announceInbox() {
  const top = $(".inbox-row .message-preview strong").textContent;
  $("#inbox-announcement").textContent = inboxWeights.some((w) => w > 0)
    ? `Ranking updated. First: ${top}. No new model calls.`
    : "Priorities cleared. Original message order restored.";
}
function clearInboxPreset() {
  $$("[data-inbox-preset]").forEach((b) =>
    b.setAttribute("aria-pressed", "false"),
  );
}
INBOX_FEATURES.forEach((f, i) => {
  const control = $("#priority-" + f.key);
  control.addEventListener("input", () => {
    inboxWeights[i] = Number(control.value);
    clearInboxPreset();
    renderInbox(true);
  });
  control.addEventListener("change", () => {
    localRankings++;
    renderInbox();
    announceInbox();
  });
});
$$("[data-inbox-preset]").forEach((b) =>
  b.addEventListener("click", () => {
    inboxWeights = [...INBOX_PRESETS[b.dataset.inboxPreset]];
    $$("[data-inbox-preset]").forEach((x) =>
      x.setAttribute("aria-pressed", String(x === b)),
    );
    localRankings++;
    renderInbox(true);
    announceInbox();
  }),
);
$("#ranking-mode").addEventListener("change", (e) => {
  inboxMode = e.target.value;
  localRankings++;
  renderInbox(true);
  announceInbox();
});
$("#zero-priorities").addEventListener("click", () => {
  inboxWeights = [0, 0, 0, 0];
  clearInboxPreset();
  localRankings++;
  renderInbox(true);
  announceInbox();
});
$("#reset-inbox").addEventListener("click", () => {
  inboxWeights = [...INBOX_PRESETS.billing];
  inboxMode = "weighted";
  $("#ranking-mode").value = "weighted";
  selectedMessage = "double";
  localRankings = 1;
  $$("[data-inbox-preset]").forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.inboxPreset === "billing")),
  );
  renderInbox(true);
  announceInbox();
});
$("#inbox-list").addEventListener("click", (e) => {
  const b = e.target.closest("[data-message]");
  if (!b) return;
  selectedMessage = b.dataset.message;
  renderInbox();
});
renderInbox();

const illustrativeVectors = Object.fromEntries(
  INBOX_MESSAGES.map((m) => [m.id, [...m.values]]),
);
const originalInboxDisclosure = $(".semantic-disclosure").innerHTML;
function setInboxDataLabel() {
  $("#inbox-data-label").textContent = liveInboxMeta
    ? "REAL JEV SCORES · FICTIONAL MESSAGES"
    : "ILLUSTRATIVE VALUES";
  $("#use-illustrative").hidden = !liveInboxMeta;
  $("#score-with-jev").disabled = Boolean(liveInboxMeta);
  $("#score-with-jev").innerHTML = liveInboxMeta
    ? "Jev scores loaded <span>✓</span>"
    : "Score this inbox with Jev <span>↗</span>";
  $(".semantic-disclosure").innerHTML = liveInboxMeta
    ? "Fictional messages · Real Jev scores · Not a benchmark."
    : originalInboxDisclosure;
}
$("#score-with-jev").addEventListener("click", async () => {
  const button = $("#score-with-jev");
  button.disabled = true;
  button.textContent = "Jev is reading the inbox…";
  button.setAttribute("aria-busy", "true");
  $("#live-inbox-status").textContent =
    "Loading Jev scores for the fixed fictional inbox. This can take a few seconds.";
  try {
    const response = await fetch("/api/score-inbox", {
      signal: AbortSignal.timeout(23000),
    });
    if (!response.ok) {
      let message =
        "Live scoring is unavailable right now. Your current values have not changed.";
      try {
        const b = await response.json();
        if (typeof b.error === "string") message = b.error;
      } catch {}
      throw Error(message);
    }
    const result = await response.json();
    if (
      result.source !== "typesafe" ||
      result.corpusVersion !== "inbox-v1" ||
      typeof result.model !== "string" ||
      !Number.isFinite(Date.parse(result.scoredAt))
    )
      throw Error(
        "The scoring response could not be verified. Keeping the current values.",
      );
    for (const m of INBOX_MESSAGES) {
      const v = result.vectors?.[m.id];
      if (
        !Array.isArray(v) ||
        v.length !== 4 ||
        !v.every(
          (x) =>
            typeof x === "number" && Number.isFinite(x) && x >= 0 && x <= 1,
        )
      )
        throw Error(
          "The scoring response was incomplete. Keeping the current values.",
        );
    }
    for (const m of INBOX_MESSAGES) m.values = [...result.vectors[m.id]];
    liveInboxMeta = result;
    localRankings = 1;
    setInboxDataLabel();
    renderInbox(true);
    announceInbox();
    const tokenInfo = Number.isSafeInteger(result.inputTokens)
      ? ` · ${number.format(result.inputTokens)} input tokens · estimated inference $${((result.inputTokens * 0.042) / 1e6).toFixed(6)}`
      : "";
    $("#live-inbox-status").textContent =
      `${result.model} · scored ${new Date(result.scoredAt).toLocaleString()}${tokenInfo}. Results may be cached for up to one hour. Priorities now reuse these real scores locally.`;
  } catch (error) {
    setInboxDataLabel();
    $("#live-inbox-status").textContent =
      error.name === "TimeoutError"
        ? "Jev took too long. Your current values have not changed; try again."
        : error.message;
  } finally {
    button.removeAttribute("aria-busy");
  }
});
$("#use-illustrative").addEventListener("click", () => {
  for (const m of INBOX_MESSAGES) m.values = [...illustrativeVectors[m.id]];
  liveInboxMeta = null;
  localRankings = 1;
  setInboxDataLabel();
  renderInbox(true);
  $("#live-inbox-status").textContent =
    "Back to authored example values. No new model call was made.";
});

// Keep chapter orientation synchronized with the reading position.
const chapters = $$(".chapter-nav a");
function updateReadingPosition() {
  const top = window.scrollY + 170;
  let active = null;
  for (const link of chapters) {
    const section = $(link.getAttribute("href"));
    if (section.offsetTop <= top) active = link;
  }
  chapters.forEach((link) => {
    if (link === active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  const available = document.documentElement.scrollHeight - window.innerHeight;
  $("#reading-progress").style.width =
    `${available > 0 ? Math.min(100, Math.max(0, (window.scrollY / available) * 100)) : 0}%`;
}
let readingScheduled = false;
window.addEventListener(
  "scroll",
  () => {
    if (!readingScheduled) {
      readingScheduled = true;
      requestAnimationFrame(() => {
        updateReadingPosition();
        readingScheduled = false;
      });
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateReadingPosition);
updateReadingPosition();

let questionScores = null,
  questionSelected = PLAYGROUND_MESSAGES[0].id,
  questionRun = 0,
  questionBusy = false;
function renderQuestionInbox() {
  const ranked = PLAYGROUND_MESSAGES.map((m, index) => ({ ...m, index })).sort(
    (a, b) =>
      questionScores
        ? questionScores[b.id] - questionScores[a.id] || a.index - b.index
        : 0,
  );
  $("#question-results").innerHTML = ranked
    .map(
      (m, i) =>
        `<button type="button" class="question-row" data-email="${m.id}" aria-pressed="${m.id === questionSelected}"><span class="question-rank">${i + 1}</span><span><strong>${esc(m.subject)}</strong><small>${esc(m.sender)}</small></span><span class="question-score">${questionScores ? Math.round(questionScores[m.id] * 100) + "%" : "—"}${questionScores ? `<small>${m.index - i > 0 ? "↑ " + (m.index - i) : m.index - i < 0 ? "↓ " + (i - m.index) : "•"}</small>` : ""}</span></button>`,
    )
    .join("");
  const m = PLAYGROUND_MESSAGES.find((m) => m.id === questionSelected);
  $("#question-message").innerHTML =
    `<span class="mono">${questionScores ? "JEV RELEVANCE · " + Math.round(questionScores[m.id] * 100) + "%" : "READ THE EMAIL"}</span><h3>${esc(m.subject)}</h3><span class="question-sender">${esc(m.sender)}</span><p>${esc(m.text)}</p><div class="question-meter" aria-hidden="true"><i style="width:${questionScores ? questionScores[m.id] * 100 : 0}%"></i></div><small>${questionScores ? "Relevance to your question, not confidence or verified fact. Arrows show movement from the original order." : "Select any email to read it. Ask a question to see real relevance scores."}</small>`;
}
$("#question-results").addEventListener("click", (e) => {
  const b = e.target.closest("[data-email]");
  if (!b) return;
  questionSelected = b.dataset.email;
  renderQuestionInbox();
});
$("#ask-inbox-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (questionBusy) return;
  const question = $("#inbox-question").value.trim();
  if (question.length < 3 || question.length > 240) {
    $("#question-status").textContent = "Use 3–240 characters.";
    return;
  }
  const run = ++questionRun;
  questionBusy = true;
  $("#ask-inbox-button").disabled = true;
  $("#ask-inbox-button").textContent = "Reading…";
  $("#question-status").textContent =
    "Jev is reading all 18 emails against your question…";
  try {
    const r = await fetch("/api/ask-inbox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal: AbortSignal.timeout(23000),
    });
    const data = await r.json();
    if (!r.ok) throw Error(data.error || "Could not rank the inbox.");
    if (
      data.source !== "typesafe" ||
      data.corpusVersion !== "playground-v1" ||
      typeof data.model !== "string" ||
      !PLAYGROUND_MESSAGES.every(
        (m) =>
          typeof data.scores?.[m.id] === "number" &&
          Number.isFinite(data.scores[m.id]) &&
          data.scores[m.id] >= 0 &&
          data.scores[m.id] <= 1,
      )
    )
      throw Error("Incomplete scores. Try again.");
    if (run !== questionRun) return;
    questionScores = data.scores;
    questionSelected = PLAYGROUND_MESSAGES.reduce((best, m) =>
      data.scores[m.id] > data.scores[best.id] ? m : best,
    ).id;
    renderQuestionInbox();
    $("#question-results").scrollTop = 0;
    $("#question-status").textContent =
      `“${question}” · ${data.model} · ${data.cached ? "cached result" : data.latencyMs + " ms provider round trip"} · ${Math.max(...Object.values(data.scores)) < 0.5 ? "No score reached 50%; the closest matches are shown." : "Ranked by relevance. Try a different question."}`;
  } catch (error) {
    if (run === questionRun)
      $("#question-status").textContent =
        error.name === "TimeoutError"
          ? "Jev took too long. Try again."
          : error.message;
  } finally {
    questionBusy = false;
    $("#ask-inbox-button").disabled = false;
    $("#ask-inbox-button").textContent = "Ask Jev ↗";
  }
});
$$(".question-presets button").forEach((b) =>
  b.addEventListener("click", () => {
    if (questionBusy) return;
    $("#inbox-question").value = b.textContent;
    $("#ask-inbox-form").requestSubmit();
  }),
);
$("#reset-question").addEventListener("click", () => {
  questionRun++;
  questionScores = null;
  questionSelected = PLAYGROUND_MESSAGES[0].id;
  renderQuestionInbox();
  $("#question-status").textContent =
    "Original order. Ask a new question to rank these emails.";
});
renderQuestionInbox();
