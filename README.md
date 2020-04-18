![E2E Tests](https://github.com/HugoDF/buttondown/workflows/E2E%20Tests/badge.svg) ![Build](https://github.com/HugoDF/buttondown/workflows/Build%20&%20test/badge.svg)

JavaScript/TypeScript (Node.js) [Buttondown](https://buttondown.email) API wrapper.

[Buttondown API](https://api.buttondown.email/v1/schema)

**This library allows you to quickly and easily use the Buttondown API v1 via Node.js.**

This project is not officially affiliated with Buttondown, it's maintained by community members. For any feedback, questions or issues, please create [issues](https://github.com/HugoDF/buttondown/issues) and [pull requests](https://github.com/HugoDF/buttondown/blob/master/README.md#contributing) or merely upvote or comment on existing issues or pull requests.

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Obtain an API Key](#obtain-an-api-key)
  - [Setup Environment Variables](#setup-environment-variables)
  - [Install Package](#install-package)
- [Quick Start, Create a Draft](#quick-start-create-a-draft)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [npm scripts](#npm-scripts)
  - [Partial generated TypeScript SDK using the OpenAPI schema](#partial-generated-typescript-sdk-using-the-openapi-schema)
- [About](#about)
  - [Acknowledgments](#acknowledgments)
- [LICENSE](#license)

# Installation

## Prerequisites

- Node.js version 10 or 12
- A Buttondown account, [sign up for free](https://buttondown.email/register?source=buttondown-nodejs) free for your first thousand subscribers or check out [the pricing page](https://buttondown.email/pricing?source=buttondown-nodejs).

## Obtain an API Key

Grab your API Key from the [Buttondown Setting Page](https://buttondown.email/settings).

## Setup Environment Variables

Do not hardcode your [Buttondown API Key](https://buttondown.email/settings) into your code. Instead, use an environment variable or some other secure means of protecting your Buttondown API Key. Following is an example of using an environment variable.

Update the development environment with your [BUTTONDOWN_API_KEY](https://buttondown.email/settings), for example:

```bash
echo "export BUTTONDOWN_API_KEY='YOUR_API_KEY'" > buttondown.env
echo "buttondown.env" >> .gitignore
source ./buttondown.env
```

## Install Package

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x, therefore, you likely already have it.

```sh
npm install --save buttondown
```

You may also use [yarn](https://yarnpkg.com/en/) to install.

```sh
yarn add buttondown
```

<a name="quick-start"></a>
# Quick Start, Create a Draft

The following is the minimum needed code to create a new draft email. Use this example, and modify the `to` and `from` variables:

For more complex use cases, please see [USE_CASES.md](https://github.com/sendgrid/sendgrid-nodejs/blob/master/docs/use-cases/README.md#email-use-cases).

```js
const buttondown = require('buttondown');
buttodown.setApiKey(process.env.BUTTONDOWN_API_KEY);
const draft = {
  subject: 'Creating a new Buttondown draft',
  body: '<strong>and easy to do from Node.js</strong>',
};
//ES6
buttondow.drafts.create(draft)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
//ES8
(async () => {
  try {
    await buttondow.drafts.create(draft);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
})();
```

After executing the above code, you should have a draft in your Buttondown account. You view it [in the UI](https://buttondown.email/emails/drafts).

# Roadmap

If you are interested in the future direction of this project, please take a look at the open [issues](https://github.com/HugoDF/buttondown/issues) and [pull requests](https://github.com/HugoDF/buttondown/pulls). I would love to hear your feedback!

# Contributing

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
- `yarn release`, run clean, production build and release with `np`.

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

# About

This package is maintained by Hugo from [Code with Hugo](https://codewithhugo.com) and [Alpine.js Weekly](https://alpinejs.codewithhugo.com/newsletter).

## Acknowledgments


Special thanks to:

- Justin Duke for creating Buttondown
- The Twilio SendGrid team for the inspiration on how to structure this package and docs
- The developers behind
  - [got](https://github.com/sindresorhus/got#readme)
  - [ava](https://avajs.dev)
  - [esm](https://github.com/standard-things/esm#readme)
  - [microbundle](https://github.com/developit/microbundle#readme)
  - [nock](https://github.com/nock/nock#readme)
  - [np](https://github.com/sindresorhus/np#readme)
  - [xo](https://github.com/xojs/xo#readme)

# LICENSE

Code is licensed under the [MIT License](./LICENSE).

