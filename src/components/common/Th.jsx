const Th = ({ children }) => {
  return (
    <th className="border-b border-[var(--line)] px-3 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--ink-dim)]">
      {children}
    </th>
  )
}

export default Th
