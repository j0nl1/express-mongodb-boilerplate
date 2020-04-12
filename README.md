# Express-MongoDB Boilerplate 👋

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

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

## Docker

We choosed [docker](https://www.docker.com/) as a container runtime.

If you want to build a project's image: `docker build -t express-boilerplate`

If you want to run the image after created: `docker run -p 3000:3000 express-boilerplate`

We also added a docker-compose for development purpose, it contains an image of mongodb.

In case you want to run it: `docker-compose up -d`

## Contributing

Contributions are more than welcome!

## License

[MIT](LICENSE)