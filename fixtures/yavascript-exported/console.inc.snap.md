<!-- INPUT:
/**
 * Clear the contents and scrollback buffer of the tty by printing special characters into stdout.
 */
export function clear(): void;

interface Console {
  /** Same as {@link clear}(). */
  clear: typeof clear;
}

-->
# clear (exported function)

Clear the contents and scrollback buffer of the tty by printing special characters into stdout.

```ts
function clear(): void;
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
