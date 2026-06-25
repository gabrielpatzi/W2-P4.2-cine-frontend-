import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')

export const formatFechaHora = (fecha) => {
  return moment(fecha).format('DD/MM/YYYY HH:mm')
}

export const formatFecha = (fecha) => {
  return moment(fecha).format('DD/MM/YYYY')
}

export const formatHora = (fecha) => {
  return moment(fecha).format('HH:mm')
}

export const formatDuracion = (minutos) => {
  const horas = Math.floor(minutos / 60)
  const min = minutos % 60
  if (horas === 0) return `${min} min`
  return `${horas}h ${min}min`
}

// Convierte fecha (YYYY-MM-DD) y hora (HH:mm) de un form a un ISO string
export const toIsoDateTime = (fecha, hora) => {
  return moment(`${fecha} ${hora}`, 'YYYY-MM-DD HH:mm').toISOString()
}
