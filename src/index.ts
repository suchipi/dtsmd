import * as ee from "equivalent-exchange";
import * as prettier from "prettier";
import { type Frontmatter, getFrontmatter } from "./frontmatter";
import { printNode } from "./print-node";

export type Options = {
  fileName?: string;
};

export type Result = {
  markdown: string;
  frontmatter: null | Frontmatter;
};

export async function processSource(
  tsSource: string,
  options?: Options
): Promise<Result> {
  const ast = ee.parse(tsSource, {
    typeSyntax: "typescript",
    jsxEnabled: true,
    fileName: options?.fileName,
  });
  ee.types.assertFile(ast);
  const program = ast.program;

  let text = "";

  const frontmatter = getFrontmatter(program);
  if (frontmatter) {
    text += frontmatter.raw + "\n";

    if (frontmatter.parsed.title) {
      text += `# ${frontmatter.parsed.title}\n\n`;
    }
  }

  text += printNode(program, [], program);

  const formatted = await prettier.format(text, {
    filepath: "/tmp/output.md",
  });

  return {
    frontmatter,
    markdown: formatted,
  };
}
