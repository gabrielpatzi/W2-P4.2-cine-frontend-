import { useEffect, useState } from 'react'
import reservationsService from '../../services/reservationsService'
import Container from '../../components/common/Container'
import Spinner from '../../components/common/Spinner'
import { formatFechaHora } from '../../utils/dateHelpers'

const MyReservationsPage = () => {
  const [reservas, setReservas] = useState(null)

  useEffect(() => {
    let activo = true

    reservationsService.getMisReservas()
      .then((data) => {
        if (activo) setReservas(data)
      })
      .catch((error) => {
        console.error('Error al cargar las reservas', error)
        if (activo) setReservas([])
      })

    return () => {
      activo = false
    }
  }, [])

  if (reservas === null) return <Spinner />

  return (
    <Container>
      <p className="font-mono text-xs tracking-[0.2em] mb-1" style={{ color: 'var(--ink-faint)' }}>HISTORIAL</p>
      <h1 className="font-display text-3xl mb-8" style={{ color: 'var(--ink)' }}>Mis reservas</h1>

      {reservas.length === 0 ? (
        <p style={{ color: 'var(--ink-faint)' }}>Todavía no tenés reservas.</p>
      ) : (
        <div className="flex flex-col gap-3 max-w-lg">
          {(reservas || []).map((reserva) => (
            <div
              key={reserva.id}
              className="border-l-4 px-4 py-3"
              style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--surface)' }}
            >
              <p className="font-display text-lg" style={{ color: 'var(--ink)' }}>{reserva.funcion?.pelicula?.titulo}</p>
              <p className="font-mono text-xs mt-1" style={{ color: 'var(--ink-faint)' }}>
                {formatFechaHora(reserva.funcion?.fecha_hora_inicio)} · Sala {reserva.funcion?.sala?.nombre}
              </p>
              <p className="font-mono text-xs mt-1" style={{ color: 'var(--marquee)' }}>
                Asiento {reserva.asiento?.fila}{reserva.asiento?.columna}
              </p>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}

export default MyReservationsPage
