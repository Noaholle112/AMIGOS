import { useState } from 'react'
import { motion } from 'framer-motion'
import BankID from '../components/BankID'

const HERO_PHOTOS = [
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=480&h=560&fit=crop',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=480&h=560&fit=crop',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=480&h=560&fit=crop',
]

export default function Onboarding({ onStart }) {
  const [bankIDMode, setBankIDMode] = useState(null)

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
      {/* Background photo collage */}
      <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-35">
        {HERO_PHOTOS.map((src, i) => (
          <img key={i} src={src} alt="" className="h-full w-full object-cover" style={{ objectPosition: 'center top' }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/65 to-secondary" />
      </div>

      {/* Content — fixed layout, always fits */}
      <div className="relative flex h-full flex-col px-7 pt-10 pb-8">

        {/* Logo */}
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="flex items-center gap-2"
        >
          <span className="font-display text-3xl font-extrabold text-white">
            Amig<span className="text-primary">o</span>s
          </span>
          <span className="animate-float text-2xl">🧡</span>
        </motion.div>

        {/* Spacer pushes headline down a bit */}
        <div className="flex-1" />

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h1 className="font-display text-[2.2rem] font-extrabold leading-[1.05] text-white">
            Hitta din<br />
            <span className="text-primary">gäng.</span>
          </h1>
          <p className="mt-3 max-w-[16rem] text-[13px] leading-relaxed text-white/65">
            Träffa nya vänner baserat på era gemensamma intressen och personlighet — inte utseende. Alltid tryggt med BankID.
          </p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {['🎮 Intressen', '👥 Aktiviteter', '💬 Chatt', '🔒 BankID'].map((c) => (
              <span
                key={c}
                className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm"
              >
                {c}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Spacer — equal weight below headline */}
        <div className="flex-1" />

        {/* CTAs — always at bottom */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setBankIDMode('register')}
            className="w-full rounded-2xl bg-primary py-4 font-display text-base font-bold text-white shadow-lift"
          >
            Skapa konto med BankID
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setBankIDMode('login')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 py-4 font-display text-base font-bold text-white backdrop-blur"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#193E8F] text-[9px] font-extrabold text-white">
              ID
            </span>
            Logga in med BankID
          </motion.button>

          <p className="pt-0.5 text-center text-[11px] text-white/35">
            Kräver BankID · Endast för dig 13–25 år 🔒
          </p>
        </motion.div>
      </div>
    </div>
  )
}
