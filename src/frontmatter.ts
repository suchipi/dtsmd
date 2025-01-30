import * as ee from "equivalent-exchange";
import * as YAML from "yaml";
import { normalizeIndentation } from "./indent-utils";

export type Frontmatter = {
  raw: string;
  parsed: { [key: PropertyKey]: any };
};

const debugLog = console.warn;
// const debugLog: typeof console.warn = () => {};

export function getFrontmatter(ast: ee.types.Program): null | Frontmatter {
  const statements = ast.body;

  let firstComments: Array<ee.types.Comment> = [];
  if (statements.length === 0) {
    if (ast.innerComments && ast.innerComments.length > 0) {
      debugLog("found first comment as body innerComments");
      firstComments.push(...ast.innerComments);
    }
  } else {
    const firstStatement = statements[0];
    if (
      firstStatement.leadingComments &&
      firstStatement.leadingComments.length > 0
    ) {
      debugLog("found first comment as first statement leading comments");
      firstComments.push(...firstStatement.leadingComments);
    }
  }

  if (firstComments.length === 0) {
    return null;
  }

  const values = commentsToString(firstComments);

  const valuesTrim = values.trim();
  if (/^---[\r\n]/.test(valuesTrim) && /[\r\n]---$/.test(valuesTrim)) {
    // Looks like frontmatter
    const withoutDashes = valuesTrim.replace(/^---|---$/g, "");
    const parsed = YAML.parse(withoutDashes);
    return {
      raw: values,
      parsed,
    };
  }

  return null;
}

function commentsToString(comments: Array<ee.types.Comment>) {
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
            .map((line) => line.replace(/^(\s)\*/, "$1"))
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
  debugLog("commentsToString result", text);
  return text;
}
