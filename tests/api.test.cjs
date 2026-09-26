"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { requestBody, parseResult, messages } = require("../lib/inbox.cjs");
function fixture() {
  return {
    model: "jev-fixture",
    answers: Object.fromEntries(
      Object.keys(requestBody().questions).map((key) => [
        key,
        { type: "noul", noul: 0.75 },
      ]),
    ),
    usage: { input_tokens: 1000 },
  };
}
function invoke(handler, method = "GET", url = "/api/score-inbox") {
  return new Promise((resolve) => {
    const headers = {};
    handler(
      { method, url },
      {
        statusCode: 200,
        setHeader(k, v) {
          headers[k] = v;
        },
        end(body) {
          resolve({ status: this.statusCode, headers, body: JSON.parse(body) });
        },
      },
    );
  });
}
function fresh() {
  delete require.cache[require.resolve("../api/score-inbox.js")];
  return require("../api/score-inbox.js");
}
test("one fixed request contains all 24 scoped questions", () => {
  const b = requestBody();
  assert.equal(b.state.messages.length, 6);
  assert.equal(Object.keys(b.questions).length, 24);
  for (const m of messages)
    assert.ok(b.questions[m.id + "_urgent"].instructions.includes(m.id));
});
test("rejects incomplete or out-of-range model values", () => {
  const b = fixture();
  assert.equal(parseResult(b).vectors.double.length, 4);
  delete b.answers.double_urgent;
  assert.throws(() => parseResult(b));
  b.answers.double_urgent = { type: "noul", noul: 1.2 };
  assert.throws(() => parseResult(b));
});
test("API configuration, request boundaries, cache coalescing and error privacy", async () => {
  const oldKey = process.env.TYPESAFE_API_KEY,
    oldSharedKey = process.env.jev_key,
    oldFetch = global.fetch;
  let calls = 0;
  try {
    delete process.env.TYPESAFE_API_KEY;
    delete process.env.jev_key;
    let handler = fresh();
    assert.equal((await invoke(handler)).status, 503);
    assert.equal((await invoke(handler, "POST")).status, 405);
    assert.equal(
      (await invoke(handler, "GET", "/api/score-inbox?text=anything")).status,
      400,
    );
    process.env.jev_key = "test-fixture-not-a-real-key";
    global.fetch = async (url, options) => {
      calls++;
      assert.equal(url, "https://api.typesafe.ai/v1/systemone");
      assert.equal(JSON.parse(options.body).state.messages.length, 6);
      await new Promise((r) => setTimeout(r, 10));
      return { ok: true, json: async () => fixture() };
    };
    handler = fresh();
    const pair = await Promise.all([invoke(handler), invoke(handler)]);
    assert.equal(calls, 1);
    assert.ok(pair.every((r) => r.status === 200));
    assert.equal(pair[0].body.source, "typesafe");
    assert.equal(pair[0].body.inputTokens, 1000);
    assert.ok(!JSON.stringify(pair).includes("test-fixture-not-a-real-key"));
    assert.equal((await invoke(handler)).status, 200);
    assert.equal(calls, 1);
    assert.ok(pair[0].headers["Cache-Control"].includes("s-maxage=3600"));
    handler = fresh();
    global.fetch = async () => {
      throw Error("sensitive-provider-internals");
    };
    const failure = await invoke(handler);
    assert.equal(failure.status, 502);
    assert.ok(
      !JSON.stringify(failure).includes("sensitive-provider-internals"),
    );
    assert.equal((await invoke(handler)).status, 503);
  } finally {
    if (oldSharedKey === undefined) delete process.env.jev_key;
    else process.env.jev_key = oldSharedKey;
    global.fetch = oldFetch;
    if (oldKey === undefined) delete process.env.TYPESAFE_API_KEY;
    else process.env.TYPESAFE_API_KEY = oldKey;
  }
});
