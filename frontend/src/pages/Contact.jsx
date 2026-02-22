import { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'

const initialForm = { name: '', email: '', phone: '', message: '' }

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    try {
      await api.sendContact(form)
      setStatus('success')
      setForm(initialForm)
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section className="px-4 sm:px-6 pb-16 sm:pb-20 pt-8 sm:pt-10">
      <div className="mx-auto grid max-w-6xl gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.h2
            className="headline text-2xl sm:text-3xl md:text-4xl uppercase text-sand"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Contact Us
          </motion.h2>
          <p className="mt-3 text-sm sm:text-base text-sand/70">
            Share your event details and we will craft a custom cinematic package.
          </p>
          <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {[
              { label: 'Name', name: 'name', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Phone', name: 'phone', type: 'tel' },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold">{field.label}</label>
                <input
                  className="glass rounded-xl px-4 py-3.5 sm:py-3 text-sm sm:text-base text-sand outline-none focus:ring-2 focus:ring-ember/30 transition"
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold">Message</label>
              <textarea
                className="glass min-h-[140px] sm:min-h-[160px] rounded-xl px-4 py-3.5 sm:py-3 text-sm sm:text-base text-sand outline-none focus:ring-2 focus:ring-ember/30 transition resize-none"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-ember px-8 py-4 sm:py-3 text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-ink shadow-glow hover:bg-ember/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && (
              <p className="text-sm text-gold">Thanks! We will get back within 24 hours.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-ember">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4">
          <iframe
            title="Studio location"
            className="h-[280px] sm:h-[320px] md:h-[360px] w-full rounded-lg sm:rounded-xl"
            src="https://maps.google.com/maps?q=New%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          />
          <div className="mt-3 sm:mt-4 text-sm sm:text-base text-sand/70">
            <p>Photo Studio 3D</p>
            <p>New Delhi, India</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
