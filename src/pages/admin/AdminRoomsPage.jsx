import { useEffect, useState } from 'react'
import roomsService from '../../services/roomsService'
import Container from '../../components/common/Container'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'
import Table from '../../components/common/Table'
import TrHeader from '../../components/common/TrHeader'
import Tr from '../../components/common/Tr'
import Th from '../../components/common/Th'
import Td from '../../components/common/Td'
import RoomForm from '../../components/admin/RoomForm'

const AdminRoomsPage = () => {
  const [salas, setSalas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [salaEditando, setSalaEditando] = useState(null)
  const [error, setError] = useState('')

  // Recarga silenciosa: se usa después de crear/editar/eliminar, sin volver
  // a mostrar el spinner de carga inicial (la tabla vieja se ve mientras refresca)
  const recargarSalas = () => {
    roomsService.getAll()
      .then((data) => {
        setSalas(data)
      })
      .catch((err) => {
        console.error('Error al cargar salas', err)
      })
  }

  useEffect(() => {
    let activo = true

    roomsService.getAll()
      .then((data) => {
        if (activo) setSalas(data)
      })
      .catch((err) => {
        console.error('Error al cargar salas', err)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [])

  const handleNuevaSala = () => {
    setSalaEditando(null)
    setError('')
    setMostrarForm(true)
  }

  const handleEditar = (sala) => {
    setSalaEditando(sala)
    setError('')
    setMostrarForm(true)
  }

  const handleEliminar = (sala) => {
    const confirmar = window.confirm(`¿Eliminar la sala "${sala.nombre}"?`)
    if (!confirmar) return

    roomsService.remove(sala.id)
      .then(() => {
        recargarSalas()
      })
      .catch((err) => {
        const mensaje = err.response?.data?.message || 'No se pudo eliminar la sala'
        window.alert(mensaje)
      })
  }

  const handleSubmit = (datos) => {
    setEnviando(true)
    setError('')

    // Si es edición, no mandamos filas/columnas (el form ya las deja bloqueadas
    // porque el backend no regenera los asientos al cambiarlas)
    const promesa = salaEditando
      ? roomsService.update(salaEditando.id, { nombre: datos.nombre })
      : roomsService.create(datos)

    promesa
      .then(() => {
        setMostrarForm(false)
        recargarSalas()
      })
      .catch((err) => {
        const mensaje = err.response?.data?.message || 'No se pudo guardar la sala'
        setError(mensaje)
      })
      .finally(() => {
        setEnviando(false)
      })
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] mb-1" style={{ color: 'var(--ink-faint)' }}>ADMIN</p>
          <h1 className="font-display text-3xl" style={{ color: 'var(--ink)' }}>Salas</h1>
        </div>
        <Button onClick={handleNuevaSala}>+ Nueva sala</Button>
      </div>

      {mostrarForm && (
        <div className="border p-5 mb-8" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }}>
          <h2 className="font-display text-xl mb-5" style={{ color: 'var(--ink)' }}>
            {salaEditando ? 'Editar sala' : 'Nueva sala'}
          </h2>
          <RoomForm
            sala={salaEditando}
            onSubmit={handleSubmit}
            enviando={enviando}
          />
          {error && <p className="error mt-2">{error}</p>}
          <Button variant="secondary" className="mt-3" onClick={() => setMostrarForm(false)}>
            Cancelar
          </Button>
        </div>
      )}

      {cargando ? (
        <Spinner />
      ) : (
        <Table>
          <thead>
            <TrHeader>
              <Th>Nombre</Th>
              <Th>Filas</Th>
              <Th>Columnas</Th>
              <Th>Capacidad</Th>
              <Th>Acciones</Th>
            </TrHeader>
          </thead>
          <tbody>
            {(salas || []).map((sala) => (
              <Tr key={sala.id}>
                <Td>{sala.nombre}</Td>
                <Td>{sala.filas}</Td>
                <Td>{sala.columnas}</Td>
                <Td>{sala.capacidad ?? sala.filas * sala.columnas}</Td>
                <Td>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleEditar(sala)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleEliminar(sala)}>
                      Eliminar
                    </Button>
                  </div>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default AdminRoomsPage
