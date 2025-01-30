import * as ee from "equivalent-exchange";
import { commentsToString } from "./comments-to-string";
import { normalizeIndentation } from "./normalize-indentation";

const normalizeOpts = {
  output: "spaces",
  tabSize: 2,
} as const;

export function printNode(
  node: ee.types.Node,
  parents: Array<ee.types.Node>
): string {
  let text = "";

  switch (node.type) {
    case "Program": {
      const statements = node.body;

      text += statements
        .map((statement) => printNode(statement, parents.concat(node)))
        .filter(Boolean)
        .join("\n");
      break;
    }
    case "ExportNamedDeclaration": {
      if (node.declaration) {
        text += printNode(node.declaration, parents.concat(node));
      }
      break;
    }
    case "ClassDeclaration": {
      // I don't think it's actually possible for id to be null/undefined here
      const name = node.id?.name ?? "unnamed class";
      const parent = parents.at(-1);
      const isExported = ee.types.isExportNamedDeclaration(parent);
      text +=
        `## ${name} (${isExported ? "exported " : ""}class)\n` +
        node.body.body
          .map((child) => printNode(child, parents.concat(node.body, node)))
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
        })\n`;
        if (node.leadingComments && node.leadingComments.length > 0) {
          text +=
            normalizeIndentation(
              commentsToString(node.leadingComments),
              normalizeOpts
            ) + "\n";
        }
        const leadingComments = node.leadingComments;
        delete node.leadingComments;
        try {
          const printedCode = ee.print(node);
          const normalizedCode = normalizeIndentation(
            printedCode.code,
            normalizeOpts
          );
          text += `\`\`\`ts\n${normalizedCode}\n\`\`\`\n`;
        } finally {
          node.leadingComments = leadingComments;
        }
      }
      break;
    }
  }

  return text;
}
