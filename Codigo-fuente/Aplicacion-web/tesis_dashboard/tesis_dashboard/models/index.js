// Archivo para la creación de llaves foráneas

import Dispositivo from "./Dispositivo.js";
import Lectura from "./Lectura.js";
import Medicion from "./Medicion.js";
import Sector from "./Sector.js";
import Ubicacion from "./Ubicacion.js";

/*
Creación de llaves foráneas para las tablas
Dispositivos y Lecturas
Más info para las asociaciones en
https://sequelize.org/docs/v6/core-concepts/assocs/
*/
Dispositivo.belongsTo(Medicion, {
    foreignKey: "medicion_id"
});

Dispositivo.belongsTo(Ubicacion, {
    foreignKey: "ubicacion_id"
});
Lectura.belongsTo(Dispositivo, {
    foreignKey: "dispositivo_id"
});

export {
    Dispositivo,
    Lectura,
    Medicion,
    Sector,
    Ubicacion
}