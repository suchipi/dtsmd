import { describe, test, expect } from "vitest";
import { parseComments } from "./comment-utils";
import { getAst } from "./get-ast";
import { normalizeIndentation } from "./normalize-indentation";

describe("parseComments", () => {
  test("sample case", () => {
    const code = normalizeIndentation(
      `
        // one
        // two

        /** 
         * three four
         */

        // five
        // six
        // seven eight

        // nine ten
        // eleven
        statement;
      `,
      { output: "spaces", tabSize: 2 }
    );
    const ast = getAst(code);
    const parsedComments = parseComments(ast.program.body[0].leadingComments!);
    expect(parsedComments).toMatchInlineSnapshot(`
      [
        {
          "kind": "Line",
          "text": " one
       two",
        },
        {
          "kind": "Doc",
          "text": " 
        three four
       ",
        },
        {
          "kind": "Line",
          "text": " five
       six
       seven eight
       nine ten
       eleven",
        },
      ]
    `);
  });
});
