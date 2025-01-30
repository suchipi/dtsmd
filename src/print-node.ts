import * as ee from "equivalent-exchange";
import { parseComments, commentsToString, CommentKind } from "./comment-utils";
import { normalizeIndentation } from "./normalize-indentation";

const normalizeOpts = {
  output: "spaces",
  tabSize: 2,
} as const;

export function printNode(
  node: ee.types.Node,
  ancestry: Array<ee.types.Node>,
  headingLevel: number
): string {
  let text = "";

  const heading = "#".repeat(Math.min(headingLevel, 6));
  const parent = ancestry.at(-1) ?? null;

  switch (node.type) {
    case "Program": {
      const statements = node.body;

      text += statements
        .map((statement) =>
          printNode(statement, ancestry.concat(node), headingLevel)
        )
        .filter(Boolean)
        .join("\n");
      break;
    }
    case "ExportNamedDeclaration": {
      if (node.declaration) {
        text += printNode(
          node.declaration,
          ancestry.concat(node),
          headingLevel
        );
      }
      break;
    }
    case "ClassDeclaration": {
      // I don't think it's actually possible for id to be null/undefined here
      const name = node.id?.name ?? "unnamed class";
      // Naïve check; doesn't work when exported from separate statement
      const isExported = ee.types.isExportNamedDeclaration(parent);
      text +=
        `${heading} ${name} (${isExported ? "exported " : ""}class)\n` +
        node.body.body
          .map((child) =>
            printNode(child, ancestry.concat(node.body, node), headingLevel + 1)
          )
          .join("\n");

      if (ee.types.isExportNamedDeclaration(parent)) {
        printLeadingDocComments(parent);
      } else {
        printLeadingDocComments(node);
      }

      break;
    }
    case "TSDeclareFunction": {
      const name = node.id?.name ?? "unnamed function";
      // Naïve check; doesn't work when exported from separate statement
      const isExported = ee.types.isExportNamedDeclaration(parent);
      text += `${heading} ${name} (${isExported ? "exported " : ""}${node.async ? "async " : ""}${node.generator ? "generator " : ""}function)\n`;

      if (ee.types.isExportNamedDeclaration(parent)) {
        printLeadingDocComments(parent);
      } else {
        printLeadingDocComments(node);
      }

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

        printLeadingDocComments(node);
        printRaw(node);
      }
      break;
    }
  }

  return text;

  function printLeadingDocComments(targetNode: ee.types.Node) {
    if (targetNode.leadingComments && targetNode.leadingComments.length > 0) {
      const parsedComments = parseComments(targetNode.leadingComments).filter(
        (comment) => comment.kind === CommentKind.Doc
      );
      if (parsedComments.length > 0) {
        text +=
          normalizeIndentation(
            commentsToString(parsedComments),
            normalizeOpts
          ) + "\n";
      }
    }
  }

  function printRaw(targetNode: ee.types.Node) {
    const leadingComments = targetNode.leadingComments;
    delete targetNode.leadingComments;
    try {
      const printedCode = ee.print(targetNode);
      // TODO: this indentation doesn't turn out the way I want if the node isn't a valid top-level node (which is often the case)
      const normalizedCode = normalizeIndentation(
        printedCode.code,
        normalizeOpts
      );
      text += `\`\`\`ts\n${normalizedCode}\n\`\`\`\n`;
    } finally {
      targetNode.leadingComments = leadingComments;
    }
  }
}
