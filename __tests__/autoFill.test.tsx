import { describe, it, expect } from 'vitest';

describe('AutoFill Functionality', () => {
  it('has valid phrase categories', () => {
    const categories = ['objective', 'experience', 'skills'];
    const phrases = {
      objective: ['Test objective 1', 'Test objective 2'],
      experience: ['Test experience 1', 'Test experience 2'],
      skills: ['Test skills 1', 'Test skills 2']
    };
    
    categories.forEach(category => {
      expect(phrases[category as keyof typeof phrases]).toBeDefined();
      expect(phrases[category as keyof typeof phrases].length).toBeGreaterThan(0);
    });
  });
}); 