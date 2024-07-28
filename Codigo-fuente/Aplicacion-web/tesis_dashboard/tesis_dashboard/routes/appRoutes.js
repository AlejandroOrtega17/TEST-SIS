import express from 'express';

// Importanción de middleware a usar en las distintas rutas
import { postUplink } from '../controllers/dispositivoController.js';
import { obtenerDatos, obtenerDatosDispositivo, lecturasEnTabla, infoDispositivo } from '../controllers/dashboardController.js';

// Instancia para el enrutamiento de Express
const router = express.Router();

/*
Rutas disponibles para ""
Se comprueba que lo que proceda a "" sea una de estas rutas
De encontrar una coincidencia, ejecutará el middleware correspondiente

Express permite el uso de parámetros en las URL
con el formato :parametro
Los parámetros se guardan en req.params,
cada uno con el nombre específicado en la ruta
*/
router.post('/uplinks', postUplink);
router.get('/dashboard', obtenerDatos);
router.get('/:id', obtenerDatosDispositivo);
router.get('/:id/informacion', infoDispositivo);
router.get('/:id/tabla', lecturasEnTabla);

export default router;