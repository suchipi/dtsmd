import * as ee from "equivalent-exchange";
import * as YAML from "yaml";
import { commentsToString } from "./comments-to-string";

export type Frontmatter = {
  raw: string;
  parsed: { [key: PropertyKey]: any };
};

export function getFrontmatter(ast: ee.types.Program): null | Frontmatter {
  const statements = ast.body;

  let firstComments: Array<ee.types.Comment> = [];
  if (statements.length === 0) {
    if (ast.innerComments && ast.innerComments.length > 0) {
      firstComments.push(...ast.innerComments);
    }
  } else {
    const firstStatement = statements[0];
    if (
      firstStatement.leadingComments &&
      firstStatement.leadingComments.length > 0
    ) {
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
