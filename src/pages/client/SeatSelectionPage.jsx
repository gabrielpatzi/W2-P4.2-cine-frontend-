import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import reservationsService from '../../services/reservationsService'
import Container from '../../components/common/Container'
import Spinner from '../../components/common/Spinner'
import SeatMap from '../../components/seats/SeatMap'
import Button from '../../components/common/Button'

const SeatSelectionPage = () => {
  const { id: funcionId } = useParams()
  const navigate = useNavigate()

  const [mapa, setMapa] = useState(null)
  const [seleccionados, setSeleccionados] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let activo = true

    reservationsService.getAsientos(funcionId)
      .then((data) => {
        if (activo) setMapa(data)
      })
      .catch((err) => {
        const mensaje = err.response?.data?.message || 'No se pudo cargar el mapa de asientos'
        if (activo) setError(mensaje)
      })

    return () => {
      activo = false
    }
  }, [funcionId])

  const handleToggle = (asiento) => {
    setSeleccionados((prev) => {
      const yaEsta = prev.some((a) => a.id === asiento.id)
      if (yaEsta) {
        return prev.filter((a) => a.id !== asiento.id)
      }
      return [...prev, asiento]
    })
  }

  const handleContinuar = () => {
    navigate('/reservas/confirmar', {
      state: {
        funcionId,
        asientos: seleccionados,
      },
    })
  }

  if (error) return <Container><p className="error">{error}</p></Container>
  if (!mapa) return <Spinner />

  return (
    <Container>
      <p className="font-mono text-xs tracking-[0.2em] mb-1" style={{ color: 'var(--ink-faint)' }}>SALA {mapa.sala}</p>
      <h1 className="font-display text-3xl mb-8" style={{ color: 'var(--ink)' }}>Elegí tus asientos</h1>

      <SeatMap
        asientos={Array.isArray(mapa.asientos) ? mapa.asientos : []}
        seleccionados={seleccionados}
        onToggle={handleToggle}
      />

      <div className="mt-10 flex flex-col items-center gap-4">
        <p className="font-mono text-sm" style={{ color: 'var(--ink-dim)' }}>
          {seleccionados.length > 0
            ? seleccionados.map((a) => `${a.fila}${a.columna}`).join(' · ')
            : 'Ningún asiento seleccionado'}
        </p>
        <Button onClick={handleContinuar} disabled={seleccionados.length === 0}>
          Continuar
        </Button>
      </div>
    </Container>
  )
}

export default SeatSelectionPage
