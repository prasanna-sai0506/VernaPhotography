const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const PortfolioCategory = require('../models/PortfolioCategory')
const WeddingImage = require('../models/WeddingImage')
const PreWeddingImage = require('../models/PreWeddingImage')
const DroneImage = require('../models/DroneImage')
const ReelsImage = require('../models/ReelsImage')
const ProductImage = require('../models/ProductImage')
const PricingPlan = require('../models/PricingPlan')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const categories = [
  {
    slug: 'wedding',
    title: 'Wedding',
    description: 'Capturing the magic of your special day with timeless elegance',
    heroImage: '/categorie images/wedding.jpg',
    order: 1
  },
  {
    slug: 'prewedding',
    title: 'Pre-Wedding',
    description: 'Romantic pre-wedding shoots that tell your love story',
    heroImage: '/categorie images/pre wedding.jpg',
    order: 2
  },
  {
    slug: 'drone',
    title: 'Drone',
    description: 'Stunning aerial perspectives that showcase breathtaking views',
    heroImage: '/categorie images/drone1.jpg',
    order: 3
  },
  {
    slug: 'reels',
    title: 'Reels',
    description: 'Cinematic video reels that bring your moments to life',
    heroImage: '/categorie images/cinematic 1.jpg',
    order: 4
  },
  {
    slug: 'product',
    title: 'Product',
    description: 'Professional product photography that makes your items shine',
    heroImage: '/categorie images/product.jpg',
    order: 5
  }
]

const getCategoryModel = (categorySlug) => {
  const modelMap = {
    'wedding': WeddingImage,
    'prewedding': PreWeddingImage,
    'drone': DroneImage,
    'reels': ReelsImage,
    'product': ProductImage
  }
  return modelMap[categorySlug]
}

const generateImagesForCategory = (categorySlug, heroImage) => {
  const images = []
  const galleryPath = path.join(__dirname, '../../../frontend/public/gallery', categorySlug)
  
  // Check if gallery folder exists
  if (fs.existsSync(galleryPath)) {
    const files = fs.readdirSync(galleryPath)
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    )
    
    if (imageFiles.length > 0) {
      // Load images from gallery folder
      imageFiles.forEach((file, index) => {
        images.push({
          title: `${categorySlug} - ${path.parse(file).name}`,
          src: `/gallery/${categorySlug}/${file}`,
          order: index
        })
      })
      console.log(`  Found ${imageFiles.length} images in gallery/${categorySlug}`)
    } else {
      // Fallback to hero image if no images in gallery
      images.push({
        title: `${categorySlug} featured photo`,
        src: heroImage,
        order: 0
      })
      console.log(`  No images in gallery/${categorySlug}, using hero image`)
    }
  } else {
    // Fallback to hero image if folder doesn't exist
    images.push({
      title: `${categorySlug} featured photo`,
      src: heroImage,
      order: 0
    })
    console.log(`  Gallery folder not found for ${categorySlug}, using hero image`)
  }
  
  return images
}

const pricingPlans = [
  {
    name: 'Basic',
    price: 299,
    duration: '2 hours',
    features: [
      'Professional photographer',
      '50 edited photos',
      'Online gallery',
      'Basic retouching'
    ],
    isPopular: false,
    order: 1
  },
  {
    name: 'Premium',
    price: 599,
    duration: '4 hours',
    features: [
      'Professional photographer',
      '150 edited photos',
      'Online gallery',
      'Advanced retouching',
      'Drone shots (if applicable)',
      'Same-day preview'
    ],
    isPopular: true,
    order: 2
  },
  {
    name: 'Ultimate',
    price: 999,
    duration: 'Full day',
    features: [
      'Professional photographer',
      'Unlimited edited photos',
      'Online gallery',
      'Premium retouching',
      'Drone shots',
      'Same-day preview',
      'Photo album included',
      'Video highlights'
    ],
    isPopular: false,
    order: 3
  }
]

const seedDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI
    if (!uri) {
      throw new Error('MONGO_URI is not set in .env file')
    }

    console.log('Connecting to MongoDB...')
    await mongoose.connect(uri)
    console.log('MongoDB connected successfully')

    // Clear existing data
    console.log('Clearing existing data...')
    await PortfolioCategory.deleteMany({})
    await WeddingImage.deleteMany({})
    await PreWeddingImage.deleteMany({})
    await DroneImage.deleteMany({})
    await ReelsImage.deleteMany({})
    await ProductImage.deleteMany({})
    await PricingPlan.deleteMany({})
    
    // Drop old portfolioimages collection if it exists
    try {
      await mongoose.connection.db.dropCollection('portfolioimages')
      console.log('Dropped old portfolioimages collection')
    } catch (error) {
      if (error.message !== 'ns not found') {
        console.log('Old portfolioimages collection not found (already removed)')
      }
    }
    
    console.log('Existing data cleared')

    // Insert categories
    console.log('Inserting categories...')
    const insertedCategories = await PortfolioCategory.insertMany(categories)
    console.log(`${insertedCategories.length} categories inserted`)

    // Generate and insert images for each category into separate collections
    console.log('Inserting images into separate collections...')
    let totalImages = 0
    for (const category of categories) {
      const images = generateImagesForCategory(category.slug, category.heroImage)
      const CategoryModel = getCategoryModel(category.slug)
      await CategoryModel.insertMany(images)
      totalImages += images.length
      console.log(`  ${images.length} image(s) inserted into ${CategoryModel.collection.name}`)
    }
    console.log(`Total ${totalImages} images inserted across all collections`)

    // Insert pricing plans
    console.log('Inserting pricing plans...')
    const insertedPlans = await PricingPlan.insertMany(pricingPlans)
    console.log(`${insertedPlans.length} pricing plans inserted`)

    console.log('\n✅ Database seeded successfully!')
    console.log('\nSummary:')
    console.log(`  Categories: ${insertedCategories.length}`)
    console.log(`  Images: ${totalImages}`)
    console.log(`  Pricing Plans: ${insertedPlans.length}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error.message)
    process.exit(1)
  }
}

seedDatabase()
