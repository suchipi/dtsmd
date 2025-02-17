<!-- INPUT:
/**
 * Returns the process's current working directory.
 *
 * Provides the same functionality as the shell builtin of the same name.
 */
declare const pwd: {
  /**
   * Returns the process's current working directory.
   *
   * Provides the same functionality as the shell builtin of the same name.
   */
  (): Path;

  /**
   * A frozen, read-only `Path` object containing what `pwd()` was when
   * yavascript first started up.
   */
  readonly initial: Path;
};

-->
# pwd (function)

Returns the process's current working directory.

Provides the same functionality as the shell builtin of the same name.

```ts
const pwd: {
  (): Path;
  readonly initial: Path;
};
```

## pwd(...) (call signature)

Returns the process's current working directory.

Provides the same functionality as the shell builtin of the same name.

```ts
(): Path;
```

## pwd.initial (Path property)

A frozen, read-only `Path` object containing what `pwd()` was when
yavascript first started up.

```ts
readonly initial: Path;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
