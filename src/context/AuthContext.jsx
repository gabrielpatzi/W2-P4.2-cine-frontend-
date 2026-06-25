import { useEffect, useState } from 'react'
import authService from '../services/authService'
import { AuthContext } from './auth-context'

// Como la sesión vive en una cookie httpOnly, no podemos "leerla" desde JS.
// La única forma de saber si hay sesión activa es preguntarle al backend
// con /auth/me. Por eso este provider chequea al montar la app.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let activo = true

    authService.me()
      .then((data) => {
        if (activo) setUser(data)
      })
      .catch(() => {
        if (activo) setUser(null)
      })
      .finally(() => {
        if (activo) setLoading(false)
      })

    return () => {
      activo = false
    }
  }, [])

  const checkAuth = () => {
    return authService.me()
      .then((data) => {
        setUser(data)
        return data
      })
      .catch(() => {
        setUser(null)
        return null
      })
  }

  const login = (credenciales) => {
    return authService.login(credenciales)
      .then(() => checkAuth())
  }

  const register = (datos) => {
    return authService.register(datos)
  }

  const logout = () => {
    return authService.logout()
      .finally(() => setUser(null))
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.rol === 'admin',
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
