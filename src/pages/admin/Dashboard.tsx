// src/pages/admin/Dashboard.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getDashboardStats } from '../../api/dashboard'
import { logout } from '../../api/auth'
import type { DashboardStats, Booking } from '../../types'

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { user, clearAuth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        getDashboardStats()
            .then(setStats)
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }, [])

    const handleLogout = async () => {
        await logout()
        clearAuth()
        navigate('/admin/login')
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading dashboard...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Top Navigation */}
            <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        </svg>
                    </div>
                    <span className="font-bold text-gray-800">Plumber Admin</span>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/bookings')}
                        className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                        Bookings
                    </button>
                    <button onClick={() => navigate('/admin/services')}
                        className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                        Services
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-8">

                <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Total Bookings" value={stats?.total_bookings ?? 0} color="blue" />
                    <StatCard label="New" value={stats?.new_bookings ?? 0} color="yellow" />
                    <StatCard label="In Progress" value={stats?.in_progress ?? 0} color="purple" />
                    <StatCard label="Completed" value={stats?.completed ?? 0} color="green" />
                </div>

                {/* Second row */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <StatCard label="Confirmed" value={stats?.confirmed ?? 0} color="blue" />
                    <StatCard label="Cancelled" value={stats?.cancelled ?? 0} color="red" />
                    <StatCard label="Total Customers" value={stats?.total_customers ?? 0} color="green" />
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
                        <button
                            onClick={() => navigate('/admin/bookings')}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View All →
                        </button>
                    </div>

                    {stats?.recent_bookings.length === 0 ? (
                        <p className="text-gray-500 text-sm">No bookings yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {stats?.recent_bookings.map((booking: Booking) => (
                                <div key={booking.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {booking.customer.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {booking.service.name} · {booking.address}
                                        </p>
                                    </div>
                                    <StatusBadge status={booking.status} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Stat Card Component
function StatCard({ label, value, color }: {
    label: string
    value: number
    color: 'blue' | 'green' | 'yellow' | 'purple' | 'red'
}) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        purple: 'bg-purple-50 text-purple-600',
        red: 'bg-red-50 text-red-600',
    }

    return (
        <div className={`${colors[color]} rounded-2xl p-5`}>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm font-medium mt-1 opacity-80">{label}</p>
        </div>
    )
}

// Status Badge Component
export function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        new: 'bg-yellow-100 text-yellow-700',
        confirmed: 'bg-blue-100 text-blue-700',
        in_progress: 'bg-purple-100 text-purple-700',
        completed: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700',
    }

    return (
        <span className={`${styles[status]} text-xs font-semibold px-3 py-1 rounded-full capitalize`}>
            {status.replace('_', ' ')}
        </span>
    )
}