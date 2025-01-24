import { Path } from "nice-path";

export const rootDir = new Path(__dirname).dirname();
export const fixturesDir = rootDir.concat("fixtures");
