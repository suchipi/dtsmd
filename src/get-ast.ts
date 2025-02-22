import * as ee from "equivalent-exchange";

export function getAst(tsSource: string, fileName?: string): ee.types.File {
  const ast = ee.parse(tsSource, {
    typeSyntax: "typescript-dts",
    jsxEnabled: true,
    fileName: fileName,
  });
  ee.types.assertFile(ast);
  return ast;
}
