# A Thousand Small Frictions

An independent, interactive field guide to Jev: small contextual decisions, everyday use cases, and their tradeoffs.

**Live:** https://jev-drop.vercel.app

## Explore

- Ask your own question across 18 fictional emails and get real Jev relevance scores.
- Explore 32 use cases through authored visual examples and before/after views.
- Compare published search and reranking results, with sources and limitations.
- Adjust cost and usefulness assumptions to see how small decisions add up.
- Open the secondary six-message experiment to reuse stored semantic features without additional inference.

Visual examples are illustrations, not product screenshots or model results. Published benchmarks are attributed reports, not independently reproduced results. Live model responses are labeled separately.

## Run locally

Requires Node.js 22 and npm.

```sh
npm ci
cp .env.example .env.local
# Set TYPESAFE_API_KEY in .env.local to enable live scoring.
npm run dev
```

Open http://127.0.0.1:4328. The atlas, calculators and illustrative feature demo work without a key. Live requests return a configuration message when no key is set.

## Checks

```sh
npm run check
npm test
npm run format:check
npm run build
```

Tests use mocked provider responses and do not spend API credits. They cover request validation, fixed corpora, score parsing, caching, throttling and error privacy.

## Deploy on Vercel

Import the repository into Vercel. `vercel.json` defines the static build and Node functions. Set `TYPESAFE_API_KEY` in the desired environment, or link a shared `jev_key` variable. Never expose either key to client code. Redeploy after changing environment variables.

The build copies public assets into `public/`; API handlers remain Vercel functions. Environment files, local deployment metadata and QA artifacts are excluded from Git and deployment.

## Structure

| Path                                  | Purpose                                             |
| ------------------------------------- | --------------------------------------------------- |
| `index.html`, `style.css`, `app.js`   | Vanilla frontend and interactions                   |
| `data.js`                             | Curated use cases and source links                  |
| `inbox-examples.js`                   | Shared 18-email fictional corpus                    |
| `api/ask-inbox.js`                    | Question-based relevance scoring                    |
| `api/score-inbox.js`, `lib/inbox.cjs` | Six-email feature-scoring demo                      |
| `server.cjs`                          | Local server with an explicit public-file allowlist |
| `build.cjs`                           | Static asset build                                  |
| `tests/`                              | Node API tests                                      |

## Data and operational limits

The question playground sends the reader's question and the fixed fictional emails to TypeSafe. It does not connect to a personal inbox or accept email uploads. The UI asks readers not to include personal information. Questions are not deliberately logged by application code; a bounded in-memory cache uses hashed question keys. Hosting and provider logging policies apply separately.

Question results may be cached for one hour. Request length limits and per-instance throttling reduce misuse, but are **not a global spending cap**. Configure provider budgets or additional distributed rate limiting for larger public audiences. The fixed feature endpoint also uses an hour-long CDN cache. Provider failures preserve existing UI data.

Research snapshot: September 2026. Pricing, links and model behavior can change. Not affiliated with TypeSafe or MTS.
