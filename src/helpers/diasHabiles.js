// Definir una lista de días feriados (puedes modificar esta lista según tu región o país)
const feriados = [
    '2023-01-01', // Año Nuevo
    '2023-12-25', // Navidad
    // Agregar más días festivos aquí...
  ];
  
  // Función para verificar si una fecha es un día feriado
  function esFeriado(fecha) {
    const fechaStr = fecha.toISOString().split('T')[0];
    return feriados.includes(fechaStr);
  }
  
  // Función para obtener un rango de fechas excluyendo días feriados, sábados y domingos
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
  
//   // Ejemplo de uso
//   const fechaInicio = new Date('2023-11-01');
//   const fechaFin = new Date('2023-11-10');
  
//   const fechasSinFeriadosYSabadosDomingos = obtenerFechasSinFeriadosYSabadosDomingos(fechaInicio, fechaFin);
  
//   console.log('Fechas sin feriados, sábados ni domingos:', fechasSinFeriadosYSabadosDomingos);
  