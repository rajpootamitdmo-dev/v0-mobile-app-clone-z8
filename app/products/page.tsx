'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Star } from 'lucide-react'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { createClient } from '@/lib/supabase/client'

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  rating: number
  review_count: number
  category: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<string>('all')
  const supabase = createClient()

  const categories = ['all', 'home', 'fashion', 'accessories', 'decor']

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = supabase.from('products').select('id, name, price, image_url, rating, review_count, category')

        if (category !== 'all') {
          query = query.eq('category', category)
        }

        const { data } = await query

        if (data) {
          setProducts(data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, supabase])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pb-24 md:pb-0 px-4 pt-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Products
            </h1>
            <p className="text-muted-foreground">
              Discover our collection of eco-friendly products handcrafted from waste.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium capitalize whitespace-nowrap transition-colors ${
                  category === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {cat === 'all' ? 'All Products' : cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="bg-muted rounded-lg h-56 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group"
                >
                  <div className="relative bg-muted rounded-lg overflow-hidden h-48 md:h-56 mb-3 flex items-center justify-center">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center text-muted-foreground text-xs text-center p-2">
                        {product.name}
                      </div>
                    )}

                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                      <Heart className="w-4 h-4 text-foreground" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.review_count})
                      </span>
                    </div>

                    <p className="font-bold text-base text-foreground">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products found in this category.</p>
              <button
                onClick={() => setCategory('all')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
