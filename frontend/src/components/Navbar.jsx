import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navLinks } from '../data/navLinks.js'
import MobileMenu from './MobileMenu.jsx'

const navItemClass = ({ isActive }) =>
  `text-[10px] uppercase tracking-[0.28em] transition md:text-[11px] lg:text-[12px] ${
    isActive ? 'text-sand' : 'text-sand/70 hover:text-sand'
  }`

function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.search])

  const primaryLinks = navLinks.filter((link) => link.primary)
  const ctaLink = navLinks.find((link) => link.cta)
  const portfolioItems = navLinks.filter((link) => link.to.startsWith('/portfolio?category='))

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 md:px-6">
        <Link to="/" className="headline text-base uppercase tracking-[0.35em] sm:tracking-[0.4em] text-sand md:text-lg">
          Verna.
        </Link>
        <div className="hidden items-center gap-5 md:flex lg:gap-7">
          {primaryLinks.map((link) =>
            link.label === 'Portfolios' ? (
              <div key={link.label} className="relative group">
                <NavLink to={link.to} className={navItemClass}>
                  <span className="inline-flex items-center gap-2">
                    {link.label}
                    <span className="text-[10px]">˅</span>
                  </span>
                </NavLink>
                <div className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 opacity-0 transition duration-200 group-hover:opacity-100">
                  <div className="absolute -top-3 left-0 right-0 h-3" aria-hidden="true" />
                  <div className="rounded-2xl border border-white/10 bg-[#151720]/95 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
                    <NavLink
                      to="/portfolio"
                      className="block rounded-xl px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-red-400 transition hover:text-red-300"
                    >
                      All Collections
                    </NavLink>
                    <div className="my-1 h-px bg-white/10" />
                    {portfolioItems.map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.to}
                        className="block rounded-xl px-4 py-3 text-xs tracking-[0.12em] text-sand/70 transition hover:text-sand"
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={link.label} to={link.to} className={navItemClass}>
                <span className="inline-flex items-center gap-2">{link.label}</span>
              </NavLink>
            )
          )}
          {ctaLink && (
            <NavLink
              to={ctaLink.to}
              className="rounded border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-sand md:text-[11px]"
            >
              {ctaLink.label}
            </NavLink>
          )}
        </div>
        <button
          type="button"
          className="relative flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center cursor-pointer md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="relative h-5 w-6">
            <motion.span
              className="absolute left-0 top-0 h-0.5 w-6 bg-sand"
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 top-2.5 h-0.5 w-6 bg-sand"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 top-5 h-0.5 w-6 bg-sand"
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </nav>
  )
}

export default Navbar
