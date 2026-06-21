import { describe, expect, it } from 'vitest';
import {
  buildHomeSectionPath,
  getAppRoute,
  isServicesRoute,
  normalizeSectionHash,
  pushRoute,
} from '@/utils/routing';

describe('routing helpers', () => {
  it('maps /services to the services route', () => {
    expect(getAppRoute('/services')).toBe('/services');
    expect(isServicesRoute('/services')).toBe(true);
  });

  it('falls back unknown paths to the homepage route', () => {
    expect(getAppRoute('/unknown')).toBe('/');
    expect(isServicesRoute('/unknown')).toBe(false);
  });

  it('builds homepage section URLs and strips the leading hash', () => {
    expect(buildHomeSectionPath('contact')).toBe('/#contact');
    expect(normalizeSectionHash('#experience')).toBe('experience');
    expect(normalizeSectionHash('skills')).toBe('skills');
  });

  it('pushes a new route into browser history', () => {
    window.history.replaceState({}, '', '/');

    pushRoute('/services');

    expect(window.location.pathname).toBe('/services');
  });
});
