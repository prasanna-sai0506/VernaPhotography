const mongoose = require('mongoose')

const reelsImageSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    src: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ReelsImage', reelsImageSchema)
