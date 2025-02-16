# `@suchipi/dtsmd`

A CLI program that generates a Markdown document describing the contents of a TypeScript `.d.ts` file.

## Installation

```sh
npm install @suchipi/dtsmd
# now you can run it with `npx dtsmd`
```

## Usage (CLI)

```sh
#RUN("dist/cli.js --help")
```

A Markdown document will be printed with headings for all the declarations/exports in the `.d.ts` file, with any leading doc comments (inline comments starting with `/**`) printed under each heading.

Line comments (starting with `//`) will not be printed (except for yaml frontmatter comments; see below heading on frontmatter).

For example, if you have a file `myfile.d.ts` with this content:

```ts
#INCLUDE("readme-generator/templates/myfile.d.ts")
```

The following command:

```sh
$ npx dtsmd myfile.d.ts
```

Will print:

````md
#RUN("dist/cli.js readme-generator/templates/myfile.d.ts")
````

### Heading Offset

If you are going to insert the result to another markdown document, it can be useful to increase the heading offset. This causes the output heading levels to start at a higher value.

Using the same `myfile.d.ts` from above, the command:

```sh
$ npx dtsmd myfile.d.ts --heading-offset 2
```

Prints:

````md
#RUN("dist/cli.js readme-generator/templates/myfile.d.ts --heading-offset 2")
````

### Frontmatter

You can specify yaml frontmatter for the generated markdown file via a JS comment at the top of the file containing the yaml frontmatter.

Consider the following file, `with-frontmatter.d.ts`:

```ts
#INCLUDE("readme-generator/templates/with-frontmatter.d.ts")
```

The frontmatter specified in the comment will be printed at the top of the markdown document. Additionally, if the key "title" is present in the frontmatter, it will be placed at the top of the document as a heading. Therefore, the following command:

```sh
$ npx dtsmd with-frontmatter.d.ts
```

Will print:

````md
#RUN("dist/cli.js readme-generator/templates/with-frontmatter.d.ts")
````

## Usage (Node API)

```js
#INCLUDE("readme-generator/templates/node-api.js")
```

The above script will print:

````md
#RUN("node readme-generator/templates/node-api.js")
````

## License

MIT
