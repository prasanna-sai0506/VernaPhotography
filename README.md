# Photo Studio 3D Portfolio (MERN)

## Overview
A fully responsive, cinematic 3D photography portfolio built with React (Vite), Tailwind CSS, Three.js, Framer Motion, and an Express + MongoDB backend.

## Folder Structure
- **frontend**: React + Vite app
- **backend**: Express + MongoDB API

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
The `.env` file has been created in the backend directory with the following variables:
- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode
- `CORS_ORIGIN`: Frontend URL for CORS

**MongoDB Connection Options:**

**Option 1: Local MongoDB** (default)
- Ensure MongoDB is installed and running on your machine
- The default connection string is: `mongodb://localhost:27017/photostudio3d`

**Option 2: MongoDB Atlas** (cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGO_URI` in `.env` with your Atlas connection string

### 3. Seed the Database
Populate the database with categories, images, and pricing plans:
```bash
npm run seed
```

This will create:
- 5 portfolio categories (Wedding, Pre-Wedding, Drone, Reels, Product)
- 5 images (1 per category from your actual image files)
- 3 pricing plans

### 4. Start the Backend Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The API will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Features
- **Dynamic Portfolio**: Categories and images loaded from MongoDB database
- **Unique Images**: Each category displays its actual hero image (1 per category)
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **3D Elements**: Three.js scenes on Home and About pages
- **Contact Form**: Saves submissions to MongoDB
- **Pricing Plans**: Dynamic plans from database with popular badge

## Database Collections

### PortfolioCategory
- `slug`: Unique identifier (e.g., "wedding")
- `title`: Display name (e.g., "Wedding")
- `description`: Category description
- `heroImage`: Featured image path
- `order`: Display order

### PortfolioImage
- `category`: Category slug reference
- `title`: Image title
- `src`: Image source path
- `order`: Display order within category

### PricingPlan
- `name`: Plan name
- `price`: Price in INR
- `duration`: Duration description
- `features`: Array of feature strings
- `isPopular`: Boolean for popular badge
- `order`: Display order

### ContactMessage
- `name`: Sender name
- `email`: Sender email
- `phone`: Sender phone (optional)
- `message`: Message content

## API Endpoints
- `GET /api/categories` - Get all portfolio categories
- `GET /api/images/:category` - Get images for a specific category
- `GET /api/plans` - Get pricing plans
- `POST /api/contact` - Submit contact form

## Managing Images

Images are stored in MongoDB with separate collections for each category. The seed script automatically scans the gallery folders and populates the database.

### Gallery Folder Structure
```
frontend/public/gallery/
├── wedding/
│   ├── wedding-1.jpg
│   ├── wedding-2.jpg
│   └── wedding-3.jpg
├── prewedding/
│   ├── prewedding-1.jpg
│   └── prewedding-2.jpg
├── drone/
│   └── drone-1.jpg
├── reels/
│   └── reels-1.jpg
└── product/
    └── product-1.jpg
```

### How to Add More Images

**Step 1: Add image files to the gallery folder**
- Copy your images to `frontend/public/gallery/{category}/`
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Example: `frontend/public/gallery/wedding/wedding-4.jpg`

**Step 2: Run the seed script**
```bash
cd backend
npm run seed
```

The seed script will:
1. Scan each category folder in `frontend/public/gallery/`
2. Find all image files
3. Generate metadata (title, src, order)
4. Update the MongoDB collections automatically

**Step 3: View the images**
- Images are automatically displayed on the website
- No need to restart the server or frontend
- New images appear in the respective category sections

### Database Collections

The images are stored in separate collections, one per category:
- `weddingimages` - Wedding photos
- `preweddingimages` - Pre-wedding photos
- `droneimages` - Drone shots
- `reelsimages` - Video reels
- `productimages` - Product photos

Each image document contains:
```javascript
{
  _id: ObjectId,
  title: String,        // e.g., "wedding - wedding-1"
  src: String,          // e.g., "/gallery/wedding/wedding-1.jpg"
  order: Number,        // Display order (0, 1, 2, ...)
  createdAt: Date,
  updatedAt: Date
}
```

### Example Workflow

1. **Add 5 new wedding images:**
   - Copy `wedding-4.jpg`, `wedding-5.jpg`, `wedding-6.jpg`, `wedding-7.jpg`, `wedding-8.jpg` to `frontend/public/gallery/wedding/`

2. **Populate the database:**
   ```bash
   cd backend
   npm run seed
   ```

3. **View on website:**
   - Go to `http://localhost:5173`
   - Navigate to Wedding category
   - All 8 wedding images will be displayed

## Deployment Notes
- **Frontend**: Deploy to Vercel or Netlify
- **Backend**: Deploy to Render, Railway, or Heroku
- **Database**: Use MongoDB Atlas for production

## Scripts

### Backend
- `npm start` - Start the server
- `npm run dev` - Start with nodemon (auto-reload)
- `npm run seed` - Seed the database

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
