export interface Job {
  company: string;
  role: string;
  type: string;
  period: string;
  website: string;
  highlight?: string;
  focus: string;
}

// To add a new job, add an object to the array below.
export const experience: Job[] = [
  {
    company: "ISSY Cosmetics",
    role: "IT Officer",
    type: "Full-time",
    period: "May 2026 - Present",
    website: "https://issycosmetics.com/",
    highlight: "Built automation systems with n8n, Zapier, Claude AI, and Trae to streamline internal operations, customer support, and decision workflows.",
    focus: "I analyze internal business operations to eliminate structural bottlenecks and transform manual processes into streamlined, automated workflows. By leveraging advanced integration platforms like Zapier and n8n, I design and deploy scalable multi-step pipelines that connect disparate office systems. Additionally, I integrate cutting-edge AI technologies like Claude to automate data extraction and intelligent decision-making, while building dedicated customer service automation systems that drastically reduce response times and improve overall workflow efficiency to support company growth."
  },
  {
    company: "ISSY Cosmetics",
    role: "Web Developer",
    type: "Full-time",
    period: "September 2025 – Present",
    website: "https://issycosmetics.com/",
    highlight: "Increased online sales by 170%",
    focus: "Currently handling the live website. Specializing in Advanced Shopify Development, Custom Modular Sections, E-commerce Optimization, Desktop & Mobile Optimization, and Web Game Development."
  },
  {
    company: "Meridian Auctions",
    role: "Full Stack Developer",
    type: "Project-based",
    period: "3-Month Project",
    website: "https://www.meridianauctions.com/",
    focus: "Led full stack development for the auction platform, overseeing frontend architecture, backend systems, and database management while mentoring a team of three developers."
  }
];
