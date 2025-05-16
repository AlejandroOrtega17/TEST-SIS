import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Configuración para conexión con Postgres (Local)
const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS ? String(process.env.DB_PASS) : "", // Convertir la contraseña a string
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false
    }
);

export default db;