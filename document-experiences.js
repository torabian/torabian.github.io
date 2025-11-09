const inputDir = "./src/pages/experience";
const outputFile = "./src/data-sources/experiences.ts";

const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(".mdx"));

const experiences = files.map((file, index) => {
  const content = fs
    .readFileSync(path.join(inputDir, file), "utf-8")
    .split("\n");

  // Find the first line starting with #
  const headerIndex = content.findIndex((line) => line.startsWith("#"));
  const title =
    headerIndex >= 0 ? content[headerIndex].replace(/^#+\s*/, "") : "Untitled";

  const id = path.basename(file, ".mdx");

  // Everything after the title line becomes content
  const body = content.find((x) => x.trim() !== "" && x.trim()[0] !== "#");

  return {
    category: "Project",
    content: "",
    date: "",
    description: body,
    featured: true,
    id,
    tags: [],
    title,
  };
});

const tsContent = `import { Experience } from "./data";

export const experiences: Experience[] = ${JSON.stringify(
  experiences,
  null,
  2
)};
`;

fs.writeFileSync(outputFile, tsContent);
console.log(`Generated ${outputFile} with ${experiences.length} experiences.`);
