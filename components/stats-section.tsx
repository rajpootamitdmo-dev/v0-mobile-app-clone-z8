import { Package, Leaf, Users, Building2 } from 'lucide-react'

export function StatsSection() {
  const stats = [
    {
      icon: Package,
      value: '10,000+',
      label: 'Products Sold',
    },
    {
      icon: Leaf,
      value: '25 Tons',
      label: 'Waste Recycled',
    },
    {
      icon: Users,
      value: '5000+',
      label: 'Supporters',
    },
    {
      icon: Building2,
      value: '50+',
      label: 'NGO Projects',
    },
  ]

  return (
    <section className="py-12 px-4 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="text-center p-4 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-xl md:text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
