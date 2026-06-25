import { Outlet } from 'react-router'
import Menu from './components/layout/Menu'

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <Menu />
      <Outlet />
    </div>
  )
}

export default App
