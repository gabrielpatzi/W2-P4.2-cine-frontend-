import axios from 'axios'
import { API_URL } from '../utils/constants'
import { unwrapList } from '../utils/unwrapResponse'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const reservationsService = {
  // Devuelve { funcionId, sala, filas, columnas, asientos: [{id, fila, columna, estado}] }
  getAsientos: (funcionId) => {
    return new Promise((resolve, reject) => {
      api.get(`/reservas/asientos/${funcionId}`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // datos: { funcionId, asientoIds: [...] }
  create: (datos) => {
    return new Promise((resolve, reject) => {
      api.post('/reservas', datos)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getMisReservas: () => {
    return new Promise((resolve, reject) => {
      api.get('/reservas/mis-reservas')
        .then((response) => {
          resolve(unwrapList(response.data, ['reservas', 'reservations']))
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export default reservationsService
