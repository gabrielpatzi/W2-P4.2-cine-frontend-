import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'

import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AdminRoute from './routes/AdminRoute.jsx'

import HomePage from './pages/client/HomePage.jsx'
import MovieDetailPage from './pages/client/MovieDetailPage.jsx'
import LoginPage from './pages/client/LoginPage.jsx'
import RegisterPage from './pages/client/RegisterPage.jsx'
import SeatSelectionPage from './pages/client/SeatSelectionPage.jsx'
import ReservationConfirmPage from './pages/client/ReservationConfirmPage.jsx'
import MyReservationsPage from './pages/client/MyReservationsPage.jsx'

import AdminMoviesPage from './pages/admin/AdminMoviesPage.jsx'
import AdminRoomsPage from './pages/admin/AdminRoomsPage.jsx'
import AdminShowtimesPage from './pages/admin/AdminShowtimesPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            {/* Públicas */}
            <Route index element={<HomePage />} />
            <Route path="peliculas/:id" element={<MovieDetailPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* Cliente autenticado */}
            <Route
              path="funciones/:id/asientos"
              element={<ProtectedRoute><SeatSelectionPage /></ProtectedRoute>}
            />
            <Route
              path="reservas/confirmar"
              element={<ProtectedRoute><ReservationConfirmPage /></ProtectedRoute>}
            />
            <Route
              path="mis-reservas"
              element={<ProtectedRoute><MyReservationsPage /></ProtectedRoute>}
            />

            {/* Admin */}
            <Route
              path="admin/peliculas"
              element={<AdminRoute><AdminMoviesPage /></AdminRoute>}
            />
            <Route
              path="admin/salas"
              element={<AdminRoute><AdminRoomsPage /></AdminRoute>}
            />
            <Route
              path="admin/funciones"
              element={<AdminRoute><AdminShowtimesPage /></AdminRoute>}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
