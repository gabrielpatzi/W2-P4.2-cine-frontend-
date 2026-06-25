const Tr = ({ children }) => {
  return (
    <tr className="hover:bg-[var(--surface-raised)] transition-colors">
      {children}
    </tr>
  )
}

export default Tr
