import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../components/common/Spinner'

// Exige sesión activa (cliente o admin). Si no hay sesión, manda a /login.
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <Spinner />
  if (!isAuthenticated) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute
