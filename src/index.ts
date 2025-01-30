import * as ee from "equivalent-exchange";
import { type Frontmatter, getFrontmatter } from "./frontmatter";
import { printNode } from "./print-node";

export type Options = {
  fileName?: string;
};

export type Result = {
  markdown: string;
  frontmatter: null | Frontmatter;
};

export function processSource(tsSource: string, options?: Options): Result {
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

  return {
    frontmatter,
    markdown: text,
  };
}
