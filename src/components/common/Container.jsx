const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-6xl mx-auto px-5 py-10 ${className}`}>
      {children}
    </div>
  )
}

export default Container
