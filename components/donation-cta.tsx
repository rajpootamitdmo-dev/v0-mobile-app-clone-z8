import Link from 'next/link'
import { Heart } from 'lucide-react'

export function DonationCTA() {
  return (
    <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Be a Part of the Change
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Support our initiatives under Swachh Bharat Abhiyan and help us create a cleaner, greener India.
            </p>
            <Link
              href="/ngo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity w-fit"
            >
              <Heart className="w-4 h-4" />
              Donate Now
            </Link>
          </div>

          {/* Right Decoration */}
          <div className="relative h-64 md:h-80 flex items-center justify-center">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Hands */}
              <g opacity="0.9">
                {/* Right hand */}
                <path
                  d="M200 350 Q150 300 150 200 Q150 150 180 140 L200 100 L220 140 Q250 150 250 200 Q250 300 200 350 Z"
                  fill="#E8C4A0"
                  stroke="#8B6F47"
                  strokeWidth="2"
                />
                {/* Left hand */}
                <path
                  d="M200 350 Q250 300 250 200 Q250 150 220 140 L200 100 L180 140 Q150 150 150 200 Q150 300 200 350 Z"
                  fill="#D4A89F"
                  stroke="#8B6F47"
                  strokeWidth="2"
                />

                {/* Soil/Plant in hands */}
                <ellipse cx="200" cy="250" rx="60" ry="50" fill="#6B5344" />
                <circle cx="200" cy="200" r="8" fill="#2D7A47" />
                <circle cx="190" cy="210" r="6" fill="#3A9B55" />
                <circle cx="210" cy="215" r="6" fill="#2D7A47" />

                {/* Plant stem and leaves */}
                <line x1="200" y1="200" x2="200" y2="100" stroke="#2D7A47" strokeWidth="3" />
                <ellipse
                  cx="180" cy="140"
                  rx="18"
                  ry="30"
                  fill="#2D7A47"
                  transform="rotate(-30 180 140)"
                />
                <ellipse
                  cx="220" cy="130"
                  rx="18"
                  ry="30"
                  fill="#3A9B55"
                  transform="rotate(30 220 130)"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
