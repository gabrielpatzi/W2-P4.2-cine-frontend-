import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router'
import reservationsService from '../../services/reservationsService'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'

const ReservationConfirmPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { funcionId, asientos } = location.state || {}

  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  // Si alguien llega directo a esta ruta sin pasar por la selección de asientos
  if (!funcionId || !asientos || asientos.length === 0) {
    return (
      <Container>
        <p style={{ color: 'var(--ink-faint)' }}>
          No hay una selección de asientos activa.{' '}
          <Link to="/" style={{ color: 'var(--accent)' }}>Volver a la cartelera</Link>
        </p>
      </Container>
    )
  }

  const handleConfirmar = () => {
    setEnviando(true)
    setError('')
    reservationsService.create({
      funcionId,
      asientoIds: asientos.map((a) => a.id),
    })
      .then(() => {
        navigate('/mis-reservas')
      })
      .catch((err) => {
        const mensaje = err.response?.data?.message || 'No se pudo completar la reserva. Es posible que algún asiento ya haya sido tomado.'
        setError(mensaje)
      })
      .finally(() => {
        setEnviando(false)
      })
  }

  return (
    <Container className="max-w-md">
      <p className="font-mono text-xs tracking-[0.2em] mb-1" style={{ color: 'var(--ink-faint)' }}>CONFIRMACIÓN</p>
      <h1 className="font-display text-3xl mb-8" style={{ color: 'var(--ink)' }}>Tu boleto</h1>

      {/* Ticket stub con perforado */}
      <div className="relative ticket-stub mb-6">
        <div
          className="border-2 p-6 flex flex-col gap-3"
          style={{ borderColor: 'var(--line)', borderStyle: 'dashed', backgroundColor: 'var(--surface)' }}
        >
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-[10px] tracking-wide" style={{ color: 'var(--ink-faint)' }}>ASIENTOS</span>
            <span className="font-display text-xl" style={{ color: 'var(--marquee)' }}>
              {asientos.map((a) => `${a.fila}${a.columna}`).join(' · ')}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-[10px] tracking-wide" style={{ color: 'var(--ink-faint)' }}>CANTIDAD</span>
            <span className="font-mono text-sm" style={{ color: 'var(--ink)' }}>{asientos.length}</span>
          </div>
        </div>
      </div>

      {error && <p className="error mb-4">{error}</p>}

      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => navigate(-1)} disabled={enviando}>
          Volver
        </Button>
        <Button onClick={handleConfirmar} disabled={enviando} className="flex-1">
          {enviando ? 'Confirmando...' : 'Confirmar reserva'}
        </Button>
      </div>
    </Container>
  )
}

export default ReservationConfirmPage
