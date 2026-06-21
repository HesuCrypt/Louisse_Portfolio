import { describe, expect, it } from 'vitest';
import {
  getNextInquiryIndex,
  getPreviousInquiryIndex,
  isValidInquiryOption,
} from '@/utils/generalContactDropdown';

const options = [
  'Job Opportunity',
  'Project Collaboration',
  'Freelance Work',
  'Contract Role',
  'General Question',
] as const;

describe('general contact dropdown helpers', () => {
  it('moves focus to the next option and wraps at the end', () => {
    expect(getNextInquiryIndex(0, options)).toBe(1);
    expect(getNextInquiryIndex(4, options)).toBe(0);
  });

  it('moves focus to the previous option and wraps at the start', () => {
    expect(getPreviousInquiryIndex(2, options)).toBe(1);
    expect(getPreviousInquiryIndex(0, options)).toBe(4);
  });

  it('validates only approved inquiry options', () => {
    expect(isValidInquiryOption('Job Opportunity', options)).toBe(true);
    expect(isValidInquiryOption('Hackathon Team', options)).toBe(false);
    expect(isValidInquiryOption('', options)).toBe(false);
  });
});
