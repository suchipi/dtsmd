<!-- INPUT:
/**
 * Reads the contents of one or more files from disk as either one UTF-8 string
 * or one ArrayBuffer.
 */
export const cat: {
  /**
   * Read the contents of one or more files from disk, as one UTF-8 string.
   */
  (paths: string | Path | Array<string | Path>): string;

  /**
   * Read the contents of one or more files from disk, as one UTF-8 string.
   */
  (paths: string | Path | Array<string | Path>, options: {}): string;

  /**
   * Read the contents of one or more files from disk, as one UTF-8 string.
   */
  (
    paths: string | Path | Array<string | Path>,
    options: { binary: false }
  ): string;

  /**
   * Read the contents of one or more files from disk, as one ArrayBuffer.
   */
  (
    paths: string | Path | Array<string | Path>,
    options: { binary: true }
  ): ArrayBuffer;
};

-->
# cat (exported function)

Reads the contents of one or more files from disk as either one UTF-8 string
or one ArrayBuffer.

```ts
const cat: {
  (paths: string | Path | Array<string | Path>): string;
  (paths: string | Path | Array<string | Path>, options: {}): string;
  (
    paths: string | Path | Array<string | Path>,
    options: {
      binary: false;
    },
  ): string;
  (
    paths: string | Path | Array<string | Path>,
    options: {
      binary: true;
    },
  ): ArrayBuffer;
};
```

## cat(...) (call signature)

Read the contents of one or more files from disk, as one UTF-8 string.

```ts
(paths: string | Path | Array<string | Path>): string;
```

## cat(...) (call signature)

Read the contents of one or more files from disk, as one UTF-8 string.

```ts
(paths: string | Path | Array<string | Path>, options: {}): string;
```

## cat(...) (call signature)

Read the contents of one or more files from disk, as one UTF-8 string.

```ts
(paths: string | Path | Array<string | Path>, options: {
  binary: false;
}): string;
```

## cat(...) (call signature)

Read the contents of one or more files from disk, as one ArrayBuffer.

```ts
(paths: string | Path | Array<string | Path>, options: {
  binary: true;
}): ArrayBuffer;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
