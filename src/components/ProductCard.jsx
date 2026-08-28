import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  const images = product.images || []
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    if (isHovered && hasMultipleImages) {
      timerRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, 700)
    } else {
      setCurrentImageIndex(0)
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isHovered, images.length, hasMultipleImages])

  const displayImage = images.length > 0
    ? images[currentImageIndex].image_url
    : 'https://placehold.co/600x600/faf9f6/2c2a29?text=No+Image'

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white mb-6 shadow-sm">
        <img
          key={currentImageIndex}
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-[1.03]"
        />
        {product.stock === 0 && (
          <div className="absolute top-4 left-4 bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Sold Out
          </div>
        )}

        {/* Dot progress bar */}
        {hasMultipleImages && (
          <div className={`absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-5 bg-ink' : 'w-1.5 bg-ink/30'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-start">
        <h3 className="font-heading text-xl font-medium text-ink group-hover:text-sage transition-colors">
          {product.name}
        </h3>
        <p className="font-sans font-medium text-ink/80 tabular-nums">
          ₹{Number(product.price).toLocaleString('en-IN')}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
