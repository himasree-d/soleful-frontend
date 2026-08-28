import { Link, useSearchParams } from 'react-router-dom'
import { ShoppingBag, User, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const [searchParams] = useSearchParams()
  const isNew = searchParams.get('filter') === 'new'
  const isAll = !isNew

  const linkBase = 'text-sm font-medium transition-all relative pb-0.5'
  const activeStyle = 'text-ink after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sage after:rounded-full'
  const inactiveStyle = 'text-ink/60 hover:text-ink'

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-sage-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <span className="font-heading text-3xl font-bold tracking-tight text-ink">
              Soleful
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/?filter=new"
              className={`${linkBase} ${isNew ? activeStyle : inactiveStyle}`}
            >
              New Arrivals
            </Link>
            <Link
              to="/"
              className={`${linkBase} ${isAll ? activeStyle : inactiveStyle}`}
            >
              All Sneakers
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium hidden sm:block">Hi, {user.name.split(' ')[0]}</span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-medium text-ink hover:text-sage transition-colors">Admin</Link>
                )}
                <Link to="/orders" className="text-sm font-medium text-ink hover:text-sage transition-colors">Orders</Link>
                <button onClick={logout} className="text-ink/60 hover:text-ink transition-colors ml-2" title="Log Out">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-ink/80 hover:text-ink transition-colors" title="Log In">
                <User className="h-6 w-6" />
              </Link>
            )}
            <Link to="/cart" className="relative text-ink/80 hover:text-ink transition-colors group">
              <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-terracotta text-cream text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
