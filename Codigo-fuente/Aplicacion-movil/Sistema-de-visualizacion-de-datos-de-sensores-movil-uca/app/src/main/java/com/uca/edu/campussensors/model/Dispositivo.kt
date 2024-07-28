package com.uca.edu.campussensors.model

data class Dispositivo(
    val dispositivo_id: String,
    val medicion_id: Int,
    val ubicacion_id: Int,
    val dispositivo_lectura_intervalo: Int,
    val medicion: Medicion,
    val coordenadas: String,
    val ubicacion: Ubicacion,
    val lecturasRecientes: List<Lectura> = emptyList()
)
