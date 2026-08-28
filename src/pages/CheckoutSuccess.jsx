import { useLocation, Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

function CheckoutSuccess() {
  const location = useLocation()
  const orderId = location.state?.orderId

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-700">
      <div className="text-sage mb-6">
        <CheckCircle2 className="h-20 w-20 mx-auto" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4 text-center">
        Order Confirmed!
      </h1>
      
      <p className="text-xl text-ink/70 max-w-md mx-auto text-center mb-2">
        Thank you for shopping with Soleful.
      </p>
      
      {orderId && (
        <p className="text-ink/60 mb-10 text-center">
          Order ID: #{orderId}
        </p>
      )}

      <div className="flex space-x-4">
        <Link to="/orders" className="px-8 py-3 bg-white border border-sage-light rounded-full font-medium hover:bg-cream transition-colors">
          View Orders
        </Link>
        <Link to="/" className="px-8 py-3 bg-ink text-cream rounded-full font-medium hover:bg-ink/90 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default CheckoutSuccess
