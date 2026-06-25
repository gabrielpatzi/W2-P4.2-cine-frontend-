import axios from 'axios'
import { API_URL } from '../utils/constants'

// withCredentials: true es obligatorio en TODAS las llamadas, porque la
// sesión se maneja con una cookie httpOnly (access_token), no con un
// token que nosotros guardemos a mano.
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const authService = {
  login: (credenciales) => {
    return new Promise((resolve, reject) => {
      api.post('/auth/login', credenciales)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  register: (datos) => {
    return new Promise((resolve, reject) => {
      api.post('/auth/register', datos)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  me: () => {
    return new Promise((resolve, reject) => {
      api.get('/auth/me')
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  logout: () => {
    return new Promise((resolve, reject) => {
      api.post('/auth/logout')
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export default authService
