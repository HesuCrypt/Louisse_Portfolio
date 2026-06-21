# Services Page And Pricing Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split website-development packages into a dedicated `/services` page, add route-aware header navigation, localize service prices with PHP as the source of truth, and add the new `IT Officer` experience entry.

**Architecture:** Keep the app lightweight by using a tiny pathname-based router in `App.tsx` plus pure helpers in `utils/routing.ts`. Move service package data into `data/services.ts`, calculate localized price estimates with a small currency helper + hook, and reuse the existing `Services` markup on the new page rather than duplicating the UI.

**Tech Stack:** React 19, TypeScript, Vite, Framer Motion, Vitest, JSDOM

---

### Task 1: Add Routing Helpers And Test Harness

**Files:**
- Create: `utils/routing.ts`
- Create: `tests/utils/routing.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json`
- Modify: `tsconfig.json`

- [ ] **Step 1: Add test scripts and test dependencies**

Update `package.json` so the project can run focused unit tests for pure helpers without changing the app architecture first.

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Run:

```bash
npm install -D vitest jsdom
```

Expected: npm adds `vitest` and `jsdom` to `devDependencies` and updates `package-lock.json`.

- [ ] **Step 2: Add Vitest config and TypeScript test types**

Create `vitest.config.ts`:

```ts
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
```

Update `tsconfig.json` so test files compile cleanly:

```json
{
  "compilerOptions": {
    "types": ["node", "vitest/globals"]
  }
}
```

- [ ] **Step 3: Write the failing routing test**

Create `tests/utils/routing.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  buildHomeSectionPath,
  getAppRoute,
  isServicesRoute,
  normalizeSectionHash,
} from '@/utils/routing';

describe('routing helpers', () => {
  it('maps /services to the services route', () => {
    expect(getAppRoute('/services')).toBe('/services');
    expect(isServicesRoute('/services')).toBe(true);
  });

  it('falls back unknown paths to the homepage route', () => {
    expect(getAppRoute('/unknown')).toBe('/');
    expect(isServicesRoute('/unknown')).toBe(false);
  });

  it('builds homepage section URLs and strips the leading hash', () => {
    expect(buildHomeSectionPath('contact')).toBe('/#contact');
    expect(normalizeSectionHash('#experience')).toBe('experience');
    expect(normalizeSectionHash('skills')).toBe('skills');
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run:

```bash
npm test -- tests/utils/routing.test.ts
```

Expected: FAIL with a module-not-found error for `@/utils/routing`.

- [ ] **Step 5: Implement the routing helper**

Create `utils/routing.ts`:

```ts
export type AppRoute = '/' | '/services';

export function getAppRoute(pathname: string): AppRoute {
  return pathname === '/services' ? '/services' : '/';
}

export function isServicesRoute(pathname: string): boolean {
  return getAppRoute(pathname) === '/services';
}

export function normalizeSectionHash(value: string): string {
  return value.startsWith('#') ? value.slice(1) : value;
}

export function buildHomeSectionPath(sectionId: string): string {
  return `/#${normalizeSectionHash(sectionId)}`;
}
```

- [ ] **Step 6: Run the routing test to verify it passes**

Run:

```bash
npm test -- tests/utils/routing.test.ts
```

Expected: PASS with 3 passing assertions.

- [ ] **Step 7: Commit the helper/test harness**

```bash
git add package.json package-lock.json tsconfig.json vitest.config.ts utils/routing.ts tests/utils/routing.test.ts
git commit -m "test: add routing helper coverage"
```

### Task 2: Extract Services Data And Add Currency Localization Logic

**Files:**
- Create: `data/services.ts`
- Create: `utils/currency.ts`
- Create: `hooks/useLocalizedCurrency.ts`
- Create: `tests/utils/currency.test.ts`
- Modify: `sections/Services.tsx`

- [ ] **Step 1: Write the failing currency tests**

Create `tests/utils/currency.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  convertPhpAmount,
  detectCurrencyFromLocale,
  formatMoney,
} from '@/utils/currency';

describe('currency helpers', () => {
  it('maps common locales to their display currency', () => {
    expect(detectCurrencyFromLocale('en-US')).toBe('USD');
    expect(detectCurrencyFromLocale('en-GB')).toBe('GBP');
    expect(detectCurrencyFromLocale('en-PH')).toBe('PHP');
  });

  it('falls back unknown locales to PHP', () => {
    expect(detectCurrencyFromLocale('und')).toBe('PHP');
  });

  it('converts PHP prices using the fetched rate table', () => {
    expect(convertPhpAmount(30000, 'USD', { USD: 0.0175 })).toBeCloseTo(525);
  });

  it('formats readable currency labels', () => {
    expect(formatMoney(30000, 'PHP')).toBe('PHP 30,000');
    expect(formatMoney(525, 'USD')).toBe('USD 525');
  });
});
```

- [ ] **Step 2: Run the currency test to verify it fails**

Run:

```bash
npm test -- tests/utils/currency.test.ts
```

Expected: FAIL with a module-not-found error for `@/utils/currency`.

- [ ] **Step 3: Move package data into a dedicated data module**

Create `data/services.ts` and store PHP base prices as numbers:

```ts
export interface ServicePackage {
  id: string;
  title: string;
  basePricePhp: number;
  scopeLine: string;
  summary: [string, string];
  pagesTitle: string;
  pages: string[];
  extrasTitle: string;
  extras: string[];
  bestFor: string;
  popular: boolean;
}

export const servicePackages: ServicePackage[] = [
  {
    id: 'portfolio-starter',
    title: 'Portfolio Starter Package',
    basePricePhp: 5000,
    scopeLine: '2 pages · quick personal showcase',
    summary: [
      'Fastest way to go live: home + work, minimal moving parts.',
      'Not included: About/Services pages, working form backend, or multi-section business layouts.',
    ],
    pagesTitle: 'Pages (PHP 3,000 value)',
    pages: ['Home Page', 'Portfolio / Projects Page'],
    extrasTitle: 'Included Extras (PHP 2,000 value)',
    extras: [
      'Mobile-friendly layout (2 pages)',
      'Project grid / showcase for your work',
      'Social profile links (icons + URLs)',
      'Contact via mailto or simple CTA block (no form integration)',
      'Light SEO: page titles & meta descriptions',
    ],
    bestFor: 'Freelancers, designers, developers, photographers—anyone who mainly needs “here’s my work.”',
    popular: false,
  },
  {
    id: 'starter-website',
    title: 'Starter Website Package',
    basePricePhp: 30000,
    scopeLine: '3 core pages · clean brand presence',
    summary: [
      'Built for businesses that need a polished online presence with a clear message and a real inquiry flow.',
      'Best starting tier for launching professionally before adding heavier features like gallery, maps, and content modules.',
    ],
    pagesTitle: 'Pages (PHP 18,000 value)',
    pages: ['Home Page', 'About Page', 'Contact Page'],
    extrasTitle: 'Included Extras (PHP 12,000 value)',
    extras: [
      'Responsive layout (phone, tablet, desktop)',
      'Contact form with validation + email delivery setup',
      'On-brand section design and clear page hierarchy',
      'Social links + footer essentials',
      'Basic on-page SEO (titles, meta, headings)',
      'Speed baseline setup (compressed assets + clean structure)',
    ],
    bestFor: 'Small businesses, personal brands, startups validating their offer online.',
    popular: false,
  },
];
```

Add the existing `business-website`, `professional-website`, `trustItems`, `engagementTerms`, and `comparisonRows` entries in the same file with the same content already present in `sections/Services.tsx`.

- [ ] **Step 4: Implement currency helpers and the localization hook**

Create `utils/currency.ts`:

```ts
const REGION_TO_CURRENCY: Record<string, string> = {
  AU: 'AUD',
  CA: 'CAD',
  DE: 'EUR',
  ES: 'EUR',
  FR: 'EUR',
  GB: 'GBP',
  IE: 'EUR',
  IT: 'EUR',
  JP: 'JPY',
  NL: 'EUR',
  NZ: 'NZD',
  PH: 'PHP',
  SG: 'SGD',
  US: 'USD',
};

export function detectCurrencyFromLocale(locale: string): string {
  try {
    const region = new Intl.Locale(locale).maximize().region;
    return (region && REGION_TO_CURRENCY[region]) || 'PHP';
  } catch {
    return 'PHP';
  }
}

export function convertPhpAmount(
  phpAmount: number,
  currency: string,
  rates: Record<string, number>,
): number | null {
  if (currency === 'PHP') return phpAmount;
  const rate = rates[currency];
  if (!rate) return null;
  return phpAmount * rate;
}

export function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'JPY' ? 0 : 0,
  })
    .format(amount)
    .replace(/\u00A0/g, ' ');
}
```

Create `hooks/useLocalizedCurrency.ts`:

```ts
import { useEffect, useMemo, useState } from 'react';
import { convertPhpAmount, detectCurrencyFromLocale, formatMoney } from '@/utils/currency';

interface CurrencyState {
  viewerCurrency: string;
  rates: Record<string, number>;
  status: 'idle' | 'ready' | 'error';
}

export function useLocalizedCurrency() {
  const [state, setState] = useState<CurrencyState>({
    viewerCurrency: 'PHP',
    rates: {},
    status: 'idle',
  });

  useEffect(() => {
    const viewerCurrency = detectCurrencyFromLocale(navigator.language);
    if (viewerCurrency === 'PHP') {
      setState({ viewerCurrency, rates: {}, status: 'ready' });
      return;
    }

    let cancelled = false;

    fetch('https://api.frankfurter.app/latest?from=PHP')
      .then((response) => response.json())
      .then((data: { rates?: Record<string, number> }) => {
        if (!cancelled) {
          setState({
            viewerCurrency,
            rates: data.rates ?? {},
            status: 'ready',
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ viewerCurrency: 'PHP', rates: {}, status: 'error' });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const helpers = useMemo(
    () => ({
      viewerCurrency: state.viewerCurrency,
      formatPhpPrice: (amount: number) => formatMoney(amount, 'PHP'),
      formatEstimatedPrice: (amount: number) => {
        const converted = convertPhpAmount(amount, state.viewerCurrency, state.rates);
        return converted == null || state.viewerCurrency === 'PHP'
          ? null
          : formatMoney(Math.round(converted), state.viewerCurrency);
      },
      showEstimate: state.viewerCurrency !== 'PHP' && state.status === 'ready',
    }),
    [state],
  );

  return helpers;
}
```

- [ ] **Step 5: Update `sections/Services.tsx` to consume shared data and localized price helpers**

Replace the inline arrays at the top of `sections/Services.tsx` with imports:

```ts
import {
  comparisonRows,
  engagementTerms,
  servicePackages,
  trustItems,
} from '@/data/services';
import { useLocalizedCurrency } from '@/hooks/useLocalizedCurrency';
```

Update the component body so each card renders PHP first and a secondary estimate when available:

```tsx
const { formatPhpPrice, formatEstimatedPrice, showEstimate } = useLocalizedCurrency();

{servicePackages.map((card) => {
  const estimatedPrice = formatEstimatedPrice(card.basePricePhp);

  return (
    <motion.article key={card.id} className="h-full flex flex-col rounded-2xl border bg-neutral-900/50 backdrop-blur-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
        <p className="text-2xl font-bold text-white">{formatPhpPrice(card.basePricePhp)}</p>
        {showEstimate && estimatedPrice && (
          <p className="mt-2 text-sm text-neutral-400">
            Approx. {estimatedPrice}
          </p>
        )}
        {showEstimate && estimatedPrice && (
          <p className="mt-1 text-[11px] text-neutral-500">
            Estimated local price based on current exchange rates
          </p>
        )}
      </div>
    </motion.article>
  );
})}
```

- [ ] **Step 6: Run the currency tests to verify they pass**

Run:

```bash
npm test -- tests/utils/currency.test.ts
```

Expected: PASS with 4 passing assertions.

- [ ] **Step 7: Commit the pricing data and currency logic**

```bash
git add data/services.ts hooks/useLocalizedCurrency.ts utils/currency.ts sections/Services.tsx tests/utils/currency.test.ts
git commit -m "feat: localize service pricing display"
```

### Task 3: Split The App Into Home And Services Routes

**Files:**
- Create: `pages/HomePage.tsx`
- Create: `pages/ServicesPage.tsx`
- Modify: `App.tsx`

- [ ] **Step 1: Create a homepage component that preserves the current landing-page flow minus services**

Create `pages/HomePage.tsx`:

```tsx
import React from 'react';
import { About } from '@/sections/About';
import { Contact } from '@/sections/Contact';
import { Experience } from '@/sections/Experience';
import { Featured } from '@/sections/Featured';
import { Hero } from '@/sections/Hero';
import { Projects } from '@/sections/Projects';
import { Skills } from '@/sections/Skills';
import { Divider } from '@/ui/Divider';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Experience />
      <Divider />
      <Featured />
      <Divider />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Contact />
    </>
  );
};
```

- [ ] **Step 2: Create the dedicated services page**

Create `pages/ServicesPage.tsx`:

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Services } from '@/sections/Services';
import { Contact } from '@/sections/Contact';
import { Container } from '@/ui/Container';
import { Body, H1 } from '@/ui/Text';
import { Divider } from '@/ui/Divider';

export const ServicesPage: React.FC = () => {
  return (
    <>
      <section className="pt-32 pb-16">
        <Container>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm uppercase tracking-[0.24em] text-neutral-500 mb-4">Services</p>
            <H1 className="max-w-3xl mb-4">Website packages built for launch, conversion, and long-term growth.</H1>
            <Body className="text-neutral-400 !max-w-2xl">
              Choose a fixed-scope package, compare inclusions, and reach out when you want a version tailored to your niche.
            </Body>
          </motion.div>
        </Container>
      </section>
      <Services />
      <Divider />
      <Contact />
    </>
  );
};
```

- [ ] **Step 3: Update `App.tsx` to select the correct page from the browser pathname**

Replace the body of `App.tsx` with a shared shell:

```tsx
import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './sections/Header';
import { LoadingScreen } from './ui/LoadingScreen';
import { AIChatWidget } from './ui/AIChatWidget';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { getAppRoute } from './utils/routing';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', syncPathname);
    return () => window.removeEventListener('popstate', syncPathname);
  }, []);

  const route = useMemo(() => getAppRoute(pathname), [pathname]);

  return (
    <main className="min-h-screen w-full bg-background text-neutral-300 selection:bg-white/20 relative">
      <AnimatePresence mode="wait">{loading && <LoadingScreen key="loader" />}</AnimatePresence>
      {!loading && (
        <div>
          <Header currentRoute={route} />
          {route === '/services' ? <ServicesPage /> : <HomePage />}
          <footer className="py-12 text-center text-neutral-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Louisse Dominique Bertillo. All rights reserved.</p>
          </footer>
          <AIChatWidget />
        </div>
      )}
    </main>
  );
}
```

- [ ] **Step 4: Run route and currency tests plus a production build**

Run:

```bash
npm test -- tests/utils/routing.test.ts tests/utils/currency.test.ts
npm run build
```

Expected: both test files PASS and Vite build completes successfully.

- [ ] **Step 5: Commit the route split**

```bash
git add App.tsx pages/HomePage.tsx pages/ServicesPage.tsx
git commit -m "feat: split portfolio and services routes"
```

### Task 4: Make Header Navigation Route-Aware

**Files:**
- Modify: `sections/Header.tsx`
- Modify: `utils/routing.ts`

- [ ] **Step 1: Extend routing helpers with navigation helpers**

Update `utils/routing.ts`:

```ts
export function pushRoute(path: string): void {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function scrollToSection(sectionId: string, offset = 80): void {
  const element = document.getElementById(normalizeSectionHash(sectionId));
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({
    top: elementPosition - offset,
    behavior: 'smooth',
  });
}
```

- [ ] **Step 2: Update `Header.tsx` so services goes to `/services` and home-section items work from both routes**

Refactor `sections/Header.tsx` around a route-aware nav item model:

```tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Menu, X } from 'lucide-react';
import { AppRoute, buildHomeSectionPath, pushRoute, scrollToSection } from '../utils/routing';

interface HeaderProps {
  currentRoute: AppRoute;
}

const navItems = [
  { name: 'About', sectionId: 'about' },
  { name: 'Experience', sectionId: 'experience' },
  { name: 'Work', sectionId: 'featured' },
  { name: 'Contact', sectionId: 'contact' },
  { name: 'Services', path: '/services' },
] as const;

export const Header: React.FC<HeaderProps> = ({ currentRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (currentRoute === '/' && window.location.hash) {
      requestAnimationFrame(() => scrollToSection(window.location.hash));
    } else if (currentRoute === '/services') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [currentRoute]);

  const handleNav = (item: (typeof navItems)[number]) => {
    setIsOpen(false);

    if ('path' in item) {
      pushRoute(item.path);
      return;
    }

    if (currentRoute === '/') {
      scrollToSection(item.sectionId);
      return;
    }

    pushRoute(buildHomeSectionPath(item.sectionId));
  };

  const handleLogoClick = () => {
    setIsOpen(false);
    if (currentRoute === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    pushRoute('/');
  };
```

Use buttons instead of anchors inside the desktop and mobile nav lists:

```tsx
<button
  key={item.name}
  type="button"
  onClick={() => handleNav(item)}
  className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
>
  {item.name}
</button>
```

And update the logo:

```tsx
<button
  type="button"
  onClick={handleLogoClick}
  className="text-xl font-medium tracking-tight text-white hover:opacity-80 transition-opacity z-50 relative"
>
  Louisse.
</button>
```

- [ ] **Step 3: Run tests and build after the header refactor**

Run:

```bash
npm test -- tests/utils/routing.test.ts tests/utils/currency.test.ts
npm run build
```

Expected: PASS for tests and a successful Vite build with no TypeScript errors.

- [ ] **Step 4: Commit the navigation change**

```bash
git add sections/Header.tsx utils/routing.ts
git commit -m "feat: add route-aware header navigation"
```

### Task 5: Add The IT Officer Experience Entry And Finish QA

**Files:**
- Modify: `data/experience.ts`
- Modify: `sections/Experience.tsx`

- [ ] **Step 1: Add the new latest role to `data/experience.ts`**

Insert this object at the top of the `experience` array:

```ts
{
  company: 'Confidential Company',
  role: 'IT Officer',
  type: 'Full-time',
  period: 'May 2026 - Present',
  website: '',
  focus:
    'I analyze internal business operations to eliminate structural bottlenecks and transform manual processes into streamlined, automated workflows. By leveraging advanced integration platforms like Zapier and n8n, I design and deploy scalable multi-step pipelines that connect disparate office systems. Additionally, I integrate cutting-edge AI technologies (Claude) to automate data extraction and intelligent decision-making, while building dedicated customer service automation systems that drastically reduce response times and improve overall workflow efficiency to support company growth.',
},
```

- [ ] **Step 2: Make the visit button conditional in `sections/Experience.tsx`**

Replace the unconditional button block with a guarded render:

```tsx
{'website' in job && job.website && (
  <Button
    href={job.website}
    variant="link"
    className="text-xs text-neutral-500 hover:text-white"
    icon={<ExternalLink size={12} />}
  >
    Visit
  </Button>
)}
```

Use the simpler guard if preferred:

```tsx
{job.website ? (
  <Button
    href={job.website}
    variant="link"
    className="text-xs text-neutral-500 hover:text-white"
    icon={<ExternalLink size={12} />}
  >
    Visit
  </Button>
) : null}
```

- [ ] **Step 3: Run the full test/build check**

Run:

```bash
npm test
npm run build
```

Expected: all Vitest suites PASS and the production build succeeds.

- [ ] **Step 4: Manually verify the user-facing behavior**

Run:

```bash
npm run dev
```

Manual checklist:

```txt
- Open / and confirm the homepage no longer shows the services pricing section.
- Click Services in the header and confirm it opens /services.
- From /services, click About, Experience, Work, and Contact and confirm each returns to the correct homepage section.
- Confirm the mobile menu still opens, closes, and navigates correctly.
- Confirm PHP pricing always renders first.
- Confirm a non-PHP locale shows "Approx." text under package prices when the exchange-rate fetch succeeds.
- Simulate an exchange-rate failure in DevTools and confirm the UI falls back to PHP-only pricing.
- Confirm the new IT Officer role appears first in Experience and does not render a broken Visit button.
```

- [ ] **Step 5: Commit the experience update and final polish**

```bash
git add data/experience.ts sections/Experience.tsx
git commit -m "feat: add services page and experience update"
```

## Self-Review

- Spec coverage:
  - Dedicated services page: Task 3
  - Header link near contact and cross-route nav: Task 4
  - PHP-first localized pricing with fallback: Task 2
  - New IT Officer entry and conditional Visit button: Task 5
  - Verification for build/mobile/fallback flows: Task 5
- Placeholder scan: no `TODO`, `TBD`, or unresolved “implement later” notes remain.
- Type consistency:
  - Route type is consistently `AppRoute`
  - Service package pricing field is consistently `basePricePhp`
  - Currency helpers consistently use `detectCurrencyFromLocale`, `convertPhpAmount`, and `formatMoney`

