const Button = ({ children, type = 'button', variant = 'primary', onClick, disabled = false, className = '' }) => {

  let classVariant
  switch (variant) {
    case 'primary':
      classVariant = 'bg-[var(--accent)] text-white hover:bg-[var(--accent-dim)]'
      break
    case 'secondary':
      classVariant = 'bg-transparent border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink-dim)]'
      break
    case 'danger':
      classVariant = 'bg-transparent border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white'
      break
    default:
      classVariant = 'bg-[var(--accent)] text-white hover:bg-[var(--accent-dim)]'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--marquee)] ${classVariant} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
