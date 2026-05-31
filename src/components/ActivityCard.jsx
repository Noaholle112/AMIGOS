import { motion } from 'framer-motion'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import { CATEGORY_STYLES } from '../data/mockData'

export default function ActivityCard({ activity, joined, onToggle }) {
  const style = CATEGORY_STYLES[activity.category] || { bg: '#FF6B35', emoji: '✨' }
  const full = activity.participants >= activity.max
  const labelDark = activity.category === 'Social' // gold bg needs dark text

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="overflow-hidden rounded-3xl bg-white shadow-card"
    >
      <div className="flex items-center justify-between px-5 pb-1 pt-4">
        <span
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
          style={{ background: style.bg, color: labelDark ? '#1A1A2E' : '#fff' }}
        >
          <span>{style.emoji}</span> {activity.category}
        </span>
        <span className="flex items-center gap-1 text-xs font-semibold text-secondary/60">
          <Users size={14} /> {activity.participants}/{activity.max}
        </span>
      </div>

      <div className="px-5 pb-4 pt-1">
        <h3 className="font-display text-lg font-bold text-secondary">{activity.title}</h3>
        <div className="mt-2 flex flex-col gap-1 text-sm text-secondary/70">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={15} className="text-primary" /> {activity.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={15} className="text-primary" /> {activity.location}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggle(activity.id)}
          disabled={full && !joined}
          className={`mt-4 w-full rounded-2xl py-2.5 text-sm font-bold transition-colors ${
            joined
              ? 'bg-secondary text-white'
              : full
                ? 'cursor-not-allowed bg-secondary/10 text-secondary/40'
                : 'bg-primary text-white shadow-lift'
          }`}
        >
          {joined ? '✓ Du är med!' : full ? 'Fullt' : 'Gå med'}
        </motion.button>
      </div>
    </motion.div>
  )
}
