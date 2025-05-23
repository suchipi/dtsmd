<!-- INPUT:
/**
 * Blocks the current thread for at least the specified number of milliseconds,
 * but maybe a tiny bit longer.
 *
 * alias for `sleep.sync`.
 */
declare var sleep: {
  /**
   * Blocks the current thread for at least the specified number of milliseconds,
   * but maybe a tiny bit longer.
   *
   * alias for `sleep.sync`.
   *
   * @param milliseconds - The number of milliseconds to block for.
   */
  (milliseconds: number): void;

  /**
   * Blocks the current thread for at least the specified number of milliseconds,
   * but maybe a tiny bit longer.
   *
   * @param milliseconds - The number of milliseconds to block for.
   */
  sync(milliseconds: number): void;

  /**
   * Returns a Promise which resolves in at least the specified number of
   * milliseconds, maybe a little longer.
   *
   * @param milliseconds - The number of milliseconds to wait before the returned Promise should be resolved.
   */
  async(milliseconds: number): Promise<void>;
};

-->
# sleep (function)

Blocks the current thread for at least the specified number of milliseconds,
but maybe a tiny bit longer.

alias for `sleep.sync`.

```ts
var sleep: {
  (milliseconds: number): void;
  sync(milliseconds: number): void;
  async(milliseconds: number): Promise<void>;
};
```

## sleep(...) (call signature)

Blocks the current thread for at least the specified number of milliseconds,
but maybe a tiny bit longer.

alias for `sleep.sync`.

- `@param` _milliseconds_ — The number of milliseconds to block for.

```ts
(milliseconds: number): void;
```

## sleep.sync (method)

Blocks the current thread for at least the specified number of milliseconds,
but maybe a tiny bit longer.

- `@param` _milliseconds_ — The number of milliseconds to block for.

```ts
sync(milliseconds: number): void;
```

## sleep.async (method)

Returns a Promise which resolves in at least the specified number of
milliseconds, maybe a little longer.

- `@param` _milliseconds_ — The number of milliseconds to wait before the returned Promise should be resolved.

```ts
async(milliseconds: number): Promise<void>;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
