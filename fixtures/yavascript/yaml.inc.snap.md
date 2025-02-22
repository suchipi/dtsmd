<!-- INPUT:
declare const YAML: {
  /**
   * Parse a YAML document (`input`) into a JSON-compatible value.
   */
  parse(
    input: string,
    reviver?: (this: any, key: string, value: any) => any
  ): any;

  /**
   * Convert a JSON-compatible value into a YAML document.
   */
  stringify(
    input: any,
    replacer?:
      | ((this: any, key: string, value: any) => any)
      | (number | string)[]
      | null,
    indent?: number
  ): string;
};

-->
# YAML (object)

```ts
const YAML: {
  parse(
    input: string,
    reviver?: (this: any, key: string, value: any) => any,
  ): any;
  stringify(
    input: any,
    replacer?:
      | ((this: any, key: string, value: any) => any)
      | (number | string)[]
      | null,
    indent?: number,
  ): string;
};
```

## YAML.parse (method)

Parse a YAML document (`input`) into a JSON-compatible value.

```ts
parse(input: string, reviver?: (this: any, key: string, value: any) => any): any;
```

## YAML.stringify (method)

Convert a JSON-compatible value into a YAML document.

```ts
stringify(input: any, replacer?: ((this: any, key: string, value: any) => any) | (number | string)[] | null, indent?: number): string;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
