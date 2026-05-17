// src/App.tsx
import type { ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

// Pages
import Landing from './pages/Landing'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Bookings from './pages/admin/Bookings'
import Services from './pages/admin/Services'

// Protected route wrapper
// function ProtectedRoute({ children }: { children: React.ReactNode }) {
function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />
    }

    return <>{children}</>
}

function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/admin/login" element={<Login />} />

            {/* Protected */}
            <Route path="/admin/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/admin/bookings" element={
                <ProtectedRoute><Bookings /></ProtectedRoute>
            } />
            <Route path="/admin/services" element={
                <ProtectedRoute><Services /></ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes>
                </AppRoutes>
            </BrowserRouter>
        </AuthProvider>
    )
}