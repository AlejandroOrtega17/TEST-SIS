import { DataTypes } from "sequelize";
import db from "../config/db.js";

// Modelo para la tabla Mediciones
// Incluye los atributos para id, nombre, descripcion, unidad y abreviatura
const Medicion = db.define('medicion', {
    medicion_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    medicion_fenomeno: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    medicion_descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    medicion_unidad: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    medicion_unidad_abreviatura: {
        type: DataTypes.STRING(15),
        allowNull: true
    }
}, {
    tableName: 'Mediciones'
    /*
    Sequelize agrega las columnas createdAt y updatedAt por defecto
    Se puede deshabilitar ambas con
    timestamps: false
    o individualmente con
    createdAt: false
    updatedAt: false
    */
});

export default Medicion;
