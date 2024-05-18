'use strict';
const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cars = JSON.parse(fs.readFileSync('./data/car.json', 'utf8'));
    cars.forEach(car => {
      car.createdAt = new Date();
      car.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Cars', cars, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
