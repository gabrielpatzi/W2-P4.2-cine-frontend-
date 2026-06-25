import Seat from './Seat'
import SeatLegend from './SeatLegend'

const SeatMap = ({ asientos = [], seleccionados = [], onToggle }) => {

  // Agrupamos los asientos por fila (A, B, C...) para pintar la grilla
  const filas = asientos.reduce((acc, asiento) => {
    if (!acc[asiento.fila]) acc[asiento.fila] = []
    acc[asiento.fila].push(asiento)
    return acc
  }, {})

  const estaSeleccionado = (asiento) => {
    return seleccionados.some((a) => a.id === asiento.id)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Pantalla curva con resplandor */}
      <div className="w-full max-w-lg flex flex-col items-center mb-2">
        <div
          className="w-full h-2 rounded-[50%]"
          style={{
            background: 'var(--marquee)',
            boxShadow: '0 0 40px 8px rgba(244, 180, 26, 0.35)',
          }}
        />
        <span className="font-mono text-[10px] tracking-[0.3em] mt-3" style={{ color: 'var(--ink-faint)' }}>
          PANTALLA
        </span>
      </div>

      <div className="flex flex-col gap-2.5 overflow-x-auto px-2">
        {Object.keys(filas).sort().map((fila) => (
          <div key={fila} className="flex items-center gap-2">
            <span className="w-4 text-[10px] font-mono" style={{ color: 'var(--ink-faint)' }}>{fila}</span>
            <div className="flex gap-1.5 sm:gap-2">
              {filas[fila]
                .sort((a, b) => a.columna - b.columna)
                .map((asiento) => (
                  <Seat
                    key={asiento.id}
                    asiento={asiento}
                    seleccionado={estaSeleccionado(asiento)}
                    onToggle={onToggle}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      <SeatLegend />
    </div>
  )
}

export default SeatMap
