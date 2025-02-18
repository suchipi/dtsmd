import * as fsp from "fs/promises";
import { test, expect } from "vitest";
import * as dtsmd from "./index";
import { fixturesDir, rootDir } from "./test-utils";
import glomp from "glomp";
import { Path } from "nice-path";

const fixtures = glomp
  .withExtension(".d.ts")
  .findMatchesSync(fixturesDir.toString());

for (const fixture of fixtures) {
  const relName = new Path(fixture).relativeTo(rootDir).toString();
  const snapshotPath = new Path(fixture)
    .dirname()
    .concat(new Path(fixture).basename().replace(/\.d\.ts$/, ".snap.md"));

  test(relName, async () => {
    const content = await fsp.readFile(fixture, "utf-8");
    const result = await dtsmd.processSource(content);
    await expect(`<!-- INPUT:
${content}
-->
${result.markdown}
<!-- OUTPUT.frontmatter:
${JSON.stringify(result.frontmatter, null, 2)}
-->
<!-- OUTPUT.warnings:
${JSON.stringify(result.warnings, null, 2)}
-->
`).toMatchFileSnapshot(snapshotPath.toString());
  });
}
