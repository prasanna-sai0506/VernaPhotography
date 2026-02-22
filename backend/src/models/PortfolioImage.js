const mongoose = require('mongoose')

const portfolioImageSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, default: '' },
    src: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('PortfolioImage', portfolioImageSchema)
