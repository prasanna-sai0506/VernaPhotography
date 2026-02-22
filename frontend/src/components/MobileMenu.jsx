import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { createPortal } from 'react-dom'

function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  const portfolioItems = [
    { label: 'Wedding Photography', to: '/portfolio?category=wedding' },
    { label: 'Pre-Wedding Shoots', to: '/portfolio?category=prewedding' },
    { label: 'Drone Photography', to: '/portfolio?category=drone' },
    { label: 'Reels & Cinematic', to: '/portfolio?category=reels' },
    { label: 'Product Photography', to: '/portfolio?category=product' },
  ]

  const bottomLinks = [
    { label: 'Plans & Pricing', to: '/plans' },
    { label: 'About Studio', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
  ]

  const menu = (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[999] bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <motion.div
            className="fixed inset-0 z-[1000] flex flex-col bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 shrink-0">
              <div className="headline text-base uppercase tracking-[0.4em] text-sand">Verna.</div>
              <button
                onClick={onClose}
                className="text-3xl text-sand hover:text-sand/80 transition"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto w-full">
              <div className="px-6 py-8 w-full">
                {/* Home */}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block text-center py-4 text-lg tracking-[0.25em] text-sand hover:text-sand/80 transition`
                  }
                  onClick={onClose}
                >
                  Home
                </NavLink>

                {/* Divider */}
                <div className="h-px bg-white/20 my-6" />

                {/* Portfolios Section Header */}
                <h3 className="text-center text-xs uppercase tracking-[0.3em] text-sand/50 font-light my-6">
                  Portfolios
                </h3>

                {/* Portfolio Items */}
                {portfolioItems.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `block text-center py-3 text-base tracking-[0.1em] text-sand hover:text-sand/80 transition`
                    }
                    onClick={onClose}
                  >
                    {link.label}
                  </NavLink>
                ))}

                {/* Divider */}
                <div className="h-px bg-white/20 my-6" />

                {/* Bottom Links */}
                {bottomLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `block text-center py-3 text-base tracking-[0.1em] text-sand hover:text-sand/80 transition`
                    }
                    onClick={onClose}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return createPortal(menu, document.body)
}

export default MobileMenu
