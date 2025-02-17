<!-- INPUT:
/**
 * Read the contents of a file from disk.
 */
export const readFile: {
  /**
   * Read the contents of a file from disk, as a UTF-8 string.
   */
  (path: string | Path): string;

  /**
   * Read the contents of a file from disk, as a UTF-8 string.
   */
  (path: string | Path, options: {}): string;

  /**
   * Read the contents of a file from disk, as a UTF-8 string.
   */
  (path: string | Path, options: { binary: false }): string;

  /**
   * Read the contents of a file from disk, as an ArrayBuffer.
   */
  (path: string | Path, options: { binary: true }): ArrayBuffer;
};

/**
 * Write the contents of a string or ArrayBuffer to a file.
 *
 * Strings are written using the UTF-8 encoding.
 */
export function writeFile(
  path: string | Path,
  data: string | ArrayBuffer
): void;

/**
 * Function which returns true if the path points to a regular file.
 */
export function isFile(path: string | Path): boolean;

/**
 * Function which returns true if the path points to a directory, or if the
 * path points to a symlink which points to a directory. Otherwise, it returns
 * false.
 */
export function isDir(path: string | Path): boolean;

/**
 * Returns true if the path points to a symlink.
 */
export function isLink(path: string | Path): boolean;

/**
 * Returns true if the resource at the provided path can be executed by the
 * current user.
 *
 * If nothing exists at that path, an error will be thrown.
 */
export function isExecutable(path: string | Path): boolean;

/**
 * Returns true if the resource at the provided path can be read by the current
 * user.
 *
 * If nothing exists at that path, an error will be thrown.
 */
export function isReadable(path: string | Path): boolean;

/**
 * Returns true if a resource at the provided path could be written to by the
 * current user.
 */
export function isWritable(path: string | Path): boolean;

/**
 * Delete the file or directory at the specified path.
 *
 * If the directory isn't empty, its contents will be deleted, too.
 *
 * Provides the same functionality as the command `rm -rf`.
 */
export function remove(path: string | Path): void;

/**
 * Returns true if a file or directory exists at the specified path.
 *
 * Provides the same functionality as the command `test -e`.
 */
export function exists(path: string | Path): boolean;

/**
 * Options for {@link copy}.
 */
export type CopyOptions = {
  /**
   * What to do when attempting to copy something into a location where
   * something else already exists.
   *
   * Defaults to "error".
   */
  whenTargetExists?: "overwrite" | "skip" | "error";

  /** Options which control logging. */
  logging?: {
    /**
     * If provided, this function will be called multiple times as `copy`
     * traverses the filesystem, to help you understand what's going on and/or
     * troubleshoot things. In most cases, it makes sense to use a logging
     * function here, like so:
     *
     * ```js
     * copy("./source", "./destination", {
     *   logging: { trace: console.log },
     * });
     * ```
     *
     * Defaults to the current value of {@link logger.trace}. `logger.trace`
     * defaults to a no-op function.
     */
    trace?: (...args: Array<any>) => void;

    /**
     * An optional, user-provided logging function to be used for informational
     * messages.
     *
     * Defaults to the current value of {@link logger.info}. `logger.info`
     * defaults to a function which writes to stderr.
     */
    info?: (...args: Array<any>) => void;
  };
};

/**
 * Copies a file or folder from one location to another.
 * Folders are copied recursively.
 *
 * Provides the same functionality as the command `cp -R`.
 */
export function copy(
  from: string | Path,
  to: string | Path,
  options?: CopyOptions
): void;

/**
 * Rename the file or directory at the specified path.
 *
 * Provides the same functionality as the command `mv`.
 */
export function rename(from: string | Path, to: string | Path): void;

-->
# readFile (exported function)

Read the contents of a file from disk.

```ts
const readFile: {
  (path: string | Path): string;
  (path: string | Path, options: {}): string;
  (
    path: string | Path,
    options: {
      binary: false;
    },
  ): string;
  (
    path: string | Path,
    options: {
      binary: true;
    },
  ): ArrayBuffer;
};
```

## readFile(...) (call signature)

Read the contents of a file from disk, as a UTF-8 string.

```ts
(path: string | Path): string;
```

## readFile(...) (call signature)

Read the contents of a file from disk, as a UTF-8 string.

```ts
(path: string | Path, options: {}): string;
```

## readFile(...) (call signature)

Read the contents of a file from disk, as a UTF-8 string.

```ts
(path: string | Path, options: {
  binary: false;
}): string;
```

## readFile(...) (call signature)

Read the contents of a file from disk, as an ArrayBuffer.

```ts
(path: string | Path, options: {
  binary: true;
}): ArrayBuffer;
```

# writeFile (exported function)

Write the contents of a string or ArrayBuffer to a file.

Strings are written using the UTF-8 encoding.

```ts
function writeFile(path: string | Path, data: string | ArrayBuffer): void;
```

# isFile (exported function)

Function which returns true if the path points to a regular file.

```ts
function isFile(path: string | Path): boolean;
```

# isDir (exported function)

Function which returns true if the path points to a directory, or if the
path points to a symlink which points to a directory. Otherwise, it returns
false.

```ts
function isDir(path: string | Path): boolean;
```

# isLink (exported function)

Returns true if the path points to a symlink.

```ts
function isLink(path: string | Path): boolean;
```

# isExecutable (exported function)

Returns true if the resource at the provided path can be executed by the
current user.

If nothing exists at that path, an error will be thrown.

```ts
function isExecutable(path: string | Path): boolean;
```

# isReadable (exported function)

Returns true if the resource at the provided path can be read by the current
user.

If nothing exists at that path, an error will be thrown.

```ts
function isReadable(path: string | Path): boolean;
```

# isWritable (exported function)

Returns true if a resource at the provided path could be written to by the
current user.

```ts
function isWritable(path: string | Path): boolean;
```

# remove (exported function)

Delete the file or directory at the specified path.

If the directory isn't empty, its contents will be deleted, too.

Provides the same functionality as the command `rm -rf`.

```ts
function remove(path: string | Path): void;
```

# exists (exported function)

Returns true if a file or directory exists at the specified path.

Provides the same functionality as the command `test -e`.

```ts
function exists(path: string | Path): boolean;
```

# CopyOptions (exported type)

Options for [copy](#).

```ts
type CopyOptions = {
  whenTargetExists?: "overwrite" | "skip" | "error";
  logging?: {
    trace?: (...args: Array<any>) => void;
    info?: (...args: Array<any>) => void;
  };
};
```

## CopyOptions.whenTargetExists (property)

What to do when attempting to copy something into a location where
something else already exists.

Defaults to "error".

```ts
whenTargetExists?: "overwrite" | "skip" | "error";
```

## CopyOptions.logging (object property)

Options which control logging.

```ts
logging?: {
  trace?: (...args: Array<any>) => void;
  info?: (...args: Array<any>) => void;
};
```

### CopyOptions.logging.trace (function property)

If provided, this function will be called multiple times as `copy`
traverses the filesystem, to help you understand what's going on and/or
troubleshoot things. In most cases, it makes sense to use a logging
function here, like so:

```js
copy("./source", "./destination", {
  logging: { trace: console.log },
});
```

Defaults to the current value of [logger.trace](#). `logger.trace`
defaults to a no-op function.

```ts
trace?: (...args: Array<any>) => void;
```

### CopyOptions.logging.info (function property)

An optional, user-provided logging function to be used for informational
messages.

Defaults to the current value of [logger.info](#). `logger.info`
defaults to a function which writes to stderr.

```ts
info?: (...args: Array<any>) => void;
```

# copy (exported function)

Copies a file or folder from one location to another.
Folders are copied recursively.

Provides the same functionality as the command `cp -R`.

```ts
function copy(
  from: string | Path,
  to: string | Path,
  options?: CopyOptions,
): void;
```

# rename (exported function)

Rename the file or directory at the specified path.

Provides the same functionality as the command `mv`.

```ts
function rename(from: string | Path, to: string | Path): void;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[
  "No link URL provided for \"copy\"; falling back to \"#\"",
  "No link URL provided for \"logger.trace\"; falling back to \"#\"",
  "No link URL provided for \"logger.info\"; falling back to \"#\""
]
-->
