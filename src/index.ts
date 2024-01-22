import * as ee from "equivalent-exchange";
import { formatAst } from "pretty-print-ast";

export type Options = {
  fileName?: string;
};

export function processSource(tsSource: string, options?: Options): string {
  const ast = ee.parse(tsSource, {
    typeSyntax: "typescript",
    jsxEnabled: true,
    fileName: options?.fileName,
  });
  console.log(formatAst(ast));

  return "placeholder";
}
