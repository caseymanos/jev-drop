"use strict";
const http = require("node:http"),
  fs = require("node:fs"),
  path = require("node:path");
const score = require("./api/score-inbox.js");
const root = __dirname,
  port = Number(process.env.PORT || 4328);
const publicFiles = new Set([
  "/index.html",
  "/style.css",
  "/app.js",
  "/data.js",
  "/inbox-examples.js",
  "/assets/favicon.svg",
]);
http
  .createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/api/ask-inbox")
      return require("./api/ask-inbox.js")(req, res);
    if (url.pathname === "/api/score-inbox") return score(req, res);
    const file = url.pathname === "/" ? "/index.html" : url.pathname;
    if (!["GET", "HEAD"].includes(req.method) || !publicFiles.has(file)) {
      res.writeHead(404);
      return res.end("Not found");
    }
    try {
      const contents = fs.readFileSync(path.join(root, file));
      res.setHeader(
        "Content-Type",
        {
          ".html": "text/html; charset=utf-8",
          ".css": "text/css; charset=utf-8",
          ".js": "text/javascript; charset=utf-8",
          ".svg": "image/svg+xml",
        }[path.extname(file)],
      );
      res.setHeader("Cache-Control", "no-cache");
      res.end(req.method === "HEAD" ? undefined : contents);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Drop running at http://127.0.0.1:${port}`),
  );
