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
 * This is another comment.
 */

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

This is another comment.

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
