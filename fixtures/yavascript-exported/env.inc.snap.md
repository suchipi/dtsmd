<!-- INPUT:
/**
 * An object representing the process's environment variables. You can read
 * from it to read environment variables, write into it to set environment
 * variables, and/or delete properties from it to unset environment variables.
 * Any value you write will be coerced into a string.
 */
export const env: { [key: string]: string | undefined };

-->
# env (exported object)

An object representing the process's environment variables. You can read
from it to read environment variables, write into it to set environment
variables, and/or delete properties from it to unset environment variables.
Any value you write will be coerced into a string.

```ts
const env: {
  [key: string]: string | undefined;
};
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
