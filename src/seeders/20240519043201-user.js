'use strict';
const fs = require('fs');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = JSON.parse(fs.readFileSync('./src/data/user.json', 'utf8'));
    users.forEach(user => {
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.password = bcrypt.hashSync(user.password, 8);
    });
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
