import { Link } from 'react-router'
import MoviePoster from './MoviePoster'
import { formatDuracion } from '../../utils/dateHelpers'

const MovieCard = ({ pelicula }) => {
  return (
    <Link
      to={`/peliculas/${pelicula.id}`}
      className="group block relative overflow-hidden ticket-corner"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="relative">
        <MoviePoster poster={pelicula.poster} titulo={pelicula.titulo} className="w-full h-72" />

        {/* Sello de clasificación, esquina superior izquierda */}
        <span
          className="absolute top-2 left-2 font-mono text-[10px] font-bold px-1.5 py-0.5"
          style={{ backgroundColor: 'var(--bg)', color: 'var(--marquee)' }}
        >
          {pelicula.clasificacion}
        </span>

        {/* Overlay con género al hacer hover */}
        <div
          className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 60%)' }}
        >
          <span className="font-mono text-xs uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
            {pelicula.genero}
          </span>
        </div>
      </div>

      <div className="p-3 text-left">
        <h3 className="font-display text-base leading-tight" style={{ color: 'var(--ink)' }}>
          {pelicula.titulo}
        </h3>
        <p className="font-mono text-xs mt-1" style={{ color: 'var(--ink-faint)' }}>
          {formatDuracion(pelicula.duracion)}
        </p>
      </div>
    </Link>
  )
}

export default MovieCard
