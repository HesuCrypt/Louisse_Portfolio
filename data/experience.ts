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
    type: "Part-time",
    period: "January 2026 – Present",
    website: "https://www.meridianauctions.com/",
    focus: "Lead Full Stack Engineer handling the live auction platform. Overseeing frontend architecture, backend systems, and database management while mentoring a team of three developers."
  }
];