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
    highlight: "Lifted online sales 170% and led company-wide AI adoption",
    connectedSummary: "Three connected roles at one company — from building the Shopify storefront, to running site operations, to leading AI implementation across the business.",
    roles: [
      {
        role: "Lead IT - Web Developer & AI Implementation",
        type: "Full-time",
        period: "July 22, 2026 - Present",
        tag: "Current Role",
        highlight: "Leading company-wide AI adoption — LLM tooling, n8n pipelines, and custom internal agents.",
        focus: "I run IT operations, web development, and company-wide AI implementation. That means mapping how teams actually work, finding where manual steps are costing time, and replacing them with custom AI tools and multi-step automations. Alongside that I keep the live storefront fast and build the AI assistants used for support and sales analytics.",
        roadmap: [
          "Roll out custom AI agents and LLM tools across departments to speed up daily operations.",
          "Build AI-driven analytics for real-time sales tracking, customer insight, and inventory forecasting.",
          "Automate customer support to cut response times without losing the human tone.",
          "Keep the live web infrastructure fast, scalable, and current."
        ]
      },
      {
        role: "Lead IT & Web Developer",
        type: "Full-time",
        period: "May 2026 - July 2026",
        tag: "Promoted",
        highlight: "Built n8n, Claude, and Trae automations that replaced manual work across operations, support, and reporting.",
        focus: "I audited internal operations to find the real bottlenecks, then turned those manual steps into automated workflows. Using n8n, I built multi-step pipelines that connect the office systems people used to update by hand. Claude and Trae took over data extraction and decision support, and support automation shortened response times while the company kept growing.",
        roadmap: [
          "Launch a loyalty program linking the online store with in-person retail.",
          "Deploy an AI assistant for sales analytics and restocking insight, so decisions arrive sooner.",
          "Automate sales handoffs across departments to cut manual work and speed up lead handling.",
          "Keep the live site improving on performance, UX, and conversion."
        ]
      },
      {
        role: "Web Developer",
        type: "Full-time",
        period: "September 2025 - May 2026",
        tag: "Initial Role",
        highlight: "Lifted online sales by 170%",
        focus: "Built and maintained the live Shopify storefront — custom modular sections, performance tuning, and responsive layouts across desktop and mobile. I also shipped the interactive campaign pages and the internal tools the team leaned on day to day.",
        roadmap: [
          "Ship interactive web games — including Fruit Jam — to drive campaign reach.",
          "Build an office-wide room booking system to replace manual scheduling.",
          "Continue performance and conversion work on the live storefront."
        ],
        connectedWorks: [
          {
            title: "ISSY Fruit Jam",
            link: "https://issyfruitjam.com/",
            description: "Viral campaign game — 3,400 players and 120k+ real-time requests in three days."
          },
          {
            title: "Live E-Commerce Storefront",
            link: "https://issycosmetics.com/",
            description: "Custom Shopify sections, speed tuning, and conversion work behind a 170% sales lift."
          },
          {
            title: "3D Interactive Farming Game",
            link: "https://issy-farm.vercel.app/",
            description: "A 3D WebGL experience built with React and Three.js for interactive customer campaigns."
          }
        ]
      }
    ]
  },
  {
    company: "La Fleur",
    role: "Freelance Web Developer",
    type: "Project-based",
    period: "April 2026 · 1 Month",
    location: "Philippines",
    website: "https://lafleurph.com/",
    highlight: "Delivered a launch-ready florist site before the Mother's Day season — adding a map feature and other extras without going over budget.",
    focus: "Built and launched a brand-aligned storefront under a tight deadline, translating the client's design direction into something polished and genuinely usable. I handled every request end to end, added improvements beyond scope where they clearly helped, and kept long-term maintenance costs low."
  },
  {
    company: "Meridian Auctions",
    role: "Lead Full Stack Developer",
    type: "Project-based",
    period: "3-Month Project",
    location: "Germany",
    website: "https://www.meridianauctions.com/",
    highlight: "Stabilized a full-stack auction platform and secured real-time transactions",
    focus: "Took over an inherited codebase and stabilized it — clearing technical debt, resolving critical bugs across the stack, tightening security fundamentals, and rebuilding the key UI flows that users touched most.",
    roadmap: [
      "Audit the existing codebase and clear inherited bugs, regressions, and instability.",
      "Harden security through access control, input validation, and dependency hygiene.",
      "Redesign and rebuild key UI flows for clarity, usability, and visual consistency."
    ]
  },
  {
    company: "Prime Philippines",
    role: "UI/UX Designer & Frontend Developer Intern",
    type: "Internship",
    period: "March 2025 - June 2025",
    location: "Philippines",
    highlight: "Designed and built internal real estate interfaces",
    focus: "Designed wireframes and prototypes in Figma and Framer, then built the responsive React and Tailwind components behind internal real estate management platforms."
  }
];
