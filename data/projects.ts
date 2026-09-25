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
    description: "An immersive browser-based desktop operating system interface featuring draggable windows, procedural Web Audio synthesizer, media player, and embedded AI companion.",
    tech: "React 19, TypeScript, Web Audio API, Framer Motion, Tailwind",
    category: "Web App",
    live: "https://github.com/hesucrypt/y2k-retro-desktop-os",
    github: "https://github.com/hesucrypt/y2k-retro-desktop-os",
    featured: true,
    highlights: [
      "Custom draggable, resizable, and stackable window manager with z-index orchestration",
      "Hardware-accelerated Web Audio synthesizer for tactile procedural sound feedback",
      "Interactive media player, customizable themes, and embedded conversational AI agent"
    ],
    architecture: "Lightweight client-side windowing state engine with zero-dependency procedural audio nodes and reactive layout coordination."
  },
  {
    title: "Fruit Jam",
    description: "A viral browser game launch that scaled to 3,400 concurrent players in 3 days while handling high real-time traffic and large request volumes.",
    tech: "Web Game, Real-time Architecture, Database Optimization",
    category: "Game",
    live: "https://issyfruitjam.com/",
    featured: true,
    highlights: [
      "Scaled to 3,400 concurrent active players within 72 hours of public launch",
      "Zero server degradation under peak burst campaign traffic for ISSY Cosmetics",
      "Real-time leaderboard synchronization and anti-cheat request validation"
    ],
    architecture: "High-throughput game loop with optimized asset caching, rate-limited leaderboards, and indexed database scoring."
  },
  {
    title: "Game Library",
    description: "A React-based game hub designed to organize playable browser experiences with smooth navigation and lightweight UI.",
    tech: "React, JavaScript, Web Audio",
    category: "Game",
    live: "https://hesucrypt.github.io/game/",
    github: "https://github.com/hesucrypt/game",
    featured: true,
    highlights: [
      "Modular catalog architecture for instant loading of casual browser games",
      "Fast client-side routing and unified audio settings across games",
      "Responsive layout optimized for both mobile touchscreen and keyboard play"
    ],
    architecture: "Component-driven state machine decoupling game render loops from main UI state."
  },
  {
    title: "3D Farming Game",
    description: "A web-based 3D interactive experience exploring gameplay mechanics, scene rendering, and browser-friendly immersion.",
    tech: "React, Three.js, WebGL",
    category: "Game",
    live: "https://issy-farm.vercel.app/",
    highlights: [
      "Browser-based 3D scene rendering using Three.js and custom shader materials",
      "Dynamic camera orbit and tile-based farming interaction system",
      "Optimized 3D asset pipeline targeting 60fps on mobile browsers"
    ],
    architecture: "Three.js WebGL canvas bridge connected to React state with requestAnimationFrame loop management."
  },
  {
    title: "QC Weather Hub",
    description: "A location-aware weather dashboard focused on fast access to forecast data through a clean, responsive interface.",
    tech: "React, Weather API, Geolocation",
    category: "Web App",
    live: "https://hesucrypt.github.io/qc-weather-vibe/",
    github: "https://github.com/hesucrypt/qc-weather-vibe",
    highlights: [
      "Real-time geolocation lookup with intelligent fallback coordinates",
      "Sub-second data fetching and responsive visual weather condition cards",
      "Dynamic background atmospheric gradients adapting to current local weather"
    ],
    architecture: "REST API caching layer with client-side geocoding and stateful forecast forecasting cards."
  },
  {
    title: "Appointment Scheduler",
    description: "A scheduling workflow that simplifies appointment booking, availability management, and customer coordination.",
    tech: "React, Supabase, Postgres, Tailwind",
    category: "Business Site",
    live: "https://hesucrypt.github.io/appointment/",
    github: "https://github.com/hesucrypt/appointment",
    highlights: [
      "Conflict-free timeslot booking logic with timezone normalization",
      "Automated appointment confirmation email triggers",
      "Secure client management dashboard backed by Supabase Postgres"
    ],
    architecture: "Serverless Supabase Auth and database tables with real-time slot subscription triggers."
  },
  {
    title: "Library Management System",
    description: "A backend-driven system built to manage books, borrowing records, and user transactions with structured data handling.",
    tech: "PHP, MySQL, Apache, Bootstrap",
    category: "System",
    highlights: [
      "Relational database design tracking thousands of book catalog entries",
      "Role-based access control (Admin, Librarian, Student/Member)",
      "Automated overdue calculation, borrowing limits, and search indexing"
    ],
    architecture: "Relational MVC pattern with parameterized SQL queries and session-based authentication."
  }
];
