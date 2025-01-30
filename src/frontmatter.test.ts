import * as fsp from "fs/promises";
import { test, expect } from "vitest";
import * as dtsmd from "./index";
import { fixturesDir } from "./test-utils";
import glomp from "glomp";
import { Path } from "nice-path";

const frontMatterDir = fixturesDir.concat("frontmatter");

const fixtures = glomp
  .withExtension(".d.ts")
  .findMatchesSync(frontMatterDir.toString());

for (const fixture of fixtures) {
  const relName = new Path(fixture).relativeTo(frontMatterDir).toString();
  const snapshotPath = new Path(fixture)
    .dirname()
    .concat(new Path(fixture).basename().replace(/\.d\.ts$/, ".snap"));

  test(relName, async () => {
    const content = await fsp.readFile(fixture, "utf-8");
    const result = await dtsmd.processSource(content);
    expect(`
## INPUT: ##
${content}
## OUTPUT.markdown: ##
${result.markdown}
## OUTPUT.frontmatter: ##
${JSON.stringify(result.frontmatter, null, 2)}
`).toMatchFileSnapshot(snapshotPath.toString());
  });
}
