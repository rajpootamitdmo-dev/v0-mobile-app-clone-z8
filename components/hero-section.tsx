import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background via-background to-secondary/20 overflow-hidden pt-8 pb-12 px-4">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance leading-tight">
                Turning Waste <br />
                <span className="text-primary">Into Value</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Eco-friendly products handcrafted from waste for a better tomorrow.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ngo"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Support NGO
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Plant pot SVG placeholder */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full object-cover"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Pot */}
                <path
                  d="M100 250 L120 350 L280 350 L300 250 Z"
                  fill="#D4A574"
                  stroke="#8B6F47"
                  strokeWidth="2"
                />
                {/* Pot mouth */}
                <ellipse cx="200" cy="250" rx="100" ry="30" fill="#E8C4A0" stroke="#8B6F47" strokeWidth="2" />

                {/* Soil */}
                <ellipse cx="200" cy="260" rx="95" ry="20" fill="#A0856E" />

                {/* Plant stems */}
                <line x1="200" y1="260" x2="180" y2="120" stroke="#4A7C59" strokeWidth="3" strokeLinecap="round" />
                <line x1="200" y1="260" x2="220" y2="110" stroke="#4A7C59" strokeWidth="3" strokeLinecap="round" />
                <line x1="200" y1="260" x2="200" y2="80" stroke="#4A7C59" strokeWidth="3" strokeLinecap="round" />

                {/* Leaves */}
                <ellipse cx="175" cy="150" rx="20" ry="35" fill="#2D7A47" transform="rotate(-35 175 150)" />
                <ellipse cx="225" cy="140" rx="20" ry="35" fill="#3A9B55" transform="rotate(35 225 140)" />
                <ellipse cx="200" cy="100" rx="18" ry="32" fill="#2D7A47" transform="rotate(0 200 100)" />
                <ellipse cx="210" cy="120" rx="16" ry="28" fill="#3A9B55" transform="rotate(20 210 120)" />
                <ellipse cx="190" cy="110" rx="16" ry="28" fill="#4A9B5F" transform="rotate(-20 190 110)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-muted" />
          <div className="w-2 h-2 rounded-full bg-muted" />
        </div>
      </div>
    </section>
  )
}
