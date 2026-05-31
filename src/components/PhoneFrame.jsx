// Simulated phone frame — wraps the whole app so it feels like a real device
// on desktop. Tall, narrow aspect ratio (~9:19.5) like a modern smartphone.
// Height-driven so it stays phone-shaped while filling the viewport height.
export default function PhoneFrame({ children }) {
  return (
    <div
      className="relative"
      style={{
        height: 'min(92vh, 900px)',
        aspectRatio: '9 / 19.5',
      }}
    >
      <div className="relative h-full rounded-[48px] bg-secondary p-2.5 shadow-phone">
        {/* Screen */}
        <div className="relative h-full overflow-hidden rounded-[40px] bg-cream">
          {/* Notch / status bar */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex h-9 items-center justify-between px-7 text-xs font-semibold text-secondary">
            <span>9:41</span>
            <div className="absolute left-1/2 top-2 h-6 w-28 -translate-x-1/2 rounded-full bg-secondary" />
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
