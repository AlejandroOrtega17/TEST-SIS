<script setup>
import { onMounted, ref, shallowRef } from "vue";

// Importación de instancia de Axios
import { axiosCliente } from "@/config/axios.js";

// Importación de otros componentes visuales
import Alerta from "@/components/misc/Alerta.vue";
import TarjetaInformativa from "@/components/layouts/dashboard/TarjetaInformativa.vue";

// Importación de gráficos disponibles
import Linea from "@/components/charts/Linea.vue";
import Columna from "@/components/charts/Columna.vue";
import Area from "@/components/charts/Area.vue";
import Barra from "@/components/charts/Barra.vue";

/*
Declaración de variables para la página de dashboard:

dispositivos: lista de todos los dispositivos encontrados
              en la base de datos. Incluye las lecturas correspondientes
              de cada uno, información de tipo de medición y la ubicación

numerosAleatorios: números aleatorios a usar para aleatoriedad de tarjetas informativas

mostrarAlerta: condición para mostrar una alerta en pantalla

graficosDisponibles: gráficos existentes para mostrar la información

graficosAleatoriosNumeros: números aleatorios a usar para aleatoriedad de gráficos que se muestran
*/
const dispositivos = ref([]);
const numerosAleatorios = ref([]);
const mostrarAlerta = ref(false);
const mensajeAlerta = ref("");
const graficosDisponibles = shallowRef([Linea, Columna, Area, Barra]);
let graficosAleatoriosNumeros = [];

// Función para obtener los datos de cada dispositivo desde la API
const obtenerDatos = async () => {
  // Petición para el endpoint /dashboard
  await axiosCliente
    .get("dashboard")
    .then((response) => {
      // Para una promesa resuelta se almacenan los
      // dispositivos recibidos y se convierte la fecha desde UTC
      dispositivos.value = response.data;
      convertirFechaIso(dispositivos.value);
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
const convertirFechaIso = (dispositivos) => {
  // Primeso se recorren todos los dispositivos existentes
  dispositivos.forEach((dispositivo) => {
    // Para cada dispositivo, se recorre el arreglo con sus lecturas
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
  });
};

// Función para crear números aleatorios
const crearNumerosAleatorios = (cantidadDispositivos) => {
  let numerosAleatorios = [];

  // Se mostrará un máximo de 3 tarjetas con información de dispositivos
  // En caso de haber menos de 3 dispositivos, el máximo será la
  // cantidad de dispositivos existentes
  let max = cantidadDispositivos > 3 ? 3 : cantidadDispositivos;
  for (let i = 0; i < max; i++) {
    numerosAleatorios.push(i);
  }
  numerosAleatorios.sort(() => Math.random() - 0.5);
  return numerosAleatorios;
};

// Función para aleatorizar el tipo de gráfico para cada dispositivo
const crearGraficosAleatoriosNumeros = (cantidadDispositivos) => {
  let numerosAleatorios = [];

  // Se generan números aleatorios entre 0 y la cantidad de gráficos existentes
  for (let i = 0; i < cantidadDispositivos; i++) {
    numerosAleatorios.push(
      Math.floor(Math.random() * graficosDisponibles.value.length)
    );
  }
  return numerosAleatorios;
};

// Hook de Vue. Usado para realizar la petición a la API
// antes de renderizar los componentes visuales en pantalla
onMounted(async () => {
  // Se usa async y await para garantizar que el arreglo de dispositivos
  // cotenga valores antes de pasar a la siguiente función,
  // que require la cantidad de dispositivos como argumento
  await obtenerDatos();

  // Creación de números aleatorios
  numerosAleatorios.value = crearNumerosAleatorios(dispositivos.value.length);
  graficosAleatoriosNumeros = crearGraficosAleatoriosNumeros(
    dispositivos.value.length
  );
});
</script>

<template>
  <Alerta v-model="mostrarAlerta" :mensaje="mensajeAlerta" class="alerta" />
  <div id="tarjetas-informativas-div">
    <!-- La primera tarjeta es fija para la cantidad de dispositivos disponibles -->
    <TarjetaInformativa
      titulo="Medidores registrados"
      :valor="dispositivos.length"
    />

    <!-- Tarjetas informativas para mostrar información resumida de las lecturas de dispositivos -->
    <!-- 3 como máximo -->
    <TarjetaInformativa
      v-for="n in numerosAleatorios"
      :titulo="dispositivos[n].medicion.medicion_fenomeno"
      :ubicacion="dispositivos[n].ubicacion.ubicacion_nombre"
      :valor="
        dispositivos[n].lecturasRecientes[
          dispositivos[n].lecturasRecientes.length - 1
        ].lectura_valor
      "
      :unidad="
        dispositivos[n].medicion.medicion_unidad_abreviatura
          ? dispositivos[n].medicion.medicion_unidad_abreviatura
          : dispositivos[n].medicion.medicion_unidad
      "
    />
  </div>

  <div id="graficos-container">
    <div v-for="(dispositivo, index) in dispositivos" class="grafico-div">
      <BButton
        variant="outline-info"
        size="sm"
        :to="{
          name: 'grafico-detallado',
          params: { dispositivoId: dispositivo.dispositivo_id },
        }"
        >Más información</BButton
      >
      <component
        :is="graficosDisponibles[graficosAleatoriosNumeros[index]]"
        :dispositivo="dispositivo"
      />
    </div>
  </div>
</template>

<style scoped>
#tarjetas-informativas-div {
  width: 90%;
  margin: 0 auto 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

#graficos-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.grafico-div {
  width: 40%;
}

.alerta {
  position: absolute;
  top: 20%;
  left: 30%;
  z-index: 3;
}

@media (max-width: 500px) {
  .alerta {
    left: 15%;
  }
}

@media (width < 600px) {
  #graficos-container {
    flex-direction: column;
  }

  .grafico-div {
    width: 100%;
  }
}
</style>