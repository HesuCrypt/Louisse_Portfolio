import { describe, expect, it } from 'vitest';
import {
  buildGeneralInquiryEmail,
  buildProjectInquiryEmail,
} from '@/utils/contact';

describe('contact email builders', () => {
  it('builds a general inquiry subject and body using inquiry type', () => {
    const result = buildGeneralInquiryEmail({
      name: 'Louisse',
      email: 'louisse@example.com',
      inquiryType: 'Job Opportunity',
      message: 'Would love to discuss a frontend role.',
    });

    expect(result.subject).toBe('New Inquiry: Job Opportunity');
    expect(result.body).toContain('Inquiry Type: Job Opportunity');
    expect(result.body).toContain('Message:\nWould love to discuss a frontend role.');
  });

  it('builds a project inquiry subject and body using project details', () => {
    const result = buildProjectInquiryEmail({
      name: 'Louisse',
      email: 'louisse@example.com',
      projectType: 'Business Website',
      budget: 'PHP 30k to PHP 40k',
      timeline: 'Within 2 to 4 weeks',
      message: 'Need a conversion-focused site.',
    });

    expect(result.subject).toBe('New Project Inquiry: Business Website');
    expect(result.body).toContain('Budget: PHP 30k to PHP 40k');
    expect(result.body).toContain('Timeline: Within 2 to 4 weeks');
  });
});
