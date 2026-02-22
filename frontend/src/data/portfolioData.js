const makeUniqueSvg = (index, label, hue) => {
  // Create varied dimensions for masonry effect
  const heights = [520, 620, 450, 580, 500, 540, 480, 600, 520, 560]
  const height = heights[index % heights.length]
  
  // Create unique patterns and layouts
  const patterns = [
    `<rect width="800" height="${height}" fill="hsl(${hue}, 70%, 45%)"/>
     <circle cx="150" cy="100" r="80" fill="hsl(${hue + 20}, 60%, 50%)" opacity="0.3"/>
     <circle cx="700" cy="${height - 100}" r="120" fill="hsl(${hue - 20}, 65%, 40%)" opacity="0.2"/>`,
    
    `<defs>
      <linearGradient id="g${index}" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="hsl(${hue}, 70%, 50%)"/>
        <stop offset="1" stop-color="hsl(${hue + 40}, 60%, 25%)"/>
      </linearGradient>
    </defs>
    <rect width="800" height="${height}" fill="url(#g${index})"/>`,
    
    `<rect width="800" height="${height}" fill="hsl(${hue - 10}, 65%, 48%)"/>
     <polygon points="0,0 800,0 800,${height * 0.3} 0,${height * 0.5}" fill="hsl(${hue}, 70%, 40%)" opacity="0.4"/>`,
    
    `<defs>
      <pattern id="p${index}" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="hsl(${hue}, 70%, 45%)"/>
        <circle cx="50" cy="50" r="30" fill="hsl(${hue + 30}, 60%, 55%)" opacity="0.3"/>
      </pattern>
    </defs>
    <rect width="800" height="${height}" fill="url(#p${index})"/>`,
  ]
  
  const pattern = patterns[index % patterns.length]
  const colors = [`hsl(${hue}, 80%, 60%)`, `hsl(${hue + 20}, 75%, 65%)`, `hsl(${hue - 20}, 70%, 55%)`]
  const textColor = colors[index % colors.length]
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="${height}" viewBox="0 0 800 ${height}">
    <defs>
      <linearGradient id="fade${index}" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="rgba(255,255,255,0.0)"/>
        <stop offset="1" stop-color="rgba(0,0,0,0.6)"/>
      </linearGradient>
    </defs>
    ${pattern}
    <rect x="30" y="30" width="740" height="${height - 60}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <rect width="800" height="${height}" fill="url(#fade${index})"/>
    <text x="40" y="${height - 40}" fill="${textColor}" font-size="24" font-family="Source Sans 3, sans-serif" font-weight="300">${label} #${index + 1}</text>
  </svg>`
  
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const generateCategoryImages = (slug, title, hue) => {
  // First image is the actual uploaded image or category hero
  const categoryImages = {
    wedding: '/categorie images/wedding.jpg',
    prewedding: '/categorie images/pre wedding.jpg',
    drone: '/categorie images/drone1.jpg',
    reels: '/categorie images/cinematic 1.jpg',
    product: '/categorie images/product.jpg',
  }
  
  return [
    { name: `${slug}_hero.jpg`, src: categoryImages[slug] },
    ...Array.from({ length: 49 }, (_, i) => ({
      name: `${slug}_${i + 2}.jpg`,
      src: makeUniqueSvg(i, title.split(' ')[0], hue),
    }))
  ]
}

export const portfolioCategories = [
  {
    slug: 'wedding',
    title: 'Wedding Photography',
    description: 'Elegant coverage with cinematic lighting and timeless palettes.',
    hue: 18,
    images: generateCategoryImages('wedding', 'Wedding', 18),
  },
  {
    slug: 'prewedding',
    title: 'Pre-Wedding Shoots',
    description: 'Narrative-driven shoots with curated locations and styling.',
    hue: 210,
    images: generateCategoryImages('prewedding', 'Pre-Wedding', 210),
  },
  {
    slug: 'drone',
    title: 'Drone Photography',
    description: 'Aerial perspectives for grand venues and landscapes.',
    hue: 160,
    images: generateCategoryImages('drone', 'Drone', 160),
  },
  {
    slug: 'reels',
    title: 'Reels & Cinematic Videos',
    description: 'Short-form storytelling with dynamic edits and motion.',
    hue: 320,
    images: generateCategoryImages('reels', 'Cinematic', 320),
  },
  {
    slug: 'product',
    title: 'Product Photography',
    description: 'Clean, premium visuals tailored for catalogs and ads.',
    hue: 42,
    images: generateCategoryImages('product', 'Product', 42),
  },
]

export const featuredFrames = portfolioCategories.flatMap((category) =>
  category.images.slice(0, 2).map((image) => ({
    ...image,
    label: category.title,
  }))
)
