// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'
import { getMe } from '../api/auth'

interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    setAuth: (user: User, token: string) => void
    clearAuth: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    )
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const savedToken = localStorage.getItem('token')

        if (!savedToken) {
            setIsLoading(false)
            return
        }

        getMe()
            .then((userData) => {
                setUser(userData)
                setToken(savedToken)
            })
            .catch(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                setToken(null)
                setUser(null)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const setAuth = (userData: User, authToken: string) => {
        localStorage.setItem('token', authToken)
        setUser(userData)
        setToken(authToken)
    }

    const clearAuth = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token && !!user,
                isLoading,
                setAuth,
                clearAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider')
    }
    return context
}