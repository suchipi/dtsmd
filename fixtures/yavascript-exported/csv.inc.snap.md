<!-- INPUT:
export const CSV: {
  /**
   * Parse a CSV string into an Array of Arrays of strings.
   *
   * The outer array holds the rows, and the inner arrays hold the items in
   * each row.
   */
  parse(input: string): Array<Array<string>>;

  /**
   * Convert an Array of Arrays of strings into a CSV string.
   *
   * The outer array holds the rows, and the inner arrays hold the items in
   * each row.
   */
  stringify(input: Array<Array<string>>): string;
};

-->
# CSV (exported object)

```ts
const CSV: {
  parse(input: string): Array<Array<string>>;
  stringify(input: Array<Array<string>>): string;
};
```

## CSV.parse (method)

Parse a CSV string into an Array of Arrays of strings.

The outer array holds the rows, and the inner arrays hold the items in
each row.

```ts
parse(input: string): Array<Array<string>>;
```

## CSV.stringify (method)

Convert an Array of Arrays of strings into a CSV string.

The outer array holds the rows, and the inner arrays hold the items in
each row.

```ts
stringify(input: Array<Array<string>>): string;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
