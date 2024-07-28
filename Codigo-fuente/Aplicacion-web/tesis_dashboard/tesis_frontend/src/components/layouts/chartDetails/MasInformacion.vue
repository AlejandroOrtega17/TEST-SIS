<script setup>
import { ref } from "vue";

// Vista por defecto con que se renderiza
const tab = ref("grafico");
</script>

<template>
  <div id="mas-informacion-div">
    <div class="botones-container">
      <!-- "Botón" para regresar a la vista principal de dashboard -->
      <div class="btn-cerrar-div">
        <RouterLink
          variant="danger"
          class="btn-cerrar"
          :to="{ name: 'dashboard' }"
          >X</RouterLink
        >
      </div>

      <!-- Pestañas para cambiar entre la vista de gráfico y de tabla -->
      <!-- Usa componentes dinámicos que renderizan un botón deshabilitado o un router-link -->
      <component
        :is="tab === 'grafico' ? 'button' : 'router-link'"
        :to="{ name: 'grafico-detallado' }"
        class="btn-tab"
        :disabled="tab === 'grafico'"
        @click="tab = 'grafico'"
        >Gráfico</component
      >
      <component
        :is="tab === 'tabla' ? 'button' : 'router-link'"
        :to="{ name: 'tabla-historial' }"
        class="btn-tab"
        :disabled="tab === 'tabla'"
        @click="tab = 'tabla'"
        >Tabla</component
      >
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
#mas-informacion-div {
  height: 100%;
}

.btn-cerrar-div {
  display: inline-block;
  height: 100%;
  margin-right: 1rem;
  position: relative;
  top: -10px;
}

.btn-cerrar {
  padding: 0.5rem 0.7rem;
  background-color: #dc3545;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  font-weight: bolder;
}

.botones-container {
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 2px rgb(114, 104, 104, 0.5) solid;
}

.btn-tab {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  margin-bottom: -2px;
  border: 2px rgb(114, 104, 104, 0) solid;
  border-radius: 10px 10px 0 0;
  background: none;
  color: black;
  text-decoration: none;
}

.btn-tab:hover {
  color: #48cae4;
  background: none;
  border-left: 2px rgb(114, 104, 104, 0.5) solid;
  border-right: 2px rgb(114, 104, 104, 0.5) solid;
  border-top: 2px rgb(114, 104, 104, 0.5) solid;
  border-bottom: 2px rgb(255, 255, 255) solid;
}

.btn-tab:disabled {
  color: #48cae4;
  border-left: 2px rgb(114, 104, 104, 0.5) solid;
  border-right: 2px rgb(114, 104, 104, 0.5) solid;
  border-top: 2px rgb(114, 104, 104, 0.5) solid;
  border-bottom: 2px rgb(255, 255, 255) solid;
}
</style>
