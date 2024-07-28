// Importación de modelos necesarios
import { Dispositivo, Lectura } from "../models/index.js";

// Función para la creación de dispositivos y lecturas
// en sus respectivas tablas en la BD
const postUplink = async (req, res, next) => {
    try {
        /*
        Se guarda toda la información del payload:
        {
            "byte": [],
            "value": "valor numérico",
            "interval": valor numérico,
            "measurement_id": valor numérico,
            "location_id": valor numérico
        }
        */
        const lectura = req.body.uplink_message.decoded_payload

        // Se busca el dispositivo con el id
        // definido en el paquete de datos
        const dispositivoId = req.body.end_device_ids.device_id
        const dispositivo = await Dispositivo.findByPk(dispositivoId)

        // Se comprueba la existencia del dispositivo
        if(!dispositivo){

            // Si no existe el dispositivo, se crea en la tabla
            await Dispositivo.create({
                dispositivo_id: dispositivoId,
                medicion_id: lectura.measurement_id,
                ubicacion_id: lectura.location_id,
                dispositivo_lectura_intervalo: lectura.interval
            });

            // Se crea la nueva lectura a la tabla
            await Lectura.create({
                lectura_valor: lectura.value,
                dispositivo_id: dispositivoId
            });
        }
        else{

            // Si ya existe el dispositivo,
            // solo se crea la nueva lectura
            await Lectura.create({
                lectura_valor: lectura.value,
                dispositivo_id: dispositivoId
            });
        }

        // Se termina la comunicación sin enviar información
        return res.end();
    } catch (error) {
        console.log(error)
        next();
    }
}

export {
    postUplink
}