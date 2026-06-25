import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import moviesService from '../../services/moviesService'
import Container from '../../components/common/Container'
import Spinner from '../../components/common/Spinner'
import MoviePoster from '../../components/movies/MoviePoster'
import ShowtimeList from '../../components/showtimes/ShowtimeList'
import { formatDuracion } from '../../utils/dateHelpers'

const MovieDetailPage = () => {
  const { id } = useParams()
  const [pelicula, setPelicula] = useState(null)
  const [noEncontrada, setNoEncontrada] = useState(false)

  useEffect(() => {
    let activo = true

    moviesService.getById(id)
      .then((data) => {
        if (activo) setPelicula(data)
      })
      .catch((error) => {
        console.error('Error al cargar la película', error)
        if (activo) setNoEncontrada(true)
      })

    return () => {
      activo = false
    }
  }, [id])

  if (noEncontrada) return <Container><p style={{ color: 'var(--ink-faint)' }}>No se encontró la película.</p></Container>
  if (!pelicula) return <Spinner />

  return (
    <Container>
      <div className="flex flex-col sm:flex-row gap-8 text-left">
        <MoviePoster
          poster={pelicula.poster}
          titulo={pelicula.titulo}
          className="w-full sm:w-64 h-80 flex-shrink-0 ticket-corner"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5" style={{ backgroundColor: 'var(--surface-raised)', color: 'var(--marquee)' }}>
              {pelicula.clasificacion}
            </span>
            <span className="font-mono text-xs uppercase tracking-wide" style={{ color: 'var(--ink-faint)' }}>
              {pelicula.genero} · {formatDuracion(pelicula.duracion)}
            </span>
          </div>

          <h1 className="font-display text-4xl mb-4" style={{ color: 'var(--ink)' }}>{pelicula.titulo}</h1>

          <p className="mb-8 leading-relaxed" style={{ color: 'var(--ink-dim)' }}>{pelicula.sinopsis}</p>

          <p className="font-mono text-xs tracking-[0.2em] mb-3" style={{ color: 'var(--ink-faint)' }}>FUNCIONES</p>
          <ShowtimeList funciones={Array.isArray(pelicula.funciones) ? pelicula.funciones : []} />
        </div>
      </div>
    </Container>
  )
}

export default MovieDetailPage
