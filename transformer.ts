import { API, FileInfo, ImportSpecifier } from "jscodeshift";
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

export default function transformer(file: FileInfo, api: API) {
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

      if (!path.value.specifiers.length || path.value.specifiers.length === 0)
        console.log(`${filePath} - ERROR`);

      path.value.specifiers.forEach((_path) => {
        const path = _path as ImportSpecifier;
        const result = ripgrep(path.imported.name);
        const isLocalized = path.local.name !== path.imported.name;
        const importName = isLocalized
          ? `${path.imported.name}(${path.local.name})`
          : path.local.name;
        console.log(
          `${filePath} -> ${alias} -> ${importName} -> ${
            result?.[0] ?? "NONE"
          }`,
        );
      });
    })
    .toSource();
}
