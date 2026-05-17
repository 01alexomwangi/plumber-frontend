// src/pages/admin/Services.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAdminServices, createService, updateService, deleteService } from '../../api/services'
import { useAuth } from '../../context/AuthContext'
import { logout } from '../../api/auth'
import type { Service } from '../../types'

export default function Services() {
    const [services, setServices] = useState<Service[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState<Service | null>(null)
    const [form, setForm] = useState({ name: '', description: '', icon: '' })
    const [saving, setSaving] = useState(false)
    const { user, clearAuth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        try {
            const data = await getAdminServices()
            setServices(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const openCreate = () => {
        setEditing(null)
        setForm({ name: '', description: '', icon: '' })
        setShowForm(true)
    }

    const openEdit = (service: Service) => {
        setEditing(service)
        setForm({
            name: service.name,
            description: service.description,
            icon: service.icon
        })
        setShowForm(true)
    }

    const handleSave = async () => {
        if (!form.name || !form.description) return
        setSaving(true)

        try {
            if (editing) {
                const updated = await updateService(editing.id, form)
                setServices(prev =>
                    prev.map(s => s.id === editing.id ? updated : s)
                )
            } else {
                const created = await createService(form)
                setServices(prev => [created, ...prev])
            }
            setShowForm(false)
        } catch (error) {
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    const handleToggleActive = async (service: Service) => {
        try {
            const updated = await updateService(service.id, {
                is_active: service.is_active ? 0 : 1
            })
            setServices(prev =>
                prev.map(s => s.id === service.id ? updated : s)
            )
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this service?')) return
        try {
            await deleteService(id)
            setServices(prev => prev.filter(s => s.id !== id))
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
                    <button onClick={() => navigate('/admin/bookings')}
                        className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                        Bookings
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

            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Services</h1>
                    <button
                        onClick={openCreate}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        + Add Service
                    </button>
                </div>

                {/* Add / Edit Form */}
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            {editing ? 'Edit Service' : 'New Service'}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g. Pipe Repair"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Describe what this service involves..."
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Icon name <span className="text-gray-400 font-normal">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.icon}
                                    onChange={e => setForm(prev => ({ ...prev, icon: e.target.value }))}
                                    placeholder="e.g. wrench"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
                                    {saving ? 'Saving...' : editing ? 'Update Service' : 'Create Service'}
                                </button>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Services List */}
                {isLoading ? (
                    <p className="text-gray-500">Loading services...</p>
                ) : (
                    <div className="space-y-3">
                        {services.map(service => (
                            <div key={service.id}
                                className="bg-white rounded-xl shadow-sm p-5 flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-gray-800">{service.name}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                                            ${service.is_active
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-500'}`}>
                                            {service.is_active ? 'Active' : 'Hidden'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                                    {service.icon && (
                                        <p className="text-xs text-gray-400 mt-1">Icon: {service.icon}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 ml-4 shrink-0">
                                    <button
                                        onClick={() => handleToggleActive(service)}
                                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-300 text-gray-600 transition-colors">
                                        {service.is_active ? 'Hide' : 'Show'}
                                    </button>
                                    <button
                                        onClick={() => openEdit(service)}
                                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-300 text-gray-600 transition-colors">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="text-xs px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}