import * as ee from "equivalent-exchange";
import * as prettier from "prettier";
import { formatAst } from "pretty-print-ast";
import { type Frontmatter, getFrontmatter } from "./frontmatter";
import { printNode } from "./print-node";
import { clampHeadingLevel } from "./heading-utils";

export type Options = {
  fileName?: string;
  headingOffset?: number | null | undefined;
  links?: Record<string, string>;
};

export type Result = {
  markdown: string;
  frontmatter: null | Frontmatter;
  warnings: Array<string>;
};

function getAst(tsSource: string, fileName?: string): ee.types.File {
  const ast = ee.parse(tsSource, {
    typeSyntax: "typescript-dts",
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
  options: Options = {}
): Promise<Result> {
  const ast = getAst(tsSource, options?.fileName);
  const program = ast.program;

  let text = "";

  const headingOffset = options?.headingOffset ?? 0;

  const frontmatter = getFrontmatter(program);
  if (frontmatter) {
    text += frontmatter.raw + "\n";

    if (frontmatter.parsed.title) {
      text += `${"#".repeat(clampHeadingLevel(headingOffset + 1))} ${frontmatter.parsed.title}\n\n`;
    }
  }

  const headingLevel = headingOffset + (frontmatter?.parsed.title ? 2 : 1);
  const warningsArray: Array<string> = [];

  text += printNode(
    program,
    [],
    { headingLevel, headingPrefix: "", warningsArray },
    options
  );

  const formatted = await prettier.format(text, {
    filepath: "/tmp/output.md",
  });

  const dedupedWarnings = Array.from(new Set(warningsArray));

  return {
    frontmatter,
    markdown: formatted,
    warnings: dedupedWarnings,
  };
}
