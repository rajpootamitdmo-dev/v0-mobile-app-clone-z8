import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { HeroSection } from '@/components/hero-section'
import { StatsSection } from '@/components/stats-section'
import { FeaturedProducts } from '@/components/featured-products'
import { JourneyTimeline } from '@/components/journey-timeline'
import { DonationCTA } from '@/components/donation-cta'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pb-24 md:pb-0">
        <HeroSection />
        <StatsSection />
        <FeaturedProducts />
        <DonationCTA />
        <JourneyTimeline />
      </main>

      <BottomNav />
    </div>
  )
}
