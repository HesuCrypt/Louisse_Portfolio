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

export function scrollToSection(sectionId: string, offset = 80): void {
  const element = document.getElementById(normalizeSectionHash(sectionId));
  if (!element) {
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({
    top: elementPosition - offset,
    behavior: 'smooth',
  });
}
