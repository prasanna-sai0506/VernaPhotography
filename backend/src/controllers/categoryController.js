const PortfolioCategory = require('../models/PortfolioCategory')

const getCategories = async (req, res) => {
  try {
    const categories = await PortfolioCategory.find().sort({ order: 1 })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' })
  }
}

module.exports = { getCategories }
