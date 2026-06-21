# About Copy Alignment Design

## Overview

This change updates the `About` section copy in `data/profile.ts` so it reflects the user's current experience more accurately. The existing text positions Louisse primarily as a frontend-focused web developer. The revised copy should still preserve that identity, but expand it to include operations automation, AI-assisted workflows, systems integration, and business efficiency work now reflected in the `Experience` section.

The rewrite should also follow the user's style preference to avoid dash-led phrasing and keep the writing clean, direct, and professional.

## Goals

- Align the `About` section with the latest `Experience` entries.
- Present Louisse as both a web developer and an automation-minded systems builder.
- Mention platforms and tools in a natural way, including `n8n`, `Zapier`, `Claude`, and `Trae`.
- Keep the tone portfolio-ready for both clients and employers.
- Avoid dash-led phrasing and avoid em dash style in the new copy.

## Non-Goals

- No layout changes to the `About` section.
- No changes to the `Hero` section or profile title.
- No restructuring of the `About` component.
- No changes to other profile fields outside `profile.about.description`.

## Current State

The current `About` copy emphasizes:

- clean, scalable, production-ready web applications
- React and modern UI systems
- performance, accessibility, and maintainability
- visual polish, motion, and responsiveness

This is still true, but it does not reflect the newer experience updates around:

- internal workflow automation
- AI-assisted data extraction and decision support
- systems integration across office tools
- customer service automation and operational efficiency

## Approved Direction

The approved direction is `Web + Automation`.

The updated copy should:

- keep web development as a core identity
- connect that identity with automation, systems thinking, and AI workflows
- sound cohesive rather than reading like two separate career tracks

## Copy Requirements

The new description should be written as a short multi-paragraph statement in the same field currently used by `profile.about.description`.

It should communicate:

- strong frontend and web product capability
- production-ready thinking
- business process improvement and automation work
- practical use of `n8n`, `Zapier`, `Claude`, and `Trae`
- a focus on scalable systems, efficiency, and user experience

It should avoid:

- bullet formatting
- dash-led structure
- overloading the paragraph with tool names at the expense of clarity
- sounding like a resume bullet list instead of a strong portfolio summary

## Proposed Copy

```text
I’m a Web Developer focused on building refined, production-ready digital experiences that balance visual quality, performance, and long-term scalability.

Beyond frontend development, I also work on improving business operations through automation, systems integration, and AI-assisted workflows. I use tools like n8n, Zapier, Claude, and Trae to streamline manual processes, connect internal platforms, and build smarter systems that support faster decision-making and more efficient customer support.

My approach combines strong product thinking with operational efficiency. I care about how systems look, how they perform, and how effectively they help teams and users move through real work.
```

## Acceptance Criteria

- `About` copy reads as a natural extension of the updated `Experience` section.
- The new wording keeps web development central while clearly introducing automation and AI systems work.
- The copy does not use dash-led phrasing or em dash style.
- Only the description content in `data/profile.ts` changes.

## Testing And Verification

Manual verification is sufficient for this scope:

- Confirm the `About` section renders the new copy correctly.
- Confirm formatting and paragraph breaks still look clean in the existing UI.
- Confirm the tone matches the updated `IT Officer` and `Web Developer` experience entries.
