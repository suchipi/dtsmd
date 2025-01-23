import * as fsp from "fs/promises";
import { test, expect } from "vitest";
import * as dtsmd from "./index";
import { Path } from "nice-path";

const rootDir = new Path(__dirname).dirname();

test("output from sample", async () => {
  const inputFile = rootDir.concat("fixtures/sample.d.ts").toString();
  const source = await fsp.readFile(inputFile, "utf-8");

  const result = dtsmd.processSource(source, { fileName: inputFile });

  expect(result).toMatchInlineSnapshot(`
    "---
    title: Sample Library Definitions File
    ---
    # Sample Library Definitions File

    - ExportNamedDeclaration
    - TSModuleDeclaration
    - TSEnumDeclaration
    "
  `);
});
