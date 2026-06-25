// El backend de este proyecto a veces envuelve la respuesta en un objeto
// { message, <key>: [...] } (típicamente cuando informa "no hay registros
// todavía") y a veces devuelve el array/objeto pelado. Esta función deja
// el dato siempre en la forma que el frontend espera, sin importar cuál
// de las dos formas haya mandado el backend en ese momento.
//
// Ejemplo real visto en /peliculas con la DB vacía:
// { message: 'No hay peliculas registradas todavia', movies: [] }
export const unwrapList = (data, posiblesClaves = []) => {
  if (Array.isArray(data)) return data

  if (data && typeof data === 'object') {
    for (const clave of posiblesClaves) {
      if (Array.isArray(data[clave])) return data[clave]
    }
  }

  // Si no es array ni tiene ninguna de las claves esperadas, no inventamos
  // datos: devolvemos array vacío para que la UI muestre "no hay registros"
  // en vez de romperse.
  return []
}

// Mismo problema pero para un objeto único (ej: GET /peliculas/:id
// devolviendo { message, movie: {...} } en vez del objeto plano).
// Solo desenvolvemos si el objeto trae 'message' (señal clara de wrapper);
// si no, lo dejamos tal cual para no confundir un campo legítimo del
// objeto real con una clave de wrapper.
export const unwrapObject = (data, posiblesClaves = []) => {
  if (data && typeof data === 'object' && !Array.isArray(data) && 'message' in data) {
    for (const clave of posiblesClaves) {
      if (data[clave] && typeof data[clave] === 'object') return data[clave]
    }
  }
  return data
}
