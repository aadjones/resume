'use client';

import { useWizard } from '../../context/WizardContext';
import { useState } from 'react';

type Section = 'objective' | 'experience' | 'skills';

export default function ContentStep() {
  const { state, setContent } = useWizard();
  const [isLoading, setIsLoading] = useState<Section | null>(null);

  const handleChange = (field: Section, value: string) => {
    setContent({ [field]: value });
  };

  const handleAutoFill = (section: Section) => {
    // TODO: Implement auto-fill functionality
    console.log('Auto-fill', section);
  };

  const handleRewriteForSurvival = async (section: Section) => {
    try {
      setIsLoading(section);
      const response = await fetch('/api/rewrite-for-survival', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industry: state.industry,
          section,
          text: state.content[section],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to rewrite content');
      }

      const { text } = await response.json();
      setContent({ [section]: text });
    } catch (error) {
      console.error('Error rewriting content:', error);
      // TODO: Add error handling UI
    } finally {
      setIsLoading(null);
    }
  };

  const renderTextarea = (section: Section, label: string) => (
    <div className="space-y-2">
      <label htmlFor={section} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={section}
        value={state.content[section]}
        onChange={(e) => handleChange(section, e.target.value)}
        className="w-full h-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      <div className="flex space-x-2">
        <button
          onClick={() => handleAutoFill(section)}
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Auto-Fill
        </button>
        <button
          onClick={() => handleRewriteForSurvival(section)}
          disabled={isLoading === section}
          className={`px-4 py-2 text-sm rounded ${
            isLoading === section
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          {isLoading === section ? 'Rewriting...' : 'Rewrite for Survival'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Content</h1>
      <div className="space-y-6">
        {renderTextarea('objective', 'Objective')}
        {renderTextarea('experience', 'Professional Experience')}
        {renderTextarea('skills', 'Technical Skills')}
      </div>
    </div>
  );
} 