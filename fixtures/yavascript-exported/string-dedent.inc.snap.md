<!-- INPUT:
interface StringConstructor {
  /**
   * Remove leading minimum indentation from the string.
   * The first line of the string must be empty.
   *
   * https://github.com/tc39/proposal-string-dedent
   */
  dedent: {
    /**
     * Remove leading minimum indentation from the string.
     * The first line of the string must be empty.
     *
     * https://github.com/tc39/proposal-string-dedent
     */
    (input: string): string;

    /**
     * Remove leading minimum indentation from the template literal.
     * The first line of the string must be empty.
     *
     * https://github.com/tc39/proposal-string-dedent
     */
    (
      strings: readonly string[] | ArrayLike<string>,
      ...substitutions: unknown[]
    ): string;

    /**
     * Wrap another template tag function such that tagged literals
     * become dedented before being passed to the wrapped function.
     *
     * https://www.npmjs.com/package/string-dedent#usage
     */
    <
      Func extends (
        strings: readonly string[] | ArrayLike<string>,
        ...substitutions: any[]
      ) => string
    >(
      input: Func
    ): Func;
  };
}

-->
# StringConstructor (interface)

```ts
interface StringConstructor {
  dedent: {
    (input: string): string;
    (
      strings: readonly string[] | ArrayLike<string>,
      ...substitutions: unknown[]
    ): string;
    <
      Func extends (
        strings: readonly string[] | ArrayLike<string>,
        ...substitutions: any[]
      ) => string,
    >(
      input: Func,
    ): Func;
  };
}
```

## StringConstructor.dedent (function property)

Remove leading minimum indentation from the string.
The first line of the string must be empty.

https://github.com/tc39/proposal-string-dedent

```ts
dedent: {
  (input: string): string;
  (strings: readonly string[] | ArrayLike<string>, ...substitutions: unknown[]): string;
  <Func extends (strings: readonly string[] | ArrayLike<string>, ...substitutions: any[]) => string>(input: Func): Func;
};
```

### StringConstructor.dedent(...) (call signature)

Remove leading minimum indentation from the string.
The first line of the string must be empty.

https://github.com/tc39/proposal-string-dedent

```ts
(input: string): string;
```

### StringConstructor.dedent(...) (call signature)

Remove leading minimum indentation from the template literal.
The first line of the string must be empty.

https://github.com/tc39/proposal-string-dedent

```ts
(strings: readonly string[] | ArrayLike<string>, ...substitutions: unknown[]): string;
```

### StringConstructor.dedent(...) (call signature)

Wrap another template tag function such that tagged literals
become dedented before being passed to the wrapped function.

https://www.npmjs.com/package/string-dedent#usage

```ts
<Func extends (strings: readonly string[] | ArrayLike<string>, ...substitutions: any[]) => string>(input: Func): Func;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
