import { test, expect } from "vitest";
import { fixturesDir, rootDir, runCLI } from "./test-utils";

test("--links-file", async () => {
  const fixturePath = fixturesDir.concat("sample.d.ts");
  const linksFilePath = fixturesDir.concat("links.json5");
  const run = runCLI(
    [fixturePath.toString(), "--links-file", linksFilePath.toString()],
    { cwd: rootDir.toString() }
  );
  await run.completion;
  expect(run.result).toMatchInlineSnapshot(`
    {
      "code": 0,
      "error": false,
      "stderr": "No link URL provided for "that thing"; falling back to "#"
    ",
      "stdout": "---
    title: Sample Library Definitions File
    ---

    # Sample Library Definitions File

    ## SomethingOrOther (exported class)

    ### SomethingOrOther.prototype.someMethod (method)

    This method does stuff

    \`\`\`ts
    someMethod(arg1: string, arg2: {
      blah: 5;
    }, ...varargs: Array<Function>): string;
    \`\`\`

    ### SomethingOrOther.classMethod (static method)

    This one's a static method

    \`\`\`ts
    static classMethod(): 3748239387342;
    \`\`\`

    ## something (exported function)

    it's a nice function.

    Go look at [this thing](https://google.com) and also [that thing](#)!

    \`\`\`ts
    function something(arg1: number, arg2: string): void;
    \`\`\`
    ",
    }
  `);
});
