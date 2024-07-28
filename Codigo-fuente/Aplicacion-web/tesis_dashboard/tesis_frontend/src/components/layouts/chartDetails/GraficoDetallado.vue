<script setup>
import { onMounted, onBeforeUnmount, ref, shallowRef } from "vue";
import { useRoute } from "vue-router";

// Importación de instancia de Axios
import { axiosCliente } from "@/config/axios.js";

// Importación de gráficos disponibles
import Linea from "../../charts/Linea.vue";
import Columna from "../../charts/Columna.vue";
import Area from "@/components/charts/Area.vue";
import Barra from "@/components/charts/Barra.vue";

// Importación de otros componentes visuales
import Alerta from "@/components/misc/Alerta.vue";

/*
Declaración de variables para la página de dashboard:

route: instancia de useRoute para hacer uso de las propiedades de route

dispositivos: arreglo de 1 solo dispositivo que se encontró
              en la base de datos. Incluye las lecturas más recientes
              y de hace 24 horas, información de tipo de medición y la ubicación

intervalId: intervalo para realizar una nueva petición a la API

graficosDisponibles: gráficos existentes para mostrar la información

graficoActualNumero: índice para graficosDisponibles

show: condición para mostrar un menú desplegable
      más información en https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/dropdown.html

mostrarAlerta: condición para mostrar una alerta en pantalla
*/
const route = useRoute();
const dispositivos = ref([]);
const intervalId = ref(null);
const graficosDisponibles = shallowRef([Linea, Columna, Area, Barra]);
const graficoActualNumero = ref(0);
const show = ref(false);
const mostrarAlerta = ref(false);
const mensajeAlerta = ref("");

// Función para obtener los datos de cada dispositivo desde la API
const obtenerDatos = async () => {
  // Petición para información de un dispositivo específico
  await axiosCliente
    .get(`${route.params.dispositivoId}`)
    .then((response) => {
      // Para una promesa resuelta se almacenan los
      // dispositivos recibidos y se convierte la fecha desde UTC
      dispositivos.value = response.data;
      convertirFechaIso(dispositivos.value[0]);
    })
    .catch((error) => {
      // Para una promesa rechazada se muestra una alerta
      if (error.response.status >= 400 && error.response.status < 500) {
        mensajeAlerta.value = error.response.data;
      }
      mostrarAlerta.value = true;
    });
};

// Función para convertir de fecha ISO a local
const convertirFechaIso = (dispositivo) => {
  // Se recorren los arreglo con las lecturas recientes y antiguas
  dispositivo.lecturasRecientes.forEach((lectura) => {
    // Para cada una se divide en hora (formato 24 horas) con minutos
    // y en fecha
    lectura.createdAt = {
      hora: new Date(lectura.createdAt).toLocaleTimeString(undefined, {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      fecha: new Date(lectura.createdAt).toLocaleDateString("es-SV"),
    };
  });
  dispositivo.lecturasAnteriores.forEach((lectura) => {
    lectura.createdAt = {
      hora: new Date(lectura.createdAt).toLocaleTimeString(undefined, {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      fecha: new Date(lectura.createdAt).toLocaleDateString("es-SV"),
    };
  });
};

// Hook de Vue. Usado para realizar la petición a la API
// antes de renderizar los componentes visuales en pantalla
onMounted(async () => {
  await obtenerDatos();

  // Se establece el intervalo para volver a solicitar datos
  intervalId.value = setInterval(obtenerDatos, 300000);
});

// Hooke de Vue. Usado para limpiar la variable con el intervalo
// establecido para realizar peticiones
onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <Alerta v-model="mostrarAlerta" :mensaje="mensajeAlerta" class="alerta" />
  <div id="grafico-detallado-container">
    <div v-for="dispositivo in dispositivos" class="grafico-div">
      <BDropdown v-model="show" text="Cambiar gráfico" variant="primary">
        <BDropdownItem
          v-for="(grafico, index) in graficosDisponibles"
          @click="graficoActualNumero = index"
          :disabled="index === graficoActualNumero"
        >
          {{ grafico.__name }}
        </BDropdownItem>
      </BDropdown>
      <component
        :is="graficosDisponibles[graficoActualNumero]"
        :dispositivo="dispositivo"
      />
    </div>
  </div>
  <div id="informacion-medida">
    <h2>Información sobre esta medición</h2>
    <h3>
      {{ dispositivos[0] ? dispositivos[0].medicion.medicion_fenomeno : "" }}
    </h3>
    <p>
      {{ dispositivos[0] ? dispositivos[0].medicion.medicion_descripcion : "" }}
    </p>
  </div>
</template>

<style scoped>
.alerta {
  position: absolute;
  top: 20%;
  left: 30%;
}

@media (max-width: 500px) {
  .alerta {
    left: 15%;
  }
}
</style>
