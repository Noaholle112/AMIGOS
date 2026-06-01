import { motion } from 'framer-motion'
import { MapPin, Verified } from 'lucide-react'

// Discover card: large photo area on top, info on bottom.
export default function UserCard({ user, sharedInterests }) {
  const sharedCount = user.interests.filter((i) => sharedInterests.has(i)).length

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[30px] bg-white shadow-card">
      {/* Big photo area */}
      <div className="relative h-[62%] shrink-0 overflow-hidden bg-gradient-to-br from-primary/15 to-accent/15">
        {user.photo ? (
          <img
            src={user.photo}
            alt={user.name}
            className="h-full w-full object-cover"
            style={{ objectPosition: user.objectPosition || 'center' }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary to-accent" />
        )}

        {/* Soft gradient at the bottom so badges stay readable over any photo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />

        {/* BankID badge — top right, clear of the face */}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold text-secondary shadow-sm backdrop-blur-sm">
          <Verified size={12} className="text-[#193E8F]" /> BankID
        </span>

        {/* Shared-interests badge — bottom left, over the torso not the face */}
        {sharedCount > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 20 }}
            className="absolute bottom-3 left-3 whitespace-nowrap rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-secondary shadow"
          >
            ⭐ {sharedCount} gemensamt
          </motion.span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col px-5 pt-4">
        <div className="flex items-baseline gap-2">
          <h2 className="font-display text-[26px] font-extrabold leading-none text-secondary">
            {user.name}
          </h2>
          <span className="font-display text-xl font-bold text-primary">{user.age}</span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm font-medium text-secondary/55">
          <MapPin size={13} /> {user.city}
        </p>

        <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-secondary/75">
          {user.bio}
        </p>

        {/* Interests */}
        <div className="mt-auto flex flex-wrap gap-1.5 pb-5 pt-3">
          {user.interests.map((interest) => {
            const shared = sharedInterests.has(interest)
            return (
              <span
                key={interest}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  shared
                    ? 'bg-accent text-secondary'
                    : 'bg-cream text-secondary/70 border border-secondary/8'
                }`}
              >
                {shared && '⭐ '}
                {interest}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
