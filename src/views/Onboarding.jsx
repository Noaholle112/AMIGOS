import { motion } from 'framer-motion'

export default function Onboarding({ onStart }) {
  return (
    <div className="flex h-full flex-col items-center justify-between bg-gradient-to-b from-cream via-cream to-primary/10 px-7 pb-8 pt-10">
      {/* Hero */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          className="mb-2 text-6xl"
        >
          <span className="inline-block animate-float">🧡</span>
        </motion.div>

        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 14 }}
          className="font-display text-6xl font-extrabold tracking-tight text-secondary"
        >
          Amig<span className="text-primary">o</span>s
        </motion.h1>

        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 font-display text-lg font-bold text-secondary/80"
        >
          Hitta din gäng. Lev ditt liv.
        </motion.p>

        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-4 max-w-[18rem] text-[15px] leading-relaxed text-secondary/60"
        >
          Träffa nya vänner baserat på era gemensamma intressen och personlighet —
          inte utseende. Här är alla välkomna. 🌍
        </motion.p>

        {/* Floating feature chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-7 flex flex-wrap justify-center gap-2"
        >
          {['🎮 Intressen', '👥 Aktiviteter', '💬 Chatt'].map((c) => (
            <span
              key={c}
              className="rounded-full border border-secondary/10 bg-white px-3 py-1.5 text-sm font-medium shadow-sm"
            >
              {c}
            </span>
          ))}
        </motion.div>
      </div>

      {/* CTAs */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="w-full space-y-3"
      >
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="w-full rounded-2xl bg-primary py-4 font-display text-lg font-bold text-white shadow-lift"
        >
          Skapa konto
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="w-full rounded-2xl border border-secondary/15 bg-white py-4 font-display text-lg font-bold text-secondary"
        >
          Logga in
        </motion.button>
        <p className="pt-1 text-center text-xs text-secondary/40">
          För dig mellan 13 och 25 år 🧡
        </p>
      </motion.div>
    </div>
  )
}
