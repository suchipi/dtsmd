<!-- INPUT:
// ---
// title: Sample Library Definitions File
// ---
export class SomethingOrOther {
  /**
   * This method does stuff
   */
  someMethod(
    arg1: string,
    arg2: { blah: 5 },
    ...varargs: Array<Function>
  ): string;

  /** This one's a static method */
  static classMethod(): 3748239387342;
}

/**
 * it's a nice function.
 *
 * Go look at {@link this thing} and also {@link that thing}!
 */
export function something(arg1: number, arg2: string): void;

declare namespace Idk {
  export const BLAH = 5;
}

declare enum FoodStuffs {
  fruit,
  vegetable,
  grain,
  meat,
  dairy,
  dessert = 898909,
}

-->
---
title: Sample Library Definitions File
---

# Sample Library Definitions File

## SomethingOrOther (exported class)

```ts
class SomethingOrOther {
  someMethod(
    arg1: string,
    arg2: {
      blah: 5;
    },
    ...varargs: Array<Function>
  ): string;
  static classMethod(): 3748239387342;
}
```

### SomethingOrOther.prototype.someMethod (method)

This method does stuff

```ts
someMethod(arg1: string, arg2: {
  blah: 5;
}, ...varargs: Array<Function>): string;
```

### SomethingOrOther.classMethod (static method)

This one's a static method

```ts
static classMethod(): 3748239387342;
```

## something (exported function)

it's a nice function.

Go look at [this thing](#) and also [that thing](#)!

```ts
function something(arg1: number, arg2: string): void;
```

## Idk (namespace)

```ts
declare namespace Idk {
  export const BLAH = 5;
}
```

### Idk.BLAH (exported value)

```ts
const BLAH = 5;
```

<!-- OUTPUT.frontmatter:
{
  "raw": "---\ntitle: Sample Library Definitions File\n---",
  "parsed": {
    "title": "Sample Library Definitions File"
  }
}
-->
<!-- OUTPUT.warnings:
[
  "No link URL provided for \"this thing\"; falling back to \"#\"",
  "No link URL provided for \"that thing\"; falling back to \"#\""
]
-->
