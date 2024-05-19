import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/connection";

interface UserAttributes {
  id?: number;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  username: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
  sequelize: connection,
  tableName: "Users",
});