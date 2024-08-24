// Seeder para la cración de regfistros en la BD

// Archivos con la información a insertar
import mediciones from './mediciones.js';
import ubicaciones from './ubicaciones.js';
//

import db from '../config/db.js';
import { Medicion, Ubicacion } from '../models/index.js';

// Función para insertar los datos
const importData = async () => {
    try {
        // En un escenario sin errores,
        // se estabece conexión con la BD y se insertan los datos
        await db.authenticate();
        await db.sync();

	//Comprobar si las tablas están vacías
        const medicionesExisten = await Medicion.count();
        const ubicacionesExisten = await Ubicacion.count();
        
        // Insertar datos en las tablas
        if(medicionesExisten === 0){
            await Medicion.bulkCreate(mediciones);
        }
        
        if(ubicacionesExisten === 0){
            await Ubicacion.bulkCreate(ubicaciones);
        }

        // Se cierra el proceso sin errores
        process.exit(0);
    } catch (error) {
        // En caso de error, imprimir el mensaje
        // y cerrar proceso con presencia de error
        console.log(error);
        process.exit(1);
    }
}

// Función para eliminar datos
// Uso principal para pruebas
const deleteData = async () => {
    try {
        // En un escenario sin errores, se estabece conexión con la BD,
        // se borran los datos de todas las tablas
        // y se reinician los contadores para los tipo SERIAL
        await db.sync({ force: true });

        // Se cierra el proceso sin errores
        process.exit(0);
    } catch (error) {
        // En caso de error, imprimir el mensaje
        // y cerrar proceso con presencia de error
        console.log(error);
        process.exit(1);
    }
}

// Se evalua los el argumento que acompaña al archivo
// para ejecutar una función
if (process.argv[2] === "-i") {
    importData();
}

if (process.argv[2] === "-d") {
    deleteData();
}
