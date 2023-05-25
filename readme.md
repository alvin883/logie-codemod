To run the codemod:

### Prerequisite
1. Nodejs >= 16
2. Install jscodeshift globally
```bash
$ npm install -g jscodeshift
```
3. Clone this repo to your machine (in the same level as `logie-fe` if possible)
```bash
$ git clone git@github.com:alvin883/logie-codemod.git
```
4. Go there, install the packages
```bash
$ cd ./logie-codemod
$ yarn install
```
5. Install ripgrep if you didn't have it yet, ripgrep is needed to do file content search, for other installation please see here: https://github.com/BurntSushi/ripgrep#installation
```bash
# Fedora Linux
$ sudo dnf install ripgrep

# MacOS
$ brew install ripgrep
```

### Run codemod
> This step assume you cloned the repo in the same level as `logie-fe`
1. Go back to `logie-fe` repo
```bash
cd ../logie-fe
```
2. Run `jscodeshift`
```bash
$ jscodeshift --extensions=ts,tsx -t ../logie-codemod/transformer.ts --parser tsx src --dry
```

### Note
Everthing under `src` is just a test case
