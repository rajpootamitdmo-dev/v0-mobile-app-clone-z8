'use client'


import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Star, Grid3X3, Trash2, Home, PenTool, Gift } from 'lucide-react'
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
  description: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')
  const supabase = createClient()

  const categoryOptions = [
    { id: 'all', label: 'All Products', icon: Grid3X3 },
    { id: 'home-decor', label: 'Home Decor', icon: Home },
    { id: 'stationery', label: 'Stationery', icon: PenTool },
    { id: 'utility', label: 'Utility', icon: Trash2 },
    { id: 'gift', label: 'Gift Items', icon: Gift },
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = supabase.from('products').select('id, name, price, image_url, rating, review_count, category, description')

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

      <main className="flex-1 pb-24 md:pb-0 px-4 pt-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Shop Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Shop</h1>
            <p className="text-muted-foreground">Eco-friendly products handcrafted from waste.</p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex gap-3 items-center bg-card rounded-lg p-3 border border-border">
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search eco products..."
              className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground"
            />
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {categoryOptions.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg whitespace-nowrap transition-all min-w-max ${
                    category === cat.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground border border-border hover:border-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{cat.label}</span>
                </button>
              )
            })}
          </div>

          {/* Filter & Sort Options */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:border-primary transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:border-primary transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent outline-none">
                <option value="featured">Sort</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            <button className="ml-auto px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Price
            </button>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
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
                      <Heart className="w-4 h-4 text-foreground" fill="currentColor" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <p className="font-bold text-base text-foreground">
                      ₹{product.price}
                    </p>

                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-xs text-muted-foreground font-medium">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.review_count})
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {product.description || 'Eco-friendly product from waste'}
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
