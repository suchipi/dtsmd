import * as fsp from "fs/promises";
import { test, expect } from "vitest";
import * as dtsmd from "./index";
import { fixturesDir } from "./test-utils";

test("heading offset", async () => {
  const fixturePath = fixturesDir.concat("sample.d.ts");
  const tsSource = await fsp.readFile(fixturePath.toString(), "utf-8");
  const result = await dtsmd.processSource(tsSource, {
    fileName: fixturePath.toString(),
    headingOffset: 2,
  });
  expect(result.markdown).toMatchInlineSnapshot(`
    "---
    title: Sample Library Definitions File
    ---

    ### Sample Library Definitions File

    #### SomethingOrOther (exported class)

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

    it's a nice function

    \`\`\`ts
    function something(arg1: number, arg2: string): void;
    \`\`\`
    "
  `);
});
