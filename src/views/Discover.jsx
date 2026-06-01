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
  const [sortBy, setSortBy] = useState('shared')
  const [lastAction, setLastAction] = useState(null)
  const [matchFlash, setMatchFlash] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), SKELETON_DELAY)
    return () => clearTimeout(t)
  }, [])

  const sharedInterests = useMemo(() => new Set(profile?.interests || []), [profile])
  const cities = useMemo(() => ['Alla', ...new Set(mockUsers.map((u) => u.city))], [])

  const deck = useMemo(() => {
    let list = mockUsers.filter((u) => cityFilter === 'Alla' || u.city === cityFilter)
    const sharedCount = (u) => u.interests.filter((i) => sharedInterests.has(i)).length
    return [...list].sort((a, b) => {
      if (sortBy === 'age') return a.age - b.age
      if (sortBy === 'name') return a.name.localeCompare(b.name, 'sv')
      return sharedCount(b) - sharedCount(a)
    })
  }, [cityFilter, sortBy, sharedInterests])

  useEffect(() => { setIndex(0) }, [cityFilter, sortBy])

  const current = deck[index]
  const next = deck[index + 1]

  const handle = (action) => {
    if (!current) return
    if (action === 'match') {
      onMatch(current)
      setMatchFlash(true)
      setTimeout(() => setMatchFlash(false), 700)
    }
    setLastAction(action)
    setIndex((i) => i + 1)
  }

  const restart = () => { setIndex(0); setLastAction(null) }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <div>
          <h1 className="font-display text-2xl font-bold text-secondary">Discover</h1>
          <p className="text-xs text-secondary/45">
            {deck.length - index > 0 ? `${deck.length - index} kvar att utforska` : 'Alla sedda!'}
          </p>
        </div>
        <button
          onClick={() => setShowFilter((v) => !v)}
          className={`rounded-2xl px-3 py-2 text-sm font-semibold transition-colors flex items-center gap-1.5 ${
            showFilter ? 'bg-primary text-white' : 'bg-white text-secondary shadow-sm'
          }`}
        >
          <SlidersHorizontal size={16} /> Filter
        </button>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-5"
          >
            <div className="mb-2 space-y-3 rounded-2xl bg-white p-4 shadow-card">
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-secondary/40">Stad</p>
                <div className="flex flex-wrap gap-1.5">
                  {cities.map((c) => (
                    <Chip key={c} active={cityFilter === c} onClick={() => setCityFilter(c)}>{c}</Chip>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-secondary/40">Sortera</p>
                <div className="flex flex-wrap gap-1.5">
                  {[['shared','⭐ Gemensamt'],['age','🎂 Ålder'],['name','🔤 Namn']].map(([key, label]) => (
                    <Chip key={key} active={sortBy === key} onClick={() => setSortBy(key)}>{label}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card stack — fills remaining height */}
      <div className="relative mx-5 flex-1 mb-2">
        {/* Peek card behind (next in deck) */}
        {!loading && next && (
          <div className="absolute inset-x-3 inset-y-2 overflow-hidden rounded-3xl opacity-40 scale-[0.96] origin-bottom">
            <div className="h-full w-full bg-secondary/10 rounded-3xl" />
          </div>
        )}

        {loading ? (
          <SkeletonCard />
        ) : current ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{
                x: lastAction === 'match' ? 380 : -380,
                rotate: lastAction === 'match' ? 20 : -20,
                opacity: 0,
                transition: { duration: 0.35 }
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            >
              <UserCard user={current} sharedInterests={sharedInterests} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <EmptyDeck onRestart={restart} />
        )}

        {/* Match flash overlay */}
        <AnimatePresence>
          {matchFlash && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="absolute inset-0 flex items-center justify-center rounded-3xl bg-primary/10 pointer-events-none z-10"
            >
              <span className="text-6xl drop-shadow-lg">🧡</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      {!loading && current && (
        <div className="flex items-center justify-center gap-6 pb-[88px] pt-0.5">
          <motion.button
            whileTap={{ scale: 0.82, rotate: -8 }}
            onClick={() => handle('skip')}
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-secondary/60 shadow-card border border-secondary/8"
            aria-label="Hoppa över"
          >
            <X size={24} strokeWidth={2.5} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.82, rotate: 8 }}
            onClick={() => handle('match')}
            className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-primary text-white shadow-lift"
            aria-label="Skicka vänförfrågan"
          >
            <Heart size={26} strokeWidth={2.5} fill="currentColor" />
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
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        active ? 'bg-primary text-white' : 'bg-cream text-secondary/65'
      }`}
    >
      {children}
    </button>
  )
}

function SkeletonCard() {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[30px] bg-white shadow-card">
      <div className="skeleton h-[58%] w-full" />
      <div className="space-y-2 p-5">
        <div className="skeleton h-8 w-40 rounded-xl" />
        <div className="skeleton h-4 w-28 rounded-full" />
        <div className="skeleton mt-3 h-4 w-full rounded-full" />
        <div className="mt-2 flex gap-2">
          {[80, 100, 70].map((w, i) => (
            <div key={i} className="skeleton h-7 rounded-full" style={{ width: w }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function EmptyDeck({ onRestart }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center shadow-card">
      <span className="mb-4 text-7xl">🎉</span>
      <h3 className="font-display text-2xl font-bold text-secondary">Du har sett alla!</h3>
      <p className="mt-2 max-w-[14rem] text-sm text-secondary/55">
        Kolla dina nya vänner i chatten, eller bläddra igen.
      </p>
      <button
        onClick={onRestart}
        className="mt-6 flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-bold text-white shadow-lift"
      >
        <RotateCcw size={18} /> Börja om
      </button>
    </div>
  )
}
