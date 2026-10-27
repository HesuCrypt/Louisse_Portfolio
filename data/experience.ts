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
    highlight: "Lifted online sales 170% and directed enterprise AI adoption",
    connectedSummary: "Three progressive roles: from Shopify frontend engineering to leading company-wide web systems and AI automation.",
    roles: [
      {
        role: "Lead IT - Web Developer & AI Implementation",
        type: "Full-time",
        period: "July 22, 2026 - Present",
        tag: "Current Role",
        highlight: "Directing enterprise AI adoption: custom LLM agents, n8n automation, and sales intelligence.",
        focus: "Directing IT operations, web engineering, and enterprise AI adoption. Architecting custom LLM agents and multi-step n8n pipelines that remove manual operational bottlenecks, while maintaining live storefront performance and building real-time sales analytics.",
        roadmap: [
          "Deploy custom AI agents and LLM tooling across business departments.",
          "Engineer real-time analytics for automated sales tracking and inventory forecasting.",
          "Automate customer support workflows to accelerate resolution times.",
          "Maintain high-speed, scalable web infrastructure for high-traffic campaigns."
        ]
      },
      {
        role: "Lead IT & Web Developer",
        type: "Full-time",
        period: "May 2026 - July 2026",
        tag: "Promoted",
        highlight: "Built automated n8n, Claude, and Trae pipelines replacing manual office operations.",
        focus: "Audited operational workflows and replaced repetitive manual tasks with automated n8n pipelines. Integrated Claude and Trae for automated data extraction, reporting, and customer support triage during rapid company expansion.",
        roadmap: [
          "Integrated online loyalty systems with physical retail channels.",
          "Deployed AI sales and inventory intelligence tools for leadership.",
          "Automated inter-departmental sales handoffs to reduce turnaround time.",
          "Continuously optimized storefront Core Web Vitals and conversion rates."
        ]
      },
      {
        role: "Web Developer",
        type: "Full-time",
        period: "September 2025 - May 2026",
        tag: "Initial Role",
        highlight: "Engineered high-converting Shopify storefront, lifting online sales by 170%",
        focus: "Engineered and maintained the primary Shopify storefront with custom Liquid sections, mobile-first responsiveness, and sub-second performance optimizations that drove a verified 170% sales lift.",
        roadmap: [
          "Shipped viral interactive web games, including ISSY Fruit Jam (3,400 concurrent users).",
          "Built an internal room-booking web system to automate office scheduling.",
          "Engineered conversion-focused product display templates and checkout flows."
        ],
        connectedWorks: [
          {
            title: "ISSY Fruit Jam",
            link: "https://issyfruitjam.com/",
            description: "Viral campaign game with 3,400 players and 120k+ real-time requests in three days."
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
    highlight: "Delivered custom florist storefront ahead of Mother's Day rush with zero budget overruns.",
    focus: "Designed and launched a brand-aligned storefront under a strict deadline. Handled custom store mapping, smooth checkout flows, and clean, low-maintenance architecture."
  },
  {
    company: "Meridian Auctions",
    role: "Lead Full Stack Developer",
    type: "Project-based",
    period: "3-Month Project",
    location: "Germany",
    website: "https://www.meridianauctions.com/",
    highlight: "Stabilized full-stack auction platform and secured real-time bidding transactions.",
    focus: "Stabilized an inherited codebase: eliminated legacy regressions, hardened transaction security, and re-engineered high-traffic bidding interfaces.",
    roadmap: [
      "Resolved systemic legacy regressions, memory leaks, and UI synchronization lag.",
      "Hardened transaction security with strict input validation and access controls.",
      "Redesigned bidding workflows for intuitive real-time auction participation."
    ]
  },
  {
    company: "Prime Philippines",
    role: "UI/UX Designer & Frontend Developer Intern",
    type: "Internship",
    period: "March 2025 - June 2025",
    location: "Philippines",
    highlight: "Designed and engineered enterprise real estate interfaces.",
    focus: "Prototyped user experiences in Figma and Framer, then implemented responsive React and Tailwind UI components for internal property management systems."
  }
];
