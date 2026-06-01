# 🧡 Amigos

> **Hitta din gäng. Lev ditt liv.**

Amigos är en mobilapp-liknande React-webbapp — en social plattform för ungdomar
och unga vuxna (13–25 år) som vill hitta nya vänner baserat på **gemensamma
intressen och personlighet, inte utseende**.

## ✨ Funktioner

- **Onboarding** — animerad välkomstskärm med logotype och tagline
- **Profilskapande i 3 steg** — vem du är, dina intressen och din personlighet
- **Discover** — kortbaserad matchningsfeed med swipe-animationer, gemensamma
  intressen markerade med ⭐, filter på stad/ålder/intressen och loading skeletons
- **Aktiviteter** — lista och skapa aktiviteter, gå med / lämna
- **Chatt** — matchade vänner, simulerade meddelanden, skicka egna i realtid (state)
- **Min profil** — profilinfo, intressen, vibe och aktiviteter, med redigering

Allt körs i frontend — ingen backend krävs. Data är simulerad.

## 🎨 Grafisk profil

| Roll | Färg |
| --- | --- |
| Primär (orange) | `#FF6B35` |
| Sekundär (midnattsblå) | `#1A1A2E` |
| Accent (guld) | `#FFD700` |
| Bakgrund (off-white) | `#F9F5F0` |

Typsnitt: **Syne** (display) + **DM Sans** (brödtext).

## 🛠 Teknik

- React 18 + hooks (`useState`, `useEffect`, `useMemo`)
- Vite
- Tailwind CSS (custom tema + CSS-variabler)
- Framer Motion (övergångar & micro-interactions)
- Lucide React (ikoner)

## 🚀 Kom igång

```bash
npm install
npm run dev
```

Öppna sedan adressen som Vite skriver ut (vanligtvis `http://localhost:5173`).

```bash
npm run build    # produktionsbygge
npm run preview  # förhandsvisa bygget
```

## 📁 Struktur

```
src/
├── App.jsx              # Root, navigation & state
├── components/          # PhoneFrame, BottomNav, UserCard, TagBadge, ActivityCard, Avatar
├── views/               # Onboarding, CreateProfile, Discover, Activities, Chat, Profile
├── data/mockData.js     # Simulerad data
└── styles/global.css    # CSS-variabler & reset
```

Appen är mobile-first och wrappas i en simulerad telefonram (max ~430px) som
centreras på desktop. 🧡
