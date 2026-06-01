import { motion } from 'framer-motion'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import { CATEGORY_STYLES } from '../data/mockData'

export default function ActivityCard({ activity, joined, onToggle }) {
  const style = CATEGORY_STYLES[activity.category] || { bg: '#FF6B35', text: '#fff', emoji: '✨' }
  const full = activity.participants >= activity.max
  const pct = Math.round((activity.participants / activity.max) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="overflow-hidden rounded-3xl bg-white shadow-card"
    >
      {/* Cover — on-brand category gradient with a large emoji (no external image) */}
      <div
        className="relative h-28 overflow-hidden"
        style={{ background: style.gradient || style.bg }}
      >
        <span className="absolute -right-3 -top-2 text-[88px] leading-none opacity-25 select-none">
          {style.emoji}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Category badge */}
        <span
          className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-secondary shadow-sm backdrop-blur-sm"
        >
          {style.emoji} {activity.category}
        </span>
        {/* Title over the cover */}
        <h3 className="absolute bottom-3 left-4 right-4 font-display text-lg font-bold leading-tight text-white drop-shadow">
          {activity.title}
        </h3>
      </div>

      <div className="px-5 pb-4 pt-3">

        <div className="mt-2 flex flex-col gap-1 text-sm text-secondary/65">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} className="text-primary" /> {activity.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-primary" /> {activity.location}
          </span>
        </div>

        {/* Participant progress bar */}
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1 text-secondary/55">
              <Users size={12} /> {activity.participants}/{activity.max} deltagare
            </span>
            <span className={full ? 'text-red-500' : 'text-green-600'}>
              {full ? 'Fullt' : `${activity.max - activity.participants} platser kvar`}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary/10">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggle(activity.id)}
          disabled={full && !joined}
          className={`mt-4 w-full rounded-2xl py-2.5 text-sm font-bold transition-colors ${
            joined
              ? 'bg-secondary text-white'
              : full
                ? 'cursor-not-allowed bg-secondary/10 text-secondary/35'
                : 'bg-primary text-white shadow-lift'
          }`}
        >
          {joined ? '✓ Du är med!' : full ? 'Fullt' : 'Gå med'}
        </motion.button>
      </div>
    </motion.div>
  )
}
