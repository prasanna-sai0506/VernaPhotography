const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const connectDB = require('./config/db')
const categoryRoutes = require('./routes/categories')
const imageRoutes = require('./routes/images')
const planRoutes = require('./routes/plans')
const contactRoutes = require('./routes/contact')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist')

app.disable('x-powered-by')

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'Photo Studio 3D API running' })
})

// Connect to database first
connectDB()
  .then(() => {
    console.log('MongoDB connected successfully')
    
    // Register routes AFTER database connection
    app.use('/api/categories', categoryRoutes)
    app.use('/api/images', imageRoutes)
    app.use('/api/plans', planRoutes)
    app.use('/api/contact', contactRoutes)

    if (fs.existsSync(frontendDistPath)) {
      app.use(express.static(frontendDistPath))
      app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(frontendDistPath, 'index.html'))
      })
    }
    
    // 404 handler must be LAST
    app.use((req, res) => {
      res.status(404).json({ message: 'Route not found' })
    })
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
