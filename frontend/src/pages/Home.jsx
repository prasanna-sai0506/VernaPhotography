import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { portfolioCategories } from '../data/portfolioData.js'

function Home() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_rgba(5,6,11,0.95)_65%)]" />
      <div className="relative z-10 flex min-h-screen items-start justify-center px-4 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:px-8">
        <div className="text-center max-w-6xl w-full">
          {/* Logo and Text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="-mt-5 mb-8 sm:mb-12 md:mb-16"
          >
            <div className="flex flex-row flex-wrap items-center justify-center gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-4">
              {/* Camera Icon Circle */}
              <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer circle */}
                  <circle cx="60" cy="60" r="58" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-sand" />
                  {/* Camera body */}
                  <rect x="35" y="45" width="50" height="35" rx="3" fill="none" stroke="currentColor" strokeWidth="2" className="text-sand" />
                  {/* Camera lens */}
                  <circle cx="60" cy="62" r="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-sand" />
                  {/* Lens inner circle */}
                  <circle cx="60" cy="62" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sand" opacity="0.6" />
                  {/* Flash area */}
                  <rect x="38" y="48" width="6" height="5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sand" />
                </svg>
              </div>

              {/* Varna Photographs Text */}
              <div className="text-center sm:text-left">
                <h1 className="font-elegant text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-sand font-extralight tracking-wide leading-tight mb-1 sm:mb-2">
                  VERNA
                </h1>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-sand/90 tracking-[0.2em] sm:tracking-[0.25em] uppercase font-light">
                  PHOTOGRAPHY
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-6 sm:mt-8 md:mt-10">
            <p className="text-[10px] xs:text-[11px] sm:text-xs uppercase tracking-[0.3em] text-sand/70">
              Explore Categories
            </p>
            <div className="hero-cylinder">
              <div
                className="hero-cylinder__ring"
                style={{ '--count': portfolioCategories.length, '--radius': 'clamp(225px, 40vw, 360px)' }}
              >
                {portfolioCategories.map((category, index) => (
                  <button
                    key={category.slug}
                    type="button"
                    className="hero-cylinder__card"
                    style={{ '--index': index }}
                    onClick={() => navigate(`/portfolio?category=${category.slug}`)}
                  >
                    <img
                      src={category.images[0].src}
                      alt={category.title}
                      className="hero-cylinder__image"
                      loading="lazy"
                    />
                    <span className="hero-cylinder__label">{category.title}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-3 text-[11px] sm:text-xs text-sand/60 uppercase tracking-[0.2em]">
              Tap a category to open the gallery
            </p>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 px-4"
          >
            <button
              onClick={() => navigate('/portfolio')}
              className="w-full sm:w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-medium uppercase tracking-wider border-2 border-sand text-sand hover:bg-sand hover:text-ink transition-all duration-300 min-w-[200px] sm:min-w-[220px]"
            >
              All Collections
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-medium uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition-all duration-300 min-w-[200px] sm:min-w-[220px]"
            >
              Book Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Home
