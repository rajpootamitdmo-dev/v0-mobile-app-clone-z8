'use client'


import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface WishlistItem {
  id: string
  product: {
    id: string
    name: string
    price: number
    image_url: string
    rating: number
    review_count: number
  }
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)
    }

    getUser()
  }, [supabase, router])

  useEffect(() => {
    if (!user) return

    const fetchWishlist = async () => {
      try {
        const { data } = await supabase
          .from('wishlists')
          .select(
            `
            id,
            product:products(id, name, price, image_url, rating, review_count)
          `
          )
          .eq('user_id', user.id)

        if (data) {
          setItems(data as WishlistItem[])
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [user, supabase])

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      await supabase.from('wishlists').delete().eq('id', wishlistId)
      setItems((prev) => prev.filter((item) => item.id !== wishlistId))
    } catch (error) {
      console.error('Error removing from wishlist:', error)
    }
  }

  const addToCart = async (product: any) => {
    try {
      const { error } = await supabase.from('cart_items').upsert(
        {
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
        },
        { onConflict: 'user_id,product_id' }
      )

      if (!error) {
        alert('Added to cart!')
        router.push('/cart')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pb-24 md:pb-0 px-4 pt-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-6">
                Your wishlist is empty
              </p>
              <Link
                href="/products"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-card rounded-lg overflow-hidden border border-border"
                >
                  <div className="relative bg-muted h-56 flex items-center justify-center overflow-hidden">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center text-muted-foreground text-xs text-center p-2">
                        {item.product.name}
                      </div>
                    )}

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <div className="p-3 space-y-3">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground truncate">
                        {item.product.name}
                      </h3>

                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-xs text-muted-foreground">
                          {item.product.rating} ({item.product.review_count})
                        </span>
                      </div>
                    </div>

                    <p className="font-bold text-base text-foreground">
                      ₹{item.product.price}
                    </p>

                    <button
                      onClick={() => addToCart(item.product)}
                      className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
