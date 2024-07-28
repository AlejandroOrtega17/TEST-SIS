package com.uca.edu.campussensors.api

import com.uca.edu.campussensors.model.Dispositivo
import retrofit2.Call

import retrofit2.http.GET
import retrofit2.http.Query
import java.time.LocalDate

interface ApiService {
    @GET("dashboard")
    fun getDispositivos(@Query("fechaInicio") fechaInicio: String): Call<List<Dispositivo>>
}