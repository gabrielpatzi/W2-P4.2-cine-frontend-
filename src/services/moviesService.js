import axios from 'axios'
import { API_URL } from '../utils/constants'
import { unwrapList, unwrapObject } from '../utils/unwrapResponse'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const moviesService = {
  getAll: (filtros = {}) => {
    return new Promise((resolve, reject) => {
      api.get('/peliculas', { params: filtros })
        .then((response) => {
          // El backend puede devolver el array directo o
          // { message, movies: [...] } cuando no hay registros
          resolve(unwrapList(response.data, ['movies', 'peliculas']))
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      api.get(`/peliculas/${id}`)
        .then((response) => {
          resolve(unwrapObject(response.data, ['movie', 'pelicula']))
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // datos: { titulo, sinopsis, genero, duracion, clasificacion, poster (File) }
  create: (datos) => {
    return new Promise((resolve, reject) => {
      const formData = construirFormData(datos)
      api.post('/peliculas', formData)
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
      const formData = construirFormData(datos)
      api.put(`/peliculas/${id}`, formData)
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
      api.delete(`/peliculas/${id}`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

// El backend espera multipart/form-data con el archivo bajo la key 'poster'
const construirFormData = (datos) => {
  const formData = new FormData()
  formData.append('titulo', datos.titulo)
  formData.append('sinopsis', datos.sinopsis)
  formData.append('genero', datos.genero)
  formData.append('duracion', datos.duracion)
  formData.append('clasificacion', datos.clasificacion)
  if (datos.poster) {
    formData.append('poster', datos.poster)
  }
  return formData
}

export default moviesService
