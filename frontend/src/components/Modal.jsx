import { AnimatePresence, motion } from 'framer-motion'

function Modal({ open, image, onClose }) {
  return (
    <AnimatePresence>
      {open && image && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass relative w-full max-w-3xl overflow-hidden rounded-xl sm:rounded-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={image.src}
              alt={image.name}
              className="h-[280px] sm:h-[360px] md:h-[420px] w-full object-cover"
            />
            <div className="flex items-start sm:items-center justify-between gap-3 px-4 sm:px-6 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold">{image.label}</p>
                <p className="text-base sm:text-lg text-sand truncate">{image.name}</p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-full border border-white/20 px-5 py-2.5 sm:px-4 sm:py-2 text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-sand hover:bg-sand/5 active:scale-[0.95] transition-all"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
