import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Avatar from './Avatar'
import TagBadge from './TagBadge'

// A swipeable match card. `sharedInterests` is a Set of the viewer's interests
// so we can mark common ones with a gold star.
export default function UserCard({ user, sharedInterests }) {
  const sharedCount = user.interests.filter((i) => sharedInterests.has(i)).length

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card">
      {/* Header band with avatar */}
      <div className="relative flex flex-col items-center gap-2 bg-gradient-to-b from-primary/15 to-transparent px-5 pb-4 pt-7">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          <Avatar emoji={user.avatar} size={92} />
        </motion.div>
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-secondary">
            {user.name}, {user.age}
          </h2>
          <p className="mt-0.5 flex items-center justify-center gap-1 text-sm text-secondary/60">
            <MapPin size={14} /> {user.city}
          </p>
        </div>
        {sharedCount > 0 && (
          <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-bold text-secondary">
            ⭐ {sharedCount} gemensamt intresse{sharedCount > 1 ? 'n' : ''}
          </span>
        )}
      </div>

      {/* Bio */}
      <div className="px-6">
        <p className="text-center text-[15px] leading-relaxed text-secondary/80">“{user.bio}”</p>
      </div>

      {/* Interests */}
      <div className="mt-5 flex flex-1 flex-wrap content-start justify-center gap-2 px-6">
        {user.interests.map((interest) => (
          <TagBadge
            key={interest}
            label={interest}
            star={sharedInterests.has(interest)}
            selected={sharedInterests.has(interest)}
          />
        ))}
      </div>
    </div>
  )
}
