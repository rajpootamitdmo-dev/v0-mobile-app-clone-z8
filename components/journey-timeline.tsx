import { Trash2, SquareCheckBig, Recycle, Package, Smile } from 'lucide-react'

export function JourneyTimeline() {
  const steps = [
    {
      icon: Trash2,
      title: 'Waste Collection',
      description: 'Quality waste collected from communities',
    },
    {
      icon: SquareCheckBig,
      title: 'Sorting & Segregation',
      description: 'Expert sorting for quality assurance',
    },
    {
      icon: Recycle,
      title: 'Recycling & Upcycling',
      description: 'Transform into premium materials',
    },
    {
      icon: Package,
      title: 'Handcrafted Products',
      description: 'Created with care and expertise',
    },
    {
      icon: Smile,
      title: 'Happy Customer',
      description: 'Joy of sustainable shopping',
    },
  ]

  return (
    <section className="py-12 px-4 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
          Our Journey
        </h2>

        <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 z-10">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Text */}
                <div className="text-center space-y-1 mb-4">
                  <p className="font-semibold text-foreground text-sm md:text-base">
                    {step.title}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block w-12 h-0.5 bg-border absolute translate-x-32 translate-y-12" />
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile connector */}
        <div className="md:hidden flex flex-col items-center gap-2 mt-4">
          {[...Array(steps.length - 1)].map((_, i) => (
            <div key={i} className="w-0.5 h-4 bg-border" />
          ))}
        </div>
      </div>
    </section>
  )
}
