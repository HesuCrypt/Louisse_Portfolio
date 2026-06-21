# Homepage Dropdown And Content Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage inquiry select with a custom dropdown and refresh the portfolio copy so the site better reflects Louisse's current web, commerce, automation, and AI workflow experience.

**Architecture:** Keep the current homepage and services split intact, add a focused custom dropdown interaction only to `GeneralContact`, and update copy in the existing content data files so UI structure remains stable. Use small utility tests for dropdown behavior and keep content changes data-driven where possible.

**Tech Stack:** React, TypeScript, Vitest, Framer Motion, Tailwind CSS, EmailJS

---

## File Structure

- Modify: `tests/utils/contact.test.ts`
  - Extend existing utility coverage for homepage inquiry handling if needed.
- Create: `tests/utils/general-contact-dropdown.test.ts`
  - Add focused tests for dropdown state helpers so interaction logic is verified without brittle DOM-heavy tests.
- Create: `utils/generalContactDropdown.ts`
  - Hold small helper functions for keyboard navigation and option lookup used by the custom dropdown.
- Modify: `sections/GeneralContact.tsx`
  - Replace the native select with a custom dropdown trigger and options panel while keeping submission behavior unchanged.
- Modify: `data/profile.ts`
  - Refresh hero and about copy to match the current experience and stack.
- Modify: `data/featured.ts`
  - Tighten featured item descriptions and statuses to align with current vs completed work.
- Modify: `sections/Featured.tsx`
  - Rename the section heading and supporting label if needed so the content no longer conflicts with `Meridian Auctions` being a completed project.
- Modify: `data/projects.ts`
  - Reframe project descriptions to sound more outcome-driven and professionally positioned.
- Modify: `data/skills.ts`
  - Rename `AI` to `Automation & AI` and update the skill items to match the current stack.

### Task 1: Add Dropdown Helper Tests

**Files:**
- Create: `tests/utils/general-contact-dropdown.test.ts`
- Test: `tests/utils/general-contact-dropdown.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest';
import {
  getNextInquiryIndex,
  getPreviousInquiryIndex,
  isValidInquiryOption,
} from '@/utils/generalContactDropdown';

const options = [
  'Job Opportunity',
  'Project Collaboration',
  'Freelance Work',
  'Contract Role',
  'General Question',
] as const;

describe('general contact dropdown helpers', () => {
  it('moves focus to the next option and wraps at the end', () => {
    expect(getNextInquiryIndex(0, options)).toBe(1);
    expect(getNextInquiryIndex(4, options)).toBe(0);
  });

  it('moves focus to the previous option and wraps at the start', () => {
    expect(getPreviousInquiryIndex(2, options)).toBe(1);
    expect(getPreviousInquiryIndex(0, options)).toBe(4);
  });

  it('validates only approved inquiry options', () => {
    expect(isValidInquiryOption('Job Opportunity', options)).toBe(true);
    expect(isValidInquiryOption('Hackathon Team', options)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/utils/general-contact-dropdown.test.ts`
Expected: FAIL with module not found for `@/utils/generalContactDropdown`

- [ ] **Step 3: Write minimal implementation**

```ts
export function getNextInquiryIndex(currentIndex: number, options: readonly string[]) {
  return (currentIndex + 1) % options.length;
}

export function getPreviousInquiryIndex(currentIndex: number, options: readonly string[]) {
  return (currentIndex - 1 + options.length) % options.length;
}

export function isValidInquiryOption(value: string, options: readonly string[]) {
  return options.includes(value);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/utils/general-contact-dropdown.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/utils/general-contact-dropdown.test.ts utils/generalContactDropdown.ts
git commit -m "test: add homepage inquiry dropdown helpers"
```

### Task 2: Implement The Custom Homepage Dropdown

**Files:**
- Modify: `sections/GeneralContact.tsx`
- Modify: `tests/utils/contact.test.ts`
- Modify: `utils/generalContactDropdown.ts`
- Test: `tests/utils/general-contact-dropdown.test.ts`
- Test: `tests/utils/contact.test.ts`

- [ ] **Step 1: Write the failing test for any new helper behavior**

```ts
it('treats an empty inquiry value as invalid', () => {
  expect(isValidInquiryOption('', options)).toBe(false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/utils/general-contact-dropdown.test.ts`
Expected: FAIL with `expected true to be false` or missing empty-value handling

- [ ] **Step 3: Update the helper implementation**

```ts
export function isValidInquiryOption(value: string, options: readonly string[]) {
  return value.trim().length > 0 && options.includes(value);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/utils/general-contact-dropdown.test.ts`
Expected: PASS

- [ ] **Step 5: Replace the native select with a custom dropdown**

```tsx
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [highlightedIndex, setHighlightedIndex] = useState(0);

const selectedInquiryLabel = formData.inquiryType || 'Select Inquiry Type';

<div className="md:col-span-2">
  <span className="text-sm text-neutral-400">Inquiry Type</span>
  <div className="relative mt-2">
    <button
      type="button"
      name="inquiryType"
      aria-haspopup="listbox"
      aria-expanded={isDropdownOpen}
      className="flex w-full items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-left text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      onClick={() => setIsDropdownOpen((open) => !open)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setIsDropdownOpen(true);
          setHighlightedIndex((current) => getNextInquiryIndex(current, inquiryOptions));
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          setIsDropdownOpen(true);
          setHighlightedIndex((current) => getPreviousInquiryIndex(current, inquiryOptions));
        }
        if (event.key === 'Escape') {
          setIsDropdownOpen(false);
        }
      }}
    >
      <span className={formData.inquiryType ? 'text-white' : 'text-neutral-500'}>
        {selectedInquiryLabel}
      </span>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
      />
    </button>

    {isDropdownOpen ? (
      <div className="absolute left-0 right-0 z-20 mt-2 rounded-2xl border border-neutral-800 bg-black/95 p-2 shadow-2xl backdrop-blur">
        <p className="px-3 pb-2 pt-1 text-[10px] uppercase tracking-[0.24em] text-neutral-500">
          Select Inquiry Type
        </p>
        <ul role="listbox" className="space-y-1">
          {inquiryOptions.map((option, index) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={formData.inquiryType === option}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors ${
                  highlightedIndex === index || formData.inquiryType === option
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-400 hover:bg-neutral-950 hover:text-white'
                }`}
                onClick={() => {
                  setFormData({ ...formData, inquiryType: option });
                  setHighlightedIndex(index);
                  setIsDropdownOpen(false);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" aria-hidden="true" />
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
  </div>
</div>
```

- [ ] **Step 6: Run targeted tests**

Run: `npm test -- tests/utils/general-contact-dropdown.test.ts tests/utils/contact.test.ts`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add sections/GeneralContact.tsx tests/utils/contact.test.ts tests/utils/general-contact-dropdown.test.ts utils/generalContactDropdown.ts
git commit -m "feat: add custom homepage inquiry dropdown"
```

### Task 3: Refresh Hero And About Copy

**Files:**
- Modify: `data/profile.ts`
- Test: manual verification in browser

- [ ] **Step 1: Write the updated content directly in the data file**

```ts
export const profile = {
  name: "Louisse Dominique Bertillo",
  title: "Web Developer",
  hero: {
    label: "Louisse Dominique Bertillo",
    headline: "Building refined web experiences and scalable digital systems.",
    subtext: "I build high-performance websites, commerce experiences, and automation-ready products with a focus on clarity, performance, and long-term usability."
  },
  about: {
    title: "About",
    description: `I’m a Web Developer focused on building refined, production-ready digital experiences that balance visual quality, performance, and long-term scalability.

I work across modern websites, commerce builds, and product systems, while also improving internal operations through automation and AI-assisted workflows. Using tools like Shopify, n8n, Zapier, Claude, and Trae, I streamline manual processes, connect platforms, and help teams move faster with better systems.

My approach combines strong product thinking with operational efficiency. I care about how digital experiences look, how they perform, and how effectively they support real business goals.`
  }
};
```

- [ ] **Step 2: Run the build to verify the content compiles cleanly**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add data/profile.ts
git commit -m "content: refresh hero and about positioning"
```

### Task 4: Refresh Featured Work Positioning

**Files:**
- Modify: `data/featured.ts`
- Modify: `sections/Featured.tsx`
- Test: manual verification in browser

- [ ] **Step 1: Update the featured data copy**

```ts
export const featured = [
  {
    company: "ISSY Cosmetics",
    role: "Lead Web Developer",
    description: "Leading Shopify development, conversion-focused improvements, and interactive campaigns that support measurable e-commerce growth.",
    stat: "170% Sales Increase",
    link: "https://issycosmetics.com/",
    status: "Live Platform"
  },
  {
    company: "Fruit Jam",
    role: "Creator & Lead Developer",
    description: "Built and launched a browser game that scaled quickly through real-time gameplay, high request volume, and fast player adoption.",
    stat: "3.4k Players in 3 Days",
    link: "https://issyfruitjam.com/",
    status: "Launched Project"
  },
  {
    company: "La Fleur",
    role: "Web Developer",
    description: "Developed a polished florist storefront with stronger product presentation, smoother ordering, and clearer customer trust cues.",
    stat: "Live E-commerce Experience",
    link: "https://lafleurph.com/",
    status: "Live Platform"
  },
  {
    company: "Meridian Auctions",
    role: "Lead Full Stack Developer",
    description: "Delivered a full stack auction platform focused on real-time reliability, backend coordination, and scalable transaction handling.",
    stat: "High-Traffic System",
    link: "https://www.meridianauctions.com/",
    status: "3-Month Project"
  }
];
```

- [ ] **Step 2: Update the section heading copy**

```tsx
<H2 className="mb-0">Featured Work</H2>
<span className="text-neutral-500 text-sm">Selected platforms, launches, and systems work</span>
```

- [ ] **Step 3: Run the build to verify the section compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add data/featured.ts sections/Featured.tsx
git commit -m "content: reframe featured work section"
```

### Task 5: Refresh Projects Copy

**Files:**
- Modify: `data/projects.ts`
- Test: manual verification in browser

- [ ] **Step 1: Update the project descriptions**

```ts
export const projects: Project[] = [
  {
    title: "Fruit Jam",
    description: "A browser game launch that reached 3.4k players in 3 days while handling high real-time traffic and large request volume.",
    tech: "Web Game, Real-time Architecture, Database Optimization",
    category: "Game",
    live: "https://issyfruitjam.com/",
    featured: true
  },
  {
    title: "Game Library",
    description: "A React-based game hub designed to organize playable browser experiences with smooth navigation and lightweight UI.",
    tech: "React, JavaScript",
    category: "Game",
    live: "https://hesucrypt.github.io/game/",
    featured: true
  },
  {
    title: "3D Farming Game",
    description: "A web-based 3D interactive experience exploring gameplay mechanics, scene rendering, and browser-friendly immersion.",
    tech: "React, Three.js",
    category: "Game",
    live: "https://issy-farm.vercel.app/"
  },
  {
    title: "QC Weather Hub",
    description: "A location-aware weather dashboard focused on fast access to forecast data through a clean, responsive interface.",
    tech: "React, Weather API",
    category: "Web App",
    live: "https://hesucrypt.github.io/qc-weather-vibe/"
  },
  {
    title: "Appointment Scheduler",
    description: "A scheduling workflow that simplifies appointment booking, availability management, and customer coordination.",
    tech: "React, Supabase",
    category: "Business Site",
    live: "https://hesucrypt.github.io/appointment/"
  },
  {
    title: "Library Management System",
    description: "A backend-driven system built to manage books, borrowing records, and user transactions with structured data handling.",
    tech: "PHP, MySQL",
    category: "System"
  }
];
```

- [ ] **Step 2: Run the build to verify the updated data is valid**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add data/projects.ts
git commit -m "content: refine project descriptions"
```

### Task 6: Reframe Skills As Automation And AI

**Files:**
- Modify: `data/skills.ts`
- Test: manual verification in browser

- [ ] **Step 1: Update the skills data**

```ts
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
      "Zapier",
      "Claude",
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
      "GitHub",
      "Vercel",
      "Cloudflare",
      "Google Cloud Console",
      "ESLint",
      "PostCSS"
    ]
  }
];
```

- [ ] **Step 2: Run the build to verify the new category renders cleanly**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add data/skills.ts
git commit -m "content: reframe skills around automation and ai"
```

### Task 7: Final Verification

**Files:**
- Modify: none
- Test: `tests/utils/general-contact-dropdown.test.ts`
- Test: `tests/utils/contact.test.ts`

- [ ] **Step 1: Run the focused test suite**

Run: `npm test -- tests/utils/general-contact-dropdown.test.ts tests/utils/contact.test.ts`
Expected: PASS

- [ ] **Step 2: Run the full project test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Run diagnostics**

Run: `GetDiagnostics` on modified files
Expected: no new diagnostics

- [ ] **Step 5: Manual browser verification**

Run: `npm run dev -- --host 0.0.0.0 --port 3000`
Expected:
- homepage dropdown opens and closes correctly
- keyboard navigation works for the custom inquiry selector
- homepage copy feels stronger and less service-led
- featured heading no longer conflicts with `Meridian Auctions`
- skills list reflects `Automation & AI`

- [ ] **Step 6: Commit**

```bash
git add data/profile.ts data/featured.ts data/projects.ts data/skills.ts sections/Featured.tsx sections/GeneralContact.tsx tests/utils/general-contact-dropdown.test.ts utils/generalContactDropdown.ts
git commit -m "feat: refresh homepage content and dropdown"
```
