export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind", "JavaScript", "Desktop & Mobile Optimization", "Web Game Development"]
  },
  {
    category: "Backend",
    items: ["PHP", "MySQL", "Supabase", "Auth0"]
  },
  {
    category: "Design",
    items: ["Figma", "Framer", "Canva"]
  },
  {
    category: "Platforms",
    items: ["Shopify", "Liquid", "Squarespace"]
  },
  {
    category: "Tools",
    items: ["GPT", "Claude", "Gemini", "Cursor", "DeepSeek", "Google Antigravity", "Google AI Studio", "Lovable AI", "BoltAI"]
  }
];