// All data is simulated in the frontend — no backend required.

// Profile avatars — high-quality generated illustrations (DiceBear "adventurer").
// Vector SVG = infinitely crisp at any size, reads as young, and is ethical
// (no real minors). Seeded per person so each one is unique & consistent.
const PASTELS = 'b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf,ffe0b3,c8f7c5'
const face = (seed) =>
  `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}` +
  `&backgroundColor=${PASTELS}&radius=0&scale=110`

export const INTERESTS = [
  '🎮 Gaming', '🎵 Musik', '⚽ Fotboll', '🎨 Konst', '🏋️ Träning',
  '📚 Böcker', '🍕 Mat', '🎬 Film', '🎤 Rap/HipHop', '🌍 Resor',
  '💻 Tech', '🧩 Brädspel', '🎭 Teater', '🐾 Djur', '📷 Foto',
  '🎾 Padel', '💃 Dans', '☕ Fika', '🛹 Skate', '🌱 Natur',
]

export const PERSONALITY_QUESTIONS = [
  {
    id: 'hang',
    question: 'Hur gillar du att umgås?',
    options: [
      { emoji: '🏠', label: 'Hemma' },
      { emoji: '🌆', label: 'Ute' },
      { emoji: '🎭', label: 'Varierat' },
    ],
  },
  {
    id: 'energy',
    question: 'När laddar du batterierna?',
    options: [
      { emoji: '🌙', label: 'Lugna kvällar' },
      { emoji: '☀️', label: 'Fullt ös' },
      { emoji: '⚖️', label: 'Lite av varje' },
    ],
  },
  {
    id: 'plan',
    question: 'Planerare eller spontan?',
    options: [
      { emoji: '🗓️', label: 'Planerare' },
      { emoji: '🎲', label: 'Spontan' },
      { emoji: '🤝', label: 'Mittemellan' },
    ],
  },
  {
    id: 'vibe',
    question: 'Vilken vibe söker du?',
    options: [
      { emoji: '😂', label: 'Skratt' },
      { emoji: '💬', label: 'Djupa samtal' },
      { emoji: '🚀', label: 'Äventyr' },
    ],
  },
]

export const mockUsers = [
  {
    id: 1,
    name: 'Sofia',
    age: 19,
    city: 'Göteborg',
    bio: 'Gillar padel och true crime-poddar 🎙️',
    interests: ['🎾 Padel', '🎵 Musik', '📚 Böcker'],
    avatar: '🧡',
    photo: face('Sofia-amg'),
  },
  {
    id: 2,
    name: 'Marcus',
    age: 22,
    city: 'Stockholm',
    bio: 'Gameran som också älskar att laga mat 🍝',
    interests: ['🎮 Gaming', '🍕 Mat', '💻 Tech'],
    avatar: '💛',
    photo: face('Marcus-amg'),
  },
  {
    id: 3,
    name: 'Aisha',
    age: 17,
    city: 'Malmö',
    bio: 'Dans är mitt liv. Letar efter träningspartner!',
    interests: ['💃 Dans', '🏋️ Träning', '🎵 Musik'],
    avatar: '💚',
    photo: face('Aisha-amg'),
  },
  {
    id: 4,
    name: 'Leo',
    age: 20,
    city: 'Göteborg',
    bio: 'Fotboll, resor och för mycket kaffe ☕',
    interests: ['⚽ Fotboll', '🌍 Resor', '🎬 Film'],
    avatar: '💙',
    photo: face('Leo-amg'),
  },
  {
    id: 5,
    name: 'Nora',
    age: 23,
    city: 'Stockholm',
    bio: 'Konst, foto och loppisfynd. Alltid sugen på fika.',
    interests: ['🎨 Konst', '📷 Foto', '☕ Fika'],
    avatar: '💜',
    photo: face('Nora-amg'),
  },
  {
    id: 6,
    name: 'Ludwig',
    age: 21,
    city: 'Göteborg',
    bio: 'Brädspelsnörd & värd för episka LAN-partyn 🎲',
    interests: ['🧩 Brädspel', '🎮 Gaming', '🍕 Mat'],
    avatar: '🧡',
    photo: face('Ludwig-amg'),
  },
  {
    id: 7,
    name: 'Amira',
    age: 18,
    city: 'Malmö',
    bio: 'Skejtar, fotar och letar nya ställen att utforska 🛹',
    interests: ['🛹 Skate', '📷 Foto', '🌍 Resor'],
    avatar: '💚',
    photo: face('Amira-amg'),
  },
  {
    id: 8,
    name: 'Erik',
    age: 24,
    city: 'Stockholm',
    bio: 'Bokmal med svaghet för teater och långa promenader.',
    interests: ['📚 Böcker', '🎭 Teater', '🌱 Natur'],
    avatar: '💙',
    photo: face('Erik-amg'),
  },
]

// Unsplash activity cover images (stable, free).
export const mockActivities = [
  {
    id: 1,
    title: 'Spela padel',
    date: 'Lördag 14 juni',
    location: 'Göteborg',
    participants: 3,
    max: 4,
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=180&fit=crop',
  },
  {
    id: 2,
    title: 'LAN-party hemma hos Ludwig',
    date: 'Fredag 20 juni',
    location: 'Online',
    participants: 7,
    max: 10,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=180&fit=crop',
  },
  {
    id: 3,
    title: 'Strandpromenad + fika',
    date: 'Söndag 15 juni',
    location: 'Malmö',
    participants: 2,
    max: 8,
    category: 'Social',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=180&fit=crop',
  },
  {
    id: 4,
    title: 'Bokklubben — månadens bok',
    date: 'Måndag 16 juni',
    location: 'Stockholm',
    participants: 5,
    max: 6,
    category: 'Kultur',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=180&fit=crop',
  },
]

export const mockMessages = {
  1: [
    { id: 1, from: 'them', text: 'Hej! Sååå kul att vi matchade 🧡', time: '14:02' },
    { id: 2, from: 'me', text: 'Haha ja! Du spelar väl padel?', time: '14:05' },
    { id: 3, from: 'them', text: 'Japp! Vi borde boka en bana 🎾', time: '14:06' },
  ],
  4: [
    { id: 1, from: 'them', text: 'Yo! Sett att du också gillar resor 🌍', time: 'Igår' },
    { id: 2, from: 'me', text: 'Absolut! Vart vill du åka härnäst?', time: 'Igår' },
  ],
}

export const CATEGORY_STYLES = {
  Sport:   { bg: '#FF6B35', text: '#fff', emoji: '⚽' },
  Gaming:  { bg: '#1A1A2E', text: '#fff', emoji: '🎮' },
  Social:  { bg: '#FFD700', text: '#1A1A2E', emoji: '🤝' },
  Kultur:  { bg: '#7C3AED', text: '#fff', emoji: '🎭' },
}
