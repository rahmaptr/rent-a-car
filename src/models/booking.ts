import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/connection";

interface BookingAttributes {
  id?: number;
  dateBooked: Date;
  dateReturned: Date;
  carId: number;
  userId: number;
}

export interface BookingInput extends Optional<BookingAttributes, "id"> {}
export interface BookingOutput extends Required<BookingAttributes> {}

class Booking extends Model<BookingAttributes, BookingInput> implements BookingAttributes {
  public id!: number;
  public dateBooked!: Date;
  public dateReturned!: Date;
  public carId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  dateBooked: {
    allowNull: false,
    type: DataTypes.DATE
  },
  dateReturned: {
    allowNull: true,
    type: DataTypes.DATE
  },
  carId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
}, {
  timestamps: true,
  sequelize: connection,
  tableName: "Bookings"
});

export default Booking;