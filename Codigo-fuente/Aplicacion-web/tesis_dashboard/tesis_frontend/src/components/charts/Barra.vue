<script setup>
import { onUpdated, ref } from "vue";
import { valoresEnArregloGoals, promedioValoresIndividual } from "./funcionesGraficos.js";

const props = defineProps({
  dispositivo: Object,
});

const promedio = ref(0);
promedio.value = promedioValoresIndividual(props.dispositivo.lecturasRecientes);

const chartOptions = ref({
  chart: {
    id: "realtime",
    height: 350,
    type: "bar",
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 2,
      borderRadiusApplication: "end",
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
  },
  legend: {
    customLegendItems: [
      "Mediciones recientes",
      "Mediciones 24 horas antes",
      "Promedio actual",
    ],
    markers: {
      fillColors: ["#000080", "#ffa500", "#0b6623"],
    },
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
      data: valoresEnArregloGoals(props.dispositivo.lecturasRecientes, promedio.value),
      color: "#000080",
    },
  ];
} else {
  series.value = [
    {
      name: "Mediciones recientes",
      data: valoresEnArregloGoals(props.dispositivo.lecturasRecientes, promedio.value),
      color: "#000080",
    },
    {
      name: "Mediciones 24 horas antes",
      data: valoresEnArregloGoals(props.dispositivo.lecturasAnteriores, promedio.value),
      color: "#ffa500",
    },
  ];
}

onUpdated(() => {
  ApexCharts.exec("realtime", "updateSeries", [
    {
      name: "Mediciones recientes",
      data: valoresEnArregloGoals(props.dispositivo.lecturasRecientes, promedio.value),
      color: "#000080",
    },
    {
      name: "Mediciones 24 horas antes",
      data: valoresEnArregloGoals(props.dispositivo.lecturasAnteriores, promedio.value),
      color: "#ffa500",
    },
  ]);
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
