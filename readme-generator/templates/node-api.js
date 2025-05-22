const dtsmd = require("@suchipi/dtsmd");

const myDts = `
// ---
// title: "My Library"
// ---

/**
 * I just think it's neat.
 */
export const something: string;
`;

dtsmd
  .processSource(myDts, {
    fileName: "/tmp/myfile.d.ts",
    headingOffset: 0, // optional; defaults to 0
  })
  .then((result) => {
    // type of result is:
    // {
    //   frontmatter: null | { raw: string, parsed: { [key: string]: any } },
    //   markdown: string
    // }

    console.log(result.markdown);
  });
