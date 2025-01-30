import * as ee from "equivalent-exchange";
import { commentsToString } from "./comments-to-string";
import { normalizeIndentation } from "./normalize-indentation";

const normalizeOpts = {
  output: "spaces",
  tabSize: 2,
} as const;

export function printNode(
  node: ee.types.Node,
  parents: Array<ee.types.Node>,
  headingLevel: number
): string {
  let text = "";

  const heading = "#".repeat(Math.min(headingLevel, 6));

  function printRaw(node: ee.types.Node) {
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
      // TODO: this indentation doesn't turn out the way I want
      const normalizedCode = normalizeIndentation(
        printedCode.code,
        normalizeOpts
      );
      text += `\`\`\`ts\n${normalizedCode}\n\`\`\`\n`;
    } finally {
      node.leadingComments = leadingComments;
    }
  }

  switch (node.type) {
    case "Program": {
      const statements = node.body;

      text += statements
        .map((statement) =>
          printNode(statement, parents.concat(node), headingLevel)
        )
        .filter(Boolean)
        .join("\n");
      break;
    }
    case "ExportNamedDeclaration": {
      if (node.declaration) {
        text += printNode(node.declaration, parents.concat(node), headingLevel);
      }
      break;
    }
    case "ClassDeclaration": {
      // I don't think it's actually possible for id to be null/undefined here
      const name = node.id?.name ?? "unnamed class";
      // Naïve check; doesn't work when exported from separate statement
      const parent = parents.at(-1);
      const isExported = ee.types.isExportNamedDeclaration(parent);
      text +=
        `${heading} ${name} (${isExported ? "exported " : ""}class)\n` +
        node.body.body
          .map((child) =>
            printNode(child, parents.concat(node.body, node), headingLevel + 1)
          )
          .join("\n");
      break;
    }
    case "TSDeclareFunction": {
      const name = node.id?.name ?? "unnamed function";
      // Naïve check; doesn't work when exported from separate statement
      const parent = parents.at(-1);
      const isExported = ee.types.isExportNamedDeclaration(parent);
      text += `${heading} ${name} (${isExported ? "exported " : ""}${node.async ? "async " : ""}${node.generator ? "generator " : ""}function)\n`;
      printRaw(node);
      break;
    }
    case "TSDeclareMethod": {
      if (!node.computed && ee.types.isIdentifier(node.key)) {
        const name = node.key.name;
        text += `${heading} ${name} (${node.static ? "static " : ""}${
          node.async ? "async " : ""
        }${node.generator ? "generator " : ""}${
          node.kind
            ? node.kind.length === 3
              ? node.kind + "ter"
              : node.kind
            : "method"
        })\n`;
        printRaw(node);
      }
      break;
    }
  }

  return text;
}
