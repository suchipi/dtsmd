<!-- INPUT:
/**
 * Get the absolute path given a relative path. Symlinks are also resolved.
 *
 * The path's target file/directory must exist.
 *
 * Provides the same functionality as the unix binary of the same name.
 */
export function realpath(path: string | Path): Path;

-->
# realpath (exported function)

Get the absolute path given a relative path. Symlinks are also resolved.

The path's target file/directory must exist.

Provides the same functionality as the unix binary of the same name.

```ts
function realpath(path: string | Path): Path;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
