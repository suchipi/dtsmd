/**
 * Clear the contents and scrollback buffer of the tty by printing special characters into stdout.
 */
export function clear(): void;

interface Console {
  /** Same as {@link clear}(). */
  clear: typeof clear;
}
