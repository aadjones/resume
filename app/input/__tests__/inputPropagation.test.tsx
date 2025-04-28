import { describe, it, expect } from 'vitest';
import { ResumeFieldType } from '../../types/resume';

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
}); 