import ts from "typescript";
import { readFileSync } from "node:fs";
import path from "node:path";

const filePath = "./src/index.ts";
const fileContent = readFileSync(filePath).toString();
const fileInfo = ts.preProcessFile(fileContent);

const tsConfigContent = JSON.parse(readFileSync("./tsconfig.json").toString());
const tsConfig = ts.parseJsonConfigFileContent(
  tsConfigContent,
  ts.sys,
  path.resolve("."),
);

fileInfo.importedFiles
  .map((importedModule) => importedModule.fileName)
  .forEach((rawImport) => {
    const resolvedImport = ts.resolveModuleName(
      rawImport,
      filePath,
      tsConfig.options,
      ts.sys,
    );
    const importLocation = resolvedImport.resolvedModule.resolvedFileName;
    console.log(rawImport);
  });

// const node = ts.createSourceFile(
//   "x.ts",
//   readFileSync("./src/index.ts", "utf8"),
// );
// node.forEachChild((child) => {
//   if (ts.SyntaxKind[child.kind] === "ImportDeclaration") {
//     console.log(child);
//   }
// });
