import { execSync } from "node:child_process";

try {
  // Why the `./` or `src/` at the end? to search at a specific location & also
  // prevent ripgrep to try to detect stdin that causing it to hang
  // see: https://github.com/BurntSushi/ripgrep/issues/2056#issuecomment-1005375918
  const result = execSync(
    'rg --files-with-matches --no-messages --smart-case "export const Something" --color never src/',
  ).toString();
  const paths = result.split("\n").filter((line) => line.length > 0);

  paths.forEach((line) => console.log(`nah: ${line}`));
} catch (e) {
  console.log(e.message);
}
