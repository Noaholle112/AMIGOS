import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal, X, Heart, RotateCcw } from 'lucide-react'
import UserCard from '../components/UserCard'
import { mockUsers } from '../data/mockData'

const SKELETON_DELAY = 1500

export default function Discover({ profile, onMatch }) {
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [showFilter, setShowFilter] = useState(false)
  const [cityFilter, setCityFilter] = useState('Alla')
  const [sortBy, setSortBy] = useState('shared') // shared | age | name
  const [lastAction, setLastAction] = useState(null) // 'skip' | 'match'

  // Simulate a network fetch with a loading skeleton.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), SKELETON_DELAY)
    return () => clearTimeout(t)
  }, [])

  const sharedInterests = useMemo(
    () => new Set(profile?.interests || []),
    [profile],
  )

  const cities = useMemo(
    () => ['Alla', ...new Set(mockUsers.map((u) => u.city))],
    [],
  )

  const deck = useMemo(() => {
    let list = mockUsers.filter((u) => cityFilter === 'Alla' || u.city === cityFilter)
    const sharedCount = (u) => u.interests.filter((i) => sharedInterests.has(i)).length
    list = [...list].sort((a, b) => {
      if (sortBy === 'age') return a.age - b.age
      if (sortBy === 'name') return a.name.localeCompare(b.name, 'sv')
      return sharedCount(b) - sharedCount(a)
    })
    return list
  }, [cityFilter, sortBy, sharedInterests])

  // Reset to top of deck whenever the filter/sort changes.
  useEffect(() => {
    setIndex(0)
  }, [cityFilter, sortBy])

  const current = deck[index]

  const handle = (action) => {
    if (!current) return
    if (action === 'match') onMatch(current)
    setLastAction(action)
    setIndex((i) => i + 1)
  }

  const restart = () => {
    setIndex(0)
    setLastAction(null)
  }

  return (
    <div className="flex h-full flex-col px-5 pb-24 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-secondary">Discover</h1>
          <p className="text-sm text-secondary/55">Hitta din nästa amigo 🧡</p>
        </div>
        <button
          onClick={() => setShowFilter((v) => !v)}
          className={`rounded-2xl p-2.5 transition-colors ${
            showFilter ? 'bg-primary text-white' : 'bg-white text-secondary shadow-sm'
          }`}
          aria-label="Filter"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-3 rounded-2xl bg-white p-4 shadow-card">
              <div>
                <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-secondary/45">
                  Stad
                </p>
                <div className="flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <Chip key={c} active={cityFilter === c} onClick={() => setCityFilter(c)}>
                      {c}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-secondary/45">
                  Sortera
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    ['shared', '⭐ Gemensamt'],
                    ['age', '🎂 Ålder'],
                    ['name', '🔤 Namn'],
                  ].map(([key, label]) => (
                    <Chip key={key} active={sortBy === key} onClick={() => setSortBy(key)}>
                      {label}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card stack */}
      <div className="relative mt-4 flex-1">
        {loading ? (
          <SkeletonCard />
        ) : current ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={{ scale: 0.9, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{
                x: lastAction === 'match' ? 320 : -320,
                rotate: lastAction === 'match' ? 18 : -18,
                opacity: 0,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <UserCard user={current} sharedInterests={sharedInterests} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <EmptyDeck onRestart={restart} />
        )}
      </div>

      {/* Action buttons */}
      {!loading && current && (
        <div className="mt-4 flex items-center justify-center gap-6">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => handle('skip')}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-secondary/70 shadow-card"
            aria-label="Hoppa över"
          >
            <X size={30} strokeWidth={2.6} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => handle('match')}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-lift"
            aria-label="Skicka vänförfrågan"
          >
            <Heart size={36} strokeWidth={2.6} fill="currentColor" />
          </motion.button>
        </div>
      )}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? 'bg-primary text-white' : 'bg-cream text-secondary/70'
      }`}
    >
      {children}
    </button>
  )
}

function SkeletonCard() {
  return (
    <div className="absolute inset-0 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card">
      <div className="skeleton mx-auto h-24 w-24 rounded-full" />
      <div className="skeleton mx-auto h-6 w-40 rounded-full" />
      <div className="skeleton mx-auto h-4 w-24 rounded-full" />
      <div className="skeleton mt-3 h-4 w-full rounded-full" />
      <div className="skeleton h-4 w-3/4 rounded-full" />
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {[20, 24, 16].map((w, i) => (
          <div key={i} className="skeleton h-8 rounded-full" style={{ width: `${w * 4}px` }} />
        ))}
      </div>
    </div>
  )
}

function EmptyDeck({ onRestart }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-card">
      <span className="mb-3 text-6xl">🎉</span>
      <h3 className="font-display text-xl font-bold text-secondary">Du har sett alla!</h3>
      <p className="mt-1 max-w-[15rem] text-sm text-secondary/55">
        Kolla in dina nya vänner i chatten, eller bläddra igen.
      </p>
      <button
        onClick={onRestart}
        className="mt-5 flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-bold text-white shadow-lift"
      >
        <RotateCcw size={18} /> Börja om
      </button>
    </div>
  )
}
