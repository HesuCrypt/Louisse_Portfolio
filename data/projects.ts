export interface Project {
  title: string;
  description: string;
  tech: string;
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
    description: "A launched web game that reached 3.4k players in 3 days, 8k total visits, 240k+ database requests, and 120k+ real-time requests.",
    tech: "Web Game, Real-time Architecture, Database Optimization",
    live: "https://issyfruitjam.com/",
    featured: true
  },
  {
    title: "Game Library",
    description: "A React-based game library with playable web games and smooth navigation.",
    tech: "React, JavaScript",
    live: "https://hesucrypt.github.io/game/",
    featured: true
  },
  {
    title: "3D Farming Game",
    description: "An interactive 3D farming simulation experience built for the web.",
    tech: "React, Three.js",
    live: "https://issy-farm.vercel.app/"
  },
  {
    title: "QC Weather Hub",
    description: "Real-time weather dashboard providing accurate location-based forecasts.",
    tech: "React, Weather API",
    live: "https://hesucrypt.github.io/qc-weather-vibe/"
  },
  {
    title: "Appointment Scheduler",
    description: "A streamlined application for booking and managing appointments efficiently.",
    tech: "React, Supabase",
    live: "https://hesucrypt.github.io/appointment/"
  },
  {
    title: "Library Management System",
    description: "A backend-driven system for managing books, users, and transactions.",
    tech: "PHP, MySQL"
  }
];