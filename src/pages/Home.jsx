import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const isNew = searchParams.get('filter') === 'new'

  useEffect(() => {
    api.get('/products')
      .then(res => {
        let fetchedProducts = res.data
        if (isNew) {
          fetchedProducts = fetchedProducts.slice(-6).reverse() // or however we define new
        }
        setProducts(fetchedProducts)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching products:', err)
        setLoading(false)
      })
  }, [isNew])

  return (
    <div className="animate-in fade-in duration-700">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-6">
          Walk with soul.
        </h1>
        <p className="text-lg md:text-xl text-ink/70 max-w-2xl mx-auto">
          Minimalist, thoughtfully crafted footwear designed to ground you in every step.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-sage-light/50 rounded-2xl mb-6" />
              <div className="h-5 bg-sage-light/50 rounded w-3/4 mb-2" />
              <div className="h-4 bg-sage-light/40 rounded w-1/4" />
            </div>
          ))
        ) : products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-ink/50 border border-sage-light rounded-2xl bg-white/50">
            No products found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
