import * as fs from "fs";
import * as clefairy from "clefairy";
import { Path } from "nice-path";
import * as dtsmd from "./index";

clefairy.run(
  {
    i: clefairy.optionalString,
    inputFile: clefairy.optionalString,
    o: clefairy.optionalString,
    outputFile: clefairy.optionalString,
  },
  async function main(opts, ...args) {
    const inputFile = opts.i || opts.inputFile || null;
    const outputFile = opts.o || opts.outputFile || null;

    let source = "";
    if (inputFile == null) {
      if (process.stdin.isTTY) {
        throw new Error(
          "Please either pipe data to stdin or provide an input file"
        );
      } else {
        source = fs.readFileSync(process.stdin.fd, "utf-8");
      }
    } else {
      source = await fs.promises.readFile(inputFile, "utf-8");
    }

    let fileName: string;
    if (typeof inputFile === "string") {
      const inputPath = new Path(inputFile);
      if (inputPath.isAbsolute()) {
        fileName = inputFile;
      } else {
        const resolvedFromCwd = new Path(process.cwd(), inputPath).normalize();
        if (resolvedFromCwd.isAbsolute()) {
          fileName = inputFile;
        } else {
          // If they got here, it means readFile succeeded, but path
          // normalization didn't? Just accept it I guess
          fileName = inputFile;
        }
      }
    } else {
      fileName = "stdin";
    }

    const result = await dtsmd.processSource(source, { fileName });

    if (typeof outputFile === "string") {
      await fs.promises.writeFile(outputFile, result.markdown);
    } else {
      fs.writeFileSync(process.stdout.fd, result.markdown);
    }
  }
);
