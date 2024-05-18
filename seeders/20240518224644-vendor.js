'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const vendors = JSON.parse(fs.readFileSync('./data/vendor.json', 'utf8'));
    vendors.forEach(vendor => {
      vendor.createdAt = new Date();
      vendor.updatedAt = new Date();
    },
    await queryInterface.bulkInsert('Vendors', vendors, {})
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vendors', null, {});
  }
};
