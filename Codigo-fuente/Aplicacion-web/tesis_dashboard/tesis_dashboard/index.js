// Importanción de módulos:
// express como módulo principal para usar el framework
// cors para la configuración CORS
// morgan para logger
// helmet para seteo de headers para response
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Importación de librerías
// db que contiene la configuración para la conexión a la base de datos
// router que contiene las rutas disponibles en la aplicación
import db from "./config/db.js";
import router from "./routes/appRoutes.js";
import { morganFormato } from "./utils/morganFormato.js";

/*
Se inicia ina instancia de express,
junto con una variable que almacenará el puerto
a usar a partir de una variable de entorno
o el 3000 por defecto si no existe la variable
*/
const app = express();
const port = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logger con mensajes en consola
app.use(morgan(morganFormato));

// Logger con mensajes en archivo
/*app.use(morgan(morganFormato, {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" })
}));*/

app.use(helmet());

// Middleware proporcionado por express para
// la lectura del cuerpo de una petición en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Activación CORS simple
let whitelist = [process.env.GATEWAY_URL, process.env.CLIENT_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Fuera de política CORS'));
        }
    },
    methods: "GET,PUT"
}
app.use(cors(corsOptions));

// Se inicia la conexión a la BD
// y se imprime un error si falla
try {
    await db.authenticate();
    await db.sync();
    console.log("Base de datos conectada");
} catch (error) {
    console.log("Error al conectar a la base de datos:\n", error);
}

// Rutas que estarán disponibles en la aplicación
// En este caso comprobará cualquier ruta que empiece con ""
// De encontrar alguna, ejecutará el middleware asignado
app.use("", router);

// Se levanta el servidor, que estará pendiente
// del puerto asignado en port
// Se imprime un mensaje para saber que funcionó
app.listen(port, () => {
    console.log("Aplicación corriendo");
})
