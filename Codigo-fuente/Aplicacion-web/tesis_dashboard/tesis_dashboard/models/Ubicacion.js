import { DataTypes } from "sequelize";
import db from "../config/db.js";

// Modelo para la tabla Ubicaciones
// Incluye los atributos para id, nombre y tipo
const Ubicacion = db.define('ubicacion', {
    ubicacion_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ubicacion_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubicacion_tipo: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    tableName: 'Ubicaciones'
    /*
    Sequelize agrega las columnas createdAt y updatedAt por defecto
    Se puede deshabilitar ambas con
    timestamps: false
    o individualmente con
    createdAt: false
    updatedAt: false
    */
});

export default Ubicacion;
