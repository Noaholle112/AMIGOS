import { useState } from 'react'
import { motion } from 'framer-motion'
import BankID from '../components/BankID'
import p1 from '../assets/profiles/p1.webp'
import p2 from '../assets/profiles/p2.webp'
import p3 from '../assets/profiles/p3.webp'
import p4 from '../assets/profiles/p4.webp'
import p5 from '../assets/profiles/p5.webp'

// Bundled friend photos — a collage that always loads (no external deps).
const HERO_PHOTOS = [p1, p3, p2, p4, p5, p1]

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
      {/* Background photo collage (bundled photos, always loads) */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0.5 opacity-40">
        {HERO_PHOTOS.map((src, i) => (
          <img key={i} src={src} alt="" className="h-full w-full object-cover" style={{ objectPosition: 'center 30%' }} />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/45 via-secondary/65 to-secondary" />

      {/* Content — compact, never overflows */}
      <div className="relative flex h-full flex-col px-7 pt-8 pb-6">

        {/* Logo */}
        <motion.div
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="flex items-center gap-1.5"
        >
          <span className="font-display text-[1.7rem] font-extrabold text-white">
            Amig<span className="text-primary">o</span>s
          </span>
          <span className="animate-float text-xl">🧡</span>
        </motion.div>

        {/* Headline block — vertically centered in the free space */}
        <div className="flex flex-1 flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="font-display text-[2rem] font-extrabold leading-[1.05] text-white"
          >
            Hitta din<br />
            <span className="text-primary">gäng.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2.5 max-w-[15rem] text-[13px] leading-snug text-white/65"
          >
            Träffa nya vänner baserat på gemensamma intressen och personlighet — inte utseende. Alltid tryggt med BankID.
          </motion.p>

          {/* Feature pills — single compact row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-3 flex flex-wrap gap-1.5"
          >
            {['🎮 Intressen', '👥 Aktiviteter', '🔒 BankID'].map((c) => (
              <span
                key={c}
                className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm"
              >
                {c}
              </span>
            ))}
          </motion.div>
        </div>

        {/* CTAs — pinned at bottom */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2.5"
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setBankIDMode('register')}
            className="w-full rounded-2xl bg-primary py-3.5 font-display text-[15px] font-bold text-white shadow-lift"
          >
            Skapa konto med BankID
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setBankIDMode('login')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 py-3.5 font-display text-[15px] font-bold text-white backdrop-blur"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#193E8F] text-[9px] font-extrabold text-white">
              ID
            </span>
            Logga in med BankID
          </motion.button>

          <p className="text-center text-[11px] text-white/35">
            Kräver BankID · Endast för dig 13–25 år 🔒
          </p>
        </motion.div>
      </div>
    </div>
  )
}
