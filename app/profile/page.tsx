'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut, Package, Heart } from 'lucide-react'

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  avatar_url: string
  total_purchased: number
  total_donated: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
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

    const fetchProfile = async () => {
      try {
        const { data } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (data) {
          setProfile(data)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 pb-24 md:pb-0 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Profile not found</p>
            <Link href="/" className="text-primary hover:underline">
              Back to Home
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
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {profile.first_name} {profile.last_name}
                  </h1>
                  <p className="text-muted-foreground">{profile.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-primary">
                  ₹{profile.total_purchased.toFixed(2)}
                </p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Donated</p>
                <p className="text-2xl font-bold text-primary">
                  ₹{profile.total_donated.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-card rounded-lg border border-border p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground">Contact Information</h2>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <p className="text-foreground font-medium">{profile.email}</p>
              </div>

              {profile.phone && (
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <p className="text-foreground font-medium">{profile.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/orders"
              className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">My Orders</h3>
                <p className="text-sm text-muted-foreground">
                  View and track your orders
                </p>
              </div>
            </Link>

            <Link
              href="/wishlist"
              className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">My Wishlist</h3>
                <p className="text-sm text-muted-foreground">
                  View saved items
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
