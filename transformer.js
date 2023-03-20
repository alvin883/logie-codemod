// import { run } from 'jscodeshift/src/Runner'
// import { path } from 'path'

// const target = path.resolve('./src/index.ts')
// const res = await run(target,)

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
// export const parser = "tsx";

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportDeclaration, { source: { value: "@components" } })
    .forEach((path) => {
      // console.log(path);
      // j(path)
      //   .find(j.ImportSpecifier)
      //   .forEach((path) => {
      //     console.log(path.value);
      //   });
      console.log(path.get("source").value.value);
      // path.value.specifiers.forEach((path) => {
      //   // console.log(this.file.path);
      //   console.log(path);
      //   // console.log(path);
      // });
    })
    .toSource();
}
