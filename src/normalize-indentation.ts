// This file derived from @suchipi/match-inline-snapshot, MIT license, with
// permission (I'm me)
export type Options = {
  tabSize: number;
  output: "tabs" | "spaces";
};

export function normalizeIndentation(input: string, options: Options): string {
  const lines = input.split("\n");

  const linesWithTabsConverted = lines.map((line) => {
    if (line.startsWith("\t")) {
      return line.replace(/^\t+/, (tabs) => {
        return " ".repeat(tabs.length * options.tabSize);
      });
    } else {
      return line;
    }
  });

  const nonEmptyLines = linesWithTabsConverted.filter((line) => line.trim());

  let shortestLeadingSpaces = Infinity;
  for (const line of nonEmptyLines) {
    const matches = line.match(/^ +/);
    if (matches) {
      const spacesCount = matches["0"].length;
      if (shortestLeadingSpaces > spacesCount) {
        shortestLeadingSpaces = spacesCount;
      }
    } else {
      shortestLeadingSpaces = 0;
      break;
    }
  }

  if (shortestLeadingSpaces === Infinity) {
    shortestLeadingSpaces = 0;
  }

  const linesWithIndentationTrimmed = linesWithTabsConverted.map((line) => {
    if (line.startsWith(" ")) {
      return line.slice(shortestLeadingSpaces);
    } else {
      return line;
    }
  });

  switch (options.output) {
    case "tabs": {
      return linesWithIndentationTrimmed
        .map((line) => {
          return line.replace(
            new RegExp(`^(?: {${options.tabSize}})+`),
            (match) => {
              return "\t".repeat(match.length / options.tabSize);
            }
          );
        })
        .join("\n");
    }
    case "spaces": {
      return linesWithIndentationTrimmed.join("\n");
    }
    default: {
      throw new Error("Unexpected options.output value: " + options.output);
    }
  }
}
