/**
 * Returns the contents of a directory, as absolute paths. `.` and `..` are
 * omitted.
 */
export function ls(dir?: string | Path): Array<Path>;
