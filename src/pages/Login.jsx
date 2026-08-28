import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    
    try {
      await login(email, password)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex flex-col justify-center animate-in fade-in duration-500">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-3xl shadow-sm border border-sage-light">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-medium text-ink mb-2">Welcome Back</h2>
          <p className="text-ink/60">Enter your details to access your account.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-terracotta-light text-terracotta rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-cream rounded-xl border border-border focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-cream rounded-xl border border-border focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3.5 bg-ink text-cream rounded-xl font-medium hover:bg-ink/90 active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-ink/60">
          Don't have an account?{' '}
          <Link to="/register" className="text-ink font-medium hover:underline decoration-sage underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
