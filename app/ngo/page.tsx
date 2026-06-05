'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Leaf } from 'lucide-react'
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
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              NGO Projects & Initiatives
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Support our Swachh Bharat Abhiyan initiatives and help create a cleaner, greener India.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                  >
                    {/* Project Image */}
                    <div className="relative h-48 bg-muted overflow-hidden flex items-center justify-center">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <Leaf className="w-12 h-12 text-primary opacity-50" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Impact Metric */}
                      {project.impact_metric && (
                        <div className="bg-primary/10 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">
                            {project.impact_metric}
                          </p>
                          <p className="text-lg font-bold text-primary">
                            {project.impact_value}
                          </p>
                        </div>
                      )}

                      {/* Progress Bar */}
                      {project.progress_percentage > 0 && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-muted-foreground">
                              Progress
                            </span>
                            <span className="text-xs font-bold text-primary">
                              {project.progress_percentage}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{
                                width: `${project.progress_percentage}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Donate Button */}
                      <Link
                        href={`/ngo/${project.id}/donate`}
                        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <Heart className="w-4 h-4" />
                        Donate Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-8 text-center space-y-4 mt-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Make a Difference Today
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Every donation helps us continue our mission to turn waste into value and create a sustainable future for India.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No NGO projects available yet.</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
