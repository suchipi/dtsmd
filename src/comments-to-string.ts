import * as ee from "equivalent-exchange";
import { normalizeIndentation } from "./normalize-indentation";

export function commentsToString(comments: Array<ee.types.Comment>) {
  let text = "";
  for (const comment of comments) {
    switch (comment.type) {
      case "CommentLine": {
        text += comment.value + "\n";
        break;
      }
      case "CommentBlock": {
        if (/^\*\s/.test(comment.value)) {
          // doc comment
          text += comment.value
            .replace(/^\*/, "")
            .split("\n")
            .map((line) => line.replace(/^(\s*)\*/, "$1"))
            .join("\n");
        } else {
          text += comment.value;
        }
        break;
      }
    }
  }
  if (/[\n\r]/.test(text)) {
    text = normalizeIndentation(text, { output: "spaces", tabSize: 2 });
  }
  return text;
}
