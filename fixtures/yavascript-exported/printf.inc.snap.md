<!-- INPUT:
/**
 * Print data to stdout using C-style format specifiers.
 *
 * The same formats as the standard C library printf are supported. Integer
 * format types (e.g. `%d`) truncate the Numbers or BigInts to 32 bits. Use the l
 * modifier (e.g. `%ld`) to truncate to 64 bits.
 */
export function printf(format: string, ...args: Array<any>): void;

-->
# printf (exported function)

Print data to stdout using C-style format specifiers.

The same formats as the standard C library printf are supported. Integer
format types (e.g. `%d`) truncate the Numbers or BigInts to 32 bits. Use the l
modifier (e.g. `%ld`) to truncate to 64 bits.

```ts
function printf(format: string, ...args: Array<any>): void;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
