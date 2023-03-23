import { API, FileInfo } from "jscodeshift";
import { ripgrep } from "./ripgrep";

const test = false;
const ALIASES_TEST = ["@components", "@utils", "@types"];
const ALIASES_REAL = [
  "@Styles",
  "@API",
  "@GQL",
  "@Constants",
  "@Functions",
  "@Pages",
  "@Types",
  "@Analytics",
  "@Components",
  "@Redux",
  "@Assets",
];

const ALIASES = test ? ALIASES_TEST : ALIASES_REAL;

export default function transformer(file: FileInfo, api: API, options) {
  const j = api.jscodeshift;
  const filePath = file.path;

  return j(file.source)
    .find(
      j.ImportDeclaration,
      (node) =>
        typeof node.source.value === "string" &&
        ALIASES.includes(node.source.value),
    )
    .forEach((path) => {
      const alias = path.get("source").value.value;
      console.log("------");
      path.value.specifiers.forEach((path) => {
        const result = ripgrep(path.local.name);
        console.log(
          `${filePath} -> ${alias} -> ${path.local.name} -> ${
            result?.[0] ?? "NONE"
          }`,
        );
      });
    })
    .toSource();
}
