import { describe, expect, it } from 'vitest';
import { parseBullets } from '../lib/format-utils';

describe('parseBullets', () => {
  it('should parse bullet points into an array of strings', () => {
    const input = '- First bullet\n- Second bullet\n- Third bullet';
    const expected = [
      'First bullet',
      'Second bullet',
      'Third bullet'
    ];
    expect(parseBullets(input)).toEqual(expected);
  });

  it('should ignore lines without bullet points', () => {
    const input = '- Valid bullet\nNot a bullet\n- Another valid bullet';
    const expected = [
      'Valid bullet',
      'Another valid bullet'
    ];
    expect(parseBullets(input)).toEqual(expected);
  });

  it('should handle empty input', () => {
    expect(parseBullets('')).toEqual([]);
  });

  it('should handle input with only non-bullet lines', () => {
    const input = 'No bullets\nHere at all\nJust text';
    expect(parseBullets(input)).toEqual([]);
  });

  it('should trim whitespace from bullet points', () => {
    const input = '-    Lots of spaces    \n-   More spaces   ';
    const expected = [
      'Lots of spaces',
      'More spaces'
    ];
    expect(parseBullets(input)).toEqual(expected);
  });
}); 