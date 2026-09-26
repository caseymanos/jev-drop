"use strict";
const { requestBody, parseResult } = require("../lib/inbox.cjs");
let cached = null,
  expires = 0,
  pending = null,
  lastFailure = 0;
const TTL = 60 * 60 * 1000;
const apiKey = () => process.env.TYPESAFE_API_KEY || process.env.jev_key;
async function score() {
  const started = Date.now();
  const response = await fetch("https://api.typesafe.ai/v1/systemone", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody()),
    signal: AbortSignal.timeout(18000),
  });
  if (!response.ok) throw Error("provider_unavailable");
  const body = await response.json();
  const parsed = parseResult(body);
  const input = body.usage?.input_tokens;
  return {
    ...parsed,
    scoredAt: new Date().toISOString(),
    latencyMs: Date.now() - started,
    inputTokens: Number.isSafeInteger(input) && input >= 0 ? input : null,
    source: "typesafe",
    corpusVersion: "inbox-v1",
    cacheSeconds: 3600,
  };
}
module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  const send = (status, body) => {
    res.statusCode = status;
    res.end(JSON.stringify(body));
  };
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return send(405, { error: "Method not allowed." });
  }
  if (new URL(req.url, "http://localhost").search) {
    res.setHeader("Cache-Control", "no-store");
    return send(400, { error: "This demo accepts no parameters." });
  }
  if (!apiKey()) {
    res.setHeader("Cache-Control", "no-store");
    return send(503, {
      error:
        "Live Jev scoring is not configured yet. The illustrative examples still work.",
    });
  }
  try {
    if (!cached || Date.now() >= expires) {
      if (Date.now() - lastFailure < 15000) {
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("Retry-After", "15");
        return send(503, {
          error: "Jev is temporarily unavailable. Try again shortly.",
        });
      }
      if (!pending)
        pending = score()
          .then((result) => {
            cached = result;
            expires = Date.now() + TTL;
            return result;
          })
          .catch((e) => {
            lastFailure = Date.now();
            throw e;
          })
          .finally(() => {
            pending = null;
          });
      await pending;
    }
    // One fixed public corpus; shared caching bounds repeated visitor inference.
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");
    res.setHeader("Vercel-CDN-Cache-Control", "public, s-maxage=3600");
    return send(200, cached);
  } catch {
    res.setHeader("Cache-Control", "no-store");
    return send(502, {
      error:
        "Jev could not score the inbox just now. Your current values have not changed; try again later.",
    });
  }
};
