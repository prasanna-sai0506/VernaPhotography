import { motion } from 'framer-motion'
import AboutScene from '../three/AboutScene.jsx'

function About() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 pb-16 sm:pb-20 pt-8 sm:pt-10">
      <div className="absolute inset-0">
        <AboutScene />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <motion.h2
          className="headline text-4xl sm:text-5xl md:text-6xl uppercase text-sand"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          The Studio
        </motion.h2>
        <div className="mt-6 sm:mt-8 grid gap-6 md:grid-cols-[1fr_1fr] md:items-center">
          <motion.img
            src="/categorie images/wedding.jpg"
            alt="The Studio"
            className="h-[420px] w-full rounded-xl object-cover grayscale md:h-[520px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          />
          <motion.div
            className="text-sand/90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-base sm:text-lg leading-relaxed">
              Founded in 2018, Verna Photography was born from a passion for capturing the ephemeral. We
              don't just take photos; we freeze time, preserving the raw emotion and intricate details of
              your most cherished moments.
            </p>
            <p className="mt-6 text-base sm:text-lg leading-relaxed">
              Our team specializes in cinematic storytelling. Whether it's the grandeur of a wedding or
              the precision of a product shoot, we apply a director's eye to every frame.
            </p>
            <div className="mt-8 border-l-4 border-ember pl-4 sm:pl-5">
              <p className="text-xl sm:text-3xl leading-tight italic text-sand">
                "Photography is the only language that can be understood anywhere in the world."
              </p>
              <p className="mt-2 text-sand/50">- Bruno Barbey</p>
            </div>
          </motion.div>
        </div>
        <div className="mt-10 sm:mt-12 border-t border-slate/70 pt-8 sm:pt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            ['5+', 'Years Experience'],
            ['200+', 'Weddings'],
            ['50k+', 'Shots Taken'],
            ['15', 'Awards Won'],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="headline text-3xl sm:text-4xl text-ember">{value}</p>
              <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-sand">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
