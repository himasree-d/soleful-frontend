import axios from 'axios'

// Base URL for all API calls
const api = axios.create({
  baseURL: 'https://soleful-backend-production.up.railway.app/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
})

// Attach auth token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export default api
