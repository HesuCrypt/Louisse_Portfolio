# Homepage Dropdown And Content Refresh Design

## Overview

This change combines two related improvements to the portfolio:

1. polish the homepage contact form so the `Inquiry Type` control looks closer to the approved visual reference through a custom dark dropdown panel
2. refresh the site copy and skills positioning so the portfolio better reflects Louisse's current experience in web development, e-commerce, automation, AI workflows, and systems thinking

The goal is not to turn the portfolio into a services-heavy pitch. The approved direction is to present Louisse as a strong web developer with practical automation and AI capability, using those strengths to build better products and more efficient systems.

## Goals

- Replace the homepage inquiry select with a more intentional custom dropdown experience.
- Keep the services page contact form unchanged in structure and intent.
- Update high-visibility site copy so it aligns with the latest `ISSY Cosmetics` and `Meridian Auctions` experience.
- Reposition the current `AI` skills area into a more credible `Automation & AI` framing.
- Reduce generic, overly templated, or service-led wording across the homepage.
- Make the overall narrative feel more cohesive for employers, collaborators, and clients.

## Non-Goals

- No reordering of the site sections in this pass.
- No redesign of the services packages or pricing logic.
- No changes to routing or page structure beyond the already approved contact split.
- No large visual redesign of the homepage outside the dropdown and copy refinements.
- No rewriting of every project entry unless the change improves positioning or removes outdated wording.

## Current State

The site currently has stronger experience data than supporting marketing copy.

### Content Gaps

The `Experience` section now communicates:

- active web development for `ISSY Cosmetics`
- operations and workflow automation
- use of `n8n`, `Zapier`, `Claude`, and `Trae`
- full stack and systems-level responsibility

However, the surrounding sections still skew toward an older profile:

- `Hero` focuses mainly on refined React interfaces
- `About` emphasizes frontend craft but not automation, e-commerce, or operational systems work
- `Skills` includes a generic `AI` category that undersells the practical nature of the work
- `Featured` mixes truly current platform work with a completed project under the `Current Platforms` label
- some project descriptions still read more like student or demo portfolio entries than professionally framed case studies

### Contact Gap

The homepage contact form now uses the correct general-contact structure, but the inquiry control is still a native `select`. It works functionally, but it does not yet match the approved reference direction for a more polished custom dark dropdown.

## Approved Direction

The approved positioning is `Web + Automation`.

This means the site should present Louisse as:

- a developer who builds polished, production-ready web experiences
- someone with strong commerce and product execution capability
- someone who also improves workflows and internal operations through automation and AI-assisted systems

The approved skills reframing is:

- rename `AI` to `Automation & AI`
- emphasize real operational use cases over generic AI phrasing

The approved homepage contact enhancement is:

- replace the native select with a custom dropdown panel styled close to the shared reference

## Proposed Copy Strategy

### Hero

The `Hero` should still lead with web development, but it should no longer sound limited to frontend presentation work.

Recommended direction:

- headline still focused on building refined digital experiences
- supporting text expanded to include commerce, scalable systems, and automation-minded execution

The tone should stay concise and premium, not overloaded with tool names.

### About

The `About` section should connect three ideas in one clear profile:

- refined web product development
- business-facing system and workflow improvement
- practical use of automation and AI to reduce manual work and improve operational efficiency

This should feel like one coherent profile, not a split between designer-developer work and separate automation work.

### Featured Work

The current section title `Current Platforms` should be reconsidered because `Meridian Auctions` is now framed as a finished `3-Month Project`.

Two acceptable approaches:

1. rename the section to `Featured Work`
2. keep `Current Platforms` but remove any non-current item from that section

Recommendation: rename the section to `Featured Work`. This preserves the strongest proof points without forcing the data to fit a misleading label.

### Projects

Project descriptions should sound more outcome-driven and more professionally framed.

Recommended adjustments:

- highlight scale, architecture, performance, or user value where relevant
- reduce wording that sounds like academic or practice projects
- keep concise summaries that support the stronger experience story

### Skills

The `Skills` section should reflect the current stack more accurately.

Recommended updates:

- rename `AI` to `Automation & AI`
- add `n8n`
- add `Zapier`
- keep `Claude`
- add `Trae`
- keep `Prompt Engineering`
- keep or refine `Workflow Automation`
- use practical labels such as `AI-Assisted Operations` and `Customer Support Automation`

The broader skill groups should also be reviewed so they support the same story. For example:

- `Platforms` should continue to include `Shopify`
- `Tools` may replace `Cursor` with `Trae` or include both if both are truly part of the workflow

## Custom Dropdown Design

### Purpose

The homepage `Inquiry Type` field should visually match the approved dark reference more closely than a native browser select while remaining accessible and easy to maintain.

### Interaction Model

The custom control should behave like this:

- closed state looks like a styled dark input row
- clicking the trigger opens a dark option panel beneath it
- selecting an option updates the field value and closes the panel
- clicking outside closes the panel
- keyboard interaction is supported

### Option Set

The options remain exactly:

- `Job Opportunity`
- `Project Collaboration`
- `Freelance Work`
- `Contract Role`
- `General Question`

### Accessibility Requirements

The custom dropdown should preserve accessibility basics:

- clear visible focus state on the trigger
- keyboard support for opening and selecting
- correct button semantics for the trigger and options
- closing behavior on outside click and escape
- selected value still included in the existing submission flow

### Scope Boundary

This custom dropdown applies only to the homepage `GeneralContact` component.

The services page `ProjectContact` form can continue using standard form controls because the user only requested the visual treatment for the homepage inquiry selector.

## Content Update Targets

The implementation pass should review and adjust the following files as needed:

- `data/profile.ts`
- `data/featured.ts`
- `data/projects.ts`
- `data/skills.ts`
- `sections/Featured.tsx`
- `sections/Hero.tsx` if copy or section label changes require small UI text updates
- `sections/GeneralContact.tsx` for the custom dropdown

`data/experience.ts` is already closer to the approved direction and should only be changed if minor wording cleanup is needed for consistency.

## Tone And Style Requirements

Updated text should:

- sound professional and human
- avoid overexplaining tools
- avoid generic AI marketing language
- avoid making the homepage feel like a services sales page
- support both employer and client audiences

Updated text should avoid:

- vague `AI` buzzword phrasing
- copy that sounds generated or overly polished
- excessive focus on freelance services
- long resume-style paragraphs

## Acceptance Criteria

- Homepage `Inquiry Type` uses a custom dropdown panel rather than a plain native select.
- The dropdown visually fits the dark site style and matches the approved direction more closely.
- The selected inquiry value still flows through EmailJS and mailto fallback behavior.
- The portfolio copy better reflects web development, commerce, automation, and systems work.
- `AI` is reframed into `Automation & AI` or an equivalent approved label.
- `Featured` section naming or contents no longer conflict with `Meridian Auctions` being a finished project.
- Skills and project descriptions better match the tone and credibility of the updated experience section.

## Testing And Verification

Manual verification should cover:

- homepage dropdown opens, closes, selects correctly, and remains usable with keyboard input
- homepage form submission still includes the selected inquiry type
- services contact form behavior remains unchanged
- updated homepage copy reads coherently from `Hero` through `About`, `Featured`, `Projects`, and `Skills`
- the portfolio no longer feels overly service-led when read as a whole
- section titles and descriptions accurately reflect current experience
