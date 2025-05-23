<!-- INPUT:
/**
 * Options for {@link glob}.
 */
export type GlobOptions = {
  /**
   * Whether to treat symlinks to directories as if they themselves were
   * directories, traversing into them.
   *
   * Defaults to false.
   */
  followSymlinks?: boolean;

  /** Options which control logging. */
  logging?: {
    /**
     * If provided, this function will be called multiple times as `glob`
     * traverses the filesystem, to help you understand what's going on and/or
     * troubleshoot things. In most cases, it makes sense to use a logging
     * function here, like so:
     *
     * ```js
     * glob(["./*.js"], {
     *  logging: { trace: console.log }
     * });
     * ```
     *
     * Defaults to the current value of {@link logger.trace}. `logger.trace`
     * defaults to a no-op function.
     */
    trace?: (...args: Array<any>) => void;

    /**
     * An optional, user-provided logging function to be used for informational
     * messages. Less verbose than `logging.trace`.
     *
     * Defaults to the current value of {@link logger.info}. `logger.info`
     * defaults to a function which writes to stderr.
     */
    info?: (...args: Array<any>) => void;
  };

  /**
   * Directory to interpret glob patterns relative to. Defaults to `pwd()`.
   */
  dir?: string | Path;
};

/**
 * Search the filesystem for files matching the specified glob patterns.
 *
 * Uses [minimatch](https://www.npmjs.com/package/minimatch) with its default
 * options.
 */
export function glob(
  patterns: string | Array<string>,
  options?: GlobOptions
): Array<Path>;

-->
# GlobOptions (exported type)

Options for [glob](#).

```ts
type GlobOptions = {
  followSymlinks?: boolean;
  logging?: {
    trace?: (...args: Array<any>) => void;
    info?: (...args: Array<any>) => void;
  };
  dir?: string | Path;
};
```

## GlobOptions.followSymlinks (boolean property)

Whether to treat symlinks to directories as if they themselves were
directories, traversing into them.

Defaults to false.

```ts
followSymlinks?: boolean;
```

## GlobOptions.logging (object property)

Options which control logging.

```ts
logging?: {
  trace?: (...args: Array<any>) => void;
  info?: (...args: Array<any>) => void;
};
```

### GlobOptions.logging.trace (function property)

If provided, this function will be called multiple times as `glob`
traverses the filesystem, to help you understand what's going on and/or
troubleshoot things. In most cases, it makes sense to use a logging
function here, like so:

```js
glob(["./*.js"], {
  logging: { trace: console.log },
});
```

Defaults to the current value of [logger.trace](#). `logger.trace`
defaults to a no-op function.

```ts
trace?: (...args: Array<any>) => void;
```

### GlobOptions.logging.info (function property)

An optional, user-provided logging function to be used for informational
messages. Less verbose than `logging.trace`.

Defaults to the current value of [logger.info](#). `logger.info`
defaults to a function which writes to stderr.

```ts
info?: (...args: Array<any>) => void;
```

## GlobOptions.dir (property)

Directory to interpret glob patterns relative to. Defaults to `pwd()`.

```ts
dir?: string | Path;
```

# glob (exported function)

Search the filesystem for files matching the specified glob patterns.

Uses [minimatch](https://www.npmjs.com/package/minimatch) with its default
options.

```ts
function glob(
  patterns: string | Array<string>,
  options?: GlobOptions,
): Array<Path>;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[
  "No link URL provided for \"glob\"; falling back to \"#\"",
  "No link URL provided for \"logger.trace\"; falling back to \"#\"",
  "No link URL provided for \"logger.info\"; falling back to \"#\""
]
-->
