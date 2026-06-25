import { useEffect, useState } from 'react'
import showtimesService from '../../services/showtimesService'
import moviesService from '../../services/moviesService'
import roomsService from '../../services/roomsService'
import Container from '../../components/common/Container'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'
import Table from '../../components/common/Table'
import TrHeader from '../../components/common/TrHeader'
import Tr from '../../components/common/Tr'
import Th from '../../components/common/Th'
import Td from '../../components/common/Td'
import ShowtimeForm from '../../components/admin/ShowtimeForm'
import { formatFechaHora } from '../../utils/dateHelpers'

const AdminShowtimesPage = () => {
  const [funciones, setFunciones] = useState([])
  const [peliculas, setPeliculas] = useState([])
  const [salas, setSalas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [funcionEditando, setFuncionEditando] = useState(null)

  // Recarga silenciosa: solo refresca el listado de funciones (películas y
  // salas no cambian entre una mutación de función y otra)
  const recargarFunciones = () => {
    showtimesService.getAll()
      .then((data) => {
        setFunciones(data)
      })
      .catch((err) => {
        console.error('Error al recargar funciones', err)
      })
  }

  useEffect(() => {
    let activo = true

    Promise.all([
      showtimesService.getAll(),
      moviesService.getAll(),
      roomsService.getAll(),
    ])
      .then(([funcionesData, peliculasData, salasData]) => {
        if (!activo) return
        setFunciones(funcionesData)
        setPeliculas(peliculasData)
        setSalas(salasData)
      })
      .catch((err) => {
        console.error('Error al cargar datos de funciones', err)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [])

  const handleNuevaFuncion = () => {
    setFuncionEditando(null)
    setMostrarForm(true)
  }

  const handleEditar = (funcion) => {
    setFuncionEditando(funcion)
    setMostrarForm(true)
  }

  const handleEliminar = (funcion) => {
    const confirmar = window.confirm('¿Eliminar esta función?')
    if (!confirmar) return

    showtimesService.remove(funcion.id)
      .then(() => {
        recargarFunciones()
      })
      .catch((err) => {
        const mensaje = err.response?.data?.message || 'No se pudo eliminar la función'
        window.alert(mensaje)
      })
  }

  // setErrorServidor viene desde el propio ShowtimeForm, así el 409 de
  // horario superpuesto se muestra justo debajo del form
  const handleSubmit = (datos, setErrorServidor) => {
    setEnviando(true)

    const promesa = funcionEditando
      ? showtimesService.update(funcionEditando.id, datos)
      : showtimesService.create(datos)

    promesa
      .then(() => {
        setMostrarForm(false)
        recargarFunciones()
      })
      .catch((err) => {
        const mensaje = err.response?.data?.message
          || 'No se pudo guardar la función. Verifica que la sala no tenga otra función en ese horario.'
        setErrorServidor(mensaje)
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
          <h1 className="font-display text-3xl" style={{ color: 'var(--ink)' }}>Funciones</h1>
        </div>
        <Button onClick={handleNuevaFuncion}>+ Nueva función</Button>
      </div>

      {mostrarForm && (
        <div className="border p-5 mb-8" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }}>
          <h2 className="font-display text-xl mb-5" style={{ color: 'var(--ink)' }}>
            {funcionEditando ? 'Editar función' : 'Nueva función'}
          </h2>
          <ShowtimeForm
            funcion={funcionEditando}
            peliculas={peliculas}
            salas={salas}
            onSubmit={handleSubmit}
            enviando={enviando}
          />
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
              <Th>Película</Th>
              <Th>Sala</Th>
              <Th>Fecha y hora</Th>
              <Th>Precio</Th>
              <Th>Acciones</Th>
            </TrHeader>
          </thead>
          <tbody>
            {(funciones || []).map((funcion) => (
              <Tr key={funcion.id}>
                <Td>{funcion.pelicula?.titulo}</Td>
                <Td>{funcion.sala?.nombre}</Td>
                <Td>{formatFechaHora(funcion.fecha_hora_inicio)}</Td>
                <Td>Bs. {funcion.precio}</Td>
                <Td>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleEditar(funcion)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleEliminar(funcion)}>
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

export default AdminShowtimesPage
