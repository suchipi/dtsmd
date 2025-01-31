import * as ee from "equivalent-exchange";
import traverse from "@suchipi/traverse";
import { parseComments, commentsToString, CommentKind } from "./comment-utils";
import { normalizeIndentation } from "./normalize-indentation";

import makeDebugLog from "debug";
const debug = makeDebugLog("@suchipi/dtsmd:print-node");

const normalizeOpts = {
  output: "spaces",
  tabSize: 2,
} as const;

export function printNode(
  node: ee.types.Node,
  ancestry: Array<ee.types.Node>,
  headingLevel: number
): string {
  const outputSections = {
    heading: "",
    body: "",
    footerCodeBlock: "",
  };

  const parent = ancestry.at(-1) ?? null;

  debug("visiting", node.type);
  switch (node.type) {
    case "Program": {
      const statements = node.body;

      outputSections.body += statements
        .map((statement) =>
          printNode(statement, ancestry.concat(node), headingLevel)
        )
        .filter(Boolean)
        .join("\n");
      break;
    }
    case "ExportNamedDeclaration": {
      if (node.declaration) {
        outputSections.body += printNode(
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
      outputSections.heading += `${name} (${isExported ? "exported " : ""}class)`;

      if (ee.types.isExportNamedDeclaration(parent)) {
        outputSections.body += printLeadingDocComments(parent);
      } else {
        outputSections.body += printLeadingDocComments(node);
      }

      outputSections.body += node.body.body
        .map((child) =>
          printNode(child, ancestry.concat(node.body, node), headingLevel + 1)
        )
        .join("\n");

      break;
    }
    case "TSDeclareFunction": {
      const name = node.id?.name ?? "unnamed function";
      // Naïve check; doesn't work when exported from separate statement
      const isExported = ee.types.isExportNamedDeclaration(parent);
      outputSections.heading += `${name} (${isExported ? "exported " : ""}${node.async ? "async " : ""}${node.generator ? "generator " : ""}function)\n`;

      if (ee.types.isExportNamedDeclaration(parent)) {
        outputSections.body += printLeadingDocComments(parent);
      } else {
        outputSections.body += printLeadingDocComments(node);
      }

      outputSections.footerCodeBlock += printRaw(node);
      break;
    }
    case "TSDeclareMethod": {
      if (!node.computed && ee.types.isIdentifier(node.key)) {
        const name = node.key.name;
        outputSections.heading += `${name} (${node.static ? "static " : ""}${
          node.async ? "async " : ""
        }${node.generator ? "generator " : ""}${
          node.kind
            ? node.kind.length === 3
              ? node.kind + "ter"
              : node.kind
            : "method"
        })`;

        outputSections.body += printLeadingDocComments(node);
        outputSections.footerCodeBlock += printRaw(node);
      }
      break;
    }
    case "VariableDeclaration": {
      outputSections.body += node.declarations.map((declarator) =>
        printNode(declarator, ancestry.concat(node), headingLevel)
      );
      break;
    }
    case "VariableDeclarator": {
      const declaration = parent as ee.types.VariableDeclaration;
      const grandParent = ancestry.at(-2) ?? null;

      const kind = declaration.kind;
      if (ee.types.isIdentifier(node.id)) {
        const name = node.id.name;
        // Naïve check; doesn't work when exported from separate statement
        const isExported = ee.types.isExportNamedDeclaration(grandParent);
        let typeAnnotation = node.id.typeAnnotation
          ? printRaw(node.id.typeAnnotation).replace(/^:\s*/g, "").trim()
          : "value";
        if (/[\n\r]/.test(typeAnnotation)) {
          // too complicated
          typeAnnotation = "value";
        }

        outputSections.heading += [
          `${name} (`,
          isExported ? "exported " : "",
          kind === "const" ? "const " : "",
          typeAnnotation,
          ")",
        ].join("");

        if (node.leadingComments?.length) {
          // VariableDeclarator
          outputSections.body += printLeadingDocComments(node);
        } else if (parent?.leadingComments?.length) {
          // VariableDeclaration
          outputSections.body += printLeadingDocComments(parent);
        } else {
          if (
            ee.types.isExportNamedDeclaration(grandParent) &&
            grandParent.leadingComments?.length
          ) {
            outputSections.body += printLeadingDocComments(grandParent);
          }
        }
      }
    }
  }

  let result = "";
  if (outputSections.heading.length > 0) {
    const headingHash = "#".repeat(Math.min(headingLevel, 6));
    result += `${headingHash} ${outputSections.heading}\n`;
  }
  if (outputSections.body.length > 0) {
    result += outputSections.body + "\n";
  }
  if (outputSections.footerCodeBlock.length > 0) {
    result += `\`\`\`ts\n${outputSections.footerCodeBlock.trimEnd()}\n\`\`\`\n`;
  }

  return result;

  function printLeadingDocComments(targetNode: ee.types.Node) {
    if (targetNode.leadingComments && targetNode.leadingComments.length > 0) {
      const parsedComments = parseComments(targetNode.leadingComments).filter(
        (comment) => comment.kind === CommentKind.Doc
      );
      if (parsedComments.length > 0) {
        return (
          normalizeIndentation(
            commentsToString(parsedComments),
            normalizeOpts
          ) + "\n"
        );
      }
    }
    return "";
  }

  function printRaw(targetNode: ee.types.Node) {
    const nodeCopy = ee.clone(targetNode);
    // We don't want to print any of the comments
    traverse(nodeCopy, {
      before(node) {
        if (typeof node !== "object" || node == null) {
          return;
        }
        delete node.leadingComments;
        delete node.innerComments;
        delete node.trailingComments;
      },
    });
    const printedCode = ee.print(nodeCopy, { printMethod: "@babel/generator" });
    const normalizedCode = normalizeIndentation(
      printedCode.code,
      normalizeOpts
    );
    return normalizedCode + "\n";
  }
}
