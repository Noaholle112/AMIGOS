// Gradient avatar circle with an emoji centerpiece. Each color seed maps to a
// warm, on-brand gradient so users feel distinct without photos.
const GRADIENTS = {
  '🧡': 'linear-gradient(135deg, #FF6B35, #FFB088)',
  '💛': 'linear-gradient(135deg, #FFD700, #FFA62B)',
  '💚': 'linear-gradient(135deg, #34D399, #A7F3D0)',
  '💙': 'linear-gradient(135deg, #60A5FA, #C7D2FE)',
  '💜': 'linear-gradient(135deg, #A78BFA, #F0ABFC)',
}

export default function Avatar({ emoji = '🧡', size = 64 }) {
  return (
    <div
      className="flex items-center justify-center rounded-full shadow-card"
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
