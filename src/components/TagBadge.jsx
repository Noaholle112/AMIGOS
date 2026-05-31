import { motion } from 'framer-motion'

// Interest pill. `selected` highlights it in the primary color.
// `star` adds a gold star for shared interests on user cards.
export default function TagBadge({ label, selected = false, star = false, onClick, small = false }) {
  const interactive = typeof onClick === 'function'
  const base = small ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={interactive ? { scale: 0.92 } : undefined}
      transition={{ type: 'spring', stiffness: 500, damping: 24 }}
      className={`inline-flex items-center gap-1 rounded-full font-medium transition-colors ${base} ${
        selected
          ? 'bg-primary text-white shadow-lift'
          : 'bg-white text-secondary border border-secondary/10'
      } ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {star && <span className="text-accent drop-shadow-sm">⭐</span>}
      {label}
    </motion.button>
  )
}
