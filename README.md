# Package Sorter (TypeScript)

This project implements:

`sort(width, height, length, mass) -> 'STANDARD' | 'SPECIAL' | 'REJECTED'`

## Run locally

```bash
npm install
npm start -- 10 10 10 5
```

Expected output:

```txt
STANDARD
```

## Reviewer checks

Run these commands in the shell:

```bash
npm start -- 150 10 10 25
npm test
```

Expected:

- `npm start -- 150 10 10 25` prints `REJECTED`
- `npm test` passes all tests

## Replit configuration

This repository includes a `.replit` file with a one-click run command:

```txt
npm install && npm start -- 10 10 10 5
```

When imported into Replit as a Node.js repl, clicking **Run** executes the sample case directly.
# thoughtfulautomationhometake
