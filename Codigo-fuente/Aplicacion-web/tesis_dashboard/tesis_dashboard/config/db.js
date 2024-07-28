import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Configuración para conexión con Postgres
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
    /*dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }*/
});

export default db;
