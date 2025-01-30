import * as fsp from "fs/promises";
import { test, expect } from "vitest";
import * as dtsmd from "./index";
import { fixturesDir } from "./test-utils";

test("output from sample", async () => {
  const inputFile = fixturesDir.concat("sample.d.ts").toString();
  const source = await fsp.readFile(inputFile, "utf-8");

  const result = await dtsmd.processSource(source, { fileName: inputFile });

  expect(result).toMatchInlineSnapshot(`
    {
      "frontmatter": {
        "parsed": {
          "title": "Sample Library Definitions File",
        },
        "raw": "---
    title: Sample Library Definitions File
    ---
    ",
      },
      "markdown": "---
    title: Sample Library Definitions File
    ---

    # Sample Library Definitions File

    ## SomethingOrOther (exported class)

    ### someMethod (method)

    This method does stuff

    \`\`\`ts
    someMethod(
        arg1: string,
        arg2: {
            blah: 5;
        },
        ...varargs: Array<Function>
    ): string;
    \`\`\`

    ### classMethod (static method)

    This one's a static method

    \`\`\`ts
    static classMethod(): 3748239387342;
    \`\`\`
    ",
    }
  `);
});
