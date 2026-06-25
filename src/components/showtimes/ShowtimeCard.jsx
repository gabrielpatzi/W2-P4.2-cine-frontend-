import { Link } from 'react-router'
import { formatFechaHora } from '../../utils/dateHelpers'

const ShowtimeCard = ({ funcion }) => {
  return (
    <Link
      to={`/funciones/${funcion.id}/asientos`}
      className="block border border-[var(--line)] px-4 py-3 hover:border-[var(--accent)] transition-colors"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <p className="font-mono text-sm" style={{ color: 'var(--ink)' }}>{formatFechaHora(funcion.fecha_hora_inicio)}</p>
      <p className="text-xs mt-1" style={{ color: 'var(--ink-faint)' }}>Sala {funcion.sala?.nombre}</p>
      <p className="font-display text-sm mt-1" style={{ color: 'var(--marquee)' }}>Bs. {funcion.precio}</p>
    </Link>
  )
}

export default ShowtimeCard
