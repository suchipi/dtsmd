<!-- INPUT:
/**
 * Reads a symlink.
 *
 * Returns the target of the symlink, which may be absolute or relative.
 *
 * Provides the same functionality as the unix binary of the same name.
 */
export function readlink(path: string | Path): Path;

-->
# readlink (exported function)

Reads a symlink.

Returns the target of the symlink, which may be absolute or relative.

Provides the same functionality as the unix binary of the same name.

```ts
function readlink(path: string | Path): Path;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
