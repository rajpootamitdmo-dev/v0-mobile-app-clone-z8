'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, BookOpen, Trees, Heart as PawIcon, Sprout } from 'lucide-react'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { createClient } from '@/lib/supabase/client'

interface NGOProject {
  id: string
  name: string
  description: string
  image_url: string
  impact_metric: string
  impact_value: string
  progress_percentage: number
}

const sectors = [
  {
    id: '1',
    name: 'Education Sector',
    description: 'Empowering underprivileged children through quality education and resources.',
    icon: BookOpen,
    bgColor: 'bg-orange-50',
    image: 'https://images.unsplash.com/photo-1427504494785-cdea856e4711?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Plantation Sector',
    description: 'Creating a greener planet by planting more trees and restoring nature.',
    icon: Trees,
    bgColor: 'bg-green-50',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Animal Welfare',
    description: 'Rescuing animals and providing a better life for animals in need.',
    icon: PawIcon,
    bgColor: 'bg-pink-50',
    image: 'https://images.unsplash.com/photo-1577720643272-265e434b3da1?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'Swachh Bharat Abhiyan',
    description: 'Creating clean communities and a pollution-free India.',
    icon: Sprout,
    bgColor: 'bg-blue-50',
    image: 'https://images.unsplash.com/photo-1559366945-cd4628902249?w=400&h=300&fit=crop'
  },
]

export default function NGOPage() {
  const [projects, setProjects] = useState<NGOProject[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await supabase
          .from('ngo_projects')
          .select('*')

        if (data) {
          setProjects(data)
        }
      } catch (error) {
        console.error('Error fetching NGO projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [supabase])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pb-24 md:pb-0 px-4 pt-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Our Sectors</h1>
            <p className="text-muted-foreground">We work in 4 key sectors for a better tomorrow.</p>
          </div>

          {/* Sectors Grid */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-72 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sectors.map((sector) => {
                  const Icon = sector.icon
                  return (
                    <Link
                      key={sector.id}
                      href={`/ngo/${sector.id}`}
                      className="group"
                    >
                      <div className="relative bg-muted rounded-lg overflow-hidden h-56 md:h-64 mb-3 flex items-center justify-center">
                        <img
                          src={sector.image}
                          alt={sector.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-bold text-foreground text-sm">
                            {sector.name}
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {sector.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* CTA Section */}
              <div className="bg-primary rounded-lg p-6 text-white space-y-4 mt-12 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">
                    Together, we can build a cleaner, greener and better tomorrow.
                  </h2>
                </div>
                <Link
                  href="/ngo/1"
                  className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Support Our Mission →
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
