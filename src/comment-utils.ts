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

  for (const comment of comments) {
    switch (comment.type) {
      case "CommentLine": {
        result.push({ kind: CommentKind.Line, text: comment.value });
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
