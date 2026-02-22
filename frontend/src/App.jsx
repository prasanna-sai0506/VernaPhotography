import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Portfolio = lazy(() => import('./pages/Portfolio.jsx'))
const Plans = lazy(() => import('./pages/Plans.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

function App() {
  return (
    <div className="min-h-screen bg-ink text-sand">
      <Navbar />
      <main className="pt-12 sm:pt-16">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="border-t border-white/10 px-4 sm:px-6 py-8 sm:py-10 text-xs sm:text-sm text-sand/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span>Photo Studio 3D — Cinematic Photography</span>
          <span className="text-xs sm:text-sm">Replace placeholder content with real studio details.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
