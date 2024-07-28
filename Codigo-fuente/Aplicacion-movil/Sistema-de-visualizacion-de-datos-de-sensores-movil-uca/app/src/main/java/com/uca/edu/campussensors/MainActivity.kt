package com.uca.edu.campussensors

import android.animation.LayoutTransition
import android.app.Activity
import android.os.Build
import android.os.Bundle
import android.transition.AutoTransition
import android.transition.TransitionManager
import android.util.Log
import android.view.View
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.uca.edu.campussensors.adapter.DispositivoAdapter
import com.uca.edu.campussensors.api.RetrofitClient
import com.uca.edu.campussensors.model.Dispositivo
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import com.patrykandpatrick.vico.views.cartesian.CartesianChartView
import java.time.LocalDate
import java.time.format.DateTimeFormatter

class MainActivity : Activity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: DispositivoAdapter

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        setTheme(R.style.Theme_CampusSensors)
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        recyclerView = findViewById(R.id.recyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)

        fetchDispositivos()

    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun fetchDispositivos() {
        val apiService = RetrofitClient.instance

        // Obtener la fecha actual en formato 'yyyy-MM-dd'
        val currentDate = LocalDate.now()
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
        val formattedDate = currentDate.format(formatter)
        RetrofitClient.instance.getDispositivos(formattedDate).enqueue(object : Callback<List<Dispositivo>> {
            override fun onResponse(call: Call<List<Dispositivo>>, response: Response<List<Dispositivo>>) {
                if (response.isSuccessful) {
                    val dispositivos = response.body() ?: emptyList()
                    adapter = DispositivoAdapter(dispositivos)
                    recyclerView.adapter = adapter
                }
            }

            override fun onFailure(call: Call<List<Dispositivo>>, t: Throwable) {
                Log.e("MainActivity", "Error fetching dispositivos", t)
            }
        })
    }


}