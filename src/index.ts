import * as ee from "equivalent-exchange";
import * as prettier from "prettier";
import { formatAst } from "pretty-print-ast";
import { type Frontmatter, getFrontmatter } from "./frontmatter";
import { printNode } from "./print-node";

export type Options = {
  fileName?: string;
};

export type Result = {
  markdown: string;
  frontmatter: null | Frontmatter;
};

function getAst(tsSource: string, fileName?: string): ee.types.File {
  const ast = ee.parse(tsSource, {
    typeSyntax: "typescript",
    jsxEnabled: true,
    fileName: fileName,
  });
  ee.types.assertFile(ast);
  return ast;
}

export function printAst(tsSource: string): string {
  const ast = getAst(tsSource);
  return formatAst(ast);
}

export async function processSource(
  tsSource: string,
  options?: Options
): Promise<Result> {
  const ast = getAst(tsSource, options?.fileName);
  const program = ast.program;

  let text = "";

  const frontmatter = getFrontmatter(program);
  if (frontmatter) {
    text += frontmatter.raw + "\n";

    if (frontmatter.parsed.title) {
      text += `# ${frontmatter.parsed.title}\n\n`;
    }
  }

  const headingLevel = frontmatter?.parsed.title ? 2 : 1;
  text += printNode(program, [], { headingLevel, headingPrefix: "" });

  const formatted = await prettier.format(text, {
    filepath: "/tmp/output.md",
  });

  return {
    frontmatter,
    markdown: formatted,
  };
}
