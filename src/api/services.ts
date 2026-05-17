// src/api/services.ts
import api from './axios'
import type { Service } from '../types'

export const getPublicServices = async () => {
    const response = await api.get<Service[]>('/services')
    return response.data
}

export const getAdminServices = async () => {
    const response = await api.get<Service[]>('/admin/services')
    return response.data
}

// export const createService = async (data: Omit<Service, 'id' | 'is_active'>) => {
//     const response = await api.post<Service>('/services', data)
//     return response.data
// }
export const createService = async (data: Omit<Service, 'id' | 'is_active'>) => {
    const response = await api.post<{ message: string; service: Service }>('/services', data)
    return response.data.service
}

// export const updateService = async (id: number, data: Partial<Service>) => {
//     const response = await api.put<Service>(`/services/${id}`, data)
//     return response.data
// }
export const updateService = async (id: number, data: Partial<Service>) => {
    const response = await api.put<{ message: string; service: Service }>(`/services/${id}`, data)
    return response.data.service
}

export const deleteService = async (id: number) => {
    await api.delete(`/services/${id}`)
}