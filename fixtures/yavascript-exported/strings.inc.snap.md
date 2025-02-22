<!-- INPUT:
/**
 * Remove ANSI control characters from a string.
 */
export function stripAnsi(input: string | number | Path): string;

/**
 * Wrap a string in double quotes, and escape any double-quotes inside using `\"`.
 */
export function quote(input: string | number | Path): string;

// Colors

/** Wrap a string with the ANSI control characters that will make it print as black text. */
export function black(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print as red text. */
export function red(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print as green text. */
export function green(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print as yellow text. */
export function yellow(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print as blue text. */
export function blue(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print as magenta text. */
export function magenta(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print as cyan text. */
export function cyan(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print as white text. */
export function white(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print as gray text. */
export function gray(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print as grey text. */
export function grey(input: string | number | Path): string;

// Background Colors

/** Wrap a string with the ANSI control characters that will make it have a black background. */
export function bgBlack(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it have a red background. */
export function bgRed(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it have a green background. */
export function bgGreen(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it have a yellow background. */
export function bgYellow(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it have a blue background. */
export function bgBlue(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it have a magenta background. */
export function bgMagenta(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it have a cyan background. */
export function bgCyan(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it have a white background. */
export function bgWhite(input: string | number | Path): string;

// Modifiers

/** Wrap a string with the ANSI control character that resets all styling. */
export function reset(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print with a bold style. */
export function bold(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print with a dimmed style. */
export function dim(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print italicized. */
export function italic(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print underlined. */
export function underline(input: string | number | Path): string;
/** Wrap a string with ANSI control characters such that its foreground (text) and background colors are swapped. */
export function inverse(input: string | number | Path): string;
/** Wrap a string with ANSI control characters such that it is hidden. */
export function hidden(input: string | number | Path): string;
/** Wrap a string with the ANSI control characters that will make it print with a horizontal line through its center. */
export function strikethrough(input: string | number | Path): string;

-->
# stripAnsi (exported function)

Remove ANSI control characters from a string.

```ts
function stripAnsi(input: string | number | Path): string;
```

# quote (exported function)

Wrap a string in double quotes, and escape any double-quotes inside using `\"`.

```ts
function quote(input: string | number | Path): string;
```

# black (exported function)

Wrap a string with the ANSI control characters that will make it print as black text.

```ts
function black(input: string | number | Path): string;
```

# red (exported function)

Wrap a string with the ANSI control characters that will make it print as red text.

```ts
function red(input: string | number | Path): string;
```

# green (exported function)

Wrap a string with the ANSI control characters that will make it print as green text.

```ts
function green(input: string | number | Path): string;
```

# yellow (exported function)

Wrap a string with the ANSI control characters that will make it print as yellow text.

```ts
function yellow(input: string | number | Path): string;
```

# blue (exported function)

Wrap a string with the ANSI control characters that will make it print as blue text.

```ts
function blue(input: string | number | Path): string;
```

# magenta (exported function)

Wrap a string with the ANSI control characters that will make it print as magenta text.

```ts
function magenta(input: string | number | Path): string;
```

# cyan (exported function)

Wrap a string with the ANSI control characters that will make it print as cyan text.

```ts
function cyan(input: string | number | Path): string;
```

# white (exported function)

Wrap a string with the ANSI control characters that will make it print as white text.

```ts
function white(input: string | number | Path): string;
```

# gray (exported function)

Wrap a string with the ANSI control characters that will make it print as gray text.

```ts
function gray(input: string | number | Path): string;
```

# grey (exported function)

Wrap a string with the ANSI control characters that will make it print as grey text.

```ts
function grey(input: string | number | Path): string;
```

# bgBlack (exported function)

Wrap a string with the ANSI control characters that will make it have a black background.

```ts
function bgBlack(input: string | number | Path): string;
```

# bgRed (exported function)

Wrap a string with the ANSI control characters that will make it have a red background.

```ts
function bgRed(input: string | number | Path): string;
```

# bgGreen (exported function)

Wrap a string with the ANSI control characters that will make it have a green background.

```ts
function bgGreen(input: string | number | Path): string;
```

# bgYellow (exported function)

Wrap a string with the ANSI control characters that will make it have a yellow background.

```ts
function bgYellow(input: string | number | Path): string;
```

# bgBlue (exported function)

Wrap a string with the ANSI control characters that will make it have a blue background.

```ts
function bgBlue(input: string | number | Path): string;
```

# bgMagenta (exported function)

Wrap a string with the ANSI control characters that will make it have a magenta background.

```ts
function bgMagenta(input: string | number | Path): string;
```

# bgCyan (exported function)

Wrap a string with the ANSI control characters that will make it have a cyan background.

```ts
function bgCyan(input: string | number | Path): string;
```

# bgWhite (exported function)

Wrap a string with the ANSI control characters that will make it have a white background.

```ts
function bgWhite(input: string | number | Path): string;
```

# reset (exported function)

Wrap a string with the ANSI control character that resets all styling.

```ts
function reset(input: string | number | Path): string;
```

# bold (exported function)

Wrap a string with the ANSI control characters that will make it print with a bold style.

```ts
function bold(input: string | number | Path): string;
```

# dim (exported function)

Wrap a string with the ANSI control characters that will make it print with a dimmed style.

```ts
function dim(input: string | number | Path): string;
```

# italic (exported function)

Wrap a string with the ANSI control characters that will make it print italicized.

```ts
function italic(input: string | number | Path): string;
```

# underline (exported function)

Wrap a string with the ANSI control characters that will make it print underlined.

```ts
function underline(input: string | number | Path): string;
```

# inverse (exported function)

Wrap a string with ANSI control characters such that its foreground (text) and background colors are swapped.

```ts
function inverse(input: string | number | Path): string;
```

# hidden (exported function)

Wrap a string with ANSI control characters such that it is hidden.

```ts
function hidden(input: string | number | Path): string;
```

# strikethrough (exported function)

Wrap a string with the ANSI control characters that will make it print with a horizontal line through its center.

```ts
function strikethrough(input: string | number | Path): string;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
