'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.belongsTo(models.Vendor, {
        foreignKey: 'vendorId',
        as: 'vendor'
      });
      Car.hasMany(models.Booking, {
        foreignKey: 'carId',
        as: 'bookings'
      });
    }
  }
  Car.init({
    name: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    vendorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};