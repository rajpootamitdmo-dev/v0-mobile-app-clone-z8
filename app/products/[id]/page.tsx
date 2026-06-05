'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, ArrowLeft } from 'lucide-react'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  price: number
  description: string
  image_url: string
  rating: number
  review_count: number
  stock: number
  waste_type: string
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()
  }, [supabase])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single()

        if (data) {
          setProduct(data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, supabase])

  useEffect(() => {
    if (!user || !product) return

    const checkWishlist = async () => {
      const { data } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single()

      setIsWishlisted(!!data)
    }

    checkWishlist()
  }, [user, product, supabase])

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    try {
      const { error } = await supabase.from('cart_items').upsert(
        {
          user_id: user.id,
          product_id: product!.id,
          quantity: (quantity || 0) + (quantity || 1),
        },
        { onConflict: 'user_id,product_id' }
      )

      if (!error) {
        alert('Added to cart!')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const toggleWishlist = async () => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    try {
      if (isWishlisted) {
        await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', product!.id)
      } else {
        await supabase.from('wishlists').insert({
          user_id: user.id,
          product_id: product!.id,
        })
      }
      setIsWishlisted(!isWishlisted)
    } catch (error) {
      console.error('Error toggling wishlist:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 pb-24 md:pb-0 flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </main>
        <BottomNav />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 pb-24 md:pb-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Product not found</p>
            <Link href="/products" className="text-primary hover:underline">
              Back to Products
            </Link>
          </div>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pb-24 md:pb-0 px-4 pt-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back button */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-muted rounded-lg overflow-hidden h-96 flex items-center justify-center">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center text-muted-foreground">
                  {product.name}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="text-muted-foreground text-sm">
                  Made from: <span className="font-semibold capitalize">{product.waste_type}</span>
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.review_count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <p className="text-4xl font-bold text-foreground">₹{product.price}</p>
                <p className="text-sm text-muted-foreground">
                  {product.stock > 0 ? (
                    <span className="text-primary">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border border-border rounded-lg py-2"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isWishlisted
                      ? 'bg-primary/20 text-primary'
                      : 'border border-border hover:bg-muted'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
