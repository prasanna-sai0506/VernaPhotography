const mongoose = require('mongoose')

const getImagesByCategory = async (req, res) => {
  try {
    const category = req.params.category
    
    const collectionMap = {
      wedding: 'weddingimages',
      prewedding: 'preweddingimages',
      drone: 'droneimages',
      reels: 'reelsimages',
      product: 'productimages',
    }
    
    const collectionName = collectionMap[category]
    if (!collectionName) {
      return res.status(404).json({ message: 'Category not found' })
    }
    
    console.log('=== IMAGE QUERY DEBUG ===')
    console.log('Category:', category)
    console.log('Collection:', collectionName)
    console.log('Connection state:', mongoose.connection.readyState)
    console.log('Database name:', mongoose.connection.db?.databaseName)
    
    // List all collections
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.listCollections().toArray()
      console.log('Available collections:', collections.map(c => c.name))
    }
    
    // Query directly from collection
    const images = await mongoose.connection.db
      .collection(collectionName)
      .find()
      .sort({ order: 1 })
      .toArray()
    
    console.log('Found images:', images.length)
    console.log('========================')
    res.json(images)
  } catch (error) {
    console.error('Error fetching images:', error)
    res.status(500).json({ message: 'Failed to fetch images', error: error.message })
  }
}

module.exports = { getImagesByCategory }
