<!-- INPUT:
/**
 * Launch the Yavascript REPL (read-eval-print-loop).
 *
 * @param context Variables to make available as globals within the repl.
 * @param lang The langauge to use in the repl. Defaults to "javascript".
 */
export const startRepl: {
  (
    context?: { [key: string]: any },
    lang?:
      | "js"
      | "javascript"
      | "ts"
      | "typescript"
      | "jsx"
      | "tsx"
      | "coffee"
      | "coffeescript"
      | "civet"
  ): void;

  /**
   * A special value; when expressions result in this value, the repl will
   * print nothing instead of printing this value.
   */
  NOTHING: symbol;
};

-->
# startRepl (exported function)

Launch the Yavascript REPL (read-eval-print-loop).

- `@param` _context_ — Variables to make available as globals within the repl.
- `@param` _lang_ — The langauge to use in the repl. Defaults to "javascript".

```ts
const startRepl: {
  (
    context?: {
      [key: string]: any;
    },
    lang?:
      | "js"
      | "javascript"
      | "ts"
      | "typescript"
      | "jsx"
      | "tsx"
      | "coffee"
      | "coffeescript"
      | "civet",
  ): void;
  NOTHING: symbol;
};
```

## startRepl(...) (call signature)

```ts
(context?: {
  [key: string]: any;
}, lang?: "js" | "javascript" | "ts" | "typescript" | "jsx" | "tsx" | "coffee" | "coffeescript" | "civet"): void;
```

## startRepl.NOTHING (symbol property)

A special value; when expressions result in this value, the repl will
print nothing instead of printing this value.

```ts
NOTHING: symbol;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
