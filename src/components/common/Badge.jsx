const Badge = ({ children, variant = 'default' }) => {

  let classVariant
  switch (variant) {
    case 'accion':
      classVariant = 'border-[var(--accent)] text-[var(--accent)]'
      break
    case 'comedia':
      classVariant = 'border-[var(--marquee)] text-[var(--marquee)]'
      break
    case 'drama':
      classVariant = 'border-[var(--ink-dim)] text-[var(--ink-dim)]'
      break
    case 'terror':
      classVariant = 'border-[var(--ink)] text-[var(--ink)] bg-[var(--surface-raised)]'
      break
    case 'ciencia ficcion':
      classVariant = 'border-cyan-500 text-cyan-400'
      break
    case 'documental':
      classVariant = 'border-[var(--seat-free)] text-[var(--seat-free)]'
      break
    case 'libre':
      classVariant = 'border-[var(--seat-free)] text-[var(--seat-free)]'
      break
    case 'ocupado':
      classVariant = 'border-[var(--seat-taken)] text-[var(--seat-taken)]'
      break
    default:
      classVariant = 'border-[var(--line)] text-[var(--ink-dim)]'
  }

  return (
    <span className={`inline-block px-2 py-0.5 border text-[10px] font-semibold uppercase tracking-wide ${classVariant}`}>
      {children}
    </span>
  )
}

export default Badge
