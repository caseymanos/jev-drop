const { test } = require("node:test"),
  assert = require("node:assert/strict");
const messages = require("../inbox-examples.js");
const invoke = (handler, body, method = "POST") =>
  new Promise((resolve) =>
    handler(
      { method, body },
      {
        setHeader() {},
        end(s) {
          resolve({ status: this.statusCode, body: JSON.parse(s) });
        },
      },
    ),
  );
test("question API validates input, creates per-email questions, scores and caches", async () => {
  const oldFetch = global.fetch,
    oldKey = process.env.jev_key;
  process.env.jev_key = "test-only";
  let calls = 0;
  try {
    delete require.cache[require.resolve("../api/ask-inbox.js")];
    const handler = require("../api/ask-inbox.js");
    assert.equal((await invoke(handler, {}, "GET")).status, 405);
    for (const body of [
      { question: "x" },
      { question: "a".repeat(241) },
      { question: "hello", emails: [] },
      "not json",
    ])
      assert.equal((await invoke(handler, body)).status, 400);
    global.fetch = async (url, opts) => {
      calls++;
      const b = JSON.parse(opts.body);
      assert.equal(b.state.messages.length, 18);
      assert.equal(Object.keys(b.questions).length, 18);
      assert.equal(b.state.question, "Who might cancel?");
      return {
        ok: true,
        json: async () => ({
          model: "jev-test",
          answers: Object.fromEntries(
            messages.map((m) => [
              m.id,
              { type: "noul", noul: m.id === "renewal" ? 0.96 : 0.12 },
            ]),
          ),
        }),
      };
    };
    const r = await invoke(handler, { question: "Who might cancel?" });
    assert.equal(r.status, 200);
    assert.equal(r.body.scores.renewal, 0.96);
    assert.equal(
      (await invoke(handler, { question: "Who might cancel?" })).body.cached,
      true,
    );
    assert.equal(calls, 1);
    assert.equal(
      (await invoke(handler, { question: "Another question?" })).status,
      429,
    );
  } finally {
    global.fetch = oldFetch;
    if (oldKey === undefined) delete process.env.jev_key;
    else process.env.jev_key = oldKey;
  }
});
