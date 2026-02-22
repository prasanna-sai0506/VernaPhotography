const PricingPlan = require('../models/PricingPlan')

const getPlans = async (req, res) => {
  try {
    const plans = await PricingPlan.find().sort({ order: 1 })
    res.json(plans)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch plans' })
  }
}

module.exports = { getPlans }
