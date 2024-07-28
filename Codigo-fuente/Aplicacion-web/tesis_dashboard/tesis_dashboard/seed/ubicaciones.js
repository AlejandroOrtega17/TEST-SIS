let ubicaciones = [
  {
    ubicacion_nombre: "Aula Magna I",
    ubicacion_tipo: "Techado"
  },
  {
    ubicacion_nombre: "Aula Magna II",
    ubicacion_tipo: "Techado",
  },
  {
    ubicacion_nombre: "Aula Magna III",
    ubicacion_tipo: "Techado",
  },
  {
    ubicacion_nombre: "Aula Magna IV",
    ubicacion_tipo: "Techado",
  },
  {
    ubicacion_nombre: "Aula Magna V",
    ubicacion_tipo: "Techado",
  },
  {
    ubicacion_nombre: "Aula Magna VI",
    ubicacion_tipo: "Techado",
  },
  {
    ubicacion_nombre: "Cancha de fútbol",
    ubicacion_tipo: "Aire libre",
  },
  {
    ubicacion_nombre: "Canchas",
    ubicacion_tipo: "Techado",
  },
  {
    ubicacion_nombre: "Talleres Gráficos",
    ubicacion_tipo: "Cerrado"
  },
  {
    ubicacion_nombre: "Unidad de Mantenimiento",
    ubicacion_tipo: "Cerrado"
  },
  {
    ubicacion_nombre: "Laboratorio de Estructuras Grandes",
    ubicacion_tipo: "Cerrado"
  },
  {
    ubicacion_nombre: "Estacionamiento General",
    ubicacion_tipo: "Aire libre"
  },
  {
    ubicacion_nombre: "Estacionamiento anexo",
    ubicacion_tipo: "Aire libre"
  },
  {
    ubicacion_nombre: "Estacionamiento Edificio de Aulas 'B'",
    ubicacion_tipo: "Aire libre"
  },
];

function agregarAulas(ubicacionesExistentes){
  for(let i = 1; i < 5; i++){
    for(let j = 1; j < 5; j++){
      ubicacionesExistentes.push({
        ubicacion_nombre: `Aula A-${i}${j}`,
        ubicacion_tipo: "Cerrado"
      });
    }
  }

  for(let i = 1; i < 5; i++){
    for(let j = 1; j < 5; j++){
      ubicacionesExistentes.push({
        ubicacion_nombre: `Aula B-${i}${j}`,
        ubicacion_tipo: "Cerrado"
      });
    }
  }

  for(let i = 1; i < 4; i++){
    for(let j = 1; j < 8; j++){
      ubicacionesExistentes.push({
        ubicacion_nombre: `Aula D-${i}${j}`,
        ubicacion_tipo: "Cerrado"
      });
    }
  }

  //console.log(ubicacionesExistentes);

  return ubicacionesExistentes;
}

export default agregarAulas(ubicaciones);