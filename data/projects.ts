export interface Project {
  title: string;
  description: string;
  tech: string;
  category: "Web App" | "Game" | "Business Site" | "System";
  live?: string;
  featured?: boolean;
}

// To add a new project, simply add a new object to this array.
// Example:
// {
//   title: "New Project Title",
//   description: "Description of the project.",
//   tech: "React, Node.js",
//   live: "https://example.com"
// }

export const projects: Project[] = [
  {
    title: "Fruit Jam",
    description: "A browser game launch that reached 3.4k players in 3 days while handling high real-time traffic and large request volume.",
    tech: "Web Game, Real-time Architecture, Database Optimization",
    category: "Game",
    live: "https://issyfruitjam.com/",
    featured: true
  },
  {
    title: "Game Library",
    description: "A React-based game hub designed to organize playable browser experiences with smooth navigation and lightweight UI.",
    tech: "React, JavaScript",
    category: "Game",
    live: "https://hesucrypt.github.io/game/",
    featured: true
  },
  {
    title: "3D Farming Game",
    description: "A web-based 3D interactive experience exploring gameplay mechanics, scene rendering, and browser-friendly immersion.",
    tech: "React, Three.js",
    category: "Game",
    live: "https://issy-farm.vercel.app/"
  },
  {
    title: "QC Weather Hub",
    description: "A location-aware weather dashboard focused on fast access to forecast data through a clean, responsive interface.",
    tech: "React, Weather API",
    category: "Web App",
    live: "https://hesucrypt.github.io/qc-weather-vibe/"
  },
  {
    title: "Appointment Scheduler",
    description: "A scheduling workflow that simplifies appointment booking, availability management, and customer coordination.",
    tech: "React, Supabase",
    category: "Business Site",
    live: "https://hesucrypt.github.io/appointment/"
  },
  {
    title: "Library Management System",
    description: "A backend-driven system built to manage books, borrowing records, and user transactions with structured data handling.",
    tech: "PHP, MySQL",
    category: "System"
  }
];
