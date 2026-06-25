import { GENEROS } from '../../utils/constants'

const GenreFilter = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--ink)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--accent)]"
    >
      <option value="">Todos los géneros</option>
      {GENEROS.map((genero) => (
        <option key={genero.value} value={genero.value}>
          {genero.label}
        </option>
      ))}
    </select>
  )
}

export default GenreFilter
