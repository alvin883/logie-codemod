import {
  preProcessFile,
  parseJsonConfigFileContent,
  resolveModuleName,
  sys,
} from "typescript";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const resolveTsImport = (filePath: string) => {
  const fileContent = readFileSync(filePath).toString();
  const fileInfo = preProcessFile(fileContent);

  const tsConfigContent = JSON.parse(
    readFileSync("./tsconfig.json").toString(),
  );
  const tsConfig = parseJsonConfigFileContent(
    tsConfigContent,
    sys,
    resolve("."),
  );

  fileInfo.importedFiles
    .map((importedModule) => importedModule.fileName)
    .forEach((rawImport) => {
      const resolvedImport = resolveModuleName(
        rawImport,
        filePath,
        tsConfig.options,
        sys,
      );
      const importLocation = resolvedImport?.resolvedModule?.resolvedFileName;
      console.log(rawImport, importLocation);
    });
};
