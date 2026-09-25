export interface ConnectedWork {
  title: string;
  link?: string;
  description: string;
}

export interface RoleMilestone {
  role: string;
  type?: string;
  period: string;
  tag?: string;
  highlight?: string;
  focus: string;
  roadmap?: string[];
  connectedWorks?: ConnectedWork[];
}

export interface Job {
  company: string;
  role?: string;
  type?: string;
  period: string;
  location: string;
  website?: string;
  highlight?: string;
  focus?: string;
  roadmap?: string[];
  connectedSummary?: string;
  roles?: RoleMilestone[];
}

export const experience: Job[] = [
  {
    company: "ISSY Cosmetics",
    period: "September 2025 - Present",
    location: "Philippines",
    website: "https://issycosmetics.com/",
    type: "Full-time",
    highlight: "Increased Online Sales by 170% & Spearheaded Company-Wide AI Adoption",
    connectedSummary: "Continuous progression across three senior technical roles—spearheading enterprise AI pipelines, modern Shopify architecture, internal workflow automations, and high-traffic campaign applications.",
    roles: [
      {
        role: "Lead IT - Web Developer & AI Implementation",
        type: "Full-time",
        period: "July 22, 2026 - Present",
        tag: "Current Role",
        highlight: "Spearheaded company-wide AI adoption and automation systems using LLMs, n8n, Claude AI, and custom AI tools.",
        focus: "Lead IT operations, web development, and company-wide AI implementation. I evaluate internal processes to identify manual bottlenecks and implement custom AI solutions and automated workflows. My work involves integrating AI tools (Claude, OpenAI, Trae) and multi-step automation pipelines (n8n) into core operations, developing AI assistants for customer support and sales analytics, and maintaining high-performance e-commerce digital experiences.",
        roadmap: [
          "Deploy custom AI agents and LLMs across internal departments to streamline operations and decision-making.",
          "Implement AI-driven analytics for real-time sales tracking, customer insights, and automated inventory forecasting.",
          "Build intelligent customer support automation systems to decrease response times and elevate user experience.",
          "Maintain and enhance live web infrastructure, focusing on performance, scalability, and UX optimization."
        ]
      },
      {
        role: "Lead IT & Web Developer",
        type: "Full-time",
        period: "May 2026 - July 2026",
        tag: "Promoted",
        highlight: "Designed and deployed automation systems with n8n, Claude AI, and Trae to streamline internal operations, customer support, and decision workflows.",
        focus: "Analyzed internal business operations to identify bottlenecks and transform manual processes into streamlined, automated workflows. By leveraging integration platforms such as n8n, designed and deployed scalable multi-step pipelines that connect office systems. Integrated AI tools such as Claude and Trae to automate data extraction and decision support, while building customer service automation systems that reduce response times and support company growth.",
        roadmap: [
          "Launch a loyalty program that connects the online store with offline retail experiences.",
          "Deploy an AI assistant for sales analytics, store tracking, and restocking insights to support faster decisions.",
          "Build sales automation across departments to reduce manual workflows and improve lead handling.",
          "Maintain and upgrade the live website with performance, UX, and conversion improvements."
        ]
      },
      {
        role: "Web Developer",
        type: "Full-time",
        period: "September 2025 - May 2026",
        tag: "Initial Role",
        highlight: "Increased online sales by 170%",
        focus: "Developed and maintained the live e-commerce website on Shopify. Engineered custom modular sections, performance optimizations, and responsive experiences across desktop and mobile. Built interactive web campaign experiences and internal tools supporting day-to-day operations.",
        roadmap: [
          "Develop interactive web game experiences (including Fruit Jam) to support viral campaigns and customer engagement.",
          "Create an office-wide room booking system to streamline scheduling and resource allocation.",
          "Maintain and upgrade the live website with performance, UX, and conversion improvements."
        ],
        connectedWorks: [
          {
            title: "ISSY Fruit Jam",
            link: "https://issyfruitjam.com/",
            description: "Viral interactive campaign game scaling to 3,400 players in 3 days with 120k+ real-time requests."
          },
          {
            title: "Live E-Commerce Storefront",
            link: "https://issycosmetics.com/",
            description: "Custom modular Shopify sections, speed tuning, and conversion optimization driving a 170% sales surge."
          },
          {
            title: "3D Interactive Farming Game",
            link: "https://issy-farm.vercel.app/",
            description: "Interactive 3D WebGL experience built with React & Three.js for interactive customer campaigns."
          }
        ]
      }
    ]
  },
  {
    company: "La Fleur",
    role: "Freelance Web Developer",
    type: "Project-based",
    period: "April 2026 - 1 month project",
    location: "Philippines",
    website: "https://lafleurph.com/",
    highlight: "Delivered a launch-ready florist website before the Mother’s Day season, including extra improvements and a map feature while staying within budget.",
    focus: "Built and launched a brand-aligned website under a tight deadline, translating design and theme requirements into a polished, functional experience. Handled client requests end to end, added practical improvements beyond scope where it added value, and kept long-term maintenance costs minimal."
  },
  {
    company: "Meridian Auctions",
    role: "Lead Full Stack Developer",
    type: "Project-based",
    period: "3-Month Project",
    location: "Germany",
    website: "https://www.meridianauctions.com/",
    highlight: "Stabilized full-stack auction platform & secured real-time transactions",
    focus: "Improved and stabilized the auction platform by taking over an inherited codebase, addressing technical debt, strengthening security fundamentals, and upgrading the overall UI and user experience while fixing critical issues across the stack.",
    roadmap: [
      "Audit the existing codebase and resolve inherited bugs, regressions, and instability issues.",
      "Harden security by improving access control, input validation, and dependency hygiene.",
      "Redesign and rebuild key UI flows to improve clarity, usability, and visual consistency."
    ]
  },
  {
    company: "Prime Philippines",
    role: "UI/UX Designer & Frontend Developer Intern",
    type: "Internship",
    period: "March 2025 - June 2025",
    location: "Philippines",
    highlight: "Designed & engineered internal real estate interfaces",
    focus: "Designed intuitive wireframes and prototypes in Figma and Framer, and developed responsive web components using React.js and Tailwind CSS for internal real estate management platforms."
  }
];
