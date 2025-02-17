import * as ee from "equivalent-exchange";
import { normalizeIndentation } from "./normalize-indentation";

export enum CommentKind {
  Line = "Line",
  Block = "Block",
  Doc = "Doc",
}

export type ParsedComment = {
  kind: CommentKind;
  text: string;
};

export function parseComments(
  comments: Array<ee.types.Comment>
): Array<ParsedComment> {
  const result: Array<ParsedComment> = [];

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    switch (comment.type) {
      case "CommentLine": {
        const lineComments = [comment];
        let nextComment = comments[i + 1];
        while (nextComment?.type === "CommentLine") {
          lineComments.push(nextComment);
          i++;
          nextComment = comments[i + 1];
        }
        result.push({
          kind: CommentKind.Line,
          text: lineComments.map((lineComment) => lineComment.value).join("\n"),
        });
        break;
      }
      case "CommentBlock": {
        if (/^\*\s/.test(comment.value)) {
          const text = comment.value
            .replace(/^\*/, "")
            .split("\n")
            .map((line) => line.replace(/^(\s*)\*/, "$1"))
            .join("\n");
          result.push({ kind: CommentKind.Doc, text });
        } else {
          result.push({ kind: CommentKind.Block, text: comment.value });
        }
        break;
      }
    }
  }

  return result;
}

export function commentsToString(comments: Array<ParsedComment>): string {
  let text = comments.map((comment) => comment.text).join("\n");

  if (/[\n\r]/.test(text)) {
    text = normalizeIndentation(text, { output: "spaces", tabSize: 2 });
  }
  return text;
}

// This list is the intersection of those found on https://jsdoc.app/ and those
// found on
// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
//
// NOTE: This gets used in the RegExp in the order listed here, so tags which
// are a subset of another tag _must_ come *after* their superset tag!!
const jsDocTags = [
  "@abstract",
  "@access",
  "@alias",
  "@argument",
  "@arg",
  "@async",
  "@augments",
  "@author",
  "@borrows",
  "@callback",
  "@classdesc",
  "@class",
  "@constant",
  "@constructor",
  "@constructs",
  "@const",
  "@copyright",
  "@defaultvalue",
  "@default",
  "@deprecated",
  "@description",
  "@desc",
  "@emits",
  "@enum",
  "@event",
  "@example",
  "@exception",
  "@exports",
  "@extends",
  "@external",
  "@fileoverview",
  "@file",
  "@fires",
  "@function",
  "@func",
  "@generator",
  "@global",
  "@hideconstructor",
  "@host",
  "@ignore",
  "@implements",
  "@import",
  "@inheritdoc",
  "@inner",
  "@instance",
  "@interface",
  "@kind",
  "@lends",
  "@license",
  // Commenting out @link as we do specific handling for that one
  // "@link",
  "@listens",
  "@memberof",
  "@member",
  "@method",
  "@mixes",
  "@mixin",
  "@module",
  "@namespace",
  "@name",
  "@override",
  "@overview",
  "@package",
  "@param",
  "@private",
  "@property",
  "@prop",
  "@protected",
  "@public",
  "@readonly",
  "@requires",
  "@returns",
  "@return",
  "@satisfies",
  "@see",
  "@since",
  "@static",
  "@summary",
  "@template",
  "@this",
  "@throws",
  "@todo",
  "@tutorial",
  "@type",
  "@typedef",
  "@variation",
  "@var",
  "@version",
  "@virtual",
  "@yields",
  "@yield",
];

const jsDocTagsWithArg = jsDocTags.filter(
  (tag) => tag !== "@returns" && tag !== "@return"
);

const JSDOC_TAG_REGEXP = new RegExp(`(${jsDocTags.join("|")})`, "g");

const JSDOC_TAG_WITH_ARG_LINE_REGEXP = {
  regexp: new RegExp(
    [
      `^(\\s*)`,
      `(${jsDocTagsWithArg.join("|")})`,
      `(\\s*)`,
      `(\{[^}]*\})?`,
      `(\\s*)`,
      `([A-Za-z0-9._]*)`,
    ].join(""),
    "gm"
  ),
  captureGroups: {
    leadingWhitespace: "$1",
    jsDocTag: "$2",
    innerWhitespace1: "$3",
    maybeBracedType: "$4",
    innerWhitespace2: "$5",
    firstIdentifier: "$6",
  },
};

const EMDASH = "—";
let JSDOC_TAG_WITH_ARG_LINE_REPLACER: string;
{
  const cg = JSDOC_TAG_WITH_ARG_LINE_REGEXP.captureGroups;
  JSDOC_TAG_WITH_ARG_LINE_REPLACER = `${cg.leadingWhitespace}- ${cg.jsDocTag}${cg.innerWhitespace1}_${cg.firstIdentifier}_ ${EMDASH} ${cg.maybeBracedType}${cg.innerWhitespace2}`;
}

const JSDOC_RETURNS_TAG_LINE_REGEXP = {
  regexp: new RegExp(
    [`^(\\s*)`, `(@returns|@return)`, `(\\s*)`, `(\{[^}]*\})?`, `(\\s*)`].join(
      ""
    ),
    "gm"
  ),
  captureGroups: {
    leadingWhitespace: "$1",
    jsDocTag: "$2",
    innerWhitespace1: "$3",
    maybeBracedType: "$4",
    innerWhitespace2: "$5",
  },
};

let JSDOC_RETURNS_TAG_LINE_REPLACER: string;
{
  const cg = JSDOC_RETURNS_TAG_LINE_REGEXP.captureGroups;
  JSDOC_RETURNS_TAG_LINE_REPLACER = `${cg.leadingWhitespace}- ${cg.jsDocTag}${cg.innerWhitespace1}${cg.maybeBracedType}${cg.innerWhitespace2}`;
}

const JSDOC_LINK_REGEXP = /{@link\s+([^}]+)}/g;

export function styleCommentStringForMarkdown(
  text: string,
  links: Record<string, string>,
  warningsArray: Array<string>
) {
  return (
    text
      // Turn lines with leading doc comments and an identifier argument into
      // list items with the first arg italicized (good for @param)
      .replace(
        JSDOC_TAG_WITH_ARG_LINE_REGEXP.regexp,
        JSDOC_TAG_WITH_ARG_LINE_REPLACER
      )
      // Special handling for @returns which doesn't have an identifier arg
      .replace(
        JSDOC_RETURNS_TAG_LINE_REGEXP.regexp,
        JSDOC_RETURNS_TAG_LINE_REPLACER
      )
      .replace(new RegExp(`- *${EMDASH}|${EMDASH} *-`, "g"), EMDASH)
      // Wrap all doc tags in backticks (inline code)
      .replace(JSDOC_TAG_REGEXP, "`$1`")
      // Convert @link to markdown links.
      .replace(JSDOC_LINK_REGEXP, (substring, name) => {
        let targetUrl: string;
        if (links[name]) {
          targetUrl = links[name];
        } else {
          warningsArray.push(
            `No link URL provided for ${JSON.stringify(name)}; falling back to "#"`
          );
          targetUrl = "#";
        }
        return `[${name}](${targetUrl})`;
      })
  );
}
