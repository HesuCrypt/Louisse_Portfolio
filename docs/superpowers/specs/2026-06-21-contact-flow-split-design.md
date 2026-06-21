# Contact Flow Split Design

## Overview

This change separates the contact experience into two distinct intents:

The homepage contact section should support broad professional outreach such as job opportunities, collaborations, contract work, freelance inquiries, and general questions.

The services page contact section should remain a detailed project intake flow for website clients who need package guidance, budget alignment, and timeline planning.

This update also introduces a homepage inquiry dropdown styled more intentionally, based on the reference direction approved by the user.

## Goals

- Keep the homepage contact form general and hiring-friendly.
- Keep the services page contact form focused on website project intake.
- Add a homepage `Inquiry Type` dropdown with user-approved options.
- Preserve the existing dark visual language while making the homepage form feel less sales-oriented.
- Improve contact intent clarity without changing the overall site structure.

## Non-Goals

- No redesign of unrelated homepage sections.
- No changes to the service package content.
- No backend changes beyond mapping the new homepage inquiry type into the existing email submission flow.
- No multi-step form logic.

## Current State

The current `Contact` component is reused on both the homepage and the services page.

It is written entirely as a project intake form:

- `Available for 2 projects this month`
- `Book a free consultation`
- `Project Intake Form`
- package-oriented fields like `Project Type`, `Budget Range`, and `Preferred Timeline`

This works on the services page, but it creates friction on the homepage because not every visitor is looking for a freelance website project. Some users may want to hire Louisse, discuss a contract role, collaborate, or simply ask a question.

## Approved Direction

The approved split is:

- Homepage: lightweight general contact form
- Services page: detailed project intake form

The homepage inquiry dropdown should include exactly:

- `Job Opportunity`
- `Project Collaboration`
- `Freelance Work`
- `Contract Role`
- `General Question`

The previously suggested `Hackathon Team` option is explicitly removed.

## Proposed Architecture

### Contact Variants

Split the current shared contact experience into two focused variants:

- `GeneralContact` for the homepage
- `ProjectContact` for the services page

These can be implemented either as:

1. two separate components, or
2. one shared base plus variant-specific configuration

Recommendation: use two focused components if that keeps the copy and field logic easier to reason about. The form intents are different enough that forced reuse may create awkward conditional logic.

### Page Usage

- `HomePage.tsx` should render `GeneralContact`
- `ServicesPage.tsx` should render `ProjectContact`

## Homepage Contact Design

### Purpose

The homepage contact form should feel open-ended and professional rather than like a sales funnel.

It should support:

- employers
- recruiters
- collaborators
- freelance clients
- general outreach

### Fields

The homepage form should include:

- `Name`
- `Email`
- `Inquiry Type`
- `Message`

### Inquiry Dropdown

The `Inquiry Type` field should use a dropdown-style control and include:

- `Job Opportunity`
- `Project Collaboration`
- `Freelance Work`
- `Contract Role`
- `General Question`

### Copy Direction

Homepage contact copy should shift away from package-selling language.

Recommended direction:

- Heading: `Let’s Work Together` or `Get In Touch`
- Supporting copy: invite hiring conversations, collaborations, contract discussions, and general inquiries
- Submit CTA: `Send Message` or `Contact Me`

The homepage should not mention:

- free consultation
- packages
- budget selection
- implementation plan recommendations
- availability limited to projects

### Submission Behavior

The selected inquiry type should be included in:

- the EmailJS payload
- the mailto fallback subject
- the mailto fallback body

This keeps inbox organization clean without changing the core delivery method.

## Services Contact Design

### Purpose

The services page contact form should stay optimized for project leads and website package inquiries.

### Fields

The services page should keep the detailed intake structure:

- `Name`
- `Email`
- `Project Type`
- `Budget Range`
- `Preferred Timeline`
- `Project Details`

### Copy Direction

The services page should continue using service-oriented messaging such as:

- consultation
- project scope
- package recommendation
- budget and timeline alignment

This keeps the page conversion-focused for actual clients.

## UX Notes

- The homepage dropdown should visually feel more custom and intentional than a generic browser form control.
- The dropdown can still be implemented with a native `<select>` if styling remains polished and accessible.
- The homepage contact should read as broad professional outreach.
- The services contact should read as qualified project intake.

## Accessibility And Form Quality

The implementation should improve the current form quality while making this change:

- add `name` and `autocomplete` attributes where appropriate
- keep clear visible focus states
- preserve label-to-control association
- keep button copy specific to the form intent

## Content Cleanup Related To This Change

As part of the same implementation pass, user-facing contact copy should avoid phrases that feel overly templated or AI-generated.

Examples to replace on the homepage variant:

- `Available for 2 projects this month`
- `Book a free consultation`
- `Project Intake Form`

## Acceptance Criteria

- Homepage uses a general contact form, not the website project intake form.
- Services page keeps the detailed project intake form.
- Homepage `Inquiry Type` dropdown includes only the five approved choices.
- `Hackathon Team` is not present.
- Homepage contact copy feels broader and more hiring-friendly.
- Services contact copy remains service and package oriented.
- Selected homepage inquiry type is included in submission payload and fallback email content.

## Testing And Verification

Manual verification should cover:

- homepage renders the lighter general contact form
- services page renders the detailed intake form
- homepage dropdown shows the five approved choices
- homepage submission includes the selected inquiry type
- services submission still includes project type, budget, and timeline
- homepage and services page copy clearly communicate different intents
