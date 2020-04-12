# Boiler Plate Expres-MongoDB 👋

## Installation

Use NPM in order to install everything the app needs to run correctly.

```bash
npm install
```

## Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io/docs/en/getting-started).

If you want watch mode: `npm run test:watch`

If you want a coverage test: `npm run test:coverage`

## Linters and formatters

We added a code formatter [prettier](https://prettier.io/) for all developers to follow the same rules.

When we commit code, it automatically executes some scripts:
- For *.ts files we run: `npm run tslint`, `npm run prettier`

If all these scripts finalize correctly, the commit ends. Otherwise, the developer will be forced to fix the errors in order to be able to commit the changes.

