'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '@/services/auth.service'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token')
    if (token) {
      // Optionally fetch user data here
      setUser({ token })
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    const data = await authService.login(credentials)
    if (data.token && !data.requires2FA) {
      setUser(data.user)
      localStorage.setItem('token', data.token)
    }
    return data
  }

  const register = async (userData) => {
    const data = await authService.register(userData)
    return data
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)