import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/orders')
      .then(res => { setOrders(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-20 text-ink/50">Loading orders…</div>

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-4xl font-heading mb-10">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-sage-light">
          <p className="text-ink/60 mb-6">You haven't placed any orders yet.</p>
          <Link to="/" className="px-8 py-3 bg-ink text-cream rounded-full font-medium hover:bg-ink/90 transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-sage-light overflow-hidden">
              <div className="p-6 bg-sage-light/20 border-b border-sage-light flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-xs text-ink/50 uppercase tracking-wider mb-0.5">Order</p>
                  <p className="font-heading text-lg">#{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-ink/50 uppercase tracking-wider mb-0.5">Date</p>
                  <p className="font-medium">{new Date(order.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</p>
                </div>
                <div>
                  <p className="text-xs text-ink/50 uppercase tracking-wider mb-0.5">Total</p>
                  <p className="font-heading text-lg">₹{Number(order.total_price).toLocaleString('en-IN')}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  order.status === 'pending'  ? 'bg-amber-100 text-amber-800' :
                  order.status === 'accepted' ? 'bg-sage/20 text-sage' :
                  'bg-terracotta-light text-terracotta'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="p-6 divide-y divide-sage-light/40">
                {order.items.map(item => (
                  <div key={item.id} className="py-4 flex gap-5 first:pt-0 last:pb-0">
                    <div className="w-20 h-20 bg-cream rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.product?.images?.[0]?.image_url || 'https://placehold.co/150'}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-medium text-lg">{item.product?.name}</h4>
                      <p className="text-ink/60 text-sm mt-0.5">Qty: {item.quantity}</p>
                      <p className="font-medium mt-1">₹{Number(item.price_at_time_of_order).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
