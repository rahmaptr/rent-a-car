import { Sequelize } from "sequelize";
import "dotenv/config";

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = '127.0.0.1';
const dbDialect = 'postgres';

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});

export default sequelizeConnection;