# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

## Getting started

1. Fork
1. Clone

# Express API - Continuous Integration

What is Continuous Integration? Let's take 10min to read:

> Contemplate: What is CI? Why is it important? Should I used it?

- https://www.atlassian.com/continuous-delivery/continuous-integration
- https://www.thoughtworks.com/continuous-integration
- https://martinfowler.com/articles/continuousIntegration.html

We are going to hit the ground running with this lesson. Up until this point you have created an express json api full crud (even a bit of unit testing). So let's skip the basics and dive right in!

Make sure you're inside the repo:

```sh
cd express-api-ci
```

We will now create our directory structure (quickly).

Copy this entire code snippet and paste it into your terminal and hit return:

```sh
npm init -y && 
npm install sequelize pg dotenv express body-parser morgan && 
npm install --save-dev nodemon jest supertest cross-env sequelize-cli && 
npx sequelize-cli init &&
echo "
DEV_DATABASE=express_api_ci_development
DEV_HOST=127.0.0.1
TEST_DATABASE=express_api_ci_test
TEST_HOST=127.0.0.1" >> .env &&
echo "
/node_modules
.DS_Store
.env" >> .gitignore &&
mkdir routes controllers tests &&
touch server.js  routes/index.js controllers/index.js tests/base.test.js &&
code .
```

Rename your config.json file to config.js and replace the code with this:

```js
require('dotenv').config()

module.exports = {
  development: {
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    dialect: 'postgres'
  },
  test: {
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_HOST,
    dialect: 'postgres'
  },
  production: {
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'postgres'
  },
}
```

In models/index.js replace `const config = require(__dirname + '/../config/config.json')[env];` with `const config = require(__dirname + '/../config/config')[env];`

Create your database:

```sh
npx sequelize-cli db:create
```
