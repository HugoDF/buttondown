# Buttondown

JavaScript (Node.js) Buttondown API wrapper.

## Requirements

- Node 10
- Yarn 1.x or npm

## Setup

1. Clone the repository
2. Run `yarn` or `npm install` installs all required dependencies.
3. Run `yarn build` to build from TypeScript to common JavaScript distribution formats.

## npm scripts

> Equivalent `npm run <script>` should also work

- `yarn test` run tests against **built output** with [ava](https://github.com/avajs/ava). **Important**: runs against build output so run `yarn build` beforehand.
- `yarn build` run build from TypeScript to UMD, CJS, ESM with [microbundle](https://github.com/developit/microbundle)
- `yarn watch` runs build in watch mode with [microbundle](https://github.com/developit/microbundle)
- `yarn lint` will lint all of the files with [xo](https://github.com/xojs/xo)
- `yarn format` will run lint with `--fix` option on all the examples files (and tests).

## LICENSE

Code is licensed under the [MIT License](./LICENSE).

