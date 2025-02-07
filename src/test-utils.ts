import { Path } from "nice-path";
import { spawn, Options, RunContext } from "first-base";

export const rootDir = new Path(__dirname).dirname();
export const fixturesDir = rootDir.concat("fixtures");

const cliBinPath = rootDir.concat("dist/cli.js").toString();

export function runCLI(args: Array<string>, options?: Options): RunContext {
  if (options != null) {
    return spawn(cliBinPath, args, options);
  } else {
    return spawn(cliBinPath, args);
  }
}
