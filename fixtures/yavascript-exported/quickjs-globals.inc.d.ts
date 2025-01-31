export const std: typeof import("quickjs:std");
export const os: typeof import("quickjs:os");

// undocumented from quickjs, but it's there
/** Get the current unix timestamp with microsecond precision. */
export function __date_clock(): number;
