export interface SectionLink {
  /** Zero-padded ordinal shown in the rail and eyebrows. */
  index: string;
  /** DOM id used for deep links and scroll targets. */
  id: string;
  /** Full name, used for accessibility and the rail tooltip. */
  label: string;
  /** Compact label for the desktop top bar. */
  nav: string;
}

/**
 * Single source of truth for page order:
 * Overview / Identity → Profile → Experience → Selected Work & Endorsements → Capabilities → Contact
 */
export const sections: SectionLink[] = [
  { index: '01', id: 'top', label: 'Identity', nav: 'Identity' },
  { index: '02', id: 'about', label: 'Profile', nav: 'Profile' },
  { index: '03', id: 'experience', label: 'Experience', nav: 'Experience' },
  { index: '04', id: 'projects', label: 'Selected Work & Endorsements', nav: 'Work' },
  { index: '05', id: 'capabilities', label: 'Capabilities & Rates', nav: 'Capabilities' },
  { index: '06', id: 'contact', label: 'Contact', nav: 'Contact' },
];

/**
 * Ordinal and label lookup for the sections, with aliases for combined sections.
 */
export const sectionMeta = (id: string): SectionLink => {
  if (id === 'testimonials' || id === 'directory' || id === 'featured') {
    return sections.find((s) => s.id === 'projects') ?? sections[0];
  }
  return sections.find((section) => section.id === id) ?? sections[0];
};
