import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PhoneFrame from './components/PhoneFrame'
import BottomNav from './components/BottomNav'
import Avatar from './components/Avatar'
import Onboarding from './views/Onboarding'
import CreateProfile from './views/CreateProfile'
import Discover from './views/Discover'
import Activities from './views/Activities'
import Chat from './views/Chat'
import Profile from './views/Profile'
import { mockActivities, mockMessages, mockUsers } from './data/mockData'

const STAGE = { ONBOARDING: 'onboarding', CREATE: 'create', APP: 'app' }

export default function App() {
  const [stage, setStage] = useState(STAGE.ONBOARDING)
  const [tab, setTab] = useState('discover')
  const [profile, setProfile] = useState(null)
  const [matches, setMatches] = useState([])
  const [messages, setMessages] = useState(mockMessages)
  const [activities, setActivities] = useState(mockActivities)
  const [joinedIds, setJoinedIds] = useState(new Set())
  const [readThreads, setReadThreads] = useState(new Set())

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

  const unread = useMemo(
    () => matches.filter((m) => !readThreads.has(m.id)).length,
    [matches, readThreads],
  )

  const joinedActivities = useMemo(
    () => activities.filter((a) => joinedIds.has(a.id)),
    [activities, joinedIds],
  )

  const renderTab = () => {
    switch (tab) {
      case 'home':
        return (
          <Home
            profile={profile}
            matches={matches}
            activities={activities}
            onNavigate={navigate}
          />
        )
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

// ---- Home / dashboard ------------------------------------------------
function Home({ profile, matches, activities, onNavigate }) {
  const first = profile?.name?.split(' ')[0] || 'amigo'
  const previewUsers = mockUsers.slice(0, 4)

  return (
    <div className="no-scrollbar h-full overflow-y-auto pb-24">
      {/* Header with blurred banner */}
      <div className="relative overflow-hidden px-5 pb-5 pt-4">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${previewUsers[0]?.photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
          }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary/55">Hej igen 👋</p>
            <h1 className="font-display text-3xl font-extrabold text-secondary">{first}!</h1>
          </div>
          <Avatar
            emoji={profile?.avatar}
            photo={profile?.photo}
            objectPosition={profile?.objectPosition}
            size={46}
          />
        </div>
      </div>

      <div className="px-5 space-y-5">
        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-36 overflow-hidden rounded-3xl shadow-lift"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
        >
          <span className="absolute -right-3 -top-5 text-[120px] leading-none opacity-20 select-none">🧡</span>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/45 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <p className="font-display text-xl font-bold leading-snug text-white">
              Hitta din gäng. 🧡
            </p>
            <p className="mt-1 text-sm text-white/75">Nya amigos väntar på dig.</p>
            <button
              onClick={() => onNavigate('discover')}
              className="mt-3 w-fit rounded-full bg-primary px-5 py-2 text-sm font-bold text-white"
            >
              Börja matcha →
            </button>
          </div>
        </motion.div>

        {/* Who's new — avatar row */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-secondary">Nya amigos nära dig</h2>
            <button
              onClick={() => onNavigate('discover')}
              className="text-xs font-semibold text-primary"
            >
              Se alla →
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {previewUsers.map((u, i) => (
              <motion.button
                key={u.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => onNavigate('discover')}
                className="flex shrink-0 flex-col items-center gap-1.5"
              >
                <div className="relative">
                  <Avatar photo={u.photo} objectPosition={u.objectPosition} emoji={u.avatar} size={58} />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400" />
                </div>
                <span className="text-xs font-semibold text-secondary/70">{u.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <QuickCard
            gradient="linear-gradient(135deg, #FF6B35, #FF9D6E)"
            emoji="🧭"
            title="Discover"
            subtitle="Hitta nya vänner"
            onClick={() => onNavigate('discover')}
          />
          <QuickCard
            gradient="linear-gradient(135deg, #9D5CF5, #7C3AED)"
            emoji="📅"
            title="Aktiviteter"
            subtitle="Häng tillsammans"
            onClick={() => onNavigate('activities')}
          />
          <QuickCard
            gradient="linear-gradient(135deg, #60A5FA, #3B6FE0)"
            emoji="💬"
            title="Chatt"
            subtitle={matches.length ? `${matches.length} amigos` : 'Säg hej'}
            onClick={() => onNavigate('chat')}
          />
          <QuickCard
            gradient="linear-gradient(135deg, #34D399, #10B981)"
            emoji="👤"
            title="Min profil"
            subtitle="Redigera dig"
            onClick={() => onNavigate('profile')}
          />
        </div>

        {/* Safety note */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#193E8F]/15 bg-[#193E8F]/5 p-4">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#193E8F] text-[11px] font-extrabold text-white">
            ID
          </span>
          <div>
            <p className="text-sm font-semibold text-secondary">Trygg med BankID</p>
            <p className="mt-0.5 text-xs text-secondary/60">
              Alla användare är verifierade med BankID — du vet alltid vem du pratar med.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickCard({ gradient, emoji, title, subtitle, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-3xl shadow-card"
      style={{ height: 110, background: gradient }}
    >
      <span className="absolute -bottom-3 -right-2 text-6xl opacity-25 select-none">{emoji}</span>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-3 text-left">
        <p className="font-display text-sm font-bold text-white">{title}</p>
        <p className="text-[11px] text-white/80">{subtitle}</p>
      </div>
    </motion.button>
  )
}
