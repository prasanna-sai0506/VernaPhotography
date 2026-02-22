import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'

function Plans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    api
      .getPlans()
      .then((data) => {
        if (active) {
          setPlans(data)
        }
      })
      .catch((error) => {
        console.error('Failed to fetch plans:', error)
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <section className="px-4 sm:px-6 pb-16 sm:pb-20 pt-8 sm:pt-10 flex items-center justify-center min-h-screen">
        <p className="text-sand/60">Loading plans...</p>
      </section>
    )
  }

  return (
    <section className="px-4 sm:px-6 pb-16 sm:pb-20 pt-8 sm:pt-10">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="headline text-2xl sm:text-3xl md:text-4xl uppercase text-sand"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Plans & Pricing
        </motion.h2>
        <p className="mt-2 text-sm sm:text-base text-sand/60">
          Choose a plan crafted for your story
        </p>
        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan._id || plan.name}
              className={`glass flex h-full flex-col justify-between rounded-xl sm:rounded-2xl p-5 sm:p-6 relative ${
                plan.isPopular ? 'ring-2 ring-gold/30' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold px-4 py-1 rounded-full">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink font-medium">Popular</span>
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold">{plan.name}</p>
                <p className="mt-3 text-2xl sm:text-3xl text-sand">₹{plan.price.toLocaleString()}</p>
                <p className="mt-2 text-sm sm:text-base text-sand/70">{plan.duration}</p>
                <ul className="mt-4 space-y-2 text-sm sm:text-base text-sand/70">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-6 rounded-full border border-white/20 px-6 py-3.5 sm:py-3 text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-sand hover:bg-sand/5 active:scale-[0.98] transition-all"
              >
                Reserve Slot
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Plans
