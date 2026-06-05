'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  product_id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    image_url: string
  }
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
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

    const fetchCart = async () => {
      try {
        const { data } = await supabase
          .from('cart_items')
          .select(`
            id,
            product_id,
            quantity,
            product:products(id, name, price, image_url)
          `)
          .eq('user_id', user.id)

        if (data) {
          setItems(data as CartItem[])
        }
      } catch (error) {
        console.error('Error fetching cart:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [user, supabase])

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(cartItemId)
      return
    }

    try {
      await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', cartItemId)

      setItems((prev) =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      )
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const removeItem = async (cartItemId: string) => {
    try {
      await supabase.from('cart_items').delete().eq('id', cartItemId)
      setItems((prev) => prev.filter((item) => item.id !== cartItemId))
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const tax = subtotal * 0.1
  const total = subtotal + tax

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
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <Link
                href="/products"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-card rounded-lg border border-border"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                      {item.product.image_url ? (
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center text-muted-foreground text-xs text-center p-2">
                          {item.product.name}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ₹{item.product.price}
                        </p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value) || 1)
                          }
                          className="w-12 text-center border border-border rounded py-1 text-sm"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right flex flex-col justify-between">
                      <p className="font-semibold text-foreground">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-card rounded-lg border border-border p-6 h-fit sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4 border-b border-border pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-center"
                >
                  Proceed to Checkout
                </Link>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Free shipping on orders over ₹500
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
