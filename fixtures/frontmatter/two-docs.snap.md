<!-- INPUT:
/**
 * ---
 * title: My Title
 * something-else: My Metadata
 * some-structure:
 *   some-subpath: yes
 *   some-list:
 *   - first
 *   - second
 *   - third
 * ---
 */

/**
 * This is the SomethingOrOther.
 */
export class SomethingOrOther {}

-->
---
title: My Title
something-else: My Metadata
some-structure:
  some-subpath: yes
  some-list:
    - first
    - second
    - third
---

# My Title

## SomethingOrOther (exported class)

This is the SomethingOrOther.

```ts
class SomethingOrOther {}
```

<!-- OUTPUT.frontmatter:
{
  "raw": "\n---\ntitle: My Title\nsomething-else: My Metadata\nsome-structure:\n  some-subpath: yes\n  some-list:\n  - first\n  - second\n  - third\n---\n",
  "parsed": {
    "title": "My Title",
    "something-else": "My Metadata",
    "some-structure": {
      "some-subpath": "yes",
      "some-list": [
        "first",
        "second",
        "third"
      ]
    }
  }
}
-->
<!-- OUTPUT.warnings:
[]
-->
