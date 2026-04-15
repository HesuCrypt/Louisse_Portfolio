export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "CSS",
      "Responsive Design",
      "Framer Motion",
      "Web Game Development"
    ]
  },
  {
    category: "Backend",
    items: ["PHP", "MySQL", "Supabase", "REST API", "EmailJS", "Auth0"]
  },
  {
    category: "Design",
    items: ["Figma", "Framer", "Canva"]
  },
  {
    category: "Platforms",
    items: ["WordPress", "Shopify", "Platforms", "Squarespace", "Webflow"]
  },
  {
    category: "Tools",
    items: [
      "GitHub",
      "Vercel",
      "Cloudflare",
      "Google Cloud Console",
      "ESLint",
      "PostCSS",
      "Cursor",
      "GPT",
      "Claude",
      "Gemini"
    ]
  }
];