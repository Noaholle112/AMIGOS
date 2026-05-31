import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { INTERESTS, PERSONALITY_QUESTIONS } from '../data/mockData'
import TagBadge from '../components/TagBadge'

const AVATARS = ['🧡', '💛', '💚', '💙', '💜']
const MIN_INTERESTS = 3
const MAX_INTERESTS = 10

export default function CreateProfile({ onComplete }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('🧡')
  const [interests, setInterests] = useState([])
  const [answers, setAnswers] = useState({})

  const toggleInterest = (tag) => {
    setInterests((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag)
      if (prev.length >= MAX_INTERESTS) return prev
      return [...prev, tag]
    })
  }

  const step1Valid = name.trim() && age && city.trim()
  const step2Valid = interests.length >= MIN_INTERESTS
  const step3Valid = Object.keys(answers).length === PERSONALITY_QUESTIONS.length

  const canContinue = [step1Valid, step2Valid, step3Valid][step]
  const progress = ((step + 1) / 3) * 100

  const next = () => {
    if (step < 2) {
      setStep((s) => s + 1)
    } else {
      onComplete({
        name: name.trim(),
        age: Number(age),
        city: city.trim(),
        bio: bio.trim() || 'Ny här på Amigos! 🧡',
        avatar,
        interests,
        personality: answers,
      })
    }
  }

  const back = () => step > 0 && setStep((s) => s - 1)

  return (
    <div className="flex h-full flex-col bg-cream px-6 pb-6 pt-3">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={back}
          disabled={step === 0}
          className={`rounded-full p-1.5 ${step === 0 ? 'opacity-0' : 'text-secondary'}`}
          aria-label="Tillbaka"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary/10">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          />
        </div>
        <span className="text-xs font-bold text-secondary/50">{step + 1}/3</span>
      </div>

      <div className="no-scrollbar mt-5 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 0 && (
            <motion.div
              key="s1"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-2xl font-bold text-secondary">Vem är du?</h2>
              <p className="mt-1 text-sm text-secondary/55">Berätta lite om dig själv.</p>

              <div className="mt-5 space-y-4">
                <Field label="Namn">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="t.ex. Alex"
                    className="amg-input"
                  />
                </Field>
                <div className="flex gap-3">
                  <Field label="Ålder" className="w-1/3">
                    <input
                      type="number"
                      min="13"
                      max="25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="18"
                      className="amg-input"
                    />
                  </Field>
                  <Field label="Stad" className="flex-1">
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="t.ex. Göteborg"
                      className="amg-input"
                    />
                  </Field>
                </div>
                <Field label={`Kort bio (${bio.length}/150)`}>
                  <textarea
                    value={bio}
                    maxLength={150}
                    rows={3}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Vad gillar du att göra? 🎉"
                    className="amg-input resize-none"
                  />
                </Field>

                <div>
                  <p className="mb-2 text-sm font-semibold text-secondary/70">Välj din avatar</p>
                  <div className="flex gap-3">
                    {AVATARS.map((a) => (
                      <button
                        key={a}
                        onClick={() => setAvatar(a)}
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all ${
                          avatar === a
                            ? 'scale-110 bg-primary/15 ring-2 ring-primary'
                            : 'bg-white'
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <motion.div
              key="s2"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-2xl font-bold text-secondary">Dina intressen</h2>
              <p className="mt-1 text-sm text-secondary/55">
                Välj minst {MIN_INTERESTS}, max {MAX_INTERESTS}.{' '}
                <span className="font-bold text-primary">{interests.length} valda</span>
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {INTERESTS.map((tag) => (
                  <TagBadge
                    key={tag}
                    label={tag}
                    selected={interests.includes(tag)}
                    onClick={() => toggleInterest(tag)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <motion.div
              key="s3"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-2xl font-bold text-secondary">Din personlighet</h2>
              <p className="mt-1 text-sm text-secondary/55">Inga rätt eller fel — bara du.</p>

              <div className="mt-5 space-y-5">
                {PERSONALITY_QUESTIONS.map((q) => (
                  <div key={q.id}>
                    <p className="mb-2 font-semibold text-secondary">{q.question}</p>
                    <div className="flex gap-2">
                      {q.options.map((opt) => {
                        const active = answers[q.id] === opt.label
                        return (
                          <motion.button
                            key={opt.label}
                            whileTap={{ scale: 0.93 }}
                            onClick={() =>
                              setAnswers((prev) => ({ ...prev, [q.id]: opt.label }))
                            }
                            className={`flex flex-1 flex-col items-center gap-1 rounded-2xl border py-3 transition-colors ${
                              active
                                ? 'border-primary bg-primary/10'
                                : 'border-secondary/10 bg-white'
                            }`}
                          >
                            <span className="text-2xl">{opt.emoji}</span>
                            <span className="text-xs font-medium text-secondary/70">
                              {opt.label}
                            </span>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue */}
      <motion.button
        whileTap={canContinue ? { scale: 0.96 } : undefined}
        onClick={canContinue ? next : undefined}
        disabled={!canContinue}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-display text-lg font-bold transition-colors ${
          canContinue
            ? 'bg-primary text-white shadow-lift'
            : 'cursor-not-allowed bg-secondary/15 text-secondary/40'
        }`}
      >
        {step < 2 ? (
          <>
            Fortsätt <ArrowRight size={20} />
          </>
        ) : (
          <>
            Klart! <Check size={20} />
          </>
        )}
      </motion.button>
    </div>
  )
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-secondary/70">{label}</span>
      {children}
    </label>
  )
}
