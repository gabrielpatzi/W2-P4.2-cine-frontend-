import axios from 'axios'
import { API_URL } from '../utils/constants'
import { unwrapList, unwrapObject } from '../utils/unwrapResponse'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const roomsService = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      api.get('/salas')
        .then((response) => {
          resolve(unwrapList(response.data, ['salas', 'rooms']))
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      api.get(`/salas/${id}`)
        .then((response) => {
          resolve(unwrapObject(response.data, ['sala', 'room']))
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // datos: { nombre, filas, columnas }
  // OJO: una vez creada la sala, los asientos NO se regeneran si se editan
  // filas/columnas. Por eso en el form de edición conviene bloquear esos campos.
  create: (datos) => {
    return new Promise((resolve, reject) => {
      api.post('/salas', datos)
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
      api.patch(`/salas/${id}`, datos)
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
      api.delete(`/salas/${id}`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export default roomsService
