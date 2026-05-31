import { motion } from 'framer-motion'
import { MapPin, Verified } from 'lucide-react'
import TagBadge from './TagBadge'

// Full-bleed "selfie card" — photo fills the card, info overlaid at the bottom.
// Inspired by Hinge / Bumble BFF.
export default function UserCard({ user, sharedInterests }) {
  const sharedCount = user.interests.filter((i) => sharedInterests.has(i)).length

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl shadow-card">
      {/* Full-height photo */}
      <div className="absolute inset-0">
        {user.photo ? (
          <img
            src={user.photo}
            alt={user.name}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary to-accent" />
        )}
        {/* Gradient — transparent at top, dark at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      </div>

      {/* Top badges */}
      <div className="relative flex justify-between p-4">
        {sharedCount > 0 ? (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 20 }}
            className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-secondary shadow"
          >
            ⭐ {sharedCount} gemensamma
          </motion.span>
        ) : (
          <span />
        )}
        {/* BankID verified badge */}
        <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Verified size={12} className="text-[#60A5FA]" /> BankID
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Info overlay at bottom */}
      <div className="relative px-5 pb-5">
        {/* Name & location */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-none text-white drop-shadow">
              {user.name}
            </h2>
            <p className="mt-1 flex items-center gap-1 text-[13px] font-semibold text-white/70">
              <span className="text-base font-bold text-white/90">{user.age}</span> år
              <span className="mx-1 text-white/30">·</span>
              <MapPin size={12} />
              {user.city}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-white/80">
          {user.bio}
        </p>

        {/* Interest pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {user.interests.map((interest) => (
            <span
              key={interest}
              className={`inline-flex items-center gap-0.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                sharedInterests.has(interest)
                  ? 'bg-accent text-secondary'
                  : 'bg-white/15 text-white backdrop-blur-sm'
              }`}
            >
              {sharedInterests.has(interest) && '⭐ '}
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
