import * as ee from "equivalent-exchange";
import traverse from "@suchipi/traverse";
import {
  parseComments,
  commentsToString,
  CommentKind,
  styleCommentStringForMarkdown,
} from "./comment-utils";
import { normalizeIndentation } from "./normalize-indentation";
import { clampHeadingLevel } from "./heading-utils";

import makeDebugLog from "debug";
const debug = makeDebugLog("@suchipi/dtsmd:print-node");

const normalizeOpts = {
  output: "spaces",
  tabSize: 2,
} as const;

export function printNode(
  node: ee.types.Node,
  ancestry: Array<ee.types.Node>,
  state: {
    headingLevel: number;
    headingPrefix: string;
  }
): string {
  const outputSections = {
    heading: "",
    body: "",
    codeBlock: "",
    postCodeBlockBody: "",
  };
  let dotAfterHeadingPrefix = true;

  const parent = ancestry.at(-1) ?? null;

  debug("visiting", node.type);
  switch (node.type) {
    case "Program": {
      const statements = node.body;

      outputSections.body += statements
        .map((statement) => printNode(statement, ancestry.concat(node), state))
        .filter(Boolean)
        .join("\n");
      break;
    }
    case "ExportNamedDeclaration": {
      if (node.declaration) {
        outputSections.body += printNode(
          node.declaration,
          ancestry.concat(node),
          state
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
          printNode(child, ancestry.concat(node.body, node), {
            headingLevel: state.headingLevel + 1,
            headingPrefix: name,
          })
        )
        .join("\n");

      break;
    }
    case "TSDeclareFunction": {
      const name = node.id?.name ?? "unnamed function";
      // Naïve check; doesn't work when exported from separate statement
      const isExported = ee.types.isExportNamedDeclaration(parent);
      outputSections.heading += [
        name,
        " (",
        isExported ? "exported " : "",
        node.async ? "async " : "",
        node.generator ? "generator " : "",
        "function)\n",
      ].join("");

      if (ee.types.isExportNamedDeclaration(parent)) {
        outputSections.body += printLeadingDocComments(parent);
      } else {
        outputSections.body += printLeadingDocComments(node);
      }

      outputSections.codeBlock += printRaw(node);
      break;
    }
    case "TSDeclareMethod": {
      if (!node.computed && ee.types.isIdentifier(node.key)) {
        const name = node.key.name;

        if (name === "constructor") {
          dotAfterHeadingPrefix = false;
          outputSections.heading += " (constructor)";
        } else {
          outputSections.heading += [
            node.static ? "" : "prototype.",
            name,
            " (",
            node.static ? "static " : "",
            node.async ? "async " : "",
            node.generator ? "generator " : "",
            node.kind
              ? node.kind.length === 3 /* get/set */
                ? node.kind + "ter"
                : node.kind
              : "method",
            ")",
          ].join("");
        }

        outputSections.body += printLeadingDocComments(node);
        outputSections.codeBlock += printRaw(node);
      }
      break;
    }
    case "TSMethodSignature": {
      if (!node.computed && ee.types.isIdentifier(node.key)) {
        const name = node.key.name;

        outputSections.heading += [
          name,
          " (",
          node.kind
            ? node.kind.length === 3 /* get/set */
              ? node.kind + "ter"
              : node.kind
            : "method",
          ")",
        ].join("");

        outputSections.body += printLeadingDocComments(node);
        outputSections.codeBlock += printRaw(node);
      }
      break;
    }
    case "ClassProperty": {
      if (!node.computed && ee.types.isIdentifier(node.key)) {
        const name = node.key.name;
        const typeName = node.typeAnnotation
          ? getShortType(node.typeAnnotation)
          : null;
        outputSections.heading += [
          node.static ? "" : "prototype.",
          name,
          " (",
          node.static ? "static " : "",
          typeName ? typeName + " " : "",
          "property)",
        ].join("");

        outputSections.body += printLeadingDocComments(node);
        outputSections.codeBlock += printRaw(node);
      }
      break;
    }
    case "TSPropertySignature": {
      if (!node.computed && ee.types.isIdentifier(node.key)) {
        const name = node.key.name;
        const typeName = node.typeAnnotation
          ? getShortType(node.typeAnnotation)
          : null;
        outputSections.heading += [
          name,
          " (",
          typeName ? typeName + " " : "",
          "property)",
        ].join("");

        outputSections.body += printLeadingDocComments(node);
        outputSections.codeBlock += printRaw(node);

        if (
          node.typeAnnotation &&
          ee.types.isTSTypeAnnotation(node.typeAnnotation) &&
          ee.types.isTSTypeLiteral(node.typeAnnotation.typeAnnotation)
        ) {
          outputSections.postCodeBlockBody += printNode(
            node.typeAnnotation.typeAnnotation,
            ancestry.concat([node, node.typeAnnotation]),
            {
              headingLevel: state.headingLevel + 1,
              headingPrefix: state.headingPrefix + "." + name,
            }
          );
        }
      }
      break;
    }
    case "VariableDeclaration": {
      outputSections.body += node.declarations.map((declarator) =>
        printNode(declarator, ancestry.concat(node), state)
      );
      break;
    }
    case "VariableDeclarator": {
      const declaration = parent as ee.types.VariableDeclaration;
      const grandParent = ancestry.at(-2) ?? null;

      if (ee.types.isIdentifier(node.id)) {
        const name = node.id.name;
        // Naïve check; doesn't work when exported from separate statement
        const isExported = ee.types.isExportNamedDeclaration(grandParent);
        const typeName = node.id.typeAnnotation
          ? getShortType(node.id.typeAnnotation)
          : null;

        outputSections.heading += [
          `${name} (`,
          isExported ? "exported " : "",
          typeName ?? "value",
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

        const loneDeclaration = ee.types.variableDeclaration(declaration.kind, [
          node,
        ]);
        outputSections.codeBlock += printRaw(loneDeclaration);

        if (
          ee.types.isTSTypeAnnotation(node.id.typeAnnotation) &&
          ee.types.isTSTypeLiteral(node.id.typeAnnotation.typeAnnotation)
        ) {
          const literal = node.id.typeAnnotation.typeAnnotation;
          outputSections.postCodeBlockBody += printNode(
            literal,
            ancestry.concat([
              node,
              node.id,
              (node.id as ee.types.Identifier).typeAnnotation!,
            ]),
            {
              headingLevel: state.headingLevel + 1,
              headingPrefix: name,
            }
          );
        }
      }
      break;
    }
    case "TSPropertySignature": {
      if (node.computed || !ee.types.isIdentifier(node.key)) {
        break;
      }

      const name = node.key.name;
      const typeName = node.typeAnnotation
        ? getShortType(node.typeAnnotation)
        : null;

      outputSections.heading += [
        name,
        " (",
        node.readonly ? "readonly " : "",
        typeName ? typeName + " " : "",
        node.kind.length === 3 /* get/set */ ? node.kind + "ter " : "property",
        ")",
      ].join("");

      outputSections.body += printLeadingDocComments(node);

      break;
    }
    case "TSTypeLiteral": {
      outputSections.body += node.members
        .map((member) => printNode(member, ancestry.concat([node]), state))
        .join("\n");

      break;
    }
  }

  let result = "";
  if (outputSections.heading.length > 0) {
    const headingHash = "#".repeat(clampHeadingLevel(state.headingLevel));
    result += `${headingHash} ${state.headingPrefix}${state.headingPrefix && dotAfterHeadingPrefix ? "." : ""}${outputSections.heading}\n`;
  }
  if (outputSections.body.length > 0) {
    result += outputSections.body + "\n";
  }
  if (outputSections.codeBlock.length > 0) {
    result += `\`\`\`ts\n${outputSections.codeBlock.trimEnd()}\n\`\`\`\n`;
  }
  if (outputSections.postCodeBlockBody.length > 0) {
    result += outputSections.postCodeBlockBody + "\n";
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
            styleCommentStringForMarkdown(commentsToString(parsedComments)),
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
      before(traverseTargetNode) {
        if (
          typeof traverseTargetNode !== "object" ||
          traverseTargetNode == null
        ) {
          return;
        }
        delete traverseTargetNode.leadingComments;
        delete traverseTargetNode.innerComments;
        delete traverseTargetNode.trailingComments;
      },
    });
    const printedCode = ee.print(nodeCopy, { printMethod: "@babel/generator" });
    const normalizedCode = normalizeIndentation(
      printedCode.code,
      normalizeOpts
    );
    return normalizedCode + "\n";
  }

  function getShortType(targetNode: ee.types.Node): string | null {
    switch (targetNode.type) {
      case "TypeAnnotation": {
        return getShortType(targetNode.typeAnnotation);
      }
      case "TSTypeAnnotation": {
        return getShortType(targetNode.typeAnnotation);
      }
      case "TSTypeLiteral": {
        if (
          targetNode.members.some((member) =>
            ee.types.isTSCallSignatureDeclaration(member)
          )
        ) {
          return "function";
        } else {
          return "object";
        }
      }
      case "TSFunctionType": {
        return "function";
      }
      default: {
        const printed = printRaw(targetNode).replace(/^:\s*/g, "").trim();
        if (/\s|[<>]/.test(printed)) {
          // too complicated
          return null;
        } else {
          if (/[^A-Za-z_0-9]/.test(printed)) {
            return "`" + printed.replace(/`/, "\\`") + "`";
          }
          return printed;
        }
      }
    }
  }
}
