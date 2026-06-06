'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart } from 'lucide-react'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'

const sectorDetails: { [key: string]: any } = {
  '1': {
    name: 'Education Sector',
    tagline: 'We educate, we empower, we transform.',
    description: 'Empowering underprivileged children through quality education and resources.',
    image: 'https://images.unsplash.com/photo-1427504494785-cdea856e4711?w=600&h=400&fit=crop',
    stats: [
      { label: 'Children Educated', value: '50,000+' },
      { label: 'Schools Supported', value: '150+' },
      { label: 'States Covered', value: '28+' },
      { label: 'Teachers Trained', value: '3000+' },
    ],
    initiatives: [
      {
        name: 'Scholarship Program',
        description: 'Providing scholarships to deserving students',
        image: 'https://images.unsplash.com/photo-1427504494785-cdea856e4711?w=300&h=250&fit=crop'
      },
      {
        name: 'Digital Learning',
        description: 'Bringing technology to rural classrooms',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=300&h=250&fit=crop'
      },
      {
        name: 'Teacher Training',
        description: 'Upskilling educators with modern techniques',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=250&fit=crop'
      },
    ]
  },
  '2': {
    name: 'Plantation Sector',
    tagline: 'We plant hope, we grow tomorrow.',
    description: 'Creating a greener planet by planting more trees and restoring nature.',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=400&fit=crop',
    stats: [
      { label: 'Trees Planted', value: '25,000+' },
      { label: 'Plantation Drives', value: '120+' },
      { label: 'Cities Covered', value: '35+' },
      { label: 'Volunteers', value: '5000+' },
    ],
    initiatives: [
      {
        name: 'Afforestation Drives',
        description: 'Planting trees in deforestation areas',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=250&fit=crop'
      },
      {
        name: 'School Plantation Program',
        description: 'Encouraging students to plant and nurture trees',
        image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=250&fit=crop'
      },
      {
        name: 'Community Greening',
        description: 'Working with communities to create green spaces',
        image: 'https://images.unsplash.com/photo-1559366945-cd4628902249?w=300&h=250&fit=crop'
      },
    ]
  },
  '3': {
    name: 'Animal Welfare',
    tagline: 'Every life matters, every care counts.',
    description: 'Rescuing animals and providing a better life for animals in need.',
    image: 'https://images.unsplash.com/photo-1577720643272-265e434b3da1?w=600&h=400&fit=crop',
    stats: [
      { label: 'Animals Rescued', value: '10,000+' },
      { label: 'Shelters', value: '25+' },
      { label: 'Cities Covered', value: '15+' },
      { label: 'Care Givers', value: '800+' },
    ],
    initiatives: [
      {
        name: 'Animal Rescue',
        description: 'Rescuing stray and injured animals',
        image: 'https://images.unsplash.com/photo-1587300411515-f8a0c8f8e10f?w=300&h=250&fit=crop'
      },
      {
        name: 'Shelter Care',
        description: 'Providing safe homes for abandoned animals',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27c62d?w=300&h=250&fit=crop'
      },
      {
        name: 'Pet Adoption',
        description: 'Finding loving families for shelter animals',
        image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=300&h=250&fit=crop'
      },
    ]
  },
  '4': {
    name: 'Swachh Bharat Abhiyan',
    tagline: 'Clean India, Green India, Progressive India.',
    description: 'Creating clean communities and a pollution-free India.',
    image: 'https://images.unsplash.com/photo-1559366945-cd4628902249?w=600&h=400&fit=crop',
    stats: [
      { label: 'Waste Cleaned', value: '500+ Tons' },
      { label: 'Drives Organized', value: '200+' },
      { label: 'Cities Covered', value: '40+' },
      { label: 'Volunteers', value: '8000+' },
    ],
    initiatives: [
      {
        name: 'Beach Cleanup',
        description: 'Cleaning beaches and marine habitats',
        image: 'https://images.unsplash.com/photo-1542601906960-ba2006ce398f?w=300&h=250&fit=crop'
      },
      {
        name: 'Urban Cleanliness',
        description: 'Making cities cleaner and healthier',
        image: 'https://images.unsplash.com/photo-1559366945-cd4628902249?w=300&h=250&fit=crop'
      },
      {
        name: 'Waste Management',
        description: 'Promoting recycling and waste segregation',
        image: 'https://images.unsplash.com/photo-1553531088-d6cf6ad44c10?w=300&h=250&fit=crop'
      },
    ]
  }
}

interface SectorDetailPageProps {
  params: Promise<{ id: string }>
}

function SectorDetailContent({ id }: { id: string }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const sector = sectorDetails[id]

  if (!sector) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pb-24">
          <p className="text-muted-foreground">Sector not found</p>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pb-24 md:pb-0">
        {/* Hero Section */}
        <div className="relative h-72 bg-muted overflow-hidden flex items-center justify-center">
          <img
            src={sector.image}
            alt={sector.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Header with Back Button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <Link href="/ngo" className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <button onClick={() => setIsWishlisted(!isWishlisted)} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white text-white' : 'text-white'}`} />
            </button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-1">{sector.name}</h1>
            <p className="text-sm opacity-90">{sector.tagline}</p>
          </div>
        </div>

        <div className="px-4 pt-8 max-w-6xl mx-auto space-y-8">
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sector.stats.map((stat: any, idx: number) => (
              <div key={idx} className="bg-card rounded-lg p-4 border border-border text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Our Initiatives */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Our Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sector.initiatives.map((initiative: any, idx: number) => (
                <div key={idx} className="rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  <div className="relative h-40 bg-muted overflow-hidden">
                    <img
                      src={initiative.image}
                      alt={initiative.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-foreground text-sm">
                      {initiative.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {initiative.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary rounded-lg p-6 md:p-8 text-white space-y-4 text-center">
            <h2 className="text-2xl font-bold">Be a Part of the Change</h2>
            <p className="text-sm opacity-90 max-w-2xl mx-auto">
              {sector.name === 'Plantation Sector' 
                ? 'Plant a tree today for a better tomorrow.'
                : `Support our ${sector.name} initiatives.`}
            </p>
            <button className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity">
              {sector.name === 'Plantation Sector' 
                ? 'Donate for Plantation →'
                : `Support ${sector.name} →`}
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default async function SectorDetailPage({ params }: SectorDetailPageProps) {
  const { id } = await params
  return <SectorDetailContent id={id} />
}
