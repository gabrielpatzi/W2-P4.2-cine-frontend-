export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const STATIC_URL = `${API_URL}/static`

export const GENEROS = [
  { value: 'accion', label: 'Acción' },
  { value: 'comedia', label: 'Comedia' },
  { value: 'drama', label: 'Drama' },
  { value: 'terror', label: 'Terror' },
  { value: 'ciencia ficcion', label: 'Ciencia ficción' },
  { value: 'documental', label: 'Documental' },
]

export const CLASIFICACIONES = [
  { value: 'Todo público', label: 'Todo público' },
  { value: '+14', label: '+14' },
  { value: 'R', label: 'R' },
]

export const ROLES = {
  ADMIN: 'admin',
  CLIENTE: 'cliente',
}

export const ESTADO_ASIENTO = {
  LIBRE: 'libre',
  OCUPADO: 'ocupado',
}
