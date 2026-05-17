// src/pages/admin/Bookings.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBookings, updateBookingStatus, deleteBooking } from '../../api/bookings'
import { useAuth } from '../../context/AuthContext'
import { logout } from '../../api/auth'
import { StatusBadge } from './Dashboard'
import type { Booking, BookingStatus } from '../../types'

export default function Bookings() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selected, setSelected] = useState<Booking | null>(null)
    const { user, clearAuth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        fetchBookings()
    }, [])

    const fetchBookings = async () => {
        try {
            const data = await getBookings()
            setBookings(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleStatusChange = async (id: number, status: BookingStatus) => {
        try {
            const { booking } = await updateBookingStatus(id, status)
            setBookings(prev =>
                prev.map(b => b.id === id ? booking : b)
            )
            if (selected?.id === id) setSelected(booking)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this booking?')) return
        try {
            await deleteBooking(id)
            setBookings(prev => prev.filter(b => b.id !== id))
            if (selected?.id === id) setSelected(null)
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogout = async () => {
        await logout()
        clearAuth()
        navigate('/admin/login')
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Nav */}
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
                    <button onClick={() => navigate('/admin/dashboard')}
                        className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                        Dashboard
                    </button>
                    <button onClick={() => navigate('/admin/services')}
                        className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                        Services
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                        <button onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Bookings</h1>

                {isLoading ? (
                    <p className="text-gray-500">Loading bookings...</p>
                ) : bookings.length === 0 ? (
                    <p className="text-gray-500">No bookings yet.</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Bookings List */}
                        <div className="space-y-3">
                            {bookings.map(booking => (
                                <div
                                    key={booking.id}
                                    onClick={() => setSelected(booking)}
                                    className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer border-2 transition-all
                                        ${selected?.id === booking.id
                                            ? 'border-blue-500'
                                            : 'border-transparent hover:border-gray-200'}`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {booking.customer.name}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-0.5">
                                                {booking.service.name}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {booking.address}
                                            </p>
                                        </div>
                                        <StatusBadge status={booking.status} />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {new Date(booking.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Booking Detail Panel */}
                        {selected ? (
                            <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Booking Details
                                    </h2>
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="text-gray-400 hover:text-gray-600 text-xl font-bold">
                                        ×
                                    </button>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <Row label="Customer" value={selected.customer.name} />
                                    <Row label="Phone" value={selected.customer.phone} />
                                    <Row label="Email" value={selected.customer.email} />
                                    <Row label="Service" value={selected.service.name} />
                                    <Row label="Address" value={selected.address} />
                                    <Row label="Description" value={selected.description} />
                                    {selected.scheduled_at && (
                                        <Row label="Scheduled"
                                            value={new Date(selected.scheduled_at).toLocaleString()} />
                                    )}
                                </div>

                                {/* Status Updater */}
                                <div className="mt-6">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Update Status
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(['new', 'confirmed', 'in_progress', 'completed', 'cancelled'] as BookingStatus[]).map(status => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusChange(selected.id, status)}
                                                className={`text-xs py-2 px-3 rounded-lg font-medium border transition-colors
                                                    ${selected.status === status
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
                                            >
                                                {status.replace('_', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Delete */}
                                <button
                                    onClick={() => handleDelete(selected.id)}
                                    className="mt-4 w-full bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2 rounded-lg transition-colors">
                                    Delete Booking
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center text-gray-400">
                                <p className="text-sm">Click a booking to view details</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex gap-2">
            <span className="text-gray-400 w-24 shrink-0">{label}</span>
            <span className="text-gray-700 font-medium">{value}</span>
        </div>
    )
}