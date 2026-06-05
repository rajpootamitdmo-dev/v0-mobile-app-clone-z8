'use client'

import Link from 'next/link'
import { Menu, Search, ShoppingCart, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  quantity: number
}

export function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

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
    if (!user) return

    const fetchCart = async () => {
      const { data } = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('user_id', user.id)

      if (data) {
        const total = data.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
        setCartCount(total)
      }
    }

    fetchCart()

    const channel = supabase
      .channel(`cart-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cart_items',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchCart()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-1 md:flex-none justify-center md:justify-start">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">♻️</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-sm md:text-base text-foreground">Waste2Worth</h1>
            <p className="text-xs text-muted-foreground hidden">Better Planet, Better Future</p>
          </div>
        </Link>

        {/* Search and Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Search className="w-5 h-5 text-foreground" />
          </button>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>

          {/* Auth Button */}
          <div className="flex items-center gap-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-foreground" />
              </button>
            ) : (
              <Link href="/auth/login" className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-2">
          <Link href="/" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg">
            Home
          </Link>
          <Link href="/products" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg">
            Shop
          </Link>
          <Link href="/wishlist" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg">
            Wishlist
          </Link>
          <Link href="/ngo" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg">
            NGO Projects
          </Link>
          {user && (
            <Link href="/profile" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg">
              Profile
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
