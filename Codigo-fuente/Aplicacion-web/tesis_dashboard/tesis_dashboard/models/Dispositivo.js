import { DataTypes } from "sequelize";
import db from "../config/db.js";

/*
Modelo para la tabla Dispositivos
Incluye los atributos para id e intervalo
Las llaves foráneas se establecen posteriormente
*/
const Dispositivo = db.define('dispositivo', {
    dispositivo_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    dispositivo_lectura_intervalo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    coordenadas: DataTypes.ARRAY(DataTypes.STRING)
}, {
    tableName: 'Dispositivos'
    /*
    Sequelize agrega las columnas createdAt y updatedAt por defecto
    Se puede deshabilitar ambas con
    timestamps: false
    o individualmente con
    createdAt: false
    updatedAt: false
    */
});

export default Dispositivo;
