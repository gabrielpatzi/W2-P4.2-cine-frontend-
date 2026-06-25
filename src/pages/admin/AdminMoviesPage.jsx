import { useEffect, useState } from 'react'
import moviesService from '../../services/moviesService'
import Container from '../../components/common/Container'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'
import Table from '../../components/common/Table'
import TrHeader from '../../components/common/TrHeader'
import Tr from '../../components/common/Tr'
import Th from '../../components/common/Th'
import Td from '../../components/common/Td'
import Badge from '../../components/common/Badge'
import MovieForm from '../../components/admin/MovieForm'

const AdminMoviesPage = () => {
  const [peliculas, setPeliculas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [peliculaEditando, setPeliculaEditando] = useState(null)
  const [error, setError] = useState('')

  // Recarga silenciosa: se usa después de crear/editar/eliminar, sin volver
  // a mostrar el spinner de carga inicial
  const recargarPeliculas = () => {
    moviesService.getAll()
      .then((data) => {
        setPeliculas(data)
      })
      .catch((err) => {
        console.error('Error al cargar películas', err)
      })
  }

  useEffect(() => {
    let activo = true

    moviesService.getAll()
      .then((data) => {
        if (activo) setPeliculas(data)
      })
      .catch((err) => {
        console.error('Error al cargar películas', err)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [])

  const handleNuevaPelicula = () => {
    setPeliculaEditando(null)
    setError('')
    setMostrarForm(true)
  }

  const handleEditar = (pelicula) => {
    setPeliculaEditando(pelicula)
    setError('')
    setMostrarForm(true)
  }

  const handleEliminar = (pelicula) => {
    const confirmar = window.confirm(`¿Eliminar la película "${pelicula.titulo}"?`)
    if (!confirmar) return

    moviesService.remove(pelicula.id)
      .then(() => {
        recargarPeliculas()
      })
      .catch((err) => {
        const mensaje = err.response?.data?.message || 'No se pudo eliminar la película'
        window.alert(mensaje)
      })
  }

  const handleSubmit = (datos) => {
    setEnviando(true)
    setError('')

    const promesa = peliculaEditando
      ? moviesService.update(peliculaEditando.id, datos)
      : moviesService.create(datos)

    promesa
      .then(() => {
        setMostrarForm(false)
        recargarPeliculas()
      })
      .catch((err) => {
        const mensaje = err.response?.data?.message || 'No se pudo guardar la película'
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
          <h1 className="font-display text-3xl" style={{ color: 'var(--ink)' }}>Películas</h1>
        </div>
        <Button onClick={handleNuevaPelicula}>+ Nueva película</Button>
      </div>

      {mostrarForm && (
        <div className="border p-5 mb-8" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }}>
          <h2 className="font-display text-xl mb-5" style={{ color: 'var(--ink)' }}>
            {peliculaEditando ? 'Editar película' : 'Nueva película'}
          </h2>
          <MovieForm
            pelicula={peliculaEditando}
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
              <Th>Título</Th>
              <Th>Género</Th>
              <Th>Duración</Th>
              <Th>Clasificación</Th>
              <Th>Acciones</Th>
            </TrHeader>
          </thead>
          <tbody>
            {(peliculas || []).map((pelicula) => (
              <Tr key={pelicula.id}>
                <Td>{pelicula.titulo}</Td>
                <Td><Badge variant={pelicula.genero}>{pelicula.genero}</Badge></Td>
                <Td>{pelicula.duracion} min</Td>
                <Td>{pelicula.clasificacion}</Td>
                <Td>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleEditar(pelicula)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleEliminar(pelicula)}>
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

export default AdminMoviesPage
