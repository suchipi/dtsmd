<!-- INPUT:
/**
 * Change the process's current working directory to the specified path. If no
 * path is specified, moves to the user's home directory.
 *
 * Provides the same functionality as the shell builtin of the same name.
 */
declare function cd(path?: string | Path): void;

-->
# cd (function)

Change the process's current working directory to the specified path. If no
path is specified, moves to the user's home directory.

Provides the same functionality as the shell builtin of the same name.

```ts
declare function cd(path?: string | Path): void;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
