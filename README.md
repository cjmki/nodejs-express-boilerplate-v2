[![tests](https://github.com/cjmki/nodejs-express-boilerplate-v2/actions/workflows/workflow-test.yml/badge.svg)](https://github.com/cjmki/nodejs-express-boilerplate-v2/actions/workflows/workflow-test.yml)  [![build](https://github.com/cjmki/nodejs-express-boilerplate-v2/actions/workflows/workflow-build.yml/badge.svg)](https://github.com/cjmki/nodejs-express-boilerplate-v2/actions/workflows/workflow-build.yml)

- Inspired from [hagopj13's-nodexpress-boilerplate](https://github.com/hagopj13/node-express-boilerplate)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database](#database)
  - [SQL - Postgre](#sql---postgre)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [Validation](#validation)
- [Linting](#linting)
- [Todo list](#todo-list)


## Features

- **ES7 Support**: [babel](https://babeljs.io/)
- **Build tool**: [webpack](https://webpack.js.org/)
- **Data validation**: [Joi](https://github.com/hapijs/joi)
- **ORM**: [Sequelize](https://sequelize.org)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **TDD**: [mochajs](https://mochajs.org/) and [chai](https://www.chaijs.com/)
- **Environment variables**:  [dotenv-flow](https://www.npmjs.com/package/dotenv-flow)
- **CI**: [Github workflows](https://guides.github.com/introduction/flow/)
- **Docker compose to run databse cluster ([postgre](https://www.postgresql.org))**

## Quick Start

Start the SQL server via docker compose
```bash
# start docker cluster 
docker-compose --env-file ./.env.*env mode* up

# populate test data
npm run test:pop
```
Running locally:

```bash
npm run dev
```

Running in production:

```bash
# generate minified production build
npm run build

# start server in production mode
npm start
```

Testing:

```bash
# run all tests
npm run test
```

Linting:

```bash
# run eslint
npm run lint
```

Docker:


## Project Structure

```
.storage\           # Store logging files and assests 
contrib\            # Test data related things
src\
 |--config\         # Configuration related things
 |--exceptions\     # Custom exceptions 
 |--middlewares\    # Custom express middlewares
 |--models\         # SQL models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--index.js        # App entry point
 |--server.js       # Express app
```

## API Endpoints

List of available routes:

**Item routes**:\
`POST /user/login` - 

## Database
### SQL - Postgre

Postgre database intergration with ORM support using [sequelize](https://sequelize.org)
## Error Handling

The express app has a centralized error handling mechanism.

This utility will catch the errors propagated within the app from the error handling middleware (by calling `next(error)`). For convenience, you can wrap the routes inside the catchExpressExceptions utility wrapper, which forwards the error.

```javascript
import cee from '../../util/catchExpressExceptions';

router.post('/users/login', cee(controller.postLogin));
```

The error handling middleware sends an error response using the custom exception classes, which has the following format:

```json
{
  "code": 400,
  "message": "Validation message"
}
```

When running in development mode, the error response also contains the error stack.

## Environment Variables

The environment variables can be found and modified in the `.env` files. 
- keep the general variables in the `.env` file and use .env.*env mode* files for values which are specific to a certain mode.
- create .env.*.locally using a CI when running in production because it is not recommended to commit sensitive information to the repository. 

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/routes/route/schema.js` directory.

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Prettier JavaScript style guide](https://github.com/prettier/eslint-config-prettier) with some modifications.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

## Todo list

- Introduce HATEOAS to navigate through resources in API layer ( [Use HATEOAS to enable navigation to related resources ](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design#use-hateoas-to-enable-navigation-to-related-resources))
