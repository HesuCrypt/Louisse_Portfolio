# Contact Flow Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the contact experience into a lightweight homepage inquiry form with a dropdown and a separate services-only project intake form.

**Architecture:** Replace the single shared `Contact` component with two focused components: one `GeneralContact` for broad homepage outreach and one `ProjectContact` for services leads. Keep EmailJS and mailto fallback behavior, but route homepage submissions through a simpler payload that includes `Inquiry Type` while preserving the existing project-intake payload on the services page.

**Tech Stack:** React 19, TypeScript, Vite, Framer Motion, EmailJS, Vitest

---

### Task 1: Add A Pure Contact Formatting Helper With Tests

**Files:**
- Create: `utils/contact.ts`
- Create: `tests/utils/contact.test.ts`

- [ ] **Step 1: Write the failing formatting test**

Create `tests/utils/contact.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  buildGeneralInquiryEmail,
  buildProjectInquiryEmail,
} from '@/utils/contact';

describe('contact email builders', () => {
  it('builds a general inquiry subject and body using inquiry type', () => {
    const result = buildGeneralInquiryEmail({
      name: 'Louisse',
      email: 'louisse@example.com',
      inquiryType: 'Job Opportunity',
      message: 'Would love to discuss a frontend role.',
    });

    expect(result.subject).toBe('New Inquiry: Job Opportunity');
    expect(result.body).toContain('Inquiry Type: Job Opportunity');
    expect(result.body).toContain('Message:\nWould love to discuss a frontend role.');
  });

  it('builds a project inquiry subject and body using project details', () => {
    const result = buildProjectInquiryEmail({
      name: 'Louisse',
      email: 'louisse@example.com',
      projectType: 'Business Website',
      budget: '₱30k-₱40k',
      timeline: 'Within 2-4 weeks',
      message: 'Need a conversion-focused site.',
    });

    expect(result.subject).toBe('New Project Inquiry: Business Website');
    expect(result.body).toContain('Budget: ₱30k-₱40k');
    expect(result.body).toContain('Timeline: Within 2-4 weeks');
  });
});
```

- [ ] **Step 2: Run the contact helper test and confirm it fails**

Run:

```bash
npm test -- tests/utils/contact.test.ts
```

Expected: FAIL with a module resolution error for `@/utils/contact`.

- [ ] **Step 3: Implement the minimal contact formatting helper**

Create `utils/contact.ts`:

```ts
export interface GeneralInquiryData {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

export interface ProjectInquiryData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface BuiltEmail {
  subject: string;
  body: string;
}

export function buildGeneralInquiryEmail(data: GeneralInquiryData): BuiltEmail {
  return {
    subject: `New Inquiry: ${data.inquiryType}`,
    body: `Name: ${data.name}
Email: ${data.email}
Inquiry Type: ${data.inquiryType}

Message:
${data.message}`,
  };
}

export function buildProjectInquiryEmail(data: ProjectInquiryData): BuiltEmail {
  return {
    subject: `New Project Inquiry: ${data.projectType}`,
    body: `Name: ${data.name}
Email: ${data.email}
Project Type: ${data.projectType}
Budget: ${data.budget}
Timeline: ${data.timeline}

Project Details:
${data.message}`,
  };
}
```

- [ ] **Step 4: Run the contact helper test and confirm it passes**

Run:

```bash
npm test -- tests/utils/contact.test.ts
```

Expected: PASS with 2 passing tests.

- [ ] **Step 5: Commit the helper and tests**

```bash
git add utils/contact.ts tests/utils/contact.test.ts
git commit -m "test: add contact inquiry formatting helpers"
```

### Task 2: Create The Homepage General Contact Variant

**Files:**
- Create: `sections/GeneralContact.tsx`
- Modify: `data/socials.ts` only if current links/copy need reuse updates
- Modify: `ui/Button.tsx` only if needed for focus-visible styles

- [ ] **Step 1: Create the homepage inquiry options constant inside the new component**

Create `sections/GeneralContact.tsx` with the approved dropdown options:

```ts
const inquiryOptions = [
  'Job Opportunity',
  'Project Collaboration',
  'Freelance Work',
  'Contract Role',
  'General Question',
] as const;
```

- [ ] **Step 2: Build the lightweight homepage form UI**

Use a form state shaped like this:

```ts
const [formData, setFormData] = useState({
  name: '',
  email: '',
  inquiryType: '',
  message: '',
});
```

Render these fields:

```tsx
<label className="text-sm text-neutral-400">
  Name
  <input
    required
    name="name"
    autoComplete="name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
  />
</label>

<label className="text-sm text-neutral-400">
  Email
  <input
    required
    type="email"
    name="email"
    autoComplete="email"
    spellCheck={false}
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
  />
</label>

<label className="text-sm text-neutral-400 md:col-span-2">
  Inquiry Type
  <select
    required
    name="inquiryType"
    autoComplete="off"
    value={formData.inquiryType}
    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
    className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
  >
    <option value="" disabled>Select inquiry type</option>
    {inquiryOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
</label>

<label className="text-sm text-neutral-400 md:col-span-2">
  Message
  <textarea
    required
    name="message"
    rows={5}
    value={formData.message}
    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
    placeholder="Tell me a bit about the role, project, or opportunity…"
    className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
  />
</label>
```

- [ ] **Step 3: Add general-contact copy instead of services copy**

Use content like this:

```tsx
<H2>Let’s Work Together</H2>

<Body className="text-xl md:text-2xl text-neutral-300 max-w-2xl">
  Reach out for job opportunities, contract roles, collaborations, freelance work, or general inquiries. I’ll get back to you as soon as I can.
</Body>

<p className="text-white text-sm mb-5">General Inquiry</p>
```

Use a submit CTA like:

```tsx
{isSubmitting ? 'Sending…' : 'Send Message'}
```

- [ ] **Step 4: Implement submission logic using the new helper**

Inside `handleSubmit`, use:

```ts
const builtEmail = buildGeneralInquiryEmail(formData);
```

Send this payload to EmailJS:

```ts
{
  name: formData.name,
  email: formData.email,
  inquiry_type: formData.inquiryType,
  message: formData.message,
}
```

Use the fallback mailto values:

```ts
const subject = encodeURIComponent(builtEmail.subject);
const body = encodeURIComponent(builtEmail.body);
```

- [ ] **Step 5: Commit the homepage contact variant**

```bash
git add sections/GeneralContact.tsx
git commit -m "feat: add general homepage contact form"
```

### Task 3: Create The Services Project Intake Variant

**Files:**
- Create: `sections/ProjectContact.tsx`
- Modify: `sections/Contact.tsx` only if turning it into a thin re-export while migrating

- [ ] **Step 1: Copy the existing service intake form into a dedicated project-contact component**

Create `sections/ProjectContact.tsx` using the current `Contact.tsx` structure as the base, keeping:

```ts
const [formData, setFormData] = useState({
  name: '',
  email: '',
  projectType: 'Business Website',
  budget: '₱30k-₱40k',
  timeline: 'Within 2-4 weeks',
  message: '',
});
```

Keep the services-specific fields:

```txt
Name
Email
Project Type
Budget Range
Preferred Timeline
Project Details
```

- [ ] **Step 2: Improve form quality while preserving the existing service flow**

Add these attributes to each input/select/textarea:

```tsx
name="name"
autoComplete="name"

name="email"
autoComplete="email"
spellCheck={false}

name="projectType"
autoComplete="off"

name="budget"
autoComplete="off"

name="timeline"
autoComplete="off"

name="message"
```

Replace `focus:outline-none focus:border-neutral-600` with:

```tsx
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-neutral-500
```

- [ ] **Step 3: Route project-contact submission through the helper**

Use:

```ts
const builtEmail = buildProjectInquiryEmail(formData);
```

Update the fallback values:

```ts
const subject = encodeURIComponent(builtEmail.subject);
const body = encodeURIComponent(builtEmail.body);
```

Keep service-oriented copy such as:

```tsx
Available for 2 projects this month
Let’s Work Together
Book a free consultation and share your project scope.
Project Intake Form
```

- [ ] **Step 4: Commit the project-contact component**

```bash
git add sections/ProjectContact.tsx
git commit -m "feat: split services project intake form"
```

### Task 4: Wire Each Page To The Correct Contact Variant

**Files:**
- Modify: `pages/HomePage.tsx`
- Modify: `pages/ServicesPage.tsx`
- Delete or Modify: `sections/Contact.tsx`

- [ ] **Step 1: Update the homepage to use `GeneralContact`**

Replace the import in `pages/HomePage.tsx`:

```tsx
import { GeneralContact } from '../sections/GeneralContact';
```

And replace the render:

```tsx
<GeneralContact />
```

- [ ] **Step 2: Update the services page to use `ProjectContact`**

Replace the import in `pages/ServicesPage.tsx`:

```tsx
import { ProjectContact } from '../sections/ProjectContact';
```

And replace the render:

```tsx
<ProjectContact />
```

- [ ] **Step 3: Remove the old shared contact component**

Preferred cleanup:

```bash
rm sections/Contact.tsx
```

If the file must stay temporarily, convert it into a thin re-export:

```ts
export { ProjectContact as Contact } from './ProjectContact';
```

Choose the cleaner option if no other files import `Contact`.

- [ ] **Step 4: Commit the page wiring**

```bash
git add pages/HomePage.tsx pages/ServicesPage.tsx sections/Contact.tsx
git commit -m "refactor: route homepage and services contact separately"
```

### Task 5: Verify Behavior And Finish QA

**Files:**
- Verify: `sections/GeneralContact.tsx`
- Verify: `sections/ProjectContact.tsx`
- Verify: `pages/HomePage.tsx`
- Verify: `pages/ServicesPage.tsx`

- [ ] **Step 1: Run the contact helper tests**

Run:

```bash
npm test -- tests/utils/contact.test.ts
```

Expected: PASS with 2 passing tests.

- [ ] **Step 2: Run the full test suite and production build**

Run:

```bash
npm test
npm run build
```

Expected: all Vitest suites PASS and the production build succeeds.

- [ ] **Step 3: Manually verify the split contact behavior**

Run:

```bash
npm run dev -- --host 0.0.0.0 --port 3000
```

Manual checklist:

```txt
Open the homepage and scroll to Contact.
Confirm the homepage form only shows Name, Email, Inquiry Type, and Message.
Confirm the homepage dropdown shows exactly Job Opportunity, Project Collaboration, Freelance Work, Contract Role, and General Question.
Confirm Hackathon Team is not present.
Confirm homepage copy does not mention packages, budgets, consultation, or project intake.
Open /services and confirm the detailed project intake form still shows Project Type, Budget Range, Preferred Timeline, and Project Details.
Confirm homepage submission includes Inquiry Type in the subject/body.
Confirm services submission still includes project type, budget, and timeline in the subject/body.
Confirm focus rings are visible on inputs, selects, textarea, and submit buttons.
```

- [ ] **Step 4: Commit the verified contact split**

```bash
git add sections/GeneralContact.tsx sections/ProjectContact.tsx pages/HomePage.tsx pages/ServicesPage.tsx
git commit -m "feat: split homepage and services contact flows"
```

## Self-Review

- Spec coverage:
  - Homepage general contact variant: Task 2
  - Services-only detailed intake variant: Task 3
  - Approved dropdown options with Hackathon Team removed: Task 2
  - Inquiry type included in payload and fallback email: Tasks 1 and 2
  - Form quality improvements: Task 3 and Task 5
- Placeholder scan: no `TODO`, `TBD`, or unresolved implementation notes remain.
- Type consistency:
  - `buildGeneralInquiryEmail` and `buildProjectInquiryEmail` are introduced before they are consumed
  - `GeneralContact` maps homepage inquiries
  - `ProjectContact` maps services project intake
