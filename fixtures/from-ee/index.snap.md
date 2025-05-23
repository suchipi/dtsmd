<!-- INPUT:
import traverse from "@babel/traverse";
import template from "@babel/template";
import * as types from "./types-ns";
import {
  AST,
  TransmuteOptions,
  ParseOptions,
  PrintOptions,
  TransmuteResult,
} from "./ee-types";
import * as printer from "./printer";
export {
  /** Re-export of @babel/traverse's default export. */
  traverse,
  /** Contains the named exports of both @babel/types and @babel/traverse. */
  types,
  /** Re-export of @babel/template's default export. */
  template,
  AST,
  TransmuteOptions,
  ParseOptions,
  PrintOptions,
  TransmuteResult,
};
export declare const parse: (source: string, options?: ParseOptions) => any;
export declare const print: typeof printer.print;
interface CodeToAst {
  (code: string): AST;
  (
    code: string,
    options: TransmuteOptions & {
      expression: true;
    },
  ): types.Node;
  (
    code: string,
    options: TransmuteOptions & {
      expression: false;
    },
  ): AST;
  (
    code: string,
    options: TransmuteOptions & {
      expression: boolean;
    },
  ): types.Node;
  (code: string, options: TransmuteOptions): AST;
}
/**
 * Parses a JavaScript/TypeScript code string into an AST.
 *
 * This function is used internally by `transmute`.
 *
 * The options parameter works the same as the options parameter for `transmute`.
 */
export declare const codeToAst: CodeToAst;
/**
 * Converts an AST back into a code string.
 *
 * This function is used internally by `transmute`.
 *
 * The options parameter works the same as the options parameter for `transmute`.
 */
export declare function astToCode(
  ast: types.Node,
  options?: TransmuteOptions,
): TransmuteResult;
type Clonable =
  | {}
  | number
  | string
  | null
  | undefined
  | boolean
  | Array<Clonable>;
export declare function clone<T extends Clonable>(input: T): T;
export declare function hasShape<Input, Shape>(
  input: Input,
  shape: Shape,
): input is Input & Shape;
/**
 * The interface of the `transmute` function, which has 4 different call signatures.
 */
export interface Transmute {
  /**
   * Parses `code` into an AST, then passes that to `transform`, which
   * is expected to mutate the AST somehow.
   *
   * Once the Promise returned by `transform` has resolved, it converts
   * the AST back into a string, and returns you a `TransmuteResult`,
   * which has the transformed string on it as its `code` property.
   */
  (
    code: string,
    transform: (ast: AST) => Promise<void>,
  ): Promise<TransmuteResult>;
  /**
   * Parses `code` into an AST, then passes that to `transform`, which
   * is expected to mutate the AST somehow.
   *
   * Once the Promise returned by `transform` has resolved, it converts
   * the AST back into a string, and returns you a `TransmuteResult`,
   * which has the transformed string on it as its `code` property.
   *
   * The contents of `options` will determine what syntax options to use
   * to parse the code, and whether to consume/generate source maps.
   * See the definition for `TransmuteOptions` for more details.
   */
  (
    code: string,
    options: TransmuteOptions,
    transform: (ast: types.Node) => Promise<void>,
  ): Promise<TransmuteResult>;
  /**
   * Parses `code` into an AST, then passes that to `transform`, which
   * is expected to mutate the AST somehow.
   *
   * Then, it converts the AST back into a string, and returns you a
   * `TransmuteResult`, which has the transformed string on it as its
   * `code` property.
   */
  (code: string, transform: (ast: AST) => void): TransmuteResult;
  /**
   * Parses `code` into an AST, then passes that to `transform`, which
   * is expected to mutate the AST somehow.
   *
   * Then, it converts the AST back into a string, and returns you a
   * `TransmuteResult`, which has the transformed string on it as its
   * `code` property.
   *
   * The contents of `options` will determine what syntax options to use
   * to parse the code, and whether to consume/generate source maps.
   * See the definition for `TransmuteOptions` for more details.
   */
  (
    code: string,
    options: TransmuteOptions,
    transform: (ast: types.Node) => void,
  ): TransmuteResult;
}
export declare const transmute: Transmute;

-->
# traverse (exported binding)

Re-export of @babel/traverse's default export.

```ts
export { traverse };
```

# types (exported binding)

Contains the named exports of both @babel/types and @babel/traverse.

```ts
export { types };
```

# template (exported binding)

Re-export of @babel/template's default export.

```ts
export { template };
```

# AST (exported binding)

```ts
export { AST };
```

# TransmuteOptions (exported binding)

```ts
export { TransmuteOptions };
```

# ParseOptions (exported binding)

```ts
export { ParseOptions };
```

# PrintOptions (exported binding)

```ts
export { PrintOptions };
```

# TransmuteResult (exported binding)

```ts
export { TransmuteResult };
```

# parse (exported function)

```ts
const parse: (source: string, options?: ParseOptions) => any;
```

# print (exported value)

```ts
const print: typeof printer.print;
```

# CodeToAst (interface)

```ts
interface CodeToAst {
  (code: string): AST;
  (
    code: string,
    options: TransmuteOptions & {
      expression: true;
    },
  ): types.Node;
  (
    code: string,
    options: TransmuteOptions & {
      expression: false;
    },
  ): AST;
  (
    code: string,
    options: TransmuteOptions & {
      expression: boolean;
    },
  ): types.Node;
  (code: string, options: TransmuteOptions): AST;
}
```

## CodeToAst(...) (call signature)

```ts
(code: string): AST;
```

## CodeToAst(...) (call signature)

```ts
(code: string, options: TransmuteOptions & {
  expression: true;
}): types.Node;
```

## CodeToAst(...) (call signature)

```ts
(code: string, options: TransmuteOptions & {
  expression: false;
}): AST;
```

## CodeToAst(...) (call signature)

```ts
(code: string, options: TransmuteOptions & {
  expression: boolean;
}): types.Node;
```

## CodeToAst(...) (call signature)

```ts
(code: string, options: TransmuteOptions): AST;
```

# codeToAst (exported CodeToAst)

Parses a JavaScript/TypeScript code string into an AST.

This function is used internally by `transmute`.

The options parameter works the same as the options parameter for `transmute`.

```ts
const codeToAst: CodeToAst;
```

# astToCode (exported function)

Converts an AST back into a code string.

This function is used internally by `transmute`.

The options parameter works the same as the options parameter for `transmute`.

```ts
declare function astToCode(
  ast: types.Node,
  options?: TransmuteOptions,
): TransmuteResult;
```

# Clonable (type)

```ts
type Clonable =
  | {}
  | number
  | string
  | null
  | undefined
  | boolean
  | Array<Clonable>;
```

# clone (exported function)

```ts
declare function clone<T extends Clonable>(input: T): T;
```

# hasShape (exported function)

```ts
declare function hasShape<Input, Shape>(
  input: Input,
  shape: Shape,
): input is Input & Shape;
```

# Transmute (exported interface)

The interface of the `transmute` function, which has 4 different call signatures.

```ts
interface Transmute {
  (
    code: string,
    transform: (ast: AST) => Promise<void>,
  ): Promise<TransmuteResult>;
  (
    code: string,
    options: TransmuteOptions,
    transform: (ast: types.Node) => Promise<void>,
  ): Promise<TransmuteResult>;
  (code: string, transform: (ast: AST) => void): TransmuteResult;
  (
    code: string,
    options: TransmuteOptions,
    transform: (ast: types.Node) => void,
  ): TransmuteResult;
}
```

## Transmute(...) (call signature)

Parses `code` into an AST, then passes that to `transform`, which
is expected to mutate the AST somehow.

Once the Promise returned by `transform` has resolved, it converts
the AST back into a string, and returns you a `TransmuteResult`,
which has the transformed string on it as its `code` property.

```ts
(code: string, transform: (ast: AST) => Promise<void>): Promise<TransmuteResult>;
```

## Transmute(...) (call signature)

Parses `code` into an AST, then passes that to `transform`, which
is expected to mutate the AST somehow.

Once the Promise returned by `transform` has resolved, it converts
the AST back into a string, and returns you a `TransmuteResult`,
which has the transformed string on it as its `code` property.

The contents of `options` will determine what syntax options to use
to parse the code, and whether to consume/generate source maps.
See the definition for `TransmuteOptions` for more details.

```ts
(code: string, options: TransmuteOptions, transform: (ast: types.Node) => Promise<void>): Promise<TransmuteResult>;
```

## Transmute(...) (call signature)

Parses `code` into an AST, then passes that to `transform`, which
is expected to mutate the AST somehow.

Then, it converts the AST back into a string, and returns you a
`TransmuteResult`, which has the transformed string on it as its
`code` property.

```ts
(code: string, transform: (ast: AST) => void): TransmuteResult;
```

## Transmute(...) (call signature)

Parses `code` into an AST, then passes that to `transform`, which
is expected to mutate the AST somehow.

Then, it converts the AST back into a string, and returns you a
`TransmuteResult`, which has the transformed string on it as its
`code` property.

The contents of `options` will determine what syntax options to use
to parse the code, and whether to consume/generate source maps.
See the definition for `TransmuteOptions` for more details.

```ts
(code: string, options: TransmuteOptions, transform: (ast: types.Node) => void): TransmuteResult;
```

# transmute (exported Transmute)

```ts
const transmute: Transmute;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
