'use client'

import Link from 'next/link'
import { Home, ShoppingBag, Heart, Leaf, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/products', icon: ShoppingBag, label: 'Shop' },
    { href: '/wishlist', icon: Heart, label: 'Wishlist' },
    { href: '/ngo', icon: Leaf, label: 'NGO' },
    { href: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
              isActive(href)
                ? 'text-primary bg-muted'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
