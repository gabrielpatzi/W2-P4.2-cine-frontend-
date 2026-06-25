import { STATIC_URL } from '../../utils/constants'

const MoviePoster = ({ poster, titulo, className = '' }) => {
  const src = poster ? `${STATIC_URL}/${poster}` : null

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center font-display text-center px-3 ${className}`}
        style={{ backgroundColor: 'var(--surface-raised)', color: 'var(--ink-faint)' }}
      >
        SIN POSTER
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={titulo}
      className={`object-cover ${className}`}
    />
  )
}

export default MoviePoster
