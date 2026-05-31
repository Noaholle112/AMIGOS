import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Send } from 'lucide-react'
import Avatar from '../components/Avatar'

export default function Chat({ matches, messages, onSend }) {
  const [activeId, setActiveId] = useState(null)
  const active = matches.find((m) => m.id === activeId)

  if (active) {
    return (
      <ChatThread
        user={active}
        messages={messages[active.id] || []}
        onBack={() => setActiveId(null)}
        onSend={(text) => onSend(active.id, text)}
      />
    )
  }

  return (
    <div className="flex h-full flex-col px-5 pb-24 pt-2">
      <div className="mb-2">
        <h1 className="font-display text-2xl font-bold text-secondary">Chatt</h1>
        <p className="text-sm text-secondary/55">Dina amigos 💬</p>
      </div>

      {matches.length === 0 ? (
        <div className="mt-20 flex flex-col items-center text-center">
          <span className="text-6xl">💌</span>
          <p className="mt-3 font-display text-lg font-bold text-secondary">Inga matchningar än</p>
          <p className="mt-1 max-w-[16rem] text-sm text-secondary/55">
            Gå till Discover och skicka en vänförfrågan för att börja chatta!
          </p>
        </div>
      ) : (
        <div className="no-scrollbar flex-1 space-y-2 overflow-y-auto">
          {matches.map((m) => {
            const thread = messages[m.id] || []
            const last = thread[thread.length - 1]
            return (
              <motion.button
                key={m.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveId(m.id)}
                className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm"
              >
                <Avatar emoji={m.avatar} size={52} />
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-secondary">{m.name}</p>
                  <p className="truncate text-sm text-secondary/55">
                    {last ? (last.from === 'me' ? 'Du: ' : '') + last.text : 'Säg hej! 👋'}
                  </p>
                </div>
                {last && <span className="text-xs text-secondary/40">{last.time}</span>}
              </motion.button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ChatThread({ user, messages, onBack, onSend }) {
  const [text, setText] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const submit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-secondary/10 bg-white px-4 py-3">
        <button onClick={onBack} className="text-secondary" aria-label="Tillbaka">
          <ArrowLeft size={22} />
        </button>
        <Avatar emoji={user.avatar} size={40} />
        <div>
          <p className="font-display font-bold leading-tight text-secondary">{user.name}</p>
          <p className="text-xs text-green-500">● Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="no-scrollbar flex-1 space-y-2 overflow-y-auto px-4 py-4">
        <div className="mb-3 text-center">
          <span className="rounded-full bg-secondary/5 px-3 py-1 text-xs text-secondary/45">
            Ni är nu amigos 🧡 Säg hej!
          </span>
        </div>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-[15px] ${
                  msg.from === 'me'
                    ? 'rounded-br-md bg-primary text-white'
                    : 'rounded-bl-md bg-white text-secondary shadow-sm'
                }`}
              >
                {msg.text}
                <span
                  className={`ml-2 align-bottom text-[10px] ${
                    msg.from === 'me' ? 'text-white/70' : 'text-secondary/40'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Composer */}
      <form
        onSubmit={submit}
        className="flex items-center gap-2 border-t border-secondary/10 bg-white px-3 py-3"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Skriv ett meddelande…"
          className="flex-1 rounded-full bg-cream px-4 py-2.5 text-secondary outline-none placeholder:text-secondary/35"
        />
        <motion.button
          whileTap={{ scale: 0.88 }}
          type="submit"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lift"
          aria-label="Skicka"
        >
          <Send size={18} />
        </motion.button>
      </form>
    </div>
  )
}
