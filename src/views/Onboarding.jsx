import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BankID from '../components/BankID'

// Hero photos — young people hanging out (Unsplash).
const HERO_PHOTOS = [
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=480&h=560&fit=crop',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=480&h=560&fit=crop',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=480&h=560&fit=crop',
]

export default function Onboarding({ onStart }) {
  const [bankIDMode, setBankIDMode] = useState(null) // null | 'register' | 'login'

  if (bankIDMode) {
    return (
      <BankID
        mode={bankIDMode}
        onSuccess={onStart}
        onBack={() => setBankIDMode(null)}
      />
    )
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-secondary">
      {/* Background collage of real photos */}
      <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-40">
        {HERO_PHOTOS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center top' }}
          />
        ))}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/60 to-secondary" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between px-7 pb-8 pt-12">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="flex items-center gap-2"
        >
          <span className="font-display text-4xl font-extrabold text-white">
            Amig<span className="text-primary">o</span>s
          </span>
          <span className="mt-1 animate-float text-3xl">🧡</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex flex-col justify-center"
        >
          <h1 className="font-display text-[2.6rem] font-extrabold leading-none text-white">
            Hitta din<br />
            <span className="text-primary">gäng.</span>
          </h1>
          <p className="mt-4 max-w-[17rem] text-[15px] leading-relaxed text-white/70">
            Träffa nya vänner baserat på era gemensamma intressen och personlighet —
            inte utseende. Alltid tryggt med BankID. 🌍
          </p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {['🎮 Intressen', '👥 Aktiviteter', '💬 Chatt', '🔒 BankID-säkert'].map((c) => (
              <span
                key={c}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
              >
                {c}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          {/* BankID login button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setBankIDMode('register')}
            className="relative w-full overflow-hidden rounded-2xl bg-primary py-4 font-display text-lg font-bold text-white shadow-lift"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Skapa konto med BankID
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setBankIDMode('login')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 py-4 font-display text-lg font-bold text-white backdrop-blur"
          >
            {/* Inline mini BankID badge */}
            <span className="flex h-6 w-6 items-center justify-center rounded bg-[#193E8F] text-[10px] font-extrabold text-white">
              ID
            </span>
            Logga in med BankID
          </motion.button>

          <p className="pt-1 text-center text-xs text-white/35">
            Kräver BankID · Endast för dig 13–25 år 🔒
          </p>
        </motion.div>
      </div>
    </div>
  )
}
