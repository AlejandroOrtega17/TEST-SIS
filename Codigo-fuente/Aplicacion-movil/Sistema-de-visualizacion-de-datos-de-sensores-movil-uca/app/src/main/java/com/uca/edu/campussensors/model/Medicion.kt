package com.uca.edu.campussensors.model

data class Medicion(
    val medicion_id: Int,
    val medicion_fenomeno: String,
    val medicion_descripcion: String,
    val medicion_unidad: String,
    val medicion_unidad_abreviatura: String?
)