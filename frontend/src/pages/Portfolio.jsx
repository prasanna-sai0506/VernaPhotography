import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'
import Modal from '../components/Modal.jsx'

function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const activeSlug = searchParams.get('category')
  const activeCategory = categories.find((category) => category.slug === activeSlug)

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  // Fetch images when a category is selected
  useEffect(() => {
    if (activeSlug) {
      const fetchImages = async () => {
        setLoading(true)
        try {
          const data = await api.getImages(activeSlug)
          setImages(data)
        } catch (error) {
          console.error('Failed to fetch images:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchImages()
    } else {
      setImages([])
    }
  }, [activeSlug])

  const handleCategoryClick = (slug) => {
    setSearchParams({ category: slug })
  }

  // Loading state
  if (loading && categories.length === 0) {
    return (
      <div className="px-4 sm:px-6 pb-16 sm:pb-20 pt-8 sm:pt-10 flex items-center justify-center min-h-screen">
        <p className="text-sand/60">Loading...</p>
      </div>
    )
  }

  // If a category is selected, show the gallery view
  if (activeCategory) {
    return (
      <div className="px-4 sm:px-6 pb-16 sm:pb-20 pt-8 sm:pt-10">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => setSearchParams({})}
            className="mb-6 text-sand/70 hover:text-sand active:text-sand transition text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] py-2 px-1 -ml-1"
          >
            ← Back to Categories
          </button>
          <div className="flex flex-col gap-2 mb-6 sm:mb-8">
            <p className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold">{activeCategory.title}</p>
            <p className="text-sm sm:text-base text-sand/60">{activeCategory.description}</p>
          </div>
          
          {loading ? (
            <div className="text-center py-20">
              <p className="text-sand/60">Loading images...</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 md:gap-6">
              {images.map((image, index) => (
                <motion.div
                  key={image._id || `${activeCategory.slug}-${index}`}
                  className="break-inside-avoid group relative mb-4 sm:mb-5 md:mb-6 overflow-hidden rounded-lg sm:rounded-2xl cursor-pointer hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.5), duration: 0.4 }}
                  onClick={() => setSelectedImage({ src: image.src, name: image.title, label: activeCategory.title })}
                >
                  <div className="relative overflow-hidden rounded-lg sm:rounded-2xl bg-ink/50 block">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-auto block transition-transform duration-300 group-hover:scale-105"
                      style={{ filter: 'brightness(1.1)' }}
                      loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-2xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-sand text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <Modal
          open={Boolean(selectedImage)}
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    )
  }

  // Categories grid view
  return (
    <div className="px-4 pb-16 pt-8 md:px-6 md:pb-20 md:pt-10">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="headline text-2xl sm:text-3xl md:text-4xl uppercase text-sand mb-6 md:mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Portfolios
        </motion.h2>

        <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category._id || category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className="group relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-xl md:rounded-2xl cursor-pointer active:scale-[0.98] transition-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.heroImage}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-active:scale-105 brightness-110"
                  style={{ filter: 'brightness(1.15) contrast(1.05)' }}
                />
              </div>

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/75 md:from-black/30 md:via-black/40 md:to-black/70 transition-opacity duration-300 md:group-hover:from-black/40 md:group-hover:via-black/50 md:group-hover:to-black/80" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6 p-4 md:p-6">
                {/* Title */}
                <h3 className="headline text-center text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.05em] sm:tracking-[0.1em] text-white px-2">
                  {category.title}
                </h3>

                {/* Red vertical line accent */}
                <div className="h-10 md:h-12 w-1 bg-ember/80" />

                {/* View Gallery Label */}
                <span className="mt-2 md:mt-4 text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-sand md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  View Gallery
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
