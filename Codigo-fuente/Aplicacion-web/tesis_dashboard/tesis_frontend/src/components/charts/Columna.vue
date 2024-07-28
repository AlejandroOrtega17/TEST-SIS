<script setup>
// Configuración para gráfico de columnas estático y en tiempo real
// Más información de configuraciones en
// https://apexcharts.com/vue-chart-demos/column-charts/
import { onUpdated, ref } from "vue";
import { valoresEnArreglo, tiemposEnArreglo, promedioValores } from "./funcionesGraficos.js";

const props = defineProps({
  dispositivo: Object,
});

const chartOptions = ref({
  chart: {
    id: "realtime",
    height: 350,
    type: "bar",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  title: {
    text: props.dispositivo.medicion.medicion_fenomeno,
    align: "left",
    margin: 0,
    style: {
      fontSize: "20px",
      color: "black",
    },
  },
  subtitle: {
    text:
      `en ${props.dispositivo.ubicacion.ubicacion_nombre} (` +
      (props.dispositivo.lecturasRecientes[0].createdAt.fecha ==
      props.dispositivo.lecturasRecientes[
        props.dispositivo.lecturasRecientes.length - 1
      ].createdAt.fecha
        ? `${props.dispositivo.lecturasRecientes[0].createdAt.fecha})`
        : `${props.dispositivo.lecturasRecientes[0].createdAt.fecha} - ${
            props.dispositivo.lecturasRecientes[
              props.dispositivo.lecturasRecientes.length - 1
            ].createdAt.fecha
          })`),
    align: "left",
    margin: 0,
    style: {
      fontSize: "15px",
    },
  },
  xaxis: {
    categories: tiemposEnArreglo(props.dispositivo.lecturasRecientes),
    title: {
      text: "Hora de medición",
      style: {
        fontSize: "15px",
        color: "black",
      },
    },
  },
  yaxis: {
    title: {
      text: "Valor de la medición",
      style: {
        fontSize: "15px",
        color: "black",
      },
    },
    decimalsInFloat: 2
  },
  tooltip: {
    y: {
      title: {
        formatter: () =>
          props.dispositivo.medicion.medicion_unidad_abreviatura
            ? props.dispositivo.medicion.medicion_unidad_abreviatura
            : props.dispositivo.medicion.medicion_unidad,
      },
    },
  },
});

const series = ref([]);
if (!props.dispositivo.lecturasAnteriores) {
  series.value = [
    {
      name: "Mediciones recientes",
      data: valoresEnArreglo(props.dispositivo.lecturasRecientes),
      color: "#000080",
    },
    {
      name: "Promedio actual",
      data: promedioValores(props.dispositivo.lecturasRecientes),
      color: "#0b6623",
    },
  ];
} else {
  series.value = [
    {
      name: "Mediciones recientes",
      data: valoresEnArreglo(props.dispositivo.lecturasRecientes),
      color: "#000080",
    },
    {
      name: "Promedio actual",
      data: promedioValores(props.dispositivo.lecturasRecientes),
      color: "#0b6623",
    },
    {
      name: "Mediciones 24 horas antes",
      data: valoresEnArreglo(props.dispositivo.lecturasAnteriores),
      color: "#ffa500",
    },
  ];
}

onUpdated(() => {
  ApexCharts.exec("realtime", "updateSeries", [
    {
      name: "Mediciones recientes",
      data: valoresEnArreglo(props.dispositivo.lecturasRecientes),
      color: "#000080",
    },
    {
      name: "Promedio actual",
      data: promedioValores(props.dispositivo.lecturasRecientes),
      color: "#0b6623",
    },
    {
      name: "Mediciones 24 horas antes",
      data: valoresEnArreglo(props.dispositivo.lecturasAnteriores),
      color: "#ffa500",
    },
  ], true);

  ApexCharts.exec("realtime", "updateOptions", {
    xaxis: {
    categories: tiemposEnArreglo(props.dispositivo.lecturasRecientes),
    }
  }, true, true);
});
</script>

<template>
  <apexchart
    type="bar"
    :options="chartOptions"
    :series="series"
    height="350"
  ></apexchart>
</template>
