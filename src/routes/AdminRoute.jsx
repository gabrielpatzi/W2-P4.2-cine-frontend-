import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../components/common/Spinner'

// Exige sesión activa Y rol admin. Si está logueado pero no es admin,
// lo mandamos a la cartelera en vez de a /login (ya está autenticado).
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) return <Spinner />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return children
}

export default AdminRoute
