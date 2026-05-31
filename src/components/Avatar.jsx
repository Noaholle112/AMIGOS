// Avatar supports both a real photo URL and an emoji fallback gradient.
const GRADIENTS = {
  '🧡': 'linear-gradient(135deg, #FF6B35, #FFB088)',
  '💛': 'linear-gradient(135deg, #FFD700, #FFA62B)',
  '💚': 'linear-gradient(135deg, #34D399, #A7F3D0)',
  '💙': 'linear-gradient(135deg, #60A5FA, #C7D2FE)',
  '💜': 'linear-gradient(135deg, #A78BFA, #F0ABFC)',
}

export default function Avatar({ emoji = '🧡', photo, size = 64, className = '' }) {
  if (photo) {
    return (
      <div
        className={`shrink-0 overflow-hidden rounded-full shadow-card ${className}`}
        style={{ width: size, height: size }}
      >
        <img src={photo} alt="" className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full shadow-card ${className}`}
      style={{
        width: size,
        height: size,
        background: GRADIENTS[emoji] || GRADIENTS['🧡'],
        fontSize: size * 0.5,
      }}
    >
      <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>{emoji}</span>
    </div>
  )
}
