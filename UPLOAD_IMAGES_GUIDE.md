# How to Upload Images to Your Portfolio

## 📂 Step 1: Prepare Your Images

Place your images in the appropriate category folders:

```
frontend/public/gallery/
├── wedding/       (Put your wedding photos here)
├── prewedding/    (Put your pre-wedding photos here)
├── drone/         (Put your drone photos here)
├── reels/         (Put your reels/video thumbnails here)
└── product/       (Put your product photos here)
```

### Supported Image Formats
- JPG/JPEG
- PNG
- GIF
- WEBP

### Naming Convention
- Name your files descriptively: `ceremony.jpg`, `couple-beach.jpg`, `aerial-view.jpg`
- Avoid spaces in filenames (use hyphens or underscores)
- The filename will be used in the image title

## 📥 Step 2: Add Your Images

### Option A: Copy Images Manually
1. Copy your 50 wedding photos to `frontend/public/gallery/wedding/`
2. Copy your 50 pre-wedding photos to `frontend/public/gallery/prewedding/`
3. Copy your 50 drone photos to `frontend/public/gallery/drone/`
4. Copy your 50 reels photos to `frontend/public/gallery/reels/`
5. Copy your 50 product photos to `frontend/public/gallery/product/`

### Option B: Use PowerShell (Bulk Copy)
```powershell
# Example: Copy all images from a source folder to wedding category
Copy-Item "C:\Users\YourName\Pictures\WeddingPhotos\*.jpg" -Destination "frontend\public\gallery\wedding\"
```

## 🗄️ Step 3: Update the Database

After adding your images, run the seed script to load them into MongoDB:

```bash
cd backend
npm run seed
```

This will:
- Scan all gallery folders
- Find all images in each category
- Insert them into separate MongoDB collections
- Report how many images were found per category

### Output Example:
```
Inserting images into separate collections...
  Found 50 images in gallery/wedding
  50 image(s) inserted into weddingimages
  Found 50 images in gallery/prewedding
  50 image(s) inserted into preweddingimages
  ...
Total 250 images inserted across all collections
```

## 🌐 Step 4: Verify on Website

1. Make sure both servers are running:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. Open http://localhost:5173 in your browser
3. Navigate to the Portfolio page
4. Click on any category to see all images

## 📊 View in MongoDB Compass

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select `photostudio3d` database
4. You'll see separate collections:
   - `weddingimages` - All wedding photos
   - `preweddingimages` - All pre-wedding photos
   - `droneimages` - All drone photos
   - `reelsimages` - All reels photos
   - `productimages` - All product photos

## 🔄 Adding More Images Later

To add more images after initial setup:

1. Add new image files to the appropriate gallery folder
2. Run the seed script again: `cd backend && npm run seed`
3. The script will clear old data and reload everything

**Note:** Running `npm run seed` will replace ALL existing data. If you want to add images without replacing existing data, you'll need to insert them directly through MongoDB Compass or create an upload API endpoint.

## 💡 Tips

- **Image Optimization**: Compress images before uploading to improve website performance
- **Consistent Sizing**: Use similar aspect ratios for a better gallery layout
- **Quality**: Use high-quality images (at least 1920px width recommended)
- **Organization**: Keep source images in a separate backup folder
- **Testing**: Test with a few images first before uploading all 250

## ⚠️ Important Notes

1. The seed script clears existing data, so keep backups of your images
2. Image paths in the database are relative: `/gallery/wedding/photo1.jpg`
3. Make sure image file sizes aren't too large (recommend max 2MB per image)
4. If a category folder is empty, it will fall back to using the hero image from `/categorie images/`

## 🚀 Quick Start Example

```powershell
# 1. Add 3 wedding photos for testing
Copy-Item "C:\MyPhotos\wedding1.jpg" "frontend\public\gallery\wedding\"
Copy-Item "C:\MyPhotos\wedding2.jpg" "frontend\public\gallery\wedding\"
Copy-Item "C:\MyPhotos\wedding3.jpg" "frontend\public\gallery\wedding\"

# 2. Seed the database
cd backend
npm run seed

# 3. Start servers (if not already running)
npm run dev

# 4. Open http://localhost:5173/portfolio?category=wedding
```

Your images are now live on the website! 🎉
