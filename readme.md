To run the codemod:

```bash
jscodeshift --extensions=ts,tsx -t ../logie-codemod/transformer.ts --parser tsx src --dry
```

Everthing under `src` is just a test case
