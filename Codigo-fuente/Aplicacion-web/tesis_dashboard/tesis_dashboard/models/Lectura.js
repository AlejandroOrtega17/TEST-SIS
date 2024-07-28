import { DataTypes } from "sequelize";
import db from "../config/db.js";

/*
Modelo para la tabla Lecturas
Incluye los atributos para id y valor
Las llaves foráneas se establecen posteriormente
*/
const Lectura = db.define('lectura', {
    lectura_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lectura_valor: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }
}, {
    tableName: 'Lecturas'
    /*
    Sequelize agrega las columnas createdAt y updatedAt por defecto
    Se puede deshabilitar ambas con
    timestamps: false
    o individualmente con
    createdAt: false
    updatedAt: false
    */
});

export default Lectura;
