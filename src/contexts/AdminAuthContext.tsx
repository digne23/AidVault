import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface AdminUser {
  username: string
  name: string
}

interface AdminAuthContextType {
  admin: AdminUser | null
  isAuthenticated: boolean
  loading: boolean
  login: (username: string, password: string) => { success: boolean; error?: string }
  logout: () => void
}

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = [
  { username: 'daisy', password: 'Daisy123', name: 'Daisy' },
  { username: 'digne', password: 'Digne123', name: 'Digne' },
]

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

interface AdminAuthProviderProps {
  children: ReactNode
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedAdmin = sessionStorage.getItem('adminUser')
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin))
      } catch {
        sessionStorage.removeItem('adminUser')
      }
    }
    setLoading(false)
  }, [])

  const login = (username: string, password: string) => {
    const normalizedUsername = username.toLowerCase().trim()

    const validAdmin = ADMIN_CREDENTIALS.find(
      (cred) => cred.username === normalizedUsername && cred.password === password
    )

    if (validAdmin) {
      const adminUser: AdminUser = {
        username: validAdmin.username,
        name: validAdmin.name,
      }
      setAdmin(adminUser)
      sessionStorage.setItem('adminUser', JSON.stringify(adminUser))
      return { success: true }
    }

    return { success: false, error: 'Invalid username or password' }
  }

  const logout = () => {
    setAdmin(null)
    sessionStorage.removeItem('adminUser')
  }

  const value = {
    admin,
    isAuthenticated: admin !== null,
    loading,
    login,
    logout,
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}
