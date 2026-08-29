import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api'

function Admin() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.role === 'admin') {
      api.get('/orders?all=true')
        .then(res => { setOrders(res.data); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [user])

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}`, { status })
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    } catch (e) {
      console.error(e)
    }
  }

  if (user?.role !== 'admin') return <Navigate to="/" />

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-4xl font-heading mb-10">Admin Dashboard</h1>

      <div className="bg-white rounded-3xl border border-sage-light overflow-hidden shadow-sm">
        <div className="p-6 border-b border-sage-light bg-cream/50 flex justify-between items-center">
          <h2 className="text-xl font-heading font-medium">All Orders</h2>
          <span className="text-sm text-ink/50">{orders.length} total</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-ink/50">Loading…</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-ink/50">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-sage-light text-ink/50 uppercase tracking-wider text-xs">
                  <th className="px-6 py-4 font-medium">Order</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-light/50">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-sage-light/10 transition-colors border-b border-sage-light/20">
                    <td className="px-6 py-4 font-heading font-medium align-top">#{order.id}</td>
                    <td className="px-6 py-4 align-top">
                      <div className="font-medium mb-3">{order.user?.name}</div>
                      <div className="space-y-3">
                        {order.items?.map(item => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded bg-sage-light/50 overflow-hidden flex-shrink-0">
                              {item.product?.images?.[0]?.image_url ? (
                                <img 
                                  src={item.product.images[0].image_url} 
                                  alt={item.product.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : null}
                            </div>
                            <div className="text-xs">
                              <p className="font-medium text-ink">{item.product?.name}</p>
                              <p className="text-ink/60">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-ink/60 align-top">{new Date(order.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</td>
                    <td className="px-6 py-4 font-medium align-top">₹{Number(order.total_price).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 align-top">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        order.status === 'pending'  ? 'bg-amber-100 text-amber-800' :
                        order.status === 'accepted' ? 'bg-sage/20 text-sage' :
                        'bg-terracotta-light text-terracotta'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 align-top">
                      {order.status === 'pending' && (
                        <div className="flex flex-col gap-2 items-end">
                          <button
                            onClick={() => updateOrderStatus(order.id, 'accepted')}
                            className="px-4 py-1.5 bg-ink text-cream rounded-lg text-xs font-semibold hover:bg-ink/80 transition-colors w-20"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'rejected')}
                            className="px-4 py-1.5 bg-terracotta text-white rounded-lg text-xs font-semibold hover:bg-terracotta/80 transition-colors w-20"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
