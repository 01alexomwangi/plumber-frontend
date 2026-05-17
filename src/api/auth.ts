// src/api/auth.ts
import api from './axios'
import type { AuthResponse, User } from '../types'

export const login = async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/admin/login', {
        email,
        password
    })
    return response.data
}

export const logout = async () => {
    await api.post('/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

export const getMe = async () => {
    const response = await api.get<User>('/me')
    return response.data
}