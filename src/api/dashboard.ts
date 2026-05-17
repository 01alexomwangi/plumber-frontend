// src/api/dashboard.ts
import api from './axios'
import type { DashboardStats } from '../types'

export const getDashboardStats = async () => {
    const response = await api.get<DashboardStats>('/dashboard/stats')
    return response.data
}