// Función para colocar el valor de cada lectura en un arreglo
function valoresEnArreglo(lecturas) {
  let arregloValores = [];
  lecturas.forEach((lectura) => {
    arregloValores.push(lectura.lectura_valor);
  });
  return arregloValores;
}

// Función para colocar el valor de cada lectura en un arreglo
// con atributo goals (para gráfico de barras o columnas)
function valoresEnArregloGoals(lecturas, promedio) {
  let arregloValores = [];
  lecturas.forEach((lectura) => {
    arregloValores.push({
      x: lectura.createdAt.hora,
      y: lectura.lectura_valor,
      goals: [
        {
          name: "Promedio actual",
          value: promedio,
          strokeWidth: 5,
          strokeHeight: 10,
          strokeColor: "#0b6623",
        },
      ],
    });
  });
  return arregloValores;
}

// Función para colocar la hora de cada lectura en un arreglo
function tiemposEnArreglo(lecturas) {
  let arregloTiempos = [];
  lecturas.forEach((lectura) => {
    arregloTiempos.push(lectura.createdAt.hora);
  });
  return arregloTiempos;
}

// Función para obtener el promedio de los valores de las lecturas
// y colocarlo en un arreglo
function promedioValores(lecturas) {
  let promedio = 0;
  let promedioArreglo = [];
  let valores = valoresEnArreglo(lecturas);
  for (let i = 0; i < valores.length; i++) {
    promedio += valores[i];
  }
  promedio = promedio / valores.length;
  for (let i = 0; i < valores.length; i++) {
    promedioArreglo.push(promedio);
  }

  return promedioArreglo;
}

function promedioValoresIndividual(lecturas) {
  let promedio = 0;
  let valores = valoresEnArreglo(lecturas);
  for (let i = 0; i < valores.length; i++) {
    promedio += valores[i];
  }
  promedio = promedio / valores.length;
  return promedio;
}

// Funcion para creación de CSV a partir de lecturas de la tabla
// y su descarga
function lecturasToCsv(lecturas){

  // Se transforma el arreglo de lecturas en string separado por comas
  let csv = "Fecha,Hora,Valor\n";
  lecturas.forEach(lectura => {
    csv += `${lectura.createdAt.fecha},${lectura.createdAt.hora},${lectura.lectura_valor}\n`;
  });

  // Creación de blob con el CSV a descargar
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8," });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = "historial.csv";
  link.click();
}

export {
  valoresEnArreglo,
  valoresEnArregloGoals,
  tiemposEnArreglo,
  promedioValores,
  promedioValoresIndividual,
  lecturasToCsv
}