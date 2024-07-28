package com.uca.edu.campussensors.adapter

import android.animation.LayoutTransition
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.transition.AutoTransition
import android.transition.TransitionManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.patrykandpatrick.vico.core.cartesian.CartesianChart
import com.patrykandpatrick.vico.core.cartesian.data.CartesianChartModelProducer
import com.uca.edu.campussensors.R
import com.uca.edu.campussensors.model.Dispositivo
import java.text.SimpleDateFormat
import java.util.Locale
import com.patrykandpatrick.vico.core.cartesian.data.MutableChartValues
import com.patrykandpatrick.vico.core.cartesian.data.lineSeries
import com.patrykandpatrick.vico.views.cartesian.CartesianChartView
import com.patrykandpatrick.vico.core.cartesian.axis.HorizontalAxis.Builder
import com.patrykandpatrick.vico.core.cartesian.data.CartesianValueFormatter
import com.patrykandpatrick.vico.core.cartesian.HorizontalLayout
import com.patrykandpatrick.vico.core.cartesian.axis.BaseAxis
import com.patrykandpatrick.vico.core.cartesian.axis.HorizontalAxis
import com.patrykandpatrick.vico.core.cartesian.data.CartesianChartModel
import com.patrykandpatrick.vico.core.cartesian.data.ChartValues
import com.patrykandpatrick.vico.core.common.data.ExtraStore
import java.time.Instant
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.util.Date
import java.util.TimeZone
import com.patrykandpatrick.vico.core.cartesian.data.toImmutable
import com.patrykandpatrick.vico.core.cartesian.data.LineCartesianLayerModel
import com.patrykandpatrick.vico.core.common.Dimensions
import com.patrykandpatrick.vico.core.common.DrawContext
import com.patrykandpatrick.vico.core.common.HorizontalLegend
import com.patrykandpatrick.vico.core.common.LegendItem
import com.patrykandpatrick.vico.core.common.MeasureContext
import com.patrykandpatrick.vico.core.common.component.TextComponent
import java.math.RoundingMode
import kotlin.time.Duration.Companion.hours

val modelProducer = CartesianChartModelProducer.build()

class DispositivoAdapter(private val dispositivos: List<Dispositivo>) :
    RecyclerView.Adapter<DispositivoAdapter.DispositivoViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DispositivoViewHolder {
        val view =
            LayoutInflater.from(parent.context).inflate(R.layout.item_dispositivo, parent, false)
        return DispositivoViewHolder(view)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onBindViewHolder(holder: DispositivoViewHolder, position: Int) {
        val dispositivo = dispositivos[position]
        holder.bind(dispositivo)
    }

    override fun getItemCount(): Int = dispositivos.size

    override fun onViewDetachedFromWindow(holder: DispositivoViewHolder) {
        super.onViewDetachedFromWindow(holder)
        holder.stopUpdates()
    }

    class DispositivoViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val fenomeno: TextView = itemView.findViewById(R.id.fenomeno)
        private val descripcion: TextView = itemView.findViewById(R.id.descripcion)
        private val unidad: TextView = itemView.findViewById(R.id.unidad)
        private val ubicacionNombre: TextView = itemView.findViewById(R.id.ubicacionNombre)
        private val lecturaIntervalo: TextView = itemView.findViewById(R.id.lecturaIntervalo)
        private val lecturaValor: TextView = itemView.findViewById(R.id.lecturaValor)
        private val lecturaFecha: TextView = itemView.findViewById(R.id.lecturaFecha)
        private val lineChart: CartesianChartView = itemView.findViewById(R.id.chart_view)
        private val layout: RelativeLayout = itemView.findViewById(R.id.layout)

        private val handler = Handler(Looper.getMainLooper())
        private val updateInterval: Long = 60000 //

        /* public fun expand(view: View){
            var v = if(descripcion.getVisibility() == View.GONE) {View.VISIBLE} else { View.GONE}
            var i = if(lecturaIntervalo.getVisibility() == View.GONE) {View.VISIBLE} else { View.GONE}
            var l = if(lecturaFecha.getVisibility() == View.GONE) {View.VISIBLE} else { View.GONE}
            var d = if(lineChart.getVisibility() == View.GONE) {View.VISIBLE} else { View.GONE}

            TransitionManager.beginDelayedTransition(layout,  AutoTransition());
            descripcion.setVisibility(v);
            lecturaIntervalo.setVisibility(i);
            lecturaFecha.setVisibility(l);
            lineChart.setVisibility(d);

        }*/

        @RequiresApi(Build.VERSION_CODES.O)
        fun bind(dispositivo: Dispositivo) {
           /* layout.getLayoutTransition().enableTransitionType(LayoutTransition.CHANGING)
            layout.setOnClickListener {
                expand(itemView)
            }*/
            fenomeno.text = dispositivo.medicion.medicion_fenomeno
            descripcion.text = dispositivo.medicion.medicion_descripcion
            unidad.text =
                "${dispositivo.medicion.medicion_unidad} (${dispositivo.medicion.medicion_unidad_abreviatura ?: ""})"
            ubicacionNombre.text = dispositivo.ubicacion.ubicacion_nombre
            lecturaIntervalo.text =
                "Intervalo de Lectura: ${dispositivo.dispositivo_lectura_intervalo} segundos"

            // Mostrar la lectura más reciente y empezar la actualización periódica
            updateLatestReading(dispositivo)
            handler.post(object : Runnable {
                override fun run() {
                    updateLatestReading(dispositivo)
                    handler.postDelayed(this, updateInterval)
                }
            })


        }

        @RequiresApi(Build.VERSION_CODES.O)
        fun updateLatestReading(dispositivo: Dispositivo) {
            val lecturaReciente = dispositivo.lecturasRecientes.maxByOrNull { it.createdAt }
            lecturaValor.text = "${lecturaReciente?.lectura_valor ?: "N/A"}"
            lecturaFecha.text = "Fecha de Lectura: ${lecturaReciente?.createdAt.toString() ?: "N/A"}"
            mostrarGrafico(dispositivo)
        }
        @RequiresApi(Build.VERSION_CODES.O)
        private fun mostrarGrafico(dispositivo: Dispositivo) {
            val lecturas = dispositivo.lecturasRecientes.sortedBy { it.createdAt }

            if (lecturas.isNotEmpty()) {
                val dateFormat = SimpleDateFormat("HH.mm", Locale.getDefault())
                val xValues = lecturas.map { dateFormat.format(it.createdAt.time).toBigDecimal().setScale(2, RoundingMode.HALF_UP)}
                val yValues = lecturas.map { it.lectura_valor }

                modelProducer.tryRunTransaction {
                    lineSeries {
                        series(
                            x = xValues,
                            y = yValues
                        )
                    }
                }

                lineChart.modelProducer = modelProducer
            }
        }

        fun stopUpdates() {
            handler.removeCallbacksAndMessages(null) // Remove callbacks to avoid memory leaks
        }

    }
}

