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
    role: "Lead IT & Web Developer",
    type: "Full-time",
    period: "May 2026 - Present",
    location: "Philippines",
    website: "https://issycosmetics.com/",
    highlight: "Designed and deployed automation systems with n8n, Zapier, Claude AI, and Trae to streamline internal operations, customer support, and decision workflows.",
    focus: "I analyze internal business operations to identify bottlenecks and transform manual processes into streamlined, automated workflows. By leveraging integration platforms such as Zapier and n8n, I design and deploy scalable multi-step pipelines that connect office systems. I also integrate AI tools such as Claude and Trae to automate data extraction and decision support, while building customer service automation systems that reduce response times and improve workflow efficiency to support growth.",
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
    period: "September 2025 – Present",
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
