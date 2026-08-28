import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const res = await api.get('/user')
      setUser(res.data)
    } catch (error) {
      console.error('Failed to fetch user', error)
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    navigate('/')
  }

  const register = async (name, email, password) => {
    const res = await api.post('/register', { name, email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    navigate('/')
  }

  const logout = async () => {
    try {
      await api.post('/logout')
    } catch (e) {
      console.error(e)
    }
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
