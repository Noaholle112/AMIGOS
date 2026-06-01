import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Pencil, Check, LogOut } from 'lucide-react'
import Avatar from '../components/Avatar'
import TagBadge from '../components/TagBadge'
import { CATEGORY_STYLES } from '../data/mockData'

export default function Profile({ profile, matches, joinedActivities, onUpdate, onLogout }) {
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(profile.bio)
  const [city, setCity] = useState(profile.city)

  const save = () => {
    onUpdate({ bio: bio.trim() || profile.bio, city: city.trim() || profile.city })
    setEditing(false)
  }

  return (
    <div className="no-scrollbar h-full overflow-y-auto pb-24">
      {/* Cover + avatar */}
      <div className="relative bg-gradient-to-b from-primary to-primary/40 px-6 pb-16 pt-8">
        <button
          onClick={onLogout}
          className="absolute right-5 top-4 flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur"
        >
          <LogOut size={14} /> Logga ut
        </button>
        <div className="flex flex-col items-center text-white">
          <Avatar emoji={profile.avatar} size={96} />
          <h1 className="mt-3 font-display text-2xl font-bold">
            {profile.name}, {profile.age}
          </h1>
          <p className="flex items-center gap-1 text-sm text-white/90">
            <MapPin size={14} /> {profile.city}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="-mt-10 space-y-4 px-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 rounded-3xl bg-white p-4 shadow-card">
          <Stat value={matches.length} label="Amigos" />
          <Stat value={profile.interests.length} label="Intressen" />
          <Stat value={joinedActivities.length} label="Aktiviteter" />
        </div>

        {/* Bio */}
        <Section
          title="Om mig"
          action={
            <button
              onClick={editing ? save : () => setEditing(true)}
              className="flex items-center gap-1 text-sm font-semibold text-primary"
            >
              {editing ? (
                <>
                  <Check size={16} /> Spara
                </>
              ) : (
                <>
                  <Pencil size={14} /> Redigera
                </>
              )}
            </button>
          }
        >
          {editing ? (
            <div className="space-y-3">
              <textarea
                value={bio}
                maxLength={150}
                rows={3}
                onChange={(e) => setBio(e.target.value)}
                className="amg-input resize-none"
              />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-secondary/55">Stad</span>
                <input value={city} onChange={(e) => setCity(e.target.value)} className="amg-input" />
              </label>
            </div>
          ) : (
            <p className="text-[15px] leading-relaxed text-secondary/75">{profile.bio}</p>
          )}
        </Section>

        {/* Interests */}
        <Section title="Mina intressen">
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((i) => (
              <TagBadge key={i} label={i} selected />
            ))}
          </div>
        </Section>

        {/* Personality */}
        {profile.personality && Object.keys(profile.personality).length > 0 && (
          <Section title="Min vibe">
            <div className="flex flex-wrap gap-2">
              {Object.values(profile.personality).map((v, i) => (
                <span
                  key={i}
                  className="rounded-full bg-cream px-3 py-1.5 text-sm font-medium text-secondary/75"
                >
                  {v}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Activities */}
        <Section title="Aktiviteter jag deltar i">
          {joinedActivities.length === 0 ? (
            <p className="text-sm text-secondary/50">
              Du har inte gått med i någon aktivitet än. Kika i fliken Aktiviteter! 📅
            </p>
          ) : (
            <div className="space-y-2">
              {joinedActivities.map((a) => {
                const style = CATEGORY_STYLES[a.category] || { emoji: '✨' }
                return (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 rounded-2xl bg-cream px-3 py-2.5"
                  >
                    <span className="text-xl">{style.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-secondary">{a.title}</p>
                      <p className="text-xs text-secondary/55">
                        {a.date} · {a.location}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Section>
      </div>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center"
    >
      <span className="font-display text-2xl font-extrabold text-primary">{value}</span>
      <span className="text-xs font-medium text-secondary/55">{label}</span>
    </motion.div>
  )
}

function Section({ title, action, children }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-secondary">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  )
}
