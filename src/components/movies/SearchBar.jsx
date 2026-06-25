const SearchBar = ({ value, onChange, placeholder = 'Buscar película...' }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--ink)] placeholder:text-[var(--ink-faint)] px-3 py-2.5 text-sm w-full focus:outline-none focus:border-[var(--accent)]"
    />
  )
}

export default SearchBar
