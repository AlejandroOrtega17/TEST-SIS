<script setup>
const props = defineProps(["titulo", "ubicacion", "valor", "unidad"]);
</script>

<template>
  <BCard class="tarjeta-informativa">
    <h1 class="tarjeta-informativa-titulo">{{ titulo }}</h1>
    <span></span>
    <h2 class="tarjeta-informativa-ubicacion">{{ ubicacion }}</h2>
    <BCardText class="tarjeta-informativa-valor"
      >{{ valor }}
      <span class="tarjeta-informativa-unidad">{{ unidad }}</span></BCardText
    >
  </BCard>
</template>

<style>
.tarjeta-informativa {
  width: 15rem;
  min-height: 1rem;
  margin: 15px auto;
  box-shadow: 1px 3px rgb(182, 171, 171, 0.7);
}
.tarjeta-informativa-titulo{
    font-size: 1.1rem;
}
.tarjeta-informativa-ubicacion{
    font-size: 0.9rem;
}
.tarjeta-informativa-valor{
    font-size: 1.5rem;
}
.tarjeta-informativa-unidad{
    font-size: 1.2rem;
}
</style>
