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
 * Single source of truth for page order. The index rail, the mobile strip and
 * the top bar navigation all read from this so they can never drift apart.
 * Ids intentionally keep the historical `#projects` / `#about` / `#contact`
 * anchors working for existing inbound links.
 *
 * Order is proof-first: who he is, where he worked, what shipped, what clients
 * said, what it costs, the wider archive, the biography, then contact.
 */
export const sections: SectionLink[] = [
  { index: '01', id: 'top', label: 'Identity', nav: 'Identity' },
  { index: '02', id: 'experience', label: 'Experience', nav: 'Experience' },
  { index: '03', id: 'projects', label: 'Selected Work', nav: 'Work' },
  { index: '04', id: 'testimonials', label: 'Endorsements', nav: 'Endorsements' },
  { index: '05', id: 'capabilities', label: 'Capabilities & Rates', nav: 'Capabilities' },
  { index: '06', id: 'directory', label: 'Technical Directory', nav: 'Directory' },
  { index: '07', id: 'about', label: 'Profile', nav: 'Profile' },
  { index: '08', id: 'contact', label: 'Contact', nav: 'Contact' },
];

/**
 * Ordinal and label lookup for the sections, so a re-order never leaves a
 * hardcoded "02" stranded on the wrong block.
 */
export const sectionMeta = (id: string): SectionLink =>
  sections.find((section) => section.id === id) ?? sections[0];
