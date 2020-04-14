# Buttondown

JavaScript (Node.js) Buttondown API wrapper.

## Requirements

- Node 10
- Yarn 1.x or npm

## Setup

1. Clone the repository
2. Run `yarn` or `npm install` installs all required dependencies.
3. Run `yarn build` to build from TypeScript to common JavaScript distribution formats.
4. Run `yarn test` to run all tests :D.

## npm scripts

> Equivalent `npm run <script>` should also work

- `yarn test` run tests against **built output** with [ava](https://github.com/avajs/ava). **Important**: runs against build output so run `yarn build` beforehand.
- `yarn build` run build from TypeScript to UMD, CJS, ESM with [microbundle](https://github.com/developit/microbundle)
- `yarn watch` runs build in watch mode with [microbundle](https://github.com/developit/microbundle)
- `yarn lint` will lint all of the files with [xo](https://github.com/xojs/xo)
- `yarn format` will run lint with `--fix` option on all the examples files (and tests).
- `yarn` release, run clean, production build and release with `np`.

## Partial generated TypeScript SDK using the OpenAPI schema

> The auto-generated SDK contains TS errors, eg. _gen/services/SubscribersService.ts has `email` in the list twice, however it's useful to lift typings from

To re-generate:

1. Fetch the schema from the API docs
```sh
curl https://api.buttondown.email/v1/schema\?format\=openapi >> schema.json
```
2. Convert using [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)
```sh
npx openapi-typescript-codegen --input schema.json --output ./_gen
```
3. Keep only the `services` folder
```sh
rm -rf _gen/core _gen/index.ts _gen/models
```



## LICENSE

Code is licensed under the [MIT License](./LICENSE).

