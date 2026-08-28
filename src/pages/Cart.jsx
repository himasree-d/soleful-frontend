import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import api from '../api'
import { useState } from 'react'

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    if (!user) { navigate('/login'); return }
    setIsCheckingOut(true)
    setError('')
    try {
      const res = await api.post('/orders', {
        items: cart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      })
      clearCart()
      navigate('/checkout/success', { state: { orderId: res.data.order.id } })
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. Please try again.')
      setIsCheckingOut(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-32 animate-in fade-in duration-500">
        <ShoppingBag className="h-16 w-16 mx-auto text-ink/20 mb-6" />
        <h2 className="text-3xl font-heading mb-4">Your cart is empty</h2>
        <p className="text-ink/60 mb-8">Looks like you haven't added any sneakers yet.</p>
        <Link to="/" className="inline-flex px-8 py-3 bg-ink text-cream rounded-full font-medium hover:bg-ink/90 transition-colors">
          Shop Collection
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-4xl font-heading mb-10">Your Cart</h1>

      {error && (
        <div className="mb-8 p-4 bg-terracotta-light text-terracotta rounded-xl font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-2">
          {cart.map((item) => (
            <div key={item.product.id} className="flex gap-6 py-6 border-b border-sage-light/50">
              <Link to={`/product/${item.product.id}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white overflow-hidden flex-shrink-0 hover:opacity-90 transition-opacity">
                <img
                  src={item.product.images?.[0]?.image_url || 'https://placehold.co/150'}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading text-xl">{item.product.name}</h3>
                    <p className="text-ink/60 mt-1">₹{Number(item.product.price).toLocaleString('en-IN')}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-ink/30 hover:text-terracotta transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 bg-sage-light/40 rounded-full p-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-white rounded-full transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center font-medium text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-white rounded-full transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-medium text-lg">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-white rounded-3xl p-8 border border-sage-light shadow-sm sticky top-28">
            <h3 className="text-xl font-heading mb-6">Order Summary</h3>

            <div className="space-y-3 text-ink/80 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-sage font-medium">Free</span>
              </div>
            </div>

            <div className="pt-5 border-t border-sage-light flex justify-between items-end mb-8">
              <span className="font-heading text-lg">Total</span>
              <span className="font-heading text-3xl">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full flex items-center justify-center gap-2 py-4 bg-ink text-cream rounded-full font-medium hover:bg-ink/90 transition-all disabled:opacity-70 active:scale-[0.98]"
            >
              <span>{isCheckingOut ? 'Processing…' : user ? 'Place Order' : 'Login to Checkout'}</span>
              {!isCheckingOut && <ArrowRight className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
