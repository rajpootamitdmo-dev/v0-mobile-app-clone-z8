import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedData() {
  try {
    console.log('Seeding products...')

    const products = [
      {
        name: 'Jute Planter',
        description: 'Beautiful handcrafted jute planter perfect for indoor plants',
        price: 499,
        category: 'Home Decor',
        image_url: '/products/jute-planter.png',
        waste_type: 'Jute fibers',
        rating: 4.6,
        review_count: 128,
        stock: 50,
      },
      {
        name: 'Paper Pen Holder',
        description: 'Colorful eco-friendly pen holder made from recycled paper',
        price: 299,
        category: 'Office Supplies',
        image_url: '/products/pen-holder.png',
        waste_type: 'Recycled paper',
        rating: 4.5,
        review_count: 96,
        stock: 80,
      },
      {
        name: 'Bottle Lamp',
        description: 'Elegant decorative lamp made from recycled glass bottles with LED string lights',
        price: 599,
        category: 'Lighting',
        image_url: '/products/bottle-lamp.png',
        waste_type: 'Recycled glass',
        rating: 4.7,
        review_count: 78,
        stock: 30,
      },
      {
        name: 'Woven Basket',
        description: 'Sturdy woven basket from reclaimed fabric scraps',
        price: 399,
        category: 'Storage',
        image_url: '/products/jute-planter.png',
        waste_type: 'Fabric scraps',
        rating: 4.4,
        review_count: 112,
        stock: 40,
      },
      {
        name: 'Ceramic Bowl',
        description: 'Hand-painted ceramic bowl made from recycled clay',
        price: 349,
        category: 'Kitchenware',
        image_url: '/products/pen-holder.png',
        waste_type: 'Recycled clay',
        rating: 4.8,
        review_count: 145,
        stock: 60,
      },
    ]

    const { data, error } = await supabase.from('products').insert(products)

    if (error) {
      console.error('Error inserting products:', error)
      return
    }

    console.log('✓ Products seeded successfully')

    // Seed NGO projects
    console.log('Seeding NGO projects...')

    const ngoProjects = [
      {
        name: 'Swachh Bharat Abhiyan',
        description: 'Supporting waste collection and segregation across Indian communities',
        image_url: '/products/jute-planter.png',
        impact_metric: 'Waste Collected',
        impact_value: '25 Tons',
        progress_percentage: 60,
      },
      {
        name: 'Ocean Cleanup Initiative',
        description: 'Removing plastic waste from oceans and coastal areas',
        image_url: '/products/bottle-lamp.png',
        impact_metric: 'Plastic Recovered',
        impact_value: '500 Tons',
        progress_percentage: 45,
      },
      {
        name: 'Reforestation Drive',
        description: 'Planting trees to offset waste and promote biodiversity',
        image_url: '/products/jute-planter.png',
        impact_metric: 'Trees Planted',
        impact_value: '50,000',
        progress_percentage: 75,
      },
    ]

    const { error: ngoError } = await supabase
      .from('ngo_projects')
      .insert(ngoProjects)

    if (ngoError) {
      console.error('Error inserting NGO projects:', ngoError)
      return
    }

    console.log('✓ NGO projects seeded successfully')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

seedData()
