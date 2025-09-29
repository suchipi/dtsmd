<!-- INPUT:
/**
 * If the file at `path` exists, update its creation/modification timestamps.
 *
 * Otherwise, create an empty file at that path.
 *
 * @param path The target path for the file.
 */
export function touch(path: string | Path): void;

-->
# touch (exported function)

If the file at `path` exists, update its creation/modification timestamps.

Otherwise, create an empty file at that path.

- `@param` _path_ — The target path for the file.

```ts
export function touch(path: string | Path): void;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
