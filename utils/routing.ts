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

let fluidScrollEnabled = false;
let fluidScrollRaf: number | null = null;
let fluidTargetY = 0;

function cancelFluidScrollAnimation(): void {
  if (fluidScrollRaf !== null) {
    window.cancelAnimationFrame(fluidScrollRaf);
    fluidScrollRaf = null;
  }
}

function normalizeWheelDelta(event: WheelEvent): number {
  if (event.deltaMode === 1) return event.deltaY * 16;
  if (event.deltaMode === 2) return event.deltaY * (window.innerHeight * 0.9);
  return event.deltaY;
}

function isEditableTarget(target: EventTarget | null): boolean {
  const element = target instanceof Element ? target : null;
  if (!element) return false;
  if (element.closest('[contenteditable="true"]')) return true;
  const tagName = element.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'textarea' || tagName === 'select';
}

function canScrollElementInDirection(element: Element, deltaY: number): boolean {
  const htmlElement = element as HTMLElement;
  const style = window.getComputedStyle(htmlElement);
  const overflowY = style.overflowY;
  if (overflowY !== 'auto' && overflowY !== 'scroll' && overflowY !== 'overlay') return false;
  if (htmlElement.scrollHeight <= htmlElement.clientHeight) return false;

  const scrollTop = htmlElement.scrollTop;
  const maxScrollTop = htmlElement.scrollHeight - htmlElement.clientHeight;

  if (deltaY > 0) return scrollTop < maxScrollTop;
  if (deltaY < 0) return scrollTop > 0;
  return false;
}

function hasScrollableAncestor(target: EventTarget | null, deltaY: number): boolean {
  let element = target instanceof Element ? target : null;

  while (element && element !== document.body && element !== document.documentElement) {
    if (canScrollElementInDirection(element, deltaY)) {
      return true;
    }
    element = element.parentElement;
  }

  return false;
}

function clampToDocumentScroll(y: number): number {
  const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(Math.max(0, y), maxScrollY);
}

export function enableFluidScroll(): () => void {
  if (typeof window === 'undefined') return () => {};
  if (fluidScrollEnabled) return () => {};

  fluidScrollEnabled = true;

  const handleWheel = (event: WheelEvent) => {
    if (!fluidScrollEnabled) return;
    if (prefersReducedMotion()) return;
    if (event.defaultPrevented) return;
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    if (isEditableTarget(event.target)) return;

    const delta = normalizeWheelDelta(event);
    if (delta === 0) return;
    if (hasScrollableAncestor(event.target, delta)) return;

    event.preventDefault();

    if (activeScrollAnimationFrame !== null) {
      window.cancelAnimationFrame(activeScrollAnimationFrame);
      activeScrollAnimationFrame = null;
    }

    if (fluidScrollRaf === null) {
      fluidTargetY = window.scrollY ?? window.pageYOffset ?? 0;
    }

    fluidTargetY = clampToDocumentScroll(fluidTargetY + delta);

    const step = () => {
      const currentY = window.scrollY ?? window.pageYOffset ?? 0;
      const diff = fluidTargetY - currentY;
      const nextY = currentY + diff * 0.12;

      window.scrollTo({ top: nextY, behavior: 'auto' });

      if (Math.abs(diff) < 0.5) {
        fluidScrollRaf = null;
        return;
      }

      fluidScrollRaf = window.requestAnimationFrame(step);
    };

    if (fluidScrollRaf !== null) {
      window.cancelAnimationFrame(fluidScrollRaf);
    }
    fluidScrollRaf = window.requestAnimationFrame(step);
  };

  window.addEventListener('wheel', handleWheel, { passive: false });

  return () => {
    fluidScrollEnabled = false;
    window.removeEventListener('wheel', handleWheel);
    cancelFluidScrollAnimation();
  };
}

export function disableFluidScroll(): void {
  fluidScrollEnabled = false;
  cancelFluidScrollAnimation();
}
