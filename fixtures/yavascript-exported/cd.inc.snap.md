<!-- INPUT:
/**
 * Change the process's current working directory to the specified path. If no
 * path is specified, moves to the user's home directory.
 *
 * Provides the same functionality as the shell builtin of the same name.
 */
export function cd(path?: string | Path): void;

-->
# cd (exported function)

Change the process's current working directory to the specified path. If no
path is specified, moves to the user's home directory.

Provides the same functionality as the shell builtin of the same name.

```ts
function cd(path?: string | Path): void;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
