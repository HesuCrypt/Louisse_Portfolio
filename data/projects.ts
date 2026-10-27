export interface Project {
  title: string;
  description: string;
  tech: string;
  category: "Web App" | "Game" | "Business Site" | "System";
  live?: string;
  github?: string;
  featured?: boolean;
  highlights?: string[];
  architecture?: string;
}

export const projects: Project[] = [
  {
    title: "Y2K Retro Desktop OS",
    description: "A browser-based desktop environment with draggable windows, a procedural Web Audio synthesizer, a media player, and an embedded AI companion.",
    tech: "React 19, TypeScript, Web Audio API, Framer Motion, Tailwind",
    category: "Web App",
    live: "https://github.com/hesucrypt/y2k-retro-desktop-os",
    github: "https://github.com/hesucrypt/y2k-retro-desktop-os",
    featured: true,
    highlights: [
      "Custom window manager handling drag, resize, stacking, and z-index order",
      "Procedural Web Audio synthesizer for tactile sound, built without audio files",
      "Media player, swappable themes, and an embedded conversational AI agent"
    ],
    architecture: "Client-side windowing state engine with zero-dependency procedural audio nodes and reactive layout coordination."
  },
  {
    title: "Fruit Jam",
    description: "A viral browser game for an ISSY Cosmetics campaign that scaled to 3,400 concurrent players in three days under heavy real-time traffic.",
    tech: "Web Game, Real-time Architecture, Database Optimization",
    category: "Game",
    live: "https://issyfruitjam.com/",
    featured: true,
    highlights: [
      "Reached 3,400 concurrent players within 72 hours of public launch",
      "Held steady under peak campaign load with zero server degradation",
      "Real-time leaderboard sync backed by server-side request validation"
    ],
    architecture: "High-throughput game loop with cached assets, rate-limited leaderboards, and indexed database scoring."
  },
  {
    title: "Game Library",
    description: "A React hub that gathers playable browser games behind one interface, with instant loading and consistent controls across every title.",
    tech: "React, JavaScript, Web Audio",
    category: "Game",
    live: "https://hesucrypt.github.io/game/",
    github: "https://github.com/hesucrypt/game",
    featured: true,
    highlights: [
      "Modular catalog that loads each game on demand instead of all at once",
      "Fast client-side routing and one shared audio panel across games",
      "Responsive layout tuned for both touchscreen and keyboard play"
    ],
    architecture: "Component-driven state machine that decouples each game's render loop from the main UI state."
  },
  {
    title: "3D Farming Game",
    description: "A browser-based 3D experiment in scene rendering and interaction with tile-based farming, rendered in WebGL and playable on mobile.",
    tech: "React, Three.js, WebGL",
    category: "Game",
    live: "https://issy-farm.vercel.app/",
    highlights: [
      "3D scene rendering with Three.js and custom shader materials",
      "Orbit camera with a tile-based farming interaction system",
      "Asset pipeline tuned to hold 60fps on mobile browsers"
    ],
    architecture: "Three.js WebGL canvas bridge wired into React state, with a managed requestAnimationFrame loop."
  },
  {
    title: "QC Weather Hub",
    description: "A location-aware weather dashboard that gets you to the forecast at a glance, with the interface shifting to match local conditions.",
    tech: "React, Weather API, Geolocation",
    category: "Web App",
    live: "https://hesucrypt.github.io/qc-weather-vibe/",
    github: "https://github.com/hesucrypt/qc-weather-vibe",
    highlights: [
      "Geolocation lookup with sensible fallback coordinates when access is denied",
      "Sub-second data fetching with clear, scannable weather condition cards",
      "Background atmosphere that adapts to the current local weather"
    ],
    architecture: "REST API caching layer with client-side geocoding and forecast cards driven by shared state."
  },
  {
    title: "Appointment Scheduler",
    description: "A booking workflow where clients claim a slot, availability stays synchronized, and confirmations send automatically.",
    tech: "React, Supabase, Postgres, Tailwind",
    category: "Business Site",
    live: "https://hesucrypt.github.io/appointment/",
    github: "https://github.com/hesucrypt/appointment",
    highlights: [
      "Conflict-free timeslot booking logic with timezone normalization",
      "Automated confirmation emails on every booking",
      "Secure client management dashboard backed by Supabase Postgres"
    ],
    architecture: "Serverless Supabase auth and tables, with real-time subscriptions keeping slot availability current."
  },
  {
    title: "Library Management System",
    description: "A backend-driven system for books, borrowing records, and member transactions, built on a structured relational schema.",
    tech: "PHP, MySQL, Apache, Bootstrap",
    category: "System",
    highlights: [
      "Relational database design indexing thousands of catalog entries",
      "Role-based access control for admins, librarians, and members",
      "Automated overdue calculation, borrowing limits, and search indexing"
    ],
    architecture: "Relational MVC pattern with parameterized SQL queries and session-based authentication."
  }
];
