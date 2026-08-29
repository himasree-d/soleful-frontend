import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in duration-500 text-center px-4">
      <h1 className="text-8xl md:text-9xl font-heading text-sage mb-6">404</h1>
      <h2 className="text-3xl font-heading mb-4">Page not found</h2>
      <p className="text-ink/60 max-w-md mx-auto mb-10">
        It looks like you've wandered off the path. The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center px-8 py-3 bg-ink text-cream rounded-full font-medium hover:bg-ink/90 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
