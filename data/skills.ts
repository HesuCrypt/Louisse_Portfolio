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
    items: ["WordPress", "Shopify", "Squarespace", "Webflow"]
  },
  {
    category: "AI",
    items: [
      "AI-assisted development",
      "Chatbot integration",
      "Prompt engineering",
      "LLM workflow automation",
      "AI prototyping for product features"
    ]
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
      "Cursor"
    ]
  }
];