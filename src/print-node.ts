import * as ee from "equivalent-exchange";
import traverse from "@suchipi/traverse";
import {
  parseComments,
  commentsToString,
  CommentKind,
  styleCommentStringForMarkdown,
  ParsedComment,
} from "./comment-utils";
import { normalizeIndentation } from "./normalize-indentation";
import { clampHeadingLevel } from "./heading-utils";
import type { Options } from ".";

import makeDebugLog from "debug";
import { findExportedNames } from "./find-exported-names";
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
    warningsArray: Array<string>;
    exportedNames: { [localName: string]: string };
  },
  options: Options
): string {
  const outputSections = {
    heading: "",
    body: "",
    codeBlock: "",
    children: "",
  };
  let dotAfterHeadingPrefix = true;

  const parent = ancestry.at(-1) ?? null;

  debug("visiting", node.type);
  switch (node.type) {
    case "File": {
      outputSections.children += printNode(
        node.program,
        ancestry.concat(node),
        {
          ...state,
          exportedNames: findExportedNames(node.program),
        },
        options
      );
      break;
    }
    case "Program": {
      const statements = node.body;

      if (statements.length === 0) {
        outputSections.body += printInnerDocComments(node);
      } else {
        outputSections.children += statements
          .map((statement) =>
            printNode(statement, ancestry.concat(node), state, options)
          )
          .filter(Boolean)
          .join("\n");
      }

      break;
    }
    case "ExportNamedDeclaration": {
      if (node.declaration) {
        outputSections.children += printNode(
          node.declaration,
          ancestry.concat(node),
          state,
          options
        );
      }
      if (node.specifiers.length > 0) {
        outputSections.children += node.specifiers
          .map((specifier) =>
            printNode(specifier, ancestry.concat(node), state, options)
          )
          .filter(Boolean)
          .join("\n");
      }
      break;
    }
    case "ClassDeclaration": {
      // I don't think it's actually possible for id to be null/undefined here
      const name = node.id?.name ?? "unnamed class";
      const { isExported, reExportedName } = getExportStatus(name);

      outputSections.heading += [
        reExportedName || name,
        " (",
        isExported ? "exported " : "",
        "class",
        ")",
      ].join("");

      if (ee.types.isExportNamedDeclaration(parent)) {
        outputSections.body += printLeadingDocComments(parent);
      } else {
        outputSections.body += printLeadingDocComments(node);
      }

      outputSections.codeBlock += printRaw(node);

      outputSections.children += node.body.body
        .map((child) =>
          printNode(
            child,
            ancestry.concat(node.body, node),
            {
              ...state,
              headingLevel: state.headingLevel + 1,
              headingPrefix: name,
            },
            options
          )
        )
        .join("\n");

      break;
    }
    case "TSDeclareFunction": {
      const name = node.id?.name ?? "unnamed function";
      const { isExported, reExportedName } = getExportStatus(name);

      outputSections.heading += [
        reExportedName || name,
        " (",
        isExported ? "exported " : "",
        node.async ? "async " : "",
        node.generator ? "generator " : "",
        "function",
        ")\n",
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
    case "TSCallSignatureDeclaration": {
      outputSections.heading += "(...) (call signature)";
      dotAfterHeadingPrefix = false;
      outputSections.body += printLeadingDocComments(node);
      outputSections.codeBlock += printRaw(node);
      break;
    }
    case "TSConstructSignatureDeclaration": {
      outputSections.heading += " new(...) (construct signature)";
      dotAfterHeadingPrefix = false;
      outputSections.body += printLeadingDocComments(node);
      outputSections.codeBlock += printRaw(node);
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
    case "VariableDeclaration": {
      outputSections.children += node.declarations
        .map((declarator) =>
          printNode(declarator, ancestry.concat(node), state, options)
        )
        .join("\n");
      break;
    }
    case "VariableDeclarator": {
      const declaration = parent as ee.types.VariableDeclaration;
      const grandParent = ancestry.at(-2) ?? null;

      if (ee.types.isIdentifier(node.id)) {
        const name = node.id.name;
        const { isExported, reExportedName } = getExportStatus(name);
        const typeName = node.id.typeAnnotation
          ? getShortType(node.id.typeAnnotation)
          : null;

        outputSections.heading += [
          reExportedName || name,
          " (",
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
          outputSections.children += printNode(
            literal,
            ancestry.concat([
              node,
              node.id,
              (node.id as ee.types.Identifier).typeAnnotation!,
            ]),
            {
              ...state,
              headingLevel: state.headingLevel + 1,
              headingPrefix: name,
            },
            options
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
        node.kind?.length === 3 /* get/set */ ? node.kind + "ter " : "property",
        ")",
      ].join("");

      outputSections.body += printLeadingDocComments(node);
      outputSections.codeBlock += printRaw(node);

      if (
        node.typeAnnotation &&
        ee.types.isTSTypeAnnotation(node.typeAnnotation) &&
        ee.types.isTSTypeLiteral(node.typeAnnotation.typeAnnotation)
      ) {
        outputSections.children += printNode(
          node.typeAnnotation.typeAnnotation,
          ancestry.concat([node, node.typeAnnotation]),
          {
            ...state,
            headingLevel: state.headingLevel + 1,
            headingPrefix: state.headingPrefix + "." + name,
          },
          options
        );
      }

      break;
    }
    case "TSTypeLiteral": {
      outputSections.children += node.members
        .map((member) =>
          printNode(member, ancestry.concat([node]), state, options)
        )
        .join("\n");

      break;
    }
    case "TSInterfaceDeclaration": {
      const name = node.id.name;
      const { isExported, reExportedName } = getExportStatus(name);

      outputSections.heading += [
        reExportedName || name,
        " (",
        isExported ? "exported " : "",
        "interface",
        ")",
      ].join("");

      if (ee.types.isExportNamedDeclaration(parent)) {
        outputSections.body += printLeadingDocComments(parent);
      } else {
        outputSections.body += printLeadingDocComments(node);
      }

      outputSections.codeBlock += printRaw(node);

      outputSections.children += printNode(
        node.body,
        ancestry.concat(node),
        {
          ...state,
          headingLevel: state.headingLevel + 1,
          headingPrefix: name,
        },
        options
      );
      break;
    }
    case "TSInterfaceBody": {
      outputSections.children += node.body
        .map((member) =>
          printNode(member, ancestry.concat(node), state, options)
        )
        .join("\n");
      break;
    }
    case "TSTypeAliasDeclaration": {
      const name = node.id.name;
      const { isExported, reExportedName } = getExportStatus(name);

      outputSections.heading += [
        reExportedName || name,
        " (",
        isExported ? "exported " : "",
        "type",
        ")",
      ].join("");

      if (ee.types.isExportNamedDeclaration(parent)) {
        outputSections.body += printLeadingDocComments(parent);
      } else {
        outputSections.body += printLeadingDocComments(node);
      }

      outputSections.codeBlock += printRaw(node);

      outputSections.children += printNode(
        node.typeAnnotation,
        ancestry.concat([node]),
        {
          ...state,
          headingLevel: state.headingLevel + 1,
          headingPrefix: name,
        },
        options
      );
      break;
    }
    case "TSModuleDeclaration": {
      const name = ee.types.isIdentifier(node.id)
        ? node.id.name
        : JSON.stringify(node.id.value);
      const { isExported, reExportedName } = getExportStatus(name);

      outputSections.heading += [
        reExportedName || name,
        " (",
        isExported ? "exported " : "",
        "namespace",
        ")",
      ].join("");

      if (ee.types.isExportNamedDeclaration(parent)) {
        outputSections.body += printLeadingDocComments(parent);
      } else {
        outputSections.body += printLeadingDocComments(node);
      }

      outputSections.codeBlock += printRaw(node);

      outputSections.children += printNode(
        node.body,
        ancestry.concat(node),
        {
          ...state,
          headingLevel: state.headingLevel + 1,
          headingPrefix: name,
          exportedNames: findExportedNames(node),
        },
        options
      );
      break;
    }
    case "TSModuleBlock": {
      outputSections.children += node.body
        .map((child) => printNode(child, ancestry.concat(node), state, options))
        .filter(Boolean)
        .join("\n");
      break;
    }
    case "ExportSpecifier": {
      let exportedName: string;
      if (node.exported.type === "Identifier") {
        exportedName = node.exported.name;
      } else {
        exportedName = node.exported.value;
      }

      outputSections.heading += [
        exportedName,
        " (exported ",
        node.exportKind === "type" ? "type" : "binding",
        ")",
      ].join("");

      outputSections.body += printLeadingDocComments(node);

      let rawToPrint: ee.types.Node = node;
      if (ee.types.isExportNamedDeclaration(parent)) {
        rawToPrint = ee.types.exportNamedDeclaration(
          parent.declaration,
          [node],
          parent.source
        );
      }

      outputSections.codeBlock += printRaw(rawToPrint);
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
  if (outputSections.children.length > 0) {
    result += outputSections.children + "\n";
  }

  return result;

  function printLeadingDocComments(targetNode: ee.types.Node) {
    if (targetNode.leadingComments && targetNode.leadingComments.length > 0) {
      const parsedComments = parseComments(targetNode.leadingComments).filter(
        (comment) => comment.kind === CommentKind.Doc
      );
      return printParsedComments(parsedComments);
    }
    return "";
  }

  function printInnerDocComments(targetNode: ee.types.Node) {
    if (targetNode.innerComments && targetNode.innerComments.length > 0) {
      const parsedComments = parseComments(targetNode.innerComments).filter(
        (comment) => comment.kind === CommentKind.Doc
      );
      return printParsedComments(parsedComments);
    }
    return "";
  }

  function printParsedComments(parsedComments: Array<ParsedComment>) {
    if (parsedComments.length > 0) {
      return (
        normalizeIndentation(
          styleCommentStringForMarkdown(
            commentsToString(parsedComments),
            options.links || {},
            state.warningsArray
          ),
          normalizeOpts
        ) + "\n"
      );
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

  function getExportStatus(name: string): {
    isExported: boolean;
    isDirectlyExported: boolean;
    reExportedName: null | string;
  } {
    let isDirectlyExported = false;
    let reExportedName: string | null = null;

    if (
      parent?.type === "ExportNamedDeclaration" ||
      // check grandparent for eg. ExportNamedDeclaration > VariableDeclaration > VariableDeclarator
      ancestry.at(-2)?.type === "ExportNamedDeclaration"
    ) {
      isDirectlyExported = true;
    }

    const exportedName = state.exportedNames[name];
    if (exportedName != null && exportedName !== name) {
      reExportedName = exportedName;
    }

    return {
      isExported: isDirectlyExported || reExportedName != null,
      isDirectlyExported,
      reExportedName,
    };
  }
}
