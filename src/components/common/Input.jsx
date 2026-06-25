const Input = ({ label, type = 'text', name, register, error, placeholder = '', ...rest }) => {
  return (
    <div className="flex flex-col mb-5 text-left">
      {label && (
        <label htmlFor={name} className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ink-dim)]">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className="bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--ink)] rounded-none px-3 py-2.5 placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--accent)] disabled:opacity-40"
        {...(register ? register(name) : {})}
        {...rest}
      />
      {error && <span className="error">{error.message}</span>}
    </div>
  )
}

export default Input
