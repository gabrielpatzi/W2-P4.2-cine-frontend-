const Seat = ({ asiento, seleccionado, onToggle }) => {
  const ocupado = asiento.estado === 'ocupado'

  let estilo
  if (ocupado) {
    estilo = { backgroundColor: 'var(--seat-taken)', color: 'var(--ink-faint)', cursor: 'not-allowed' }
  } else if (seleccionado) {
    estilo = { backgroundColor: 'var(--accent)', color: '#fff', cursor: 'pointer' }
  } else {
    estilo = { backgroundColor: 'var(--seat-free-bg)', color: 'var(--seat-free)', cursor: 'pointer', border: '1px solid var(--seat-free)' }
  }

  return (
    <button
      type="button"
      disabled={ocupado}
      onClick={() => onToggle(asiento)}
      style={estilo}
      className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-t-md rounded-b-sm text-[10px] font-mono font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--marquee)]"
      title={`${asiento.fila}${asiento.columna}`}
    >
      {asiento.columna}
    </button>
  )
}

export default Seat
