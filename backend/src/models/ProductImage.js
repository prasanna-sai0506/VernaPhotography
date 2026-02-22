const mongoose = require('mongoose')

const productImageSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    src: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ProductImage', productImageSchema)
