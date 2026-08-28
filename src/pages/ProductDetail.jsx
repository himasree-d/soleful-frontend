import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, X, ShoppingBag } from 'lucide-react'
import api from '../api'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(0)

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => { setProduct(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
      <div className="aspect-square bg-sage-light/50 rounded-2xl" />
      <div className="space-y-4 pt-8">
        <div className="h-10 bg-sage-light/50 rounded w-2/3" />
        <div className="h-6 bg-sage-light/40 rounded w-1/4" />
        <div className="h-32 bg-sage-light/30 rounded w-full mt-8" />
      </div>
    </div>
  )
  if (!product) return <div className="text-center py-20 text-ink/50">Product not found.</div>

  const images = product.images || []
  const hasImages = images.length > 0

  const openLightbox = (idx) => {
    setLightboxIdx(idx)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const handleAddToCart = () => {
    addToCart(product)
    navigate('/cart')
  }

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <Link to="/" className="inline-flex items-center text-ink/60 hover:text-ink mb-10 transition-colors text-sm">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Gallery */}
        <div className="space-y-4">
          <div
            className="aspect-square bg-white rounded-2xl overflow-hidden cursor-zoom-in shadow-sm"
            onClick={() => hasImages && openLightbox(activeImg)}
          >
            {hasImages && (
              <img
                src={images[activeImg].image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    idx === activeImg ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-start pt-4">
          <h1 className="text-4xl md:text-5xl font-heading font-medium mb-3 leading-tight">{product.name}</h1>
          <p className="text-3xl font-heading text-ink/80 mb-8">₹{Number(product.price).toLocaleString('en-IN')}</p>

          <p className="text-ink/70 leading-relaxed mb-10">{product.description}</p>

          <button
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-3 py-4 px-8 rounded-full font-medium text-lg transition-all ${
              product.stock > 0
                ? 'bg-ink text-cream hover:bg-ink/90 active:scale-[0.98]'
                : 'bg-ink/10 text-ink/40 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {product.stock > 0 && product.stock < 10 && (
            <p className="text-center text-sm text-terracotta mt-3 font-medium">
              Only {product.stock} left in stock!
            </p>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && hasImages && (
        <div
          className="fixed inset-0 z-[100] bg-ink/96 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button className="absolute top-6 right-6 text-cream/70 hover:text-cream p-2" onClick={closeLightbox}>
            <X className="h-8 w-8" />
          </button>

          <div className="relative w-full max-w-4xl flex items-center justify-center">
            {images.length > 1 && (
              <button
                className="absolute left-0 z-10 p-3 bg-cream/10 hover:bg-cream/20 rounded-full text-cream transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightboxIdx((prev) => (prev - 1 + images.length) % images.length) }}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            <img
              src={images[lightboxIdx].image_url}
              alt={product.name}
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <button
                className="absolute right-0 z-10 p-3 bg-cream/10 hover:bg-cream/20 rounded-full text-cream transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightboxIdx((prev) => (prev + 1) % images.length) }}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-8 flex space-x-3" onClick={(e) => e.stopPropagation()}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIdx(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === lightboxIdx ? 'border-sage opacity-100' : 'border-transparent opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductDetail
