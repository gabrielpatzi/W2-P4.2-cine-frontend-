import axios from 'axios'
import { API_URL } from '../utils/constants'
import { unwrapList, unwrapObject } from '../utils/unwrapResponse'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const showtimesService = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      api.get('/funciones')
        .then((response) => {
          resolve(unwrapList(response.data, ['funciones', 'showtimes']))
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      api.get(`/funciones/${id}`)
        .then((response) => {
          resolve(unwrapObject(response.data, ['funcion', 'showtime']))
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // datos: { peliculaId, salaId, precio, fecha_hora_inicio (ISO string) }
  // El backend responde 409 si la sala ya tiene otra función en ese rango de horario
  create: (datos) => {
    return new Promise((resolve, reject) => {
      api.post('/funciones', datos)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  update: (id, datos) => {
    return new Promise((resolve, reject) => {
      api.patch(`/funciones/${id}`, datos)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      api.delete(`/funciones/${id}`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export default showtimesService
