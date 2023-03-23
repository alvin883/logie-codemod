import { API, FileInfo } from "jscodeshift";

// const ALIASES = ["@components", "@utils", "@types"];
const ALIASES = [
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

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(
      j.ImportDeclaration,
      (node) =>
        typeof node.source.value === "string" &&
        ALIASES.includes(node.source.value),
    )
    .forEach((path) => {
      const alias = path.get("source").value.value;
      console.log(alias);
      path.value.specifiers.forEach((path) => {
        console.log(path.local.name);
      });
    })
    .toSource();
}
