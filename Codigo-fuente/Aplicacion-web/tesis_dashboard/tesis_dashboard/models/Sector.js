import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Sector = db.define('sector', {
    sector_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sector_nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
}, {
    tableName: 'Sectores'
});

export default Sector;
