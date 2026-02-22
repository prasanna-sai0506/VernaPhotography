const ContactMessage = require('../models/ContactMessage')

const createContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body)
    res.status(201).json(message)
  } catch (error) {
    res.status(400).json({ message: 'Failed to save message' })
  }
}

module.exports = { createContactMessage }
