// All data is simulated in the frontend — no backend required.

// Real profile photos sent by the app owner (their own friends, with consent),
// bundled as local assets so they always load and stay crisp.
import p1 from '../assets/profiles/p1.webp' // blonde, white dress
import p2 from '../assets/profiles/p2.webp' // guy, navy jacket
import p3 from '../assets/profiles/p3.webp' // laughing, brown hair
import p4 from '../assets/profiles/p4.webp' // blonde, mirror selfie
import p5 from '../assets/profiles/p5.webp' // guy, sunglasses, travel

// `objectPosition` keeps each face nicely framed in both the big Discover
// card crop and the small round avatars.
const PASTELS = 'b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf,ffe0b3,c8f7c5'
const dice = (seed) =>
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
    photo: p1,
    objectPosition: '52% 20%',
  },
  {
    id: 2,
    name: 'Marcus',
    age: 22,
    city: 'Stockholm',
    bio: 'Gameran som också älskar att laga mat 🍝',
    interests: ['🎮 Gaming', '🍕 Mat', '💻 Tech'],
    avatar: '💛',
    photo: p2,
    objectPosition: '50% 22%',
  },
  {
    id: 3,
    name: 'Aisha',
    age: 17,
    city: 'Malmö',
    bio: 'Dans är mitt liv. Letar efter träningspartner!',
    interests: ['💃 Dans', '🏋️ Träning', '🎵 Musik'],
    avatar: '💚',
    photo: p4,
    objectPosition: '55% 26%',
  },
  {
    id: 4,
    name: 'Leo',
    age: 20,
    city: 'Göteborg',
    bio: 'Fotboll, resor och för mycket kaffe ☕',
    interests: ['⚽ Fotboll', '🌍 Resor', '🎬 Film'],
    avatar: '💙',
    photo: p5,
    objectPosition: '32% 40%',
  },
  {
    id: 5,
    name: 'Nora',
    age: 23,
    city: 'Stockholm',
    bio: 'Konst, foto och loppisfynd. Alltid sugen på fika.',
    interests: ['🎨 Konst', '📷 Foto', '☕ Fika'],
    avatar: '💜',
    photo: p3,
    objectPosition: '52% 22%',
  },
  {
    id: 6,
    name: 'Ludwig',
    age: 21,
    city: 'Göteborg',
    bio: 'Brädspelsnörd & värd för episka LAN-partyn 🎲',
    interests: ['🧩 Brädspel', '🎮 Gaming', '🍕 Mat'],
    avatar: '🧡',
    photo: dice('Ludwig'),
    objectPosition: 'center',
  },
  {
    id: 7,
    name: 'Amira',
    age: 18,
    city: 'Malmö',
    bio: 'Skejtar, fotar och letar nya ställen att utforska 🛹',
    interests: ['🛹 Skate', '📷 Foto', '🌍 Resor'],
    avatar: '💚',
    photo: dice('Amira'),
    objectPosition: 'center',
  },
  {
    id: 8,
    name: 'Erik',
    age: 24,
    city: 'Stockholm',
    bio: 'Bokmal med svaghet för teater och långa promenader.',
    interests: ['📚 Böcker', '🎭 Teater', '🌱 Natur'],
    avatar: '💙',
    photo: dice('Erik'),
    objectPosition: 'center',
  },
]

export const mockActivities = [
  {
    id: 1,
    title: 'Spela padel',
    date: 'Lördag 14 juni',
    location: 'Göteborg',
    participants: 3,
    max: 4,
    category: 'Sport',
  },
  {
    id: 2,
    title: 'LAN-party hemma hos Ludwig',
    date: 'Fredag 20 juni',
    location: 'Online',
    participants: 7,
    max: 10,
    category: 'Gaming',
  },
  {
    id: 3,
    title: 'Strandpromenad + fika',
    date: 'Söndag 15 juni',
    location: 'Malmö',
    participants: 2,
    max: 8,
    category: 'Social',
  },
  {
    id: 4,
    title: 'Bokklubben — månadens bok',
    date: 'Måndag 16 juni',
    location: 'Stockholm',
    participants: 5,
    max: 6,
    category: 'Kultur',
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
  Sport:  { bg: '#FF6B35', text: '#fff', emoji: '⚽', gradient: 'linear-gradient(135deg, #FF6B35, #FF9D6E)' },
  Gaming: { bg: '#1A1A2E', text: '#fff', emoji: '🎮', gradient: 'linear-gradient(135deg, #2D2D5A, #1A1A2E)' },
  Social: { bg: '#FFD700', text: '#1A1A2E', emoji: '🤝', gradient: 'linear-gradient(135deg, #FFD700, #FFB347)' },
  Kultur: { bg: '#7C3AED', text: '#fff', emoji: '🎭', gradient: 'linear-gradient(135deg, #9D5CF5, #7C3AED)' },
}
