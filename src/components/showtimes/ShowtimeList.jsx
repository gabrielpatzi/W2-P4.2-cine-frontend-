import ShowtimeCard from './ShowtimeCard'

const ShowtimeList = ({ funciones = [] }) => {
  if (funciones.length === 0) {
    return <p style={{ color: 'var(--ink-faint)' }}>No hay funciones disponibles para esta película.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {funciones.map((funcion) => (
        <ShowtimeCard key={funcion.id} funcion={funcion} />
      ))}
    </div>
  )
}

export default ShowtimeList
