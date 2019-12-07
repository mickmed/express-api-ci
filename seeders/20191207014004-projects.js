'use strict';

const faker = require('faker');

const projects = [...Array(500)].map((project) => (
  {
    title: faker.commerce.productName(),
    imageUrl: faker.image.business(),
    description: faker.lorem.paragraph(),
    githubUrl: faker.internet.url(),
    deployedUrl: faker.internet.url(),
    userId: Math.floor(Math.random() * 100) + 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', projects, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};
