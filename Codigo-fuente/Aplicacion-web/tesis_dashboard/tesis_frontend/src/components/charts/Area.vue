<script setup>
import { onUpdated, ref } from "vue";
import { valoresEnArreglo, tiemposEnArreglo, promedioValores } from "./funcionesGraficos.js";

const props = defineProps({
  dispositivo: Object,
});

const chartOptions = ref({
  chart: {
    id: "realtime",
    height: 350,
    type: "line",
    zoom: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
    width: 4,
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
  fill: {
    opacity: [0.3, 1, 0.3],
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
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
      zIndex: 2,
    },
    {
      name: "Promedio actual",
      data: promedioValores(props.dispositivo.lecturasRecientes),
      color: "#0b6623",
      zIndex: 3,
    },
  ];
} else {
  series.value = [
    {
      name: "Mediciones recientes",
      type: "area",
      data: valoresEnArreglo(props.dispositivo.lecturasRecientes),
      color: "#000080",
      zIndex: 2,
    },
    {
      name: "Promedio actual",
      type: "line",
      data: promedioValores(props.dispositivo.lecturasRecientes),
      color: "#0b6623",
      zIndex: 3,
    },
    {
      name: "Mediciones 24 horas antes",
      type: "area",
      data: valoresEnArreglo(props.dispositivo.lecturasAnteriores),
      color: "#ffa500",
      zIndex: 0,
    },
  ];
}

onUpdated(() => {
  ApexCharts.exec("realtime", "updateSeries", [
    {
      name: "Mediciones recientes",
      type: "area",
      data: valoresEnArreglo(props.dispositivo.lecturasRecientes),
      color: "#000080",
      zIndex: 2,
    },
    {
      name: "Promedio actual",
      type: "line",
      data: promedioValores(props.dispositivo.lecturasRecientes),
      color: "#0b6623",
      zIndex: 3,
    },
    {
      name: "Mediciones 24 horas antes",
      type: "area",
      data: valoresEnArreglo(props.dispositivo.lecturasAnteriores),
      color: "#ffa500",
      zIndex: 0,
    },
  ]);
});
</script>

<template>
  <apexchart
    type="line"
    :options="chartOptions"
    :series="series"
    height="350"
  ></apexchart>
</template>
