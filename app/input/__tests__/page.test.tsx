import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InputPage from '../page';

describe('InputPage', () => {
  it('all Auto-Fill buttons fill their respective fields', () => {
    render(<InputPage />);
    
    // Get all textareas and their corresponding auto-fill buttons
    const textareas = screen.getAllByRole('textbox') as HTMLTextAreaElement[];
    const autoFillButtons = screen.getAllByRole('button', { name: 'Auto-Fill' });
    
    // Test each field
    textareas.forEach((textarea, index) => {
      fireEvent.click(autoFillButtons[index]);
      expect(textarea.value.length).toBeGreaterThan(0);
    });
  });
}); 