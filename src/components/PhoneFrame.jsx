// Simulated phone frame — wraps the whole app so it feels like a real
// device on desktop (rounded bezel, shadow, notch). Mobile-first: the inner
// screen is capped at ~430px wide.
export default function PhoneFrame({ children }) {
  return (
    <div className="relative w-full max-w-[430px]">
      <div className="relative rounded-[44px] bg-secondary p-3 shadow-phone">
        {/* Screen */}
        <div className="relative h-[860px] max-h-[88vh] overflow-hidden rounded-[34px] bg-cream">
          {/* Notch / status bar */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex h-9 items-center justify-between px-7 text-xs font-semibold text-secondary">
            <span>9:41</span>
            <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-secondary" />
            <span className="flex items-center gap-1">
              <span>📶</span>
              <span>🔋</span>
            </span>
          </div>

          {/* App content */}
          <div className="h-full pt-9">{children}</div>
        </div>
      </div>
    </div>
  )
}
