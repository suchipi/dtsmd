const fs = require("node:fs");
const path = require("node:path");
const child_process = require("node:child_process");
const { process, includeRule } = require("@suchipi/macaroni");

const result = process(path.join(__dirname, "templates", "README.tmpl.md"), {
  rules: [
    includeRule,
    function runRule(input, api) {
      return input.content.replace(/#RUN\(([^)]+)\)/g, (match, target) => {
        const parsedTarget = JSON.parse(target);
        const result = child_process.execSync(parsedTarget, {
          encoding: "utf-8",
        });
        return result;
      });
    },
  ],
});

fs.writeFileSync(path.resolve(__dirname, "..", "README.md"), result);
