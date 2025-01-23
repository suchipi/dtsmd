import * as ee from "equivalent-exchange";
import * as YAML from "yaml";
import dedent from "dedent";

const debugLog = console.warn;

export type Options = {
  fileName?: string;
};

export function processSource(tsSource: string, options?: Options): string {
  const ast = ee.parse(tsSource, {
    typeSyntax: "typescript",
    jsxEnabled: true,
    fileName: options?.fileName,
  });
  ee.types.assertFile(ast);
  const program = ast.program;

  let text = "";

  const frontMatter = getFrontMatter(program);
  if (frontMatter) {
    text += frontMatter.raw + "\n";

    if (frontMatter.parsed.title) {
      text += `# ${frontMatter.parsed.title}\n\n`;
    }
  }

  const statements = program.body;

  for (const statement of statements) {
    text += `- ${statement.type}\n`;
  }

  return text;
}

function getFrontMatter(ast: ee.types.Program) {
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
        text += comment.value;
        break;
      }
    }
  }
  if (/[\n\r]/.test(text)) {
    text = dedent(text);
  }
  debugLog("commentsToString result", text);
  return text;
}
