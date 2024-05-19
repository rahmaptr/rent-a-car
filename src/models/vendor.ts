import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/connection"

interface VendorAttributes {
  id?: number;
  name: string;
  userId: number;
}

export interface VendorInput extends Optional<VendorAttributes, "id"> {}
export interface VendorOutput extends Required<VendorAttributes> {}

class Vendor extends Model<VendorAttributes, VendorInput> implements VendorAttributes {
  public id!: number;
  public name!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vendor.init({
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
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
}, {
  timestamps: true,
  sequelize: connection,
  tableName: "Vendors"
});
