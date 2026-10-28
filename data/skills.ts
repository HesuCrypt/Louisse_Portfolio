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
    category: "Platforms",
    items: ["Shopify", "WordPress", "Squarespace", "Webflow"]
  },
  {
    category: "Automation & AI",
    items: [
      "n8n",
      "Google Agent ADK",
      "Google Antigravity",
      "Zapier",
      "Claude",
      "ChatGPT",
      "ChatGPT Cowork",
      "Trae",
      "Prompt Engineering",
      "Workflow Automation",
      "AI-Assisted Operations",
      "Customer Support Automation"
    ]
  },
  {
    category: "Design",
    items: ["Figma", "Framer", "Canva"]
  },
  {
    category: "Tools",
    items: [
      "Google Antigravity IDE",
      "GitHub",
      "Vercel",
      "Cloudflare",
      "Google Cloud Console",
      "ESLint",
      "PostCSS"
    ]
  }
];
