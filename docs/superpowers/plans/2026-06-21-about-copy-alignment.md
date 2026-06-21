# About Copy Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the `About` section copy so it aligns with the newer experience entries around web development, automation, AI workflows, and systems integration.

**Architecture:** Keep the change limited to content by editing only `profile.about.description` in `data/profile.ts`. Reuse the existing paragraph-splitting behavior in `sections/About.tsx`, which already renders multi-paragraph text correctly from a single template string.

**Tech Stack:** React 19, TypeScript, Vite

---

### Task 1: Replace The About Copy In Profile Data

**Files:**
- Modify: `data/profile.ts`
- Verify: `sections/About.tsx`

- [ ] **Step 1: Confirm the current About renderer already supports multi-paragraph text**

Review `sections/About.tsx` and confirm this logic remains unchanged:

```tsx
{profile.about.description.split('\n\n').map((paragraph, index) => (
  <Body key={index} className="text-lg md:text-xl leading-relaxed">
    {paragraph}
  </Body>
))}
```

Expected: the component already splits the description on blank lines, so only the content in `data/profile.ts` needs to change.

- [ ] **Step 2: Replace the existing About description with the approved copy**

Update `data/profile.ts` so the `description` field becomes:

```ts
description: `I’m a Web Developer focused on building refined, production-ready digital experiences that balance visual quality, performance, and long-term scalability.

Beyond frontend development, I also work on improving business operations through automation, systems integration, and AI-assisted workflows. I use tools like n8n, Zapier, Claude, and Trae to streamline manual processes, connect internal platforms, and build smarter systems that support faster decision-making and more efficient customer support.

My approach combines strong product thinking with operational efficiency. I care about how systems look, how they perform, and how effectively they help teams and users move through real work.`
```

- [ ] **Step 3: Run a production build to verify the content update does not break the app**

Run:

```bash
npm run build
```

Expected: Vite build succeeds with no TypeScript or bundling errors.

- [ ] **Step 4: Manually verify the About section in the browser**

Run:

```bash
npm run dev -- --host 0.0.0.0 --port 3000
```

Manual checklist:

```txt
Open the homepage and scroll to About.
Confirm the new text renders as three clean paragraphs.
Confirm the tone now matches the updated IT Officer and Web Developer entries.
Confirm the copy mentions n8n, Zapier, Claude, and Trae naturally.
Confirm the About copy does not use dash-led phrasing or em dash style.
```

- [ ] **Step 5: Commit the content update**

```bash
git add data/profile.ts
git commit -m "content: align about copy with experience updates"
```

## Self-Review

- Spec coverage:
  - Align About with updated experience: Task 1 Step 2
  - Keep web development central while adding automation and AI: Task 1 Step 2
  - Avoid dash-led phrasing and em dash style: Task 1 Step 2 and Step 4
  - Limit changes to `profile.about.description`: Task 1
- Placeholder scan: no `TODO`, `TBD`, or deferred implementation notes remain.
- Type consistency:
  - The plan only changes the existing `profile.about.description` string field
  - The existing paragraph rendering in `sections/About.tsx` is reused unchanged
