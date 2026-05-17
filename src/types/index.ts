// src/types/index.ts

export interface Service {
    id: number
    name: string
    description: string
    icon: string
    is_active: number
}

export interface Customer {
    id: number
    name: string
    phone: string
    email: string
    created_at: string
}

export type BookingStatus =
    | 'new'
    | 'confirmed'
    | 'in_progress'
    | 'completed'
    | 'cancelled'

export interface Booking {
    id: number
    customer_id: number
    service_id: number
    description: string
    address: string
    status: BookingStatus
    scheduled_at: string | null
    created_at: string
    updated_at: string
    customer: Customer
    service: Service
}

export interface DashboardStats {
    total_bookings: number
    new_bookings: number
    confirmed: number
    in_progress: number
    completed: number
    cancelled: number
    total_customers: number
    total_services: number
    recent_bookings: Booking[]
}

export interface User {
    id: number
    name: string
    email: string
}

export interface AuthResponse {
    message: string
    token: string
    user: User
}

export interface BookingFormData {
    name: string
    phone: string
    email: string
    service_id: number | ''
    description: string
    address: string
}