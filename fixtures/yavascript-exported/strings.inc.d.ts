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
