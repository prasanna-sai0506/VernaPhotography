const mongoose = require('mongoose')

const pricingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    features: [{ type: String }],
    isPopular: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('PricingPlan', pricingPlanSchema)
