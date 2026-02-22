const express = require('express')
const { getImagesByCategory } = require('../controllers/imageController')

const router = express.Router()

// Debug middleware
router.use((req, res, next) => {
  console.log('Images route hit:', req.method, req.path, req.params)
  next()
})

router.get('/:category', getImagesByCategory)

module.exports = router
