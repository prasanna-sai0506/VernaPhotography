const mongoose = require('mongoose')

const portfolioCategorySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    heroImage: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('PortfolioCategory', portfolioCategorySchema)
