export interface Job {
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  website: string;
  highlight?: string;
  focus: string;
  roadmap?: string[];
}

// To add a new job, add an object to the array below.
export const experience: Job[] = [
  {
    company: "ISSY Cosmetics",
    role: "Lead IT - Web Developer & AI Implementation",
    type: "Full-time",
    period: "July 22, 2026 - Present",
    location: "Philippines",
    website: "https://issycosmetics.com/",
    highlight: "Spearheaded company-wide AI adoption and automation systems using LLMs, n8n, Claude AI, and custom AI tools to transform business operations and e-commerce workflows.",
    focus: "I lead IT operations, web development, and company-wide AI implementation. I evaluate internal processes to identify manual bottlenecks and implement custom AI solutions and automated workflows. My work involves integrating AI tools (Claude, OpenAI, Trae) and multi-step automation pipelines (n8n) into core operations, developing AI assistants for customer support and sales analytics, and maintaining high-performance e-commerce digital experiences.",
    roadmap: [
      "Deploy custom AI agents and LLMs across internal departments to streamline operations and decision-making.",
      "Implement AI-driven analytics for real-time sales tracking, customer insights, and automated inventory forecasting.",
      "Build intelligent customer support automation systems to decrease response times and elevate user experience.",
      "Maintain and enhance live web infrastructure, focusing on performance, scalability, and UX optimization.",
    ],
  },
  {
    company: "ISSY Cosmetics",
    role: "Lead IT & Web Developer",
    type: "Full-time",
    period: "May 2026 - July 2026",
    location: "Philippines",
    website: "https://issycosmetics.com/",
    highlight: "Designed and deployed automation systems with n8n, Claude AI, and Trae to streamline internal operations, customer support, and decision workflows.",
    focus: "I analyze internal business operations to identify bottlenecks and transform manual processes into streamlined, automated workflows. By leveraging integration platforms such as n8n, I design and deploy scalable multi-step pipelines that connect office systems. I also integrate AI tools such as Claude and Trae to automate data extraction and decision support, while building customer service automation systems that reduce response times and improve workflow efficiency to support growth.",
    roadmap: [
      "Launch a loyalty program that connects the online store with offline retail experiences.",
      "Deploy an AI assistant for sales analytics, store tracking, and restocking insights to support faster decisions.",
      "Build sales automation across departments to reduce manual workflows and improve lead handling.",
      "Maintain and upgrade the live website with performance, UX, and conversion improvements.",
    ],
  },
  {
    company: "La Fleur",
    role: "Freelance Web Developer",
    type: "Project-based",
    period: "April 2026 - 1 month project",
    location: "Philippines",
    website: "",
    highlight: "Delivered a launch-ready website before the Mother’s Day season, including extra improvements and a map feature while staying within a limited budget.",
    focus: "Built and launched a brand-aligned website under a tight deadline, translating design and theme requirements into a polished, functional experience. I handled client requests end to end, added practical improvements beyond scope where it added value, and kept long-term maintenance costs minimal.",
  },
  {
    company: "ISSY Cosmetics",
    role: "Web Developer",
    type: "Full-time",
    period: "September 2025 - May 2026",
    location: "Philippines",
    website: "https://issycosmetics.com/",
    highlight: "Increased online sales by 170%",
    focus: "I maintain and improve the live e-commerce website. I focus on advanced Shopify development, custom modular sections, performance optimization, and responsive experiences across desktop and mobile. I also build interactive web game experiences and internal systems that support day-to-day operations.",
    roadmap: [
      "Create an office-wide room booking system to streamline scheduling and resource allocation.",
      "Develop interactive web game experiences to support campaigns and customer engagement.",
      "Maintain and upgrade the live website with performance, UX, and conversion improvements.",
    ],
  },
  {
    company: "Meridian Auctions",
    role: "Full Stack Developer",
    type: "Project-based",
    period: "3-Month Project",
    location: "Germany",
    website: "https://www.meridianauctions.com/",
    focus: "Improved and stabilized the auction platform by taking over an inherited codebase, addressing technical debt, strengthening security fundamentals, and upgrading the overall UI and user experience while fixing critical issues across the stack.",
    roadmap: [
      "Audit the existing codebase and resolve inherited bugs, regressions, and instability issues.",
      "Harden security by improving access control, input validation, and dependency hygiene.",
      "Redesign and rebuild key UI flows to improve clarity, usability, and visual consistency.",
    ],
  }
];
