import * as fsp from "fs/promises";
import { test, expect } from "vitest";
import * as dtsmd from "./index";
import { fixturesDir } from "./test-utils";

test("output from sample", async () => {
  const inputFile = fixturesDir.concat("sample.d.ts").toString();
  const source = await fsp.readFile(inputFile, "utf-8");

  const result = dtsmd.processSource(source, { fileName: inputFile });

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

    - ExportNamedDeclaration
    - TSModuleDeclaration
    - TSEnumDeclaration
    ",
    }
  `);
});
