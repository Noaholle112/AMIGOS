import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PhoneFrame from './components/PhoneFrame'
import BottomNav from './components/BottomNav'
import Onboarding from './views/Onboarding'
import CreateProfile from './views/CreateProfile'
import Discover from './views/Discover'
import Activities from './views/Activities'
import Chat from './views/Chat'
import Profile from './views/Profile'
import { mockActivities, mockMessages } from './data/mockData'

// Top-level app stages.
const STAGE = { ONBOARDING: 'onboarding', CREATE: 'create', APP: 'app' }

export default function App() {
  const [stage, setStage] = useState(STAGE.ONBOARDING)
  const [tab, setTab] = useState('discover')
  const [profile, setProfile] = useState(null)

  // Social state
  const [matches, setMatches] = useState([])
  const [messages, setMessages] = useState(mockMessages)
  const [activities, setActivities] = useState(mockActivities)
  const [joinedIds, setJoinedIds] = useState(new Set())
  const [readThreads, setReadThreads] = useState(new Set())

  // --- Handlers ---------------------------------------------------------
  const handleProfileComplete = (data) => {
    setProfile(data)
    setStage(STAGE.APP)
    setTab('discover')
  }

  const handleMatch = (user) => {
    setMatches((prev) => (prev.some((m) => m.id === user.id) ? prev : [...prev, user]))
  }

  const handleSend = (userId, text) => {
    const time = new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
    setMessages((prev) => {
      const thread = prev[userId] || []
      const nextId = (thread[thread.length - 1]?.id || 0) + 1
      return { ...prev, [userId]: [...thread, { id: nextId, from: 'me', text, time }] }
    })
  }

  const toggleJoin = (id) => {
    setJoinedIds((prev) => {
      const next = new Set(prev)
      const isJoining = !next.has(id)
      next.has(id) ? next.delete(id) : next.add(id)
      // Reflect participant count
      setActivities((acts) =>
        acts.map((a) =>
          a.id === id
            ? { ...a, participants: Math.max(0, a.participants + (isJoining ? 1 : -1)) }
            : a,
        ),
      )
      return next
    })
  }

  const createActivity = (data) => {
    const id = Math.max(0, ...activities.map((a) => a.id)) + 1
    setActivities((prev) => [{ id, ...data }, ...prev])
    setJoinedIds((prev) => new Set(prev).add(id))
  }

  const logout = () => {
    setProfile(null)
    setMatches([])
    setMessages(mockMessages)
    setActivities(mockActivities)
    setJoinedIds(new Set())
    setStage(STAGE.ONBOARDING)
  }

  const navigate = (key) => {
    setTab(key)
    if (key === 'chat') setReadThreads(new Set(matches.map((m) => m.id)))
  }

  // Unread = matches with messages not yet opened (simple heuristic).
  const unread = useMemo(
    () => matches.filter((m) => !readThreads.has(m.id)).length,
    [matches, readThreads],
  )

  const joinedActivities = useMemo(
    () => activities.filter((a) => joinedIds.has(a.id)),
    [activities, joinedIds],
  )

  // --- Render -----------------------------------------------------------
  const renderTab = () => {
    switch (tab) {
      case 'home':
        return <Home profile={profile} matches={matches} onNavigate={navigate} />
      case 'discover':
        return <Discover profile={profile} onMatch={handleMatch} />
      case 'activities':
        return (
          <Activities
            activities={activities}
            joinedIds={joinedIds}
            onToggleJoin={toggleJoin}
            onCreate={createActivity}
          />
        )
      case 'chat':
        return <Chat matches={matches} messages={messages} onSend={handleSend} />
      case 'profile':
        return (
          <Profile
            profile={profile}
            matches={matches}
            joinedActivities={joinedActivities}
            onUpdate={(patch) => setProfile((p) => ({ ...p, ...patch }))}
            onLogout={logout}
          />
        )
      default:
        return null
    }
  }

  return (
    <PhoneFrame>
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          {stage === STAGE.ONBOARDING && (
            <Screen key="onboarding">
              <Onboarding onStart={() => setStage(STAGE.CREATE)} />
            </Screen>
          )}

          {stage === STAGE.CREATE && (
            <Screen key="create">
              <CreateProfile onComplete={handleProfileComplete} />
            </Screen>
          )}

          {stage === STAGE.APP && (
            <Screen key="app">
              <div className="relative h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    {renderTab()}
                  </motion.div>
                </AnimatePresence>
                <BottomNav active={tab} onNavigate={navigate} unread={unread} />
              </div>
            </Screen>
          )}
        </AnimatePresence>
      </div>
    </PhoneFrame>
  )
}

// Fade/slide wrapper for full-screen stage transitions.
function Screen({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}

// --- Home / dashboard view --------------------------------------------
function Home({ profile, matches, onNavigate }) {
  const first = profile?.name?.split(' ')[0] || 'amigo'
  return (
    <div className="no-scrollbar h-full overflow-y-auto px-5 pb-24 pt-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary/55">Hej igen 👋</p>
          <h1 className="font-display text-3xl font-extrabold text-secondary">{first}!</h1>
        </div>
        <span className="text-4xl">{profile?.avatar || '🧡'}</span>
      </div>

      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-white shadow-lift"
      >
        <p className="font-display text-xl font-bold leading-snug">
          Hitta din gäng.
          <br />
          Lev ditt liv. 🧡
        </p>
        <p className="mt-2 max-w-[16rem] text-sm text-white/90">
          Nya amigos väntar på dig. Svep, matcha och hitta på saker ihop.
        </p>
        <button
          onClick={() => onNavigate('discover')}
          className="mt-4 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary"
        >
          Börja matcha →
        </button>
      </motion.div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <QuickCard
          emoji="🔍"
          title="Discover"
          subtitle="Hitta nya vänner"
          onClick={() => onNavigate('discover')}
        />
        <QuickCard
          emoji="📅"
          title="Aktiviteter"
          subtitle="Häng tillsammans"
          onClick={() => onNavigate('activities')}
        />
        <QuickCard
          emoji="💬"
          title="Chatt"
          subtitle={matches.length ? `${matches.length} amigos` : 'Säg hej'}
          onClick={() => onNavigate('chat')}
        />
        <QuickCard
          emoji="🙋"
          title="Min profil"
          subtitle="Redigera dig"
          onClick={() => onNavigate('profile')}
        />
      </div>

      {/* Tip */}
      <div className="mt-6 rounded-2xl border border-accent/40 bg-accent/15 p-4">
        <p className="text-sm font-semibold text-secondary">💡 Visste du?</p>
        <p className="mt-1 text-sm text-secondary/70">
          På Amigos matchar vi på intressen och personlighet — aldrig utseende. Ingen ska
          behöva känna sig ensam.
        </p>
      </div>
    </div>
  )
}

function QuickCard({ emoji, title, subtitle, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      className="flex flex-col items-start gap-1 rounded-3xl bg-white p-4 text-left shadow-card"
    >
      <span className="text-3xl">{emoji}</span>
      <span className="font-display text-base font-bold text-secondary">{title}</span>
      <span className="text-xs text-secondary/55">{subtitle}</span>
    </motion.button>
  )
}
