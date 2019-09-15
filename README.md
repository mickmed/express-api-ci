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

Rename your config/config.json file to config/config.js and replace the code with this:

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

In models/index.js replace 

```js
const config = require(__dirname + '/../config/config.json')[env];
``` 
with: 

```js
const config = require(__dirname + '/../config/config')[env];
```

Create your database, a User model, and run the migration:

```sh
npx sequelize-cli db:create
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
npx sequelize-cli db:migrate
```

Create the seed:

```sh
npx sequelize-cli seed:generate --name users
```

Edit the seed file:

```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Bruno',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Emre',
      lastName: 'Smith',
      email: 'john@smith.com',
      password: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'John',
      lastName: 'Stone',
      email: 'john@stone.com',
      password: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
```

Execute the seed file:

```sh
npx sequelize-cli db:seed:all
```

Create the Project model:

```sh
npx sequelize-cli model:generate --name Project --attributes title:string,imageUrl:string,description:text,githubUrl:string,deployedUrl:string,userId:integer
```

project.js
```js
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    githubUrl: DataTypes.STRING,
    deployedUrl: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    }
  }, {});
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  };
  return Project;
};
```

user.js
```js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Project, {
      foreignKey: 'userId'
    })
  };
  return User;
};
```

Run the migrations:

```js
npx sequelize-cli db:migrate
```

Let's create a seed for projects:

```sh
npx sequelize-cli seed:generate --name projects
```

