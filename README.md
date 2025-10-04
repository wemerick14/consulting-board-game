# Consulting Career Board Game

A multiplayer, pass-and-play board game where players race along a consulting career path from **Analyst to Retirement** by solving timed case interview questions.

## 🎯 Game Overview

- **Players:** 2-4 (local pass-and-play)
- **Goal:** Reach Retirement first (or highest score when board ends)
- **Duration:** ~30-60 minutes per session
- **Skills:** Market sizing, profitability analysis, pricing, PE screening, operations, and public sector cases

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The game will be available at `http://localhost:5173`

## 🎮 How to Play

### Setup
1. Choose number of players (2-4)
2. Enter player names
3. Set timer duration (60/75/90 seconds per question)
4. Select session length (short/standard)

### Gameplay
1. **Each Turn:**
   - Player receives a case interview question (market sizing, profitability, pricing, etc.)
   - Answer within the time limit
   - Earn points based on accuracy (numeric) or answer quality (MCQ)

2. **Scoring Bands (Numeric Questions):**
   - ≤5% error → 4 points
   - ≤10% error → 3 points
   - ≤20% error → 2 points
   - ≤30% error → 1 point
   - >30% error → 0 points

3. **Movement:**
   - Base movement: 1 space forward
   - Streak bonus: +1 space every 3 consecutive good answers
   - Severe miss: -1 space (for opposite sign errors, etc.)

4. **Credits (each costs 1 point):**
   - **+60s:** Add 60 seconds to timer (2 per game)
   - **Google Peek:** See approach hints (1 per game) [Stubbed in MVP]
   - **5-Word Hint:** Get a quick tip (1 per game) [Stubbed in MVP]

5. **Win Condition:**
   - First player to reach position #18 (Retirement) wins
   - Or highest score when someone reaches the end

## 📚 Case Types

The game includes 17 different case templates across categories:

### Market Sizing (3 cases)
- Iced Coffee in Texas
- EV Charging Sessions
- Streaming Subscribers TAM

### Profitability (3 cases)
- Retail Chain EBITDA Bridge
- Grocery Pharmacy Kiosk
- SaaS Unit Economics

### Pricing (2 cases)
- Fuel Retailer Elasticity
- SaaS Discount Impact

### PE/Finance (2 cases)
- Dairy Farm Screening
- PE Roll-Up Synergies

### Market Entry (2 cases)
- Water Park Expansion NPV
- Snack Brand Germany Entry

### Operations (2 cases)
- Factory Ops Lever Selection
- E-Commerce Funnel Optimization

### Public Sector (2 cases)
- School System Portfolio Allocation
- City Budget Gap Closure

## 🏗️ Project Structure

```
src/
├── cases/          # Case database with 17 templates
├── logic/          # Game logic, state management, compute functions
│   ├── GameContext.tsx
│   ├── board.ts
│   ├── case-gen.ts
│   ├── compute.ts
│   ├── grading.ts
│   └── random.ts
├── ui/             # React components
│   ├── Board.tsx
│   ├── TileCard.tsx
│   ├── Timer.tsx
│   ├── Scorebar.tsx
│   ├── PassScreen.tsx
│   ├── SetupScreen.tsx
│   └── SummaryModal.tsx
└── types/          # TypeScript definitions
```

## 💾 Features

- ✅ **Local Multiplayer:** Pass-and-play for 2-4 players
- ✅ **17 Case Templates:** Realistic consulting interview questions
- ✅ **Deterministic Grading:** Fair, band-based numeric scoring
- ✅ **Timer Enforcement:** Configurable 60/75/90s per question
- ✅ **Credits System:** Strategic power-ups that cost points
- ✅ **localStorage Persistence:** Game state survives browser refresh
- ✅ **Responsive UI:** Works on desktop and tablet
- ✅ **Career Progression:** Track ranks from Analyst → Retirement
- ✅ **Streak System:** Reward consecutive good answers
- ✅ **Risk Routes:** Optional harder paths with higher rewards

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State:** React Context + useReducer
- **Persistence:** localStorage API

## 📝 Game Design Notes

- **No AI/LLM Required:** All case generation and grading is deterministic
- **Seeded Randomness:** Cases use seeded RNG for reproducible number variation
- **No Backend:** Fully client-side application
- **No Calculator:** Players use mental math (matches real interview conditions)
- **Ethical Case Content:** All scenarios are neutral and educational

## 🚢 Deployment

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. The `dist/` folder contains your production build

3. Deploy to Netlify:
   - Connect your GitHub repo to Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`

### Deploy to Vercel

```bash
npm run build
vercel --prod
```

## 🎯 Future Enhancements

- LLM-powered explanations and hints
- Additional case templates (target: 50+)
- Online multiplayer with rooms
- Interview mode with structured notes
- Case authoring UI for custom questions
- Advanced analytics and replay
- Mobile-optimized layout

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

Case archetypes inspired by public practice materials from:
- McKinsey & Company
- Boston Consulting Group (BCG)
- Bain & Company
- Oliver Wyman
- Kearney
- EY-Parthenon

All case numbers and scenarios are fabricated for practice purposes.

---

**Built with Claude Code** 🤖
