# Services Page And Pricing Localization Design

## Overview

This change separates website-development services from the portfolio landing page and turns them into a dedicated services experience. The homepage remains focused on Louisse's portfolio, credibility, and contact flow, while the new services page becomes the main destination for package pricing and service-specific calls to action.

The change also introduces estimated localized currency display for service pricing. Philippine peso remains the source of truth for all package prices, and international viewers see an approximate converted value based on their locale and the latest available exchange-rate response. Finally, the `Experience` data is updated with a new topmost `IT Officer` role.

## Goals

- Remove website-development package content from the homepage flow.
- Add a dedicated services page reachable from the global header.
- Add a clear `Services` link near `Contact` in the header.
- Keep the homepage portfolio-first and lightweight.
- Preserve PHP as the canonical price for all packages.
- Show an estimated converted local-currency amount for non-PHP viewers.
- Add the new `IT Officer` experience entry as the latest role.

## Non-Goals

- No CMS or admin interface for editing prices.
- No region-specific manual pricing tables.
- No checkout, payment gateway, or proposal builder.
- No redesign of unrelated portfolio sections beyond navigation adjustments needed for the new route.

## Current State

- The app is a Vite + React single-page portfolio with a section-based layout in `App.tsx`.
- `Header.tsx` currently uses anchor navigation for all items, including `#services`.
- `Services.tsx` already contains the package cards, comparison table, engagement terms, and trust items.
- `data/experience.ts` stores experience as a typed array with `company`, `role`, `type`, `period`, `website`, optional `highlight`, and `focus`.

## Proposed Architecture

### Routing

Introduce lightweight client-side page switching without overbuilding the app. The preferred implementation is a minimal route state tied to the browser location, using either:

1. A very small pathname-based router built in-app for `/` and `/services`, or
2. `react-router-dom` if the integration stays focused and does not add unnecessary complexity.

Recommendation: use a lightweight pathname-based router if the app only needs two routes. This keeps the codebase small and avoids adding a router dependency for a simple split.

Expected routes:

- `/` for the portfolio homepage
- `/services` for the website-development services page

### Homepage

The homepage keeps:

- `Header`
- `Hero`
- `About`
- `Experience`
- `Featured`
- `Projects`
- `Skills`
- `Contact`

The homepage removes:

- The inline `Services` section and its divider placement from the landing-page flow

### Services Page

The services page reuses the current service content rather than rebuilding it. It should include:

- Shared `Header`
- A services-page hero or intro block that frames the offer
- The existing package cards
- The comparison table
- Engagement terms
- Trust items
- Contact CTA

The services page should feel intentional rather than like a detached section copied from the homepage. A short intro at the top can clarify that the page is for fixed web-development packages and consultations.

## Navigation Behavior

### Header Content

Update the header so `Services` appears near `Contact`.

Desktop and mobile nav should both include:

- `About`
- `Experience`
- `Work`
- `Contact`
- `Services`

Ordering detail:

- Keep `Services` visually close to `Contact`
- `Services` links to `/services`
- Homepage section links continue to scroll to anchors when the user is on `/`
- If the user is on `/services` and clicks a homepage section item, navigate to `/#section-id` and then scroll to the target section

### Logo Behavior

The logo should navigate to `/`. If already on `/`, it can continue to smooth-scroll to the top.

## Pricing Localization

### Source Of Truth

Each package price is stored as a numeric PHP base value, not just a formatted string. Display formatting is derived from that source value.

Example conceptual model:

- `basePricePhp: 5000`
- `basePricePhp: 30000`
- `basePricePhp: 40000`
- `basePricePhp: 45000`

### Locale Detection

Detect the viewer locale in the browser using built-in browser APIs such as `navigator.language` and `Intl.NumberFormat().resolvedOptions()`.

Preferred behavior:

- If the detected currency is `PHP`, show the standard PHP display only
- If the detected currency is not `PHP`, show:
  - the PHP amount as the primary price
  - an estimated local-currency equivalent as secondary supporting text

Example display pattern:

- Primary: `PHP 30,000`
- Secondary: `Approx. USD 525`

### Exchange Rate Source

Use a client-side fetch to `https://api.frankfurter.app/latest?from=PHP`, which does not require a secret key for this scope. The response should be cached in memory for the session to avoid repeated requests.

Required behavior:

- Fetch once per session or page load
- Convert from PHP to the viewer currency
- Format values using `Intl.NumberFormat`
- Round to a clean, readable whole-number or low-decimal display depending on the target currency

### Fallbacks

If any of the following fail:

- locale detection
- currency detection
- exchange-rate fetch
- unsupported currency mapping

Then the UI falls back to PHP-only pricing with no broken placeholders.

### Trust Messaging

Because converted prices are approximate, the UI should include subtle supporting copy such as:

- `Estimated local price based on current exchange rates`

This note should stay secondary and not compete with the main package pricing.

## Services Data Refactor

Refactor service pricing data so the package model supports:

- numeric PHP base price
- derived formatted PHP price
- optional converted local price

This prevents fragile string parsing and keeps currency logic separate from presentation.

## Experience Update

Add a new first item to `data/experience.ts`:

- Role: `IT Officer`
- Period: `May 2026 - Present`
- Focus: use the full automation, systems integration, Zapier, `n8n`, Claude, and customer-service automation description provided by the user

Placement rules:

- Insert at the top of the experience array as the newest featured role
- Preserve existing type-safe object structure
- Keep the rest of the experience entries unchanged unless formatting needs minor normalization

The implementation should make the missing fields explicit rather than inventing a company website:

- `company`: `Confidential Company`
- `type`: `Full-time`
- `website`: empty string

Because `Experience.tsx` currently always renders a `Visit` button, the implementation should also make that button conditional so entries without a real website do not show a broken or misleading link.

## Error Handling

- Services page navigation should work even if JavaScript route state initializes late by using browser location as the source.
- Currency conversion failures should never block the page render.
- Price cards should render immediately with PHP, then progressively enhance with estimated local conversion.
- Mobile navigation state should close after route changes.

## Testing And Verification

Manual verification should cover:

- Homepage renders without the services section
- `/services` renders the package content correctly
- Header `Services` link works on desktop and mobile
- Clicking homepage nav items from `/services` returns to the correct homepage section
- Logo returns to homepage
- PHP visitors see PHP-only pricing
- Non-PHP visitors see PHP plus estimated localized currency
- Failed exchange-rate requests fall back to PHP-only pricing
- Experience section shows the new `IT Officer` role first

Automated tests are optional unless a small existing test pattern already exists nearby. If there is no test setup, focused manual verification is acceptable for this scope.

## Implementation Notes

- Prefer reusing `Services.tsx` as a page-level content block or extracting a shared content component rather than duplicating pricing markup.
- Keep navigation logic centralized in `Header.tsx` and the top-level app shell.
- Avoid introducing a heavy architecture for only two routes.
- Keep the currency logic in a small helper or hook so pricing display stays maintainable.

## Open Decisions Resolved

- Use a dedicated services page instead of a homepage section.
- Add `Services` near `Contact` in the header.
- Keep PHP as the canonical pricing source.
- Show estimated localized currency automatically for non-PHP viewers.
- Add the `IT Officer` experience entry at the top using the full supplied description.
