import { useState } from 'react'

// Avatar supports a real photo (with a generated fallback) or an emoji gradient.
const GRADIENTS = {
  '🧡': 'linear-gradient(135deg, #FF6B35, #FFB088)',
  '💛': 'linear-gradient(135deg, #FFD700, #FFA62B)',
  '💚': 'linear-gradient(135deg, #34D399, #A7F3D0)',
  '💙': 'linear-gradient(135deg, #60A5FA, #C7D2FE)',
  '💜': 'linear-gradient(135deg, #A78BFA, #F0ABFC)',
}

export default function Avatar({ emoji = '🧡', photo, photoFallback, size = 64, className = '' }) {
  const [src, setSrc] = useState(photo)

  if (photo) {
    return (
      <div
        className={`shrink-0 overflow-hidden rounded-full bg-cream shadow-card ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => photoFallback && src !== photoFallback && setSrc(photoFallback)}
          className="h-full w-full object-cover"
        />
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
