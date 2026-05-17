// src/api/bookings.ts
import api from './axios'
import type { Booking, BookingFormData, BookingStatus } from '../types'

export const submitBooking = async (data: BookingFormData) => {
    const response = await api.post<{ message: string; booking: Booking }>('/bookings', data)
    return response.data
}

export const getBookings = async () => {
    const response = await api.get<Booking[]>('/bookings')
    return response.data
}

export const getBooking = async (id: number) => {
    const response = await api.get<Booking>(`/bookings/${id}`)
    return response.data
}

export const updateBookingStatus = async (id: number, status: BookingStatus) => {
    const response = await api.patch<{ message: string; booking: Booking }>(
        `/bookings/${id}/status`,
        { status }
    )
    return response.data
}

export const scheduleBooking = async (id: number, scheduled_at: string) => {
    const response = await api.patch<{ message: string; booking: Booking }>(
        `/bookings/${id}/schedule`,
        { scheduled_at }
    )
    return response.data
}

export const deleteBooking = async (id: number) => {
    await api.delete(`/bookings/${id}`)
}