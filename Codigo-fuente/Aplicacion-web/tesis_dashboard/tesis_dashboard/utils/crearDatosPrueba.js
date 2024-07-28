// Archivo para la creación de datos de prueba
// para simular el envío de datos desde un dispositivo real

// USO ESTRICTAMENTE PARA PRUEBAS

import { Dispositivo, Lectura } from "../models/index.js";

const crearDatosPrueba = async () => {

    // Copia del cuerpo de la solicitud enviada por el servidor TTN
    let req = {
        body: {
            "end_device_ids": {
                "device_id": "eui-aaaaaaaaaaaaaaaa",
                "application_ids": {
                    "application_id": "proyecto-lora-dashboard-2024"
                },
                "dev_eui": "BBBBBBBBBBBBBBBB",
                "join_eui": "0000000000000022",
                "dev_addr": "01FAE0C7"
            },
            "correlation_ids": [
                "as:up:01HXAGKFPP5VD8C18F7JYVDCWG",
                "gs:conn:01HVKDGKPYNAKWH2RN8E05A71W",
                "gs:up:host:01HVKDGKQ6625J2P0ZMKC106WE",
                "gs:uplink:01HXAGKFG3P89R57FTZ66DYQ5M",
                "ns:uplink:01HXAGKFG32ERAJ8PJM4W46KZ5",
                "rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01HXAGKFG3CC774FK2PVEG9R6J",
                "rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01HXAGKFPNZ61G2SQ90AT0AJFY"
            ],
            "received_at": "2024-05-07T21:50:53.142350948Z",
            "uplink_message": {
                "session_key_id": "AY9Uwb76J+/X1E9i1joMbg==",
                "f_port": 1,
                "f_cnt": 74,
                "frm_payload": "OTUuMDA=",
                "decoded_payload": {
                    "bytes": [
                        57,
                        50,
                        46,
                        48,
                        48
                    ],
                    "value": "65",
                    "interval": 60,
                    "measurement_id": 2,
                    "location_id": 2
                },
                "rx_metadata": [
                    {
                        "gateway_ids": {
                            "gateway_id": "rasperygatway",
                            "eui": "B827EBFFFE5C6988"
                        },
                        "time": "2024-04-20T19:58:00.733Z",
                        "timestamp": 750883709,
                        "rssi": -108,
                        "channel_rssi": -108,
                        "snr": 4.8,
                        "frequency_offset": "396",
                        "uplink_token": "ChsKGQoNcmFzcGVyeWdhdHdheRIIuCfr//5caYgQ/aaG5gIaDAjJvJCxBhCTgcDhAiDIwKCh7ZBVKgwIyLyQsQYQwOLC3QI="
                    }
                ],
                "settings": {
                    "data_rate": {
                        "lora": {
                            "bandwidth": 125000,
                            "spreading_factor": 10
                        }
                    },
                    "coding_rate": "4/5",
                    "frequency": "917800000",
                    "timestamp": 365319470,
                    "time": "2024-05-07T21:50:51.926Z"
                },
                "received_at": "2024-05-07T21:50:52.931841813Z",
                "consumed_airtime": "0.092672s",
                "network_ids": {
                    "net_id": "000000"
                }
            }
        }
    }

    // Obtener la fecha del día anterior
    let fecha = new Date(Date.now());
    fecha.setDate(fecha.getDate() - 1);

    // Bucle para crear registros en Dispositivos y Lecturas
    // (error de cálculo con el límite)
    for (let i = 0; i < 1500; i++) {
        // Se tiene previsto que uno de los dispositivos reales
        // tome nuevas lecturas cada 5 minutos
        fecha.setMinutes(fecha.getMinutes() + 5)
        
        // Misma funcionalidad que controllers/dispositivoController.js
        try {
            const lectura = req.body.uplink_message.decoded_payload
            const dispositivoId = req.body.end_device_ids.device_id
            const dispositivo = await Dispositivo.findByPk(dispositivoId)

            if (!dispositivo) {
                await Dispositivo.create({
                    dispositivo_id: dispositivoId,
                    medicion_id: lectura.measurement_id,
                    ubicacion_id: lectura.location_id,
                    dispositivo_lectura_intervalo: lectura.interval
                });

                await Lectura.create({
                    // Generación de número aleatorio como valor de la lectura
                    lectura_valor: Number((32 + Math.random() * 20).toFixed(2)),
                    dispositivo_id: dispositivoId,
                    createdAt: fecha.toISOString()
                });
            }
            else {
                await Lectura.create({
                    lectura_valor: Number((32 + Math.random() * 20).toFixed(2)),
                    dispositivo_id: dispositivoId,
                    createdAt: fecha.toISOString()
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Mensaje para avisar finalización de for
    console.log("Valores insertados");

    // Función para seguir insertando valores cada 1 minuto
    setInterval(async () => {
        console.log("Insertado nuevo valor");
        fecha.setMinutes(fecha.getMinutes() + 5)
        
        try {
            const lectura = req.body.uplink_message.decoded_payload
            const dispositivoId = req.body.end_device_ids.device_id
            const dispositivo = await Dispositivo.findByPk(dispositivoId)

            if (!dispositivo) {
                await Dispositivo.create({
                    dispositivo_id: dispositivoId,
                    medicion_id: lectura.measurement_id,
                    ubicacion_id: lectura.location_id,
                    dispositivo_lectura_intervalo: lectura.interval
                });

                await Lectura.create({
                    lectura_valor: Number((32 + Math.random() * 20).toFixed(2)),
                    dispositivo_id: dispositivoId,
                    createdAt: fecha.toISOString()
                });
            }
            else {
                await Lectura.create({
                    lectura_valor: Number((32 + Math.random() * 20).toFixed(2)),
                    dispositivo_id: dispositivoId,
                    createdAt: fecha.toISOString()
                });
            }
        } catch (error) {
            console.log(error)
        }
    }, 60000)
}

// Se evalua el argumento que sigue al archivo para ejecutar la función
if (process.argv[2] === "-i") {
    crearDatosPrueba();
}