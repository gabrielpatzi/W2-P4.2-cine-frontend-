import { useEffect, useState } from 'react'
import moviesService from '../../services/moviesService'
import Container from '../../components/common/Container'
import Spinner from '../../components/common/Spinner'
import MovieCard from '../../components/movies/MovieCard'
import SearchBar from '../../components/movies/SearchBar'
import GenreFilter from '../../components/movies/GenreFilter'

const HomePage = () => {
  const [peliculas, setPeliculas] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [genero, setGenero] = useState('')

  useEffect(() => {
    let activo = true

    moviesService.getAll({ titulo: busqueda || undefined, genero: genero || undefined })
      .then((data) => {
        if (activo) setPeliculas(data)
      })
      .catch((error) => {
        console.error('Error al cargar la cartelera', error)
        if (activo) setPeliculas([])
      })

    return () => {
      activo = false
    }
  }, [busqueda, genero])

  return (
    <Container>
      <p className="font-mono text-xs tracking-[0.2em] mb-1" style={{ color: 'var(--ink-faint)' }}>HOY EN CARTELERA</p>
      <h1 className="font-display text-4xl mb-6" style={{ color: 'var(--ink)' }}>Elegí tu película</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1">
          <SearchBar value={busqueda} onChange={setBusqueda} />
        </div>
        <GenreFilter value={genero} onChange={setGenero} />
      </div>

      {peliculas === null ? (
        <Spinner />
      ) : !Array.isArray(peliculas) || peliculas.length === 0 ? (
        <p style={{ color: 'var(--ink-faint)' }}>No se encontraron películas.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {peliculas.map((pelicula) => (
            <MovieCard key={pelicula.id} pelicula={pelicula} />
          ))}
        </div>
      )}
    </Container>
  )
}

export default HomePage
