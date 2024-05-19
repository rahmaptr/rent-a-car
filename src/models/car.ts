import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/connection";

interface CarAttributes {
  id?: number;
  name: string;
  capacity: number;
  price: number;
  vendorId: number;
  isRented: boolean;
}

export interface CarInput extends Optional<CarAttributes, "id"> {}
export interface CarOutput extends Required<CarAttributes> {}

class Car extends Model<CarAttributes, CarInput> implements CarAttributes {
  public id!: number;
  public name!: string;
  public capacity!: number;
  public price!: number;
  public vendorId!: number;
  public isRented!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Car.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  capacity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  vendorId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  isRented: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  timestamps: true,
  sequelize: connection,
  tableName: "Cars"
});

export default Car;
