// Lista lista de días feriados
const feriados = [
  '2023-01-01', // Año Nuevo
  '2023-11-15',
  '2023-12-25',
  "2024-01-01",
  "2024-02-12",
  "2024-02-13",
  "2024-03-24",
  "2024-03-29",
  "2024-04-02",
  "2024-05-01",
  "2024-05-25",
  "2024-06-20",
  "2024-07-09",
  "2024-08-17",
  "2024-10-12",
  "2024-11-20",
  "2024-12-08",
  "2024-12-25", //Año nuevo
  // Agregar más días festivos o feriados acá...
];

function esFeriado(fecha) {
  const fechaStr = fecha.toISOString().split('T')[0];
  return feriados.includes(fechaStr);
}

export function obtenerFechasSinFeriadosYSabadosDomingos(fechaInicio, fechaFin) {
  const fechasExcluidas = [];
  const fechaActual = new Date(fechaInicio);

  while (fechaActual <= fechaFin) {
    if (!esFeriado(fechaActual) && fechaActual.getDay() !== 0 && fechaActual.getDay() !== 6) {
      fechasExcluidas.push(new Date(fechaActual));
    }

    fechaActual.setDate(fechaActual.getDate() + 1);
  }

  return fechasExcluidas;
}

