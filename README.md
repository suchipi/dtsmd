# `@suchipi/dtsmd`

A CLI program that generates a Markdown document describing the contents of a TypeScript `.d.ts` file.

## Installation

```sh
npm install @suchipi/dtsmd
# now you can run it with `npx dtsmd`
```

## Usage (CLI)

```sh
Usage: dtsmd [options] [input-file]
Options:
  -i,--input-file: Path to a .d.ts file (default stdin)
  -o,--output-file: Path to the generated .md file (default stdout)
  -h,--help: Print this text
  --heading-offset: Increase all heading levels by the specified amount (number)
  --links-json: JSON5-encoded object whose keys are link names and whose values are URLs/paths, for JSDoc `@link` tags in comments
  --links-file: Path to file containing JSON5-encoded object whose keys are link names and whose values are URLs/paths, for JSDoc `@link` tags in comments
  --print-ast: Instead of generating markdown, print the AST of the input file (for debugging)

```

A Markdown document will be printed with headings for all the declarations/exports in the `.d.ts` file, with any leading doc comments (inline comments starting with `/**`) printed under each heading.

Line comments (starting with `//`) will not be printed (except for yaml frontmatter comments; see below heading on frontmatter).

For example, if you have a file `myfile.d.ts` with this content:

```ts
/** The version of the library. */
export const VERSION: string;

/**
 * Does something with the numbers.
 *
 * Returns a nice number.
 */
export function myFunction(...args: Array<number>): number;
```

The following command:

```sh
$ npx dtsmd myfile.d.ts
```

Will print:

````md
# VERSION (exported string)

The version of the library.

```ts
const VERSION: string;
```

# myFunction (exported function)

Does something with the numbers.

Returns a nice number.

```ts
export function myFunction(...args: Array<number>): number;
```
````

### Heading Offset

If you are going to insert the result to another markdown document, it can be useful to increase the heading offset. This causes the output heading levels to start at a higher value.

Using the same `myfile.d.ts` from above, the command:

```sh
$ npx dtsmd myfile.d.ts --heading-offset 2
```

Prints:

````md
### VERSION (exported string)

The version of the library.

```ts
const VERSION: string;
```

### myFunction (exported function)

Does something with the numbers.

Returns a nice number.

```ts
export function myFunction(...args: Array<number>): number;
```
````

### Frontmatter

You can specify yaml frontmatter for the generated markdown file via a JS comment at the top of the file containing the yaml frontmatter.

Consider the following file, `with-frontmatter.d.ts`:

```ts
// ---
// title: "My Library"
// ---

/**
 * I just think it's neat.
 */
export const something: string;
```

The frontmatter specified in the comment will be printed at the top of the markdown document. Additionally, if the key "title" is present in the frontmatter, it will be placed at the top of the document as a heading. Therefore, the following command:

```sh
$ npx dtsmd with-frontmatter.d.ts
```

Will print:

````md
---
title: "My Library"
---

# My Library

## something (exported string)

I just think it's neat.

```ts
const something: string;
```
````

## Usage (Node API)

```js
const dtsmd = require("@suchipi/dtsmd");

const myDts = `
// ---
// title: "My Library"
// ---

/**
 * I just think it's neat.
 */
export const something: string;
`;

dtsmd
  .processSource(myDts, {
    fileName: "/tmp/myfile.d.ts",
    headingOffset: 0, // optional; defaults to 0
  })
  .then((result) => {
    // type of result is:
    // {
    //   frontmatter: null | { raw: string, parsed: { [key: string]: any } },
    //   markdown: string
    // }

    console.log(result.markdown);
  });
```

The above script will print:

````md
---
title: "My Library"
---

# My Library

## something (exported string)

I just think it's neat.

```ts
const something: string;
```
````

## License

MIT
