import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import ActivityCard from '../components/ActivityCard'
import { CATEGORY_STYLES } from '../data/mockData'

const CATEGORIES = Object.keys(CATEGORY_STYLES)

export default function Activities({ activities, joinedIds, onToggleJoin, onCreate }) {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('Sport')
  const [max, setMax] = useState(8)

  const valid = title.trim() && date.trim() && location.trim()

  const submit = () => {
    if (!valid) return
    onCreate({
      title: title.trim(),
      date: date.trim(),
      location: location.trim(),
      category,
      max: Number(max) || 8,
      participants: 1,
    })
    setTitle('')
    setDate('')
    setLocation('')
    setCategory('Sport')
    setMax(8)
    setShowForm(false)
  }

  return (
    <div className="flex h-full flex-col px-5 pb-24 pt-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-secondary">Aktiviteter</h1>
          <p className="text-sm text-secondary/55">Hitta på något tillsammans 📅</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-lift"
        >
          <Plus size={18} /> Ny
        </motion.button>
      </div>

      <div className="no-scrollbar mt-4 flex-1 space-y-4 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <span className="text-6xl">🗓️</span>
            <p className="mt-3 font-display text-lg font-bold text-secondary">Inga aktiviteter än</p>
            <p className="mt-1 text-sm text-secondary/55">Skapa den första — bjud in din gäng!</p>
          </div>
        ) : (
          activities.map((a) => (
            <ActivityCard
              key={a.id}
              activity={a}
              joined={joinedIds.has(a.id)}
              onToggle={onToggleJoin}
            />
          ))
        )}
      </div>

      {/* Create modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-end bg-secondary/40 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full rounded-t-3xl bg-cream p-6 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-secondary">Ny aktivitet</h2>
                <button onClick={() => setShowForm(false)} className="text-secondary/50">
                  <X size={22} />
                </button>
              </div>

              <div className="space-y-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Vad ska ni göra? t.ex. Spela padel"
                  className="amg-input"
                />
                <div className="flex gap-3">
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="När? t.ex. Lördag 14 juni"
                    className="amg-input flex-1"
                  />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Var?"
                    className="amg-input w-1/3"
                  />
                </div>

                <div>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-secondary/45">
                    Kategori
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                          category === c ? 'bg-primary text-white' : 'bg-white text-secondary/70'
                        }`}
                      >
                        {CATEGORY_STYLES[c].emoji} {c}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                  <span className="text-sm font-semibold text-secondary/70">Max deltagare</span>
                  <input
                    type="number"
                    min="2"
                    max="50"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    className="w-16 rounded-lg border border-secondary/10 px-2 py-1 text-center outline-none focus:border-primary"
                  />
                </label>

                <motion.button
                  whileTap={valid ? { scale: 0.96 } : undefined}
                  onClick={submit}
                  disabled={!valid}
                  className={`w-full rounded-2xl py-3.5 font-display text-lg font-bold transition-colors ${
                    valid
                      ? 'bg-primary text-white shadow-lift'
                      : 'cursor-not-allowed bg-secondary/15 text-secondary/40'
                  }`}
                >
                  Skapa aktivitet
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
