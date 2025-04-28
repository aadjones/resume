import { describe, it, expect } from 'vitest';
import { ResumeFieldType } from '../app/types/resume';

describe('Input Propagation', () => {
  it('correctly formats field data for preview', () => {
    const fields = [
      { id: ResumeFieldType.OBJECTIVE, value: 'Test objective' },
      { id: ResumeFieldType.EXPERIENCE, value: 'Test experience' },
      { id: ResumeFieldType.SKILLS, value: 'Test skills' }
    ];

    const params = new URLSearchParams();
    fields.forEach(field => {
      params.append(field.id, field.value);
    });

    expect(params.get(ResumeFieldType.OBJECTIVE)).toBe('Test objective');
    expect(params.get(ResumeFieldType.EXPERIENCE)).toBe('Test experience');
    expect(params.get(ResumeFieldType.SKILLS)).toBe('Test skills');
  });

  it('preserves applicant info in URL parameters', () => {
    // Test data
    const applicantInfo = {
      displayName: 'Applicant #1234',
      city: 'Boston',
      email: 'test@grind.io'
    };

    // Create URL params
    const params = new URLSearchParams();
    params.append('applicantNumber', applicantInfo.displayName);
    params.append('city', applicantInfo.city);
    params.append('email', applicantInfo.email);

    // Verify params contain correct values
    expect(params.get('applicantNumber')).toBe(applicantInfo.displayName);
    expect(params.get('city')).toBe(applicantInfo.city);
    expect(params.get('email')).toBe(applicantInfo.email);

    // Verify URL string format
    const urlString = params.toString();
    const decodedString = decodeURIComponent(urlString.replace(/\+/g, ' '));
    expect(decodedString).toContain('applicantNumber=Applicant #1234');
    expect(decodedString).toContain('city=Boston');
    expect(decodedString).toContain('email=test@grind.io');
  });
}); 