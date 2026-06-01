import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ShieldCheck, Smartphone } from 'lucide-react'

export default function BankID({ mode, onSuccess, onBack }) {
  const [step, setStep] = useState('input') // input | waiting | done
  const [pnr, setPnr] = useState('')

  const isRegister = mode === 'register'

  const handleSubmit = () => {
    setStep('waiting')
    setTimeout(() => {
      setStep('done')
      setTimeout(onSuccess, 900)
    }, 2200)
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
        <button onClick={onBack} className="rounded-full p-1.5 text-secondary hover:bg-gray-100">
          <ChevronLeft size={22} />
        </button>
        <span className="text-sm font-semibold text-secondary/60">
          {isRegister ? 'Skapa konto' : 'Logga in'}
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <div className="mb-8 flex flex-col items-center">
                <BankIDLogo />
                <p className="mt-4 text-center text-[15px] text-secondary/70">
                  {isRegister
                    ? 'För att skapa ett Amigos-konto verifierar vi din identitet med BankID.'
                    : 'Logga in säkert med ditt BankID.'}
                </p>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-secondary/70">
                  Personnummer{' '}
                  <span className="font-normal text-secondary/40">(valfritt i demo)</span>
                </span>
                <input
                  value={pnr}
                  onChange={(e) => setPnr(e.target.value)}
                  placeholder="ÅÅMMDD-XXXX"
                  className="amg-input text-lg tracking-wider"
                  maxLength={13}
                  inputMode="numeric"
                />
              </label>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="mt-5 w-full rounded-2xl bg-[#193E8F] py-4 font-display text-lg font-bold text-white shadow-lg"
              >
                Öppna BankID-appen →
              </motion.button>

              <div className="mt-5 flex items-start gap-2 rounded-2xl bg-blue-50 p-4">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#193E8F]" />
                <p className="text-xs leading-relaxed text-secondary/60">
                  Amigos använder BankID för säker identifiering. Vi delar aldrig
                  ditt personnummer med andra användare.
                </p>
              </div>
            </motion.div>
          )}

          {step === 'waiting' && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <BankIDLogo />
              <div className="relative">
                <motion.div
                  className="h-20 w-20 rounded-full border-4 border-[#193E8F]/20"
                  style={{ borderTopColor: '#193E8F' }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
                <Smartphone
                  size={28}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#193E8F]"
                />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-secondary">
                  Väntar på BankID…
                </p>
                <p className="mt-1 text-sm text-secondary/55">
                  Öppna BankID-appen på din telefon och godkänn inloggningen.
                </p>
              </div>
            </motion.div>
          )}

          {step === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
              >
                <ShieldCheck size={40} className="text-green-600" />
              </motion.div>
              <div>
                <p className="font-display text-xl font-bold text-secondary">Verifierad! ✅</p>
                <p className="mt-1 text-sm text-secondary/55">Du loggas in…</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function BankIDLogo() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#193E8F]">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="4" y="6" width="20" height="16" rx="3" fill="white" opacity="0.15"/>
            <rect x="6" y="8" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
            <path d="M10 14h8M10 17h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="14" cy="11" r="2" fill="#FFD700"/>
          </svg>
        </div>
        <div>
          <p className="font-display text-2xl font-extrabold leading-none text-[#193E8F]">
            Bank<span className="text-[#FFD700]">ID</span>
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-secondary/40">
            Säker identifiering
          </p>
        </div>
      </div>
    </div>
  )
}
