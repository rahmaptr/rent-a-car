'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vendor.hasMany(models.Car, {
        foreignKey: 'vendorId',
        as: 'cars'
      });
      Vendor.hasOne(models.User, {
        foreignKey: 'userId',
        as: 'users'
      });
    }
  }
  Vendor.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};