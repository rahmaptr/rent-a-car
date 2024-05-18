'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'));
    users.forEach(user => {
      user.createdAt = new Date();
      user.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
