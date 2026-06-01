import { Home, Compass, CalendarDays, MessageCircle, User } from 'lucide-react'
import { motion } from 'framer-motion'

const ITEMS = [
  { key: 'home', label: 'Hem', Icon: Home },
  { key: 'discover', label: 'Discover', Icon: Compass },
  { key: 'activities', label: 'Aktiviteter', Icon: CalendarDays },
  { key: 'chat', label: 'Chatt', Icon: MessageCircle },
  { key: 'profile', label: 'Profil', Icon: User },
]

export default function BottomNav({ active, onNavigate, unread = 0 }) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-20 border-t border-secondary/10 bg-white/90 px-2 pb-2 pt-1.5 backdrop-blur-md">
      <ul className="flex items-stretch justify-between">
        {ITEMS.map(({ key, label, Icon }) => {
          const isActive = active === key
          return (
            <li key={key} className="flex-1">
              <button
                onClick={() => onNavigate(key)}
                className="relative flex w-full flex-col items-center gap-0.5 rounded-2xl py-1.5"
                aria-label={label}
              >
                <span className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.6 : 2}
                    className={isActive ? 'text-primary' : 'text-secondary/45'}
                  />
                  {key === 'chat' && unread > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                      {unread}
                    </span>
                  )}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    isActive ? 'text-primary' : 'text-secondary/45'
                  }`}
                >
                  {label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-primary"
                  />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
