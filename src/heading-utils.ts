/**
 * Returns `headingLevel` clamped between 1 and 6, as there are only HTML
 * heading tags for 1-6. (<h1>, <h2>, etc), and markdown inherits that from
 * HTML.
 */
export function clampHeadingLevel(headingLevel: number) {
  return Math.max(1, Math.min(headingLevel, 6));
}
