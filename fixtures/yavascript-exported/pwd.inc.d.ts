/**
 * Returns the process's current working directory.
 *
 * Provides the same functionality as the shell builtin of the same name.
 */
export const pwd: {
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
