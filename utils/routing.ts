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

export function pushRoute(path: string): void {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

let activeScrollAnimationFrame: number | null = null;

export function scrollToY(targetY: number, duration = 650): void {
  if (typeof window === 'undefined') return;

  if (activeScrollAnimationFrame !== null) {
    window.cancelAnimationFrame(activeScrollAnimationFrame);
    activeScrollAnimationFrame = null;
  }

  const startY = window.scrollY ?? window.pageYOffset ?? 0;
  const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const clampedTargetY = Math.min(Math.max(0, targetY), maxScrollY);
  const delta = clampedTargetY - startY;

  if (Math.abs(delta) < 1) return;

  if (prefersReducedMotion() || typeof window.requestAnimationFrame !== 'function') {
    window.scrollTo({ top: clampedTargetY, behavior: 'auto' });
    return;
  }

  const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeInOutCubic(progress);
    window.scrollTo({ top: startY + delta * eased, behavior: 'auto' });

    if (progress < 1) {
      activeScrollAnimationFrame = window.requestAnimationFrame(step);
      return;
    }

    activeScrollAnimationFrame = null;
  };

  activeScrollAnimationFrame = window.requestAnimationFrame(step);
}

export function scrollToTop(duration = 650): void {
  scrollToY(0, duration);
}

export function scrollToSection(sectionId: string, offset = 80): void {
  const element = document.getElementById(normalizeSectionHash(sectionId));
  if (!element) {
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  scrollToY(elementPosition - offset);
}
