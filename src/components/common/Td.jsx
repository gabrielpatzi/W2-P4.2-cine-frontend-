const Td = ({ children }) => {
  return (
    <td className="border-b border-[var(--line)] px-3 py-3 font-mono text-sm text-[var(--ink)]">
      {children}
    </td>
  )
}

export default Td
