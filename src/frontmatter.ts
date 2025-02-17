import * as ee from "equivalent-exchange";
import * as YAML from "yaml";
import { commentsToString, parseComments } from "./comment-utils";

export type Frontmatter = {
  raw: string;
  parsed: { [key: PropertyKey]: any };
};

export function getFrontmatter(ast: ee.types.Program): null | Frontmatter {
  const statements = ast.body;
  let getFirstComments: null | (() => Array<ee.types.Comment>) = null;
  let setFirstComments: null | ((value: Array<ee.types.Comment>) => void) =
    null;

  if (statements.length === 0) {
    if (ast.innerComments && ast.innerComments.length > 0) {
      getFirstComments = () => ast.innerComments!;
      setFirstComments = (value) => (ast.innerComments = value);
    }
  } else {
    const firstStatement = statements[0];
    if (
      firstStatement.leadingComments &&
      firstStatement.leadingComments.length > 0
    ) {
      getFirstComments = () => firstStatement.leadingComments!;
      setFirstComments = (value) => (firstStatement.leadingComments = value);
    }
  }

  if (getFirstComments == null) {
    return null;
  }
  const firstComments = getFirstComments();
  const parsedComments = parseComments(firstComments);
  const firstParsedComment = parsedComments[0];

  if (firstParsedComment == null) {
    return null;
  }

  const values = commentsToString([firstParsedComment]);

  const valuesTrim = values.trim();
  if (/^---[\r\n]/.test(valuesTrim) && /[\r\n]---$/.test(valuesTrim)) {
    // Looks like frontmatter
    const withoutDashes = valuesTrim.replace(/^---|---$/g, "");
    const parsed = YAML.parse(withoutDashes);

    // Remove so print-node doesn't re-print it
    setFirstComments!(firstComments.slice(1));

    return {
      raw: values,
      parsed,
    };
  }

  return null;
}
