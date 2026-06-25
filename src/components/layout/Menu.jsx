import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'

const Menu = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout().then(() => {
      navigate('/')
    })
  }

  return (
    <nav className="bg-[var(--surface)] border-b border-[var(--line)] px-5 py-4 flex items-center justify-between flex-wrap gap-4">
      <Link to="/" className="font-display text-2xl text-[var(--ink)] marquee-flicker">
        CINE<span className="text-[var(--accent)]">RIO</span>
      </Link>

      <div className="flex items-center gap-5 flex-wrap text-sm">
        <Link to="/" className="uppercase tracking-wide text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors">
          Cartelera
        </Link>

        {isAuthenticated && (
          <Link to="/mis-reservas" className="uppercase tracking-wide text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors">
            Mis reservas
          </Link>
        )}

        {isAdmin && (
          <>
            <Link to="/admin/peliculas" className="uppercase tracking-wide text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors">
              Películas
            </Link>
            <Link to="/admin/salas" className="uppercase tracking-wide text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors">
              Salas
            </Link>
            <Link to="/admin/funciones" className="uppercase tracking-wide text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors">
              Funciones
            </Link>
          </>
        )}

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--ink-faint)]">{user?.nombre}</span>
            <Button variant="secondary" onClick={handleLogout}>
              Salir
            </Button>
          </div>
        ) : (
          <>
            <Link to="/login" className="uppercase tracking-wide text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors">
              Ingresar
            </Link>
            <Link to="/register">
              <Button>Registrarme</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Menu
