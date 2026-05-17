// src/pages/Landing.tsx
import { useState, useEffect } from 'react'
import { getPublicServices } from '../api/services'
import { submitBooking } from '../api/bookings'
import type { Service, BookingFormData } from '../types'

export default function Landing() {
    const [services, setServices] = useState<Service[]>([])
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState<BookingFormData>({
        name: '',
        phone: '',
        email: '',
        service_id: '',
        description: '',
        address: ''
    })

    useEffect(() => {
        getPublicServices().then(setServices)
    }, [])

    const update = (field: keyof BookingFormData, value: string | number) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        if (!form.name || !form.phone || !form.email || !form.service_id || !form.description || !form.address) {
            setError('Please fill in all fields.')
            return
        }
        setError('')
        setSubmitting(true)
        try {
            await submitBooking(form)
            setSubmitted(true)
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">

            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            </svg>
                        </div>
                        <span className="font-bold text-gray-800 text-lg">Twendy Solutions</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <a href="#services" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Services</a>
                        <a href="#about" className="text-gray-600 hover:text-blue-600 text-sm font-medium">About</a>
                        <a href="#booking" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Book Now</a>
                        <a href="/admin/login" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                            Admin
                        </a>
                    </div>
                </div>
            </nav>

       

                    {/* Hero */}
        <section className="relative text-white py-32 px-6 overflow-hidden min-h-[900px] flex items-center">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/plumber-hero.jpg"
                    alt="Plumber working"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay so text stays readable */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                    Fast & Reliable<br />Plumbing Services
                </h1>
                <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
                    Professional plumbing solutions for your home and office in Nairobi.
                    Available 24/7 for emergencies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#booking"
                        className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors">
                        Book a Service
                    </a>
                    <a href="#services"
                        className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-colors">
                        Our Services
                    </a>
                </div>
            </div>
        </section>

            {/* Services */}
            <section id="services" className="py-20 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Offer</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            From emergency repairs to full installations — we handle all your plumbing needs.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map(service => (
                            <div key={service.id}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-blue-600 text-lg font-bold">
                                        {service.name.charAt(0)}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">{service.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Trusted Plumbing Expert in Nairobi
                        </h2>
                        <p className="text-gray-500 mb-4 leading-relaxed">
                            With over 10 years of experience, we have built a reputation for quality
                            workmanship and honest service. No job is too big or too small.
                        </p>
                        <p className="text-gray-500 mb-6 leading-relaxed">
                            We serve homes, apartments, and offices across Nairobi and surrounding areas.
                            Our team is fully licensed, insured, and committed to getting the job done right.
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { number: '10+', label: 'Years Experience' },
                                { number: '500+', label: 'Jobs Completed' },
                                { number: '24/7', label: 'Emergency Service' },
                            ].map(stat => (
                                <div key={stat.label} className="text-center p-4 bg-blue-50 rounded-xl">
                                    <p className="text-2xl font-bold text-blue-600">{stat.number}</p>
                                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-blue-600 rounded-2xl p-8 text-white">
                        <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
                        <ul className="space-y-3">
                            {[
                                'Licensed and insured professionals',
                                'Transparent pricing — no hidden costs',
                                'Same day service available',
                                '1 year warranty on all repairs',
                                'Clean and tidy workmanship',
                                '24/7 emergency response',
                            ].map(item => (
                                <li key={item} className="flex items-start gap-3 text-sm">
                                    <span className="text-blue-200 mt-0.5">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section id="booking" className="py-20 px-6 bg-gray-50">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Book a Service</h2>
                        <p className="text-gray-500">
                            Fill in the form below and we'll get back to you within 1 hour.
                        </p>
                    </div>

                    {submitted ? (
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-green-800 mb-2">Booking Received!</h3>
                            <p className="text-green-600 mb-6">
                                Thank you! We'll call you within 1 hour to confirm your appointment.
                            </p>
                            <button
                                onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', service_id: '', description: '', address: '' }) }}
                                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
                                Make Another Booking
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={e => update('name', e.target.value)}
                                            placeholder="John Kamau"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={e => update('phone', e.target.value)}
                                            placeholder="0712 345 678"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={e => update('email', e.target.value)}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Required</label>
                                    <select
                                        value={form.service_id}
                                        onChange={e => update('service_id', Number(e.target.value))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                        <option value="">Select a service...</option>
                                        {services.map(service => (
                                            <option key={service.id} value={service.id}>
                                                {service.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Describe the Problem</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => update('description', e.target.value)}
                                        placeholder="e.g. My kitchen pipe has been leaking for 2 days..."
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Address</label>
                                    <input
                                        type="text"
                                        value={form.address}
                                        onChange={e => update('address', e.target.value)}
                                        placeholder="123 Ngong Road, Nairobi"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 rounded-xl transition-colors text-lg">
                                    {submitting ? 'Submitting...' : 'Book Now'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-400 py-10 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                        <span className="text-white font-semibold">Twendy Solutions</span>
                    </div>
                    <p className="text-sm">© 2026 ProPlumber. All rights reserved.</p>
                    <p className="text-sm">Nairobi, Kenya · Available 24/7</p>
                </div>
            </footer>
        </div>
    )
}