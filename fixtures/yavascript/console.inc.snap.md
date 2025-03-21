<!-- INPUT:
/**
 * Clear the contents and scrollback buffer of the tty by printing special characters into stdout.
 */
declare function clear(): void;

interface Console {
  /** Same as {@link clear}(). */
  clear: typeof clear;
}

-->
# clear (function)

Clear the contents and scrollback buffer of the tty by printing special characters into stdout.

```ts
declare function clear(): void;
```

# Console (interface)

```ts
interface Console {
  clear: typeof clear;
}
```

## Console.clear (property)

Same as [clear](#)().

```ts
clear: typeof clear;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[
  "No link URL provided for \"clear\"; falling back to \"#\""
]
-->
