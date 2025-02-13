import * as fsp from "fs/promises";
import { test, expect } from "vitest";
import * as dtsmd from "./index";
import { fixturesDir } from "./test-utils";

test("--links-json", async () => {
  const fixturePath = fixturesDir.concat("sample.d.ts");
  const tsSource = await fsp.readFile(fixturePath.toString(), "utf-8");
  const result = await dtsmd.processSource(tsSource, {
    fileName: fixturePath.toString(),
    headingOffset: 2,
    links: {
      "this thing": "https://google.com",
      // Note that "that thing" is omitted, which will cause a warning
    },
  });
  expect(result.markdown).toMatchInlineSnapshot(`
    "---
    title: Sample Library Definitions File
    ---

    ### Sample Library Definitions File

    #### SomethingOrOther (exported class)

    \`\`\`ts
    class SomethingOrOther {
      someMethod(
        arg1: string,
        arg2: {
          blah: 5;
        },
        ...varargs: Array<Function>
      ): string;
      static classMethod(): 3748239387342;
    }
    \`\`\`

    ##### SomethingOrOther.prototype.someMethod (method)

    This method does stuff

    \`\`\`ts
    someMethod(arg1: string, arg2: {
      blah: 5;
    }, ...varargs: Array<Function>): string;
    \`\`\`

    ##### SomethingOrOther.classMethod (static method)

    This one's a static method

    \`\`\`ts
    static classMethod(): 3748239387342;
    \`\`\`

    #### something (exported function)

    it's a nice function.

    Go look at [this thing](https://google.com) and also [that thing](#)!

    \`\`\`ts
    function something(arg1: number, arg2: string): void;
    \`\`\`
    "
  `);
  expect(result.warnings).toMatchInlineSnapshot(`
    [
      "No link URL provided for "that thing"; falling back to "#"",
    ]
  `);
});
