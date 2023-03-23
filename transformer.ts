import { API, FileInfo, ImportSpecifier } from "jscodeshift";
import { ripgrep } from "./ripgrep";

const test = true;
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

      const modules = path.value.specifiers.filter(
        (n) => n.type === "ImportSpecifier",
      ) as ImportSpecifier[];

      modules.forEach((m) => {
        const searchResults = ripgrep(m.imported.name);

        // With our codebase's codestyle, the resolved file path / the original code
        // will highly likely be the one with lesser path depth
        const resolvedFilePath = searchResults?.[0];

        const isLocalized = m.local.name !== m.imported.name;
        const importName = isLocalized
          ? `${m.imported.name}(${m.local.name})`
          : m.local.name;

        console.log(
          `${filePath} -> ${alias} -> ${importName} -> ${
            resolvedFilePath ?? "NONE"
          }`,
        );

        j(path).insertAfter(
          j.importDeclaration(
            [
              j.importSpecifier(
                j.identifier(m.imported.name),
                j.identifier(m.local.name),
              ),
            ],
            j.literal(resolvedFilePath),
          ),
        );
      });

      path.value.specifiers = path.value.specifiers.filter(
        (n) => n.type !== "ImportSpecifier",
      );

      if (path.value.specifiers.length === 0) j(path).remove();
    })
    .toSource();
}
