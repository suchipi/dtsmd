import * as ee from "equivalent-exchange";
import { get, set } from "lodash";
import { commentsToString } from "./comments-to-string";
import { normalizeIndentation } from "./normalize-indentation";

const normalizeOpts = {
  output: "spaces",
  tabSize: 2,
} as const;

export function printNode(
  node: ee.types.Node,
  path: Array<string | number>,
  program: ee.types.Program
): string {
  let text = "";

  switch (node.type) {
    case "Program": {
      const statements = node.body;

      text += statements
        .map((statement, index) =>
          printNode(statement, path.concat("statements", index), program)
        )
        .filter(Boolean)
        .join("\n");
      break;
    }
    case "ExportNamedDeclaration": {
      if (node.declaration) {
        text += printNode(
          node.declaration,
          path.concat("declaration"),
          program
        );
      }
      break;
    }
    case "ClassDeclaration": {
      // I don't think it's actually possible for id to be null/undefined here
      const name = node.id?.name ?? "unnamed class";
      text +=
        `## ${name} (class)\n\n` +
        node.body.body
          .map((child, index) =>
            printNode(child, path.concat("body", "body", index), program)
          )
          .join("\n");
      break;
    }
    case "TSDeclareMethod": {
      if (!node.computed && ee.types.isIdentifier(node.key)) {
        const name = node.key.name;
        text += `### ${name} (${node.static ? "static " : ""}${
          node.async ? "async " : ""
        }${node.generator ? "generator " : ""}${
          node.kind
            ? node.kind.length === 3
              ? node.kind + "ter"
              : node.kind
            : "method"
        })\n\n`;
        if (node.leadingComments && node.leadingComments.length > 0) {
          text +=
            normalizeIndentation(
              commentsToString(node.leadingComments),
              normalizeOpts
            ).trim() + "\n\n";
        }
        const leadingComments = node.leadingComments;
        delete node.leadingComments;
        try {
          const printedCode = ee.print(node);
          const normalizedCode = normalizeIndentation(
            printedCode.code,
            normalizeOpts
          );
          text += `\`\`\`ts\n${normalizedCode.trim()}\n\`\`\`\n`;
        } finally {
          node.leadingComments = leadingComments;
        }
      }
      break;
    }
  }

  return text;
}
