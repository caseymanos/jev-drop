"use strict";
const fs = require("node:fs"),
  path = require("node:path");
const out = path.join(__dirname, "public");
fs.mkdirSync(out, { recursive: true });
for (const name of [
  "index.html",
  "style.css",
  "app.js",
  "data.js",
  "inbox-examples.js",
])
  fs.copyFileSync(path.join(__dirname, name), path.join(out, name));
fs.cpSync(path.join(__dirname, "assets"), path.join(out, "assets"), {
  recursive: true,
});
console.log("Static output prepared. Server code and secrets are excluded.");
