'use client'


import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Package, ChevronRight } from 'lucide-react'

interface Order {
  id: string
  total_amount: number
  status: string
  created_at: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
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

    const fetchOrders = async () => {
      try {
        const { data } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (data) {
          setOrders(data)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user, supabase])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50'
      case 'processing':
        return 'text-blue-600 bg-blue-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
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
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-foreground">My Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-6">You haven&apos;t placed any orders yet</p>
              <Link
                href="/products"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        ₹{order.total_amount.toFixed(2)}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
