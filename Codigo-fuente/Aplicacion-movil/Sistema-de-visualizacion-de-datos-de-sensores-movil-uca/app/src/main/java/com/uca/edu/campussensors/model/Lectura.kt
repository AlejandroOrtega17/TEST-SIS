package com.uca.edu.campussensors.model

import java.util.Date

data class Lectura(
    val lectura_id: Int,
    val lectura_valor: Float,
    val dispositivo_id: String,
    val createdAt: Date
)