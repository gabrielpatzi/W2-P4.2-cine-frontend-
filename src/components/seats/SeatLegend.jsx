const SeatLegend = () => {
  return (
    <div className="flex items-center gap-5 text-xs font-mono" style={{ color: 'var(--ink-dim)' }}>
      <div className="flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-t-sm inline-block" style={{ backgroundColor: 'var(--seat-free-bg)', border: '1px solid var(--seat-free)' }}></span>
        LIBRE
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-t-sm inline-block" style={{ backgroundColor: 'var(--accent)' }}></span>
        ELEGIDO
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-t-sm inline-block" style={{ backgroundColor: 'var(--seat-taken)' }}></span>
        OCUPADO
      </div>
    </div>
  )
}

export default SeatLegend
