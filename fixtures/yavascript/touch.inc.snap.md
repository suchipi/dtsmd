<!-- INPUT:
/**
 * If the file at `path` exists, update its creation/modification timestamps.
 *
 * Otherwise, create an empty file at that path.
 *
 * @param path The target path for the file.
 */
declare function touch(path: string | Path): void;

-->
# touch (function)

If the file at `path` exists, update its creation/modification timestamps.

Otherwise, create an empty file at that path.

- `@param` _path_ — The target path for the file.

```ts
declare function touch(path: string | Path): void;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
