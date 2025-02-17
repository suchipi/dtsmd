<!-- INPUT:
/** Split `str` on newline and then return lines matching `pattern`. */
export const grepString: {
  /** Split `str` on newline and then return lines matching `pattern`. */
  (str: string, pattern: string | RegExp): Array<string>;

  /** Split `str` on newline and then return lines matching `pattern`. */
  (
    str: string,
    pattern: string | RegExp,
    options: { inverse: false }
  ): Array<string>;

  /** Split `str` on newline and then return lines NOT matching `pattern`. */
  (
    str: string,
    pattern: string | RegExp,
    options: { inverse: true }
  ): Array<string>;

  /** Split `str` on newline and then return lines matching `pattern`. */
  (
    str: string,
    pattern: string | RegExp,
    options: { details: false }
  ): Array<string>;

  /** Split `str` on newline and then return lines matching `pattern`. */
  (
    str: string,
    pattern: string | RegExp,
    options: { inverse: false; details: false }
  ): Array<string>;

  /** Split `str` on newline and then return lines NOT matching `pattern`. */
  (
    str: string,
    pattern: string | RegExp,
    options: { inverse: true; details: false }
  ): Array<string>;

  /** Split `str` on newline and then return info about lines matching `pattern`. */
  (str: string, pattern: string | RegExp, options: { details: true }): Array<{
    lineNumber: number;
    lineContent: string;
    matches: RegExpMatchArray;
  }>;

  /** Split `str` on newline and then return info about lines matching `pattern`. */
  (
    str: string,
    pattern: string | RegExp,
    options: { inverse: false; details: true }
  ): Array<string>;

  /** Split `str` on newline and then return info about lines NOT matching `pattern`. */
  (
    str: string,
    pattern: string | RegExp,
    options: { inverse: true; details: true }
  ): Array<{
    lineNumber: number;
    lineContent: string;
    matches: RegExpMatchArray;
  }>;
};

/** Read the content at `path`, split it on newline, and then return lines matching `pattern`. */
export const grepFile: {
  /** Read the content at `path`, split it on newline,  and then return lines matching `pattern`. */
  (path: string | Path, pattern: string | RegExp): Array<string>;

  /** Read the content at `path`, split it on newline,  and then return lines matching `pattern`. */
  (
    path: string | Path,
    pattern: string | RegExp,
    options: { inverse: false }
  ): Array<string>;

  /** Read the content at `path`, split it on newline,  and then return lines NOT matching `pattern`. */
  (
    path: string | Path,
    pattern: string | RegExp,
    options: { inverse: true }
  ): Array<string>;

  /** Read the content at `path`, split it on newline,  and then return lines matching `pattern`. */
  (
    path: string | Path,
    pattern: string | RegExp,
    options: { details: false }
  ): Array<string>;

  /** Read the content at `path`, split it on newline,  and then return lines matching `pattern`. */
  (
    path: string | Path,
    pattern: string | RegExp,
    options: { inverse: false; details: false }
  ): Array<string>;

  /** Read the content at `path`, split it on newline,  and then return lines NOT matching `pattern`. */
  (
    path: string | Path,
    pattern: string | RegExp,
    options: { inverse: true; details: false }
  ): Array<string>;

  /** Read the content at `path`, split it on newline,  and then return info about lines matching `pattern`. */
  (
    path: string | Path,
    pattern: string | RegExp,
    options: { details: true }
  ): Array<{
    lineNumber: number;
    lineContent: string;
    matches: RegExpMatchArray;
  }>;

  /** Read the content at `path`, split it on newline,  and then return info about lines matching `pattern`. */
  (
    path: string | Path,
    pattern: string | RegExp,
    options: { inverse: false; details: true }
  ): Array<string>;

  /** Read the content at `path`, split it on newline,  and then return info about lines NOT matching `pattern`. */
  (
    path: string | Path,
    pattern: string | RegExp,
    options: { inverse: true; details: true }
  ): Array<{
    lineNumber: number;
    lineContent: string;
    matches: RegExpMatchArray;
  }>;
};

interface String {
  // Same as grepString but without the first argument.
  grep: {
    /** Split the string on newline and then return lines matching `pattern`. */
    (pattern: string | RegExp): Array<string>;

    /** Split the string on newline and then return lines matching `pattern`. */
    (pattern: string | RegExp, options: { inverse: false }): Array<string>;

    /** Split the string on newline and then return lines NOT matching `pattern`. */
    (pattern: string | RegExp, options: { inverse: true }): Array<string>;

    /** Split the string on newline and then return lines matching `pattern`. */
    (pattern: string | RegExp, options: { details: false }): Array<string>;

    /** Split the string on newline and then return lines matching `pattern`. */
    (
      pattern: string | RegExp,
      options: { inverse: false; details: false }
    ): Array<string>;

    /** Split the string on newline and then return lines NOT matching `pattern`. */
    (
      pattern: string | RegExp,
      options: { inverse: true; details: false }
    ): Array<string>;

    /** Split the string on newline and then return info about lines matching `pattern`. */
    (pattern: string | RegExp, options: { details: true }): Array<{
      lineNumber: number;
      lineContent: string;
      matches: RegExpMatchArray;
    }>;

    /** Split the string on newline and then return info about lines matching `pattern`. */
    (
      pattern: string | RegExp,
      options: { inverse: false; details: true }
    ): Array<string>;

    /** Split the string on newline and then return info about lines NOT matching `pattern`. */
    (
      pattern: string | RegExp,
      options: { inverse: true; details: true }
    ): Array<{
      lineNumber: number;
      lineContent: string;
      matches: RegExpMatchArray;
    }>;
  };
}

-->
# grepString (exported function)

Split `str` on newline and then return lines matching `pattern`.

```ts
const grepString: {
  (str: string, pattern: string | RegExp): Array<string>;
  (
    str: string,
    pattern: string | RegExp,
    options: {
      inverse: false;
    },
  ): Array<string>;
  (
    str: string,
    pattern: string | RegExp,
    options: {
      inverse: true;
    },
  ): Array<string>;
  (
    str: string,
    pattern: string | RegExp,
    options: {
      details: false;
    },
  ): Array<string>;
  (
    str: string,
    pattern: string | RegExp,
    options: {
      inverse: false;
      details: false;
    },
  ): Array<string>;
  (
    str: string,
    pattern: string | RegExp,
    options: {
      inverse: true;
      details: false;
    },
  ): Array<string>;
  (
    str: string,
    pattern: string | RegExp,
    options: {
      details: true;
    },
  ): Array<{
    lineNumber: number;
    lineContent: string;
    matches: RegExpMatchArray;
  }>;
  (
    str: string,
    pattern: string | RegExp,
    options: {
      inverse: false;
      details: true;
    },
  ): Array<string>;
  (
    str: string,
    pattern: string | RegExp,
    options: {
      inverse: true;
      details: true;
    },
  ): Array<{
    lineNumber: number;
    lineContent: string;
    matches: RegExpMatchArray;
  }>;
};
```

## grepString(...) (call signature)

Split `str` on newline and then return lines matching `pattern`.

```ts
(str: string, pattern: string | RegExp): Array<string>;
```

## grepString(...) (call signature)

Split `str` on newline and then return lines matching `pattern`.

```ts
(str: string, pattern: string | RegExp, options: {
  inverse: false;
}): Array<string>;
```

## grepString(...) (call signature)

Split `str` on newline and then return lines NOT matching `pattern`.

```ts
(str: string, pattern: string | RegExp, options: {
  inverse: true;
}): Array<string>;
```

## grepString(...) (call signature)

Split `str` on newline and then return lines matching `pattern`.

```ts
(str: string, pattern: string | RegExp, options: {
  details: false;
}): Array<string>;
```

## grepString(...) (call signature)

Split `str` on newline and then return lines matching `pattern`.

```ts
(str: string, pattern: string | RegExp, options: {
  inverse: false;
  details: false;
}): Array<string>;
```

## grepString(...) (call signature)

Split `str` on newline and then return lines NOT matching `pattern`.

```ts
(str: string, pattern: string | RegExp, options: {
  inverse: true;
  details: false;
}): Array<string>;
```

## grepString(...) (call signature)

Split `str` on newline and then return info about lines matching `pattern`.

```ts
(str: string, pattern: string | RegExp, options: {
  details: true;
}): Array<{
  lineNumber: number;
  lineContent: string;
  matches: RegExpMatchArray;
}>;
```

## grepString(...) (call signature)

Split `str` on newline and then return info about lines matching `pattern`.

```ts
(str: string, pattern: string | RegExp, options: {
  inverse: false;
  details: true;
}): Array<string>;
```

## grepString(...) (call signature)

Split `str` on newline and then return info about lines NOT matching `pattern`.

```ts
(str: string, pattern: string | RegExp, options: {
  inverse: true;
  details: true;
}): Array<{
  lineNumber: number;
  lineContent: string;
  matches: RegExpMatchArray;
}>;
```

# grepFile (exported function)

Read the content at `path`, split it on newline, and then return lines matching `pattern`.

```ts
const grepFile: {
  (path: string | Path, pattern: string | RegExp): Array<string>;
  (
    path: string | Path,
    pattern: string | RegExp,
    options: {
      inverse: false;
    },
  ): Array<string>;
  (
    path: string | Path,
    pattern: string | RegExp,
    options: {
      inverse: true;
    },
  ): Array<string>;
  (
    path: string | Path,
    pattern: string | RegExp,
    options: {
      details: false;
    },
  ): Array<string>;
  (
    path: string | Path,
    pattern: string | RegExp,
    options: {
      inverse: false;
      details: false;
    },
  ): Array<string>;
  (
    path: string | Path,
    pattern: string | RegExp,
    options: {
      inverse: true;
      details: false;
    },
  ): Array<string>;
  (
    path: string | Path,
    pattern: string | RegExp,
    options: {
      details: true;
    },
  ): Array<{
    lineNumber: number;
    lineContent: string;
    matches: RegExpMatchArray;
  }>;
  (
    path: string | Path,
    pattern: string | RegExp,
    options: {
      inverse: false;
      details: true;
    },
  ): Array<string>;
  (
    path: string | Path,
    pattern: string | RegExp,
    options: {
      inverse: true;
      details: true;
    },
  ): Array<{
    lineNumber: number;
    lineContent: string;
    matches: RegExpMatchArray;
  }>;
};
```

## grepFile(...) (call signature)

Read the content at `path`, split it on newline, and then return lines matching `pattern`.

```ts
(path: string | Path, pattern: string | RegExp): Array<string>;
```

## grepFile(...) (call signature)

Read the content at `path`, split it on newline, and then return lines matching `pattern`.

```ts
(path: string | Path, pattern: string | RegExp, options: {
  inverse: false;
}): Array<string>;
```

## grepFile(...) (call signature)

Read the content at `path`, split it on newline, and then return lines NOT matching `pattern`.

```ts
(path: string | Path, pattern: string | RegExp, options: {
  inverse: true;
}): Array<string>;
```

## grepFile(...) (call signature)

Read the content at `path`, split it on newline, and then return lines matching `pattern`.

```ts
(path: string | Path, pattern: string | RegExp, options: {
  details: false;
}): Array<string>;
```

## grepFile(...) (call signature)

Read the content at `path`, split it on newline, and then return lines matching `pattern`.

```ts
(path: string | Path, pattern: string | RegExp, options: {
  inverse: false;
  details: false;
}): Array<string>;
```

## grepFile(...) (call signature)

Read the content at `path`, split it on newline, and then return lines NOT matching `pattern`.

```ts
(path: string | Path, pattern: string | RegExp, options: {
  inverse: true;
  details: false;
}): Array<string>;
```

## grepFile(...) (call signature)

Read the content at `path`, split it on newline, and then return info about lines matching `pattern`.

```ts
(path: string | Path, pattern: string | RegExp, options: {
  details: true;
}): Array<{
  lineNumber: number;
  lineContent: string;
  matches: RegExpMatchArray;
}>;
```

## grepFile(...) (call signature)

Read the content at `path`, split it on newline, and then return info about lines matching `pattern`.

```ts
(path: string | Path, pattern: string | RegExp, options: {
  inverse: false;
  details: true;
}): Array<string>;
```

## grepFile(...) (call signature)

Read the content at `path`, split it on newline, and then return info about lines NOT matching `pattern`.

```ts
(path: string | Path, pattern: string | RegExp, options: {
  inverse: true;
  details: true;
}): Array<{
  lineNumber: number;
  lineContent: string;
  matches: RegExpMatchArray;
}>;
```

# String (interface)

```ts
interface String {
  grep: {
    (pattern: string | RegExp): Array<string>;
    (
      pattern: string | RegExp,
      options: {
        inverse: false;
      },
    ): Array<string>;
    (
      pattern: string | RegExp,
      options: {
        inverse: true;
      },
    ): Array<string>;
    (
      pattern: string | RegExp,
      options: {
        details: false;
      },
    ): Array<string>;
    (
      pattern: string | RegExp,
      options: {
        inverse: false;
        details: false;
      },
    ): Array<string>;
    (
      pattern: string | RegExp,
      options: {
        inverse: true;
        details: false;
      },
    ): Array<string>;
    (
      pattern: string | RegExp,
      options: {
        details: true;
      },
    ): Array<{
      lineNumber: number;
      lineContent: string;
      matches: RegExpMatchArray;
    }>;
    (
      pattern: string | RegExp,
      options: {
        inverse: false;
        details: true;
      },
    ): Array<string>;
    (
      pattern: string | RegExp,
      options: {
        inverse: true;
        details: true;
      },
    ): Array<{
      lineNumber: number;
      lineContent: string;
      matches: RegExpMatchArray;
    }>;
  };
}
```

## String.grep (function property)

```ts
grep: {
  (pattern: string | RegExp): Array<string>;
  (pattern: string | RegExp, options: {
    inverse: false;
  }): Array<string>;
  (pattern: string | RegExp, options: {
    inverse: true;
  }): Array<string>;
  (pattern: string | RegExp, options: {
    details: false;
  }): Array<string>;
  (pattern: string | RegExp, options: {
    inverse: false;
    details: false;
  }): Array<string>;
  (pattern: string | RegExp, options: {
    inverse: true;
    details: false;
  }): Array<string>;
  (pattern: string | RegExp, options: {
    details: true;
  }): Array<{
    lineNumber: number;
    lineContent: string;
    matches: RegExpMatchArray;
  }>;
  (pattern: string | RegExp, options: {
    inverse: false;
    details: true;
  }): Array<string>;
  (pattern: string | RegExp, options: {
    inverse: true;
    details: true;
  }): Array<{
    lineNumber: number;
    lineContent: string;
    matches: RegExpMatchArray;
  }>;
};
```

### String.grep(...) (call signature)

Split the string on newline and then return lines matching `pattern`.

```ts
(pattern: string | RegExp): Array<string>;
```

### String.grep(...) (call signature)

Split the string on newline and then return lines matching `pattern`.

```ts
(pattern: string | RegExp, options: {
  inverse: false;
}): Array<string>;
```

### String.grep(...) (call signature)

Split the string on newline and then return lines NOT matching `pattern`.

```ts
(pattern: string | RegExp, options: {
  inverse: true;
}): Array<string>;
```

### String.grep(...) (call signature)

Split the string on newline and then return lines matching `pattern`.

```ts
(pattern: string | RegExp, options: {
  details: false;
}): Array<string>;
```

### String.grep(...) (call signature)

Split the string on newline and then return lines matching `pattern`.

```ts
(pattern: string | RegExp, options: {
  inverse: false;
  details: false;
}): Array<string>;
```

### String.grep(...) (call signature)

Split the string on newline and then return lines NOT matching `pattern`.

```ts
(pattern: string | RegExp, options: {
  inverse: true;
  details: false;
}): Array<string>;
```

### String.grep(...) (call signature)

Split the string on newline and then return info about lines matching `pattern`.

```ts
(pattern: string | RegExp, options: {
  details: true;
}): Array<{
  lineNumber: number;
  lineContent: string;
  matches: RegExpMatchArray;
}>;
```

### String.grep(...) (call signature)

Split the string on newline and then return info about lines matching `pattern`.

```ts
(pattern: string | RegExp, options: {
  inverse: false;
  details: true;
}): Array<string>;
```

### String.grep(...) (call signature)

Split the string on newline and then return info about lines NOT matching `pattern`.

```ts
(pattern: string | RegExp, options: {
  inverse: true;
  details: true;
}): Array<{
  lineNumber: number;
  lineContent: string;
  matches: RegExpMatchArray;
}>;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[]
-->
