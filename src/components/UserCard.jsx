import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import TagBadge from './TagBadge'

// Full-bleed photo card for Discover. Falls back to gradient when no photo.
export default function UserCard({ user, sharedInterests }) {
  const sharedCount = user.interests.filter((i) => sharedInterests.has(i)).length
  const hasPhoto = !!user.photo

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card">
      {/* Photo section */}
      <div className="relative h-[54%] shrink-0 overflow-hidden">
        {hasPhoto ? (
          <img src={user.photo} alt={user.name} className="h-full w-full object-cover" />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: `linear-gradient(135deg, #FF6B35 0%, #FFD700 100%)`,
            }}
          />
        )}
        {/* Gradient fade into white */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

        {/* Shared interests badge — float over photo */}
        {sharedCount > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
            className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-secondary shadow"
          >
            ⭐ {sharedCount} gemensamt
          </motion.span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col px-5 pb-4 -mt-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight text-secondary">
              {user.name}, <span className="text-primary">{user.age}</span>
            </h2>
            <p className="flex items-center gap-1 text-sm text-secondary/55">
              <MapPin size={13} /> {user.city}
            </p>
          </div>
        </div>

        <p className="mt-2 text-[14px] leading-relaxed text-secondary/70 line-clamp-2">
          {user.bio}
        </p>

        {/* Interests */}
        <div className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
          {user.interests.map((interest) => (
            <TagBadge
              key={interest}
              label={interest}
              star={sharedInterests.has(interest)}
              selected={sharedInterests.has(interest)}
              small
            />
          ))}
        </div>
      </div>
    </div>
  )
}
