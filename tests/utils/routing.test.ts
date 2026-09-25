import { describe, expect, it } from 'vitest';
import {
  buildHomeSectionPath,
  getAppRoute,
  isLegalRoute,
  isServicesRoute,
  normalizeSectionHash,
  pushRoute,
} from '@/utils/routing';

describe('routing helpers', () => {
  it('maps /services to the services route', () => {
    expect(getAppRoute('/services')).toBe('/services');
    expect(isServicesRoute('/services')).toBe(true);
    expect(isLegalRoute('/services')).toBe(false);
  });

  it('maps legal routes correctly for paths and hashes', () => {
    expect(getAppRoute('/privacy')).toBe('/privacy');
    expect(getAppRoute('/privacy-policy')).toBe('/privacy');
    expect(getAppRoute('/', '#privacy')).toBe('/privacy');
    expect(isLegalRoute('/privacy')).toBe(true);

    expect(getAppRoute('/terms')).toBe('/terms');
    expect(getAppRoute('/terms-and-conditions')).toBe('/terms');
    expect(getAppRoute('/', '#terms')).toBe('/terms');
    expect(isLegalRoute('/terms')).toBe(true);

    expect(getAppRoute('/cookies')).toBe('/cookies');
    expect(getAppRoute('/cookie-policy')).toBe('/cookies');
    expect(getAppRoute('/', '#cookies')).toBe('/cookies');
    expect(isLegalRoute('/cookies')).toBe(true);
  });

  it('falls back unknown paths to the homepage route', () => {
    expect(getAppRoute('/unknown')).toBe('/');
    expect(isServicesRoute('/unknown')).toBe(false);
    expect(isLegalRoute('/')).toBe(false);
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
