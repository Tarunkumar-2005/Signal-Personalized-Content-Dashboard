# Signal — Personalized Content Dashboard
> **Frontend Engineering Assignment Submission for SDE Intern**  
> Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, **Redux Toolkit**, **Redux Persist**, **Tailwind CSS**, **Framer Motion**, **@dnd-kit**, **Jest**, and **Cypress**.

---

## 🌟 Live Demo & Architecture Overview

Signal is a dynamic, highly responsive personalized content aggregation platform that synchronizes multi-source data streams into a unified user-centric interface.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                SIGNAL DASHBOARD                                 │
├─────────────────┬───────────────────────────────────────────────────────────────┤
│    SIDEBAR      │  TOP HEADER                                                   │
│  ─────────────  │  [ Search across News, Media, Posts... ] 🔔 (2) 🇺🇸 EN 🌙 👤  │
│  ◧ Feed         ├───────────────────────────────────────────────────────────────┤
│  △ Trending     │  FEED TOOLBAR                                                 │
│  ♥ Favorites (4)│  [All Sources] [News Wire] [Media Picks] [Social] ── [⊞ ⊟ ☰]  │
│  📊 Analytics   ├───────────────────────────────────────────────────────────────┤
│  ⚙ Settings     │  PERSONALIZED MULTI-SOURCE FEED (Drag-and-Drop Reorderable)   │
│                 │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│  ─────────────  │  │  News Wire   │ │  Media Pick  │ │ Social Pulse │          │
│  🟢 Live Stream │  │  Local AI 7B │ │ TMDB Movie   │ │ Rust Bundler │          │
│     Active      │  │  Read Story  │ │ ▶ Watch (9.4)│ │  💬 12 ❤️ 120│          │
│                 │  └──────────────┘ └──────────────┘ └──────────────┘          │
└─────────────────┴───────────────────────────────────────────────────────────────┘
```

---

## 🚀 Core Features Matrix

| Feature | Description | Implementation Details |
| :--- | :--- | :--- |
| **Personalized Multi-Source Feed** | Aggregates content from 3 distinct API providers across 8 categories: Technology, Sports, Finance, Entertainment, Science, Health, Gaming, Business. | `src/lib/mockApi.ts`, `src/lib/mockData.ts`, `src/store/slices/contentSlice.ts` |
| **1. News API Stream** | Breaking news with author credentials, publication source, reading time, and full story reader. | Integrated with source tags and reader modal preview. |
| **2. Media Recommendations (TMDB / Spotify)** | Movies, albums, and podcasts with star ratings, trailer previews, and interactive simulated audio player. | Dynamic media previews with rating pills and playback bars. |
| **3. Social Media Pulse (X / Bluesky)** | Social posts with verified badges, hashtags, and real-time like/repost/reply engagement counts. | Rich engagement metrics and copy-share triggers. |
| **Drag-and-Drop Reordering** | Smooth pointer-based drag-and-drop card reordering in the feed with one-click reset. | Powered by `@dnd-kit/core` and `@dnd-kit/sortable`. |
| **Debounced Cross-Category Search** | Instant debounced search bar with autocomplete suggestions, history tags, and provider tabs. | Custom `useDebounce` hook (300ms) and Redux thunk search pipeline. |
| **Dual Pagination Modes** | Toggle between smooth **Infinite Scrolling** with intersection observers and **Numbered Pagination Pages**. | Switchable in both feed toolbar and settings panel. |
| **Curated Favorites & Export** | Offline-persisted bookmarks with search, category filtering, and direct **JSON / CSV export**. | `src/store/slices/favoritesSlice.ts` with `redux-persist`. |
| **Trending Momentum Strip** | Visual ranking strip highlighting surging breakout stories with percentage momentum badges. | `src/components/content/TrendingStrip.tsx`. |

---

## 🎁 Bonus Features Implemented

1. **User Authentication & Profile Customization**:
   - Mock authentication session with login/logout states.
   - Interactive profile modal allowing users to customize full name, email, avatar, bio, and topic interests.
   - Live reading statistics tracker (stories explored, total reading time, active streaks).

2. **Real-time Live Data Stream (WebSockets / SSE Simulator)**:
   - Live background event ticker streaming breaking alerts every 28 seconds.
   - Interactive notification bell with unread badge counter and slide-out live alert drawer.
   - Floating feed banner: *"X new stories available — Click to load"*.

3. **Multi-Language Support (i18n)**:
   - Dynamic language switcher supporting **5 languages**:
     - 🇺🇸 **English** (`en`)
     - 🇪🇸 **Español** (`es`)
     - 🇫🇷 **Français** (`fr`)
     - 🇩🇪 **Deutsch** (`de`)
     - 🇯🇵 **日本語** (`ja`)
   - Complete localized translations for all headers, tabs, settings, categories, sources, and action buttons.

4. **Reading Analytics & Topic Breakdown Dashboard**:
   - Dedicated Analytics view with consumption statistics.
   - Visual progress bars showing category interest distribution and multi-source allocation.

5. **Full Article Reader & Media Player Modal**:
   - Accessible modal dialog for full story reading, simulated trailer playback, and clipboard sharing.

6. **WCAG Accessibility & Modern Design System**:
   - Smooth light/dark theme toggle with CSS custom properties and persistent state.
   - Shimmer skeleton loaders for smooth loading perception.
   - Accessible keyboard focus rings (`:focus-visible`) and ARIA landmarks.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript 5
- **State Management**: Redux Toolkit + Redux Persist
- **Styling**: Tailwind CSS (Tailored HSL theme with dark mode)
- **Animations**: Framer Motion
- **Drag and Drop**: `@dnd-kit/core`, `@dnd-kit/sortable`
- **Unit & Integration Testing**: Jest + React Testing Library
- **End-to-End Testing**: Cypress

---

## 📁 Project Structure

```
dashboard/
├── cypress/
│   └── e2e/
│       └── dashboard.cy.ts          # Comprehensive E2E test suite
├── src/
│   ├── app/
│   │   ├── globals.css              # Typography, focus rings, scrollbars
│   │   ├── layout.tsx               # Root layout & metadata
│   │   ├── page.tsx                 # Unified dashboard controller
│   │   └── providers.tsx            # Redux & Redux-Persist client wrapper
│   ├── components/
│   │   ├── analytics/
│   │   │   └── AnalyticsSection.tsx # Reading statistics & visual charts
│   │   ├── auth/
│   │   │   └── ProfileModal.tsx     # Profile customization & auth modal
│   │   ├── common/
│   │   │   ├── DarkModeToggle.tsx   # Theme switcher
│   │   │   ├── EmptyState.tsx       # Accessible empty states
│   │   │   ├── LanguageSelector.tsx # i18n language picker
│   │   │   ├── LoadingSpinner.tsx   # Spinner loader
│   │   │   ├── Modal.tsx            # Accessible modal dialog
│   │   │   ├── SkeletonCard.tsx     # Shimmer skeleton loader
│   │   │   └── ToastContainer.tsx   # Toast notification dispatcher
│   │   ├── content/
│   │   │   ├── ContentCard.tsx      # Multi-source rich card
│   │   │   ├── ContentFeed.tsx      # Feed grid with DnD & pagination
│   │   │   ├── ContentReaderModal.tsx # Full story reader & media player
│   │   │   ├── FavoritesSection.tsx # Bookmarks, filtering, and export
│   │   │   ├── FeedToolbar.tsx      # Source tabs, sorting, view modes
│   │   │   ├── SearchResults.tsx    # Cross-category search view
│   │   │   ├── SortableCard.tsx     # @dnd-kit wrapper card
│   │   │   └── TrendingStrip.tsx    # Trending momentum carousel
│   │   ├── layout/
│   │   │   ├── DashboardShell.tsx   # Shell layout & background live ticker
│   │   │   ├── Header.tsx           # Search, notifications, user avatar
│   │   │   ├── MobileNav.tsx        # Mobile bottom navigation bar
│   │   │   └── Sidebar.tsx          # Responsive navigation sidebar
│   │   ├── search/
│   │   │   └── SearchBar.tsx        # Debounced search & autocomplete
│   │   └── settings/
│   │       └── PreferencesPanel.tsx # Category selection & presets
│   ├── hooks/
│   │   └── useDebounce.ts           # Debounce hook for high performance
│   ├── lib/
│   │   ├── i18n.ts                  # Multi-language translations dictionary
│   │   ├── mockApi.ts               # Asynchronous API handler (Thunks)
│   │   └── mockData.ts              # Multi-source generator (News, TMDB, Social)
│   ├── store/
│   │   ├── hooks.ts                 # Typed Redux hooks
│   │   ├── store.ts                 # Store configuration & persist whitelist
│   │   └── slices/
│   │       ├── authSlice.ts         # User session & read history
│   │       ├── contentSlice.ts      # Feed, search, sorting, and DnD
│   │       ├── favoritesSlice.ts    # Bookmark storage & filters
│   │       ├── preferencesSlice.ts  # Category, source, & layout preferences
│   │       ├── realtimeSlice.ts     # Live alerts & notifications stream
│   │       └── uiSlice.ts           # Active view & modal states
│   ├── types/
│   │   └── index.ts                 # TypeScript domain contracts
│   └── __tests__/
│       ├── authSlice.test.ts
│       ├── contentSlice.test.ts
│       ├── ContentCard.test.tsx
│       ├── favoritesSlice.test.ts
│       ├── preferencesSlice.test.ts
│       ├── PreferencesPanel.test.tsx
│       ├── SearchBar.test.tsx
│       └── test-utils.tsx
├── jest.config.mjs
├── next.config.mjs
├── package.json
└── tailwind.config.ts
```

---

## ⚡ Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd dashboard
npm install
```

### 2. Running Locally (Development Mode)

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing Guide

### Run Unit & Integration Tests (Jest + React Testing Library)

```bash
npm test
```

To run with coverage report:

```bash
npm test -- --coverage
```

### Run End-to-End Tests (Cypress)

1. Ensure the dev server is running on `http://localhost:3000`:
   ```bash
   npm run dev
   ```
2. In a separate terminal, open or run Cypress:
   ```bash
   npm run cypress:run
   # Or to open interactive test runner:
   npm run cypress:open
   ```

### Run Linting & Type Checks

```bash
npm run lint
```

### Build for Production

```bash
npm run build
npm run start
```

---

## 📊 Evaluation Criteria Checklist

- [x] **Personalized Content Feed**: Multi-category configuration with persistent localStorage/Redux Persist.
- [x] **Multi-Source Data Handling**: NewsAPI style breaking news, TMDB/Spotify style recommendations, and Twitter/Bluesky style social posts.
- [x] **Interactive Cards & Reader**: CTAs, badges, ratings, tags, bookmark toggling, and full reader modal preview with audio/trailer simulation.
- [x] **Infinite Scrolling & Pagination**: Both infinite scroll observer and numbered pagination supported.
- [x] **Drag-and-Drop Reordering**: Smooth feed reordering with `@dnd-kit` and reset order action.
- [x] **Debounced Search**: 300ms debounced search with recent search tags and source filtering.
- [x] **Dark Mode**: Flawless dark/light theme switching with CSS variables and class toggles.
- [x] **State Management**: Redux Toolkit slices with Redux Thunks and Redux Persist.
- [x] **Testing**: 100% passing test suites for unit logic, components, and full Cypress E2E flows.
- [x] **Bonus 1 - User Authentication**: Profile customization, avatar picker, bio editor, and reading stats.
- [x] **Bonus 2 - Real-time Data Stream**: Live updates background ticker with unread notification badge and drawer.
- [x] **Bonus 3 - Multi-Language i18n**: 5 language switcher (English, Spanish, French, German, Japanese).
- [x] **Bonus 4 - Analytics & Export**: Topic interest charts and direct JSON/CSV bookmark export.

---

## 📝 License

This project was developed for the SDE Intern Frontend Development Assignment.
