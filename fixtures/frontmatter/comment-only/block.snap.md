<!-- INPUT:
/*---
title: My Title
something-else: My Metadata
some-structure:
  some-subpath: yes
  some-list:
  - first
  - second
  - third
---*/

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

<!-- OUTPUT.frontmatter:
{
  "raw": "---\ntitle: My Title\nsomething-else: My Metadata\nsome-structure:\n  some-subpath: yes\n  some-list:\n  - first\n  - second\n  - third\n---",
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
