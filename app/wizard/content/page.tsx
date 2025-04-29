'use client';

import { useWizard } from '../../context/WizardContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { survivalPhrases, type PhraseCategory } from '../../data/survival-phrases';

type Section = 'objective' | 'experience' | 'skills';

export default function ContentStep() {
  const { content, setContent, industry } = useWizard();
  const [isLoading, setIsLoading] = useState<Section | null>(null);
  const router = useRouter();

  const handleChange = (field: Section, value: string) => {
    setContent({
      ...content,
      [field]: value
    });
  };

  const handleAutoFill = (section: Section) => {
    // Get phrases based on category
    const phrases = survivalPhrases[section as PhraseCategory];
    let newValue: string;

    if (section === 'objective') {
      // For objective, use just one phrase
      newValue = phrases[Math.floor(Math.random() * phrases.length)];
    } else {
      // For experience and skills, use three unique phrases
      const selectedPhrases = [...phrases];
      const result: string[] = [];
      
      for (let i = 0; i < 3 && selectedPhrases.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * selectedPhrases.length);
        result.push(`- ${selectedPhrases[randomIndex]}`);
        selectedPhrases.splice(randomIndex, 1);
      }
      
      newValue = result.join('\n');
    }

    // Update the content with the phrases
    setContent({
      ...content,
      [section]: newValue
    });
  };

  const handleRewriteForSurvival = async (section: Section) => {
    if (!content[section].trim()) return;
    if (!industry) {
      console.error('Industry not set');
      return;
    }

    // Set loading state for this field
    setIsLoading(section);

    console.log('Sending request with:', {
      text: content[section],
      industry,
      section
    });

    try {
      const response = await fetch('/api/rewrite-for-survival', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content[section],
          industry,
          section
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        throw new Error(errorData.error || 'Rewrite failed');
      }

      const data = await response.json();
      
      // Update the content with rewritten text
      setContent({
        ...content,
        [section]: data.rewrittenText
      });
    } catch (error) {
      console.error('Error rewriting content:', error);
      // TODO: Add error handling UI
    } finally {
      setIsLoading(null);
    }
  };

  const renderTextarea = (section: Section, label: string) => (
    <div className="space-y-2">
      <label htmlFor={section} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <textarea
        id={section}
        value={content[section]}
        onChange={(e) => handleChange(section, e.target.value)}
        className="w-full h-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      <div className="flex space-x-2">
        <button
          onClick={() => handleAutoFill(section)}
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Auto-Fill
        </button>
        <button
          onClick={() => handleRewriteForSurvival(section)}
          disabled={isLoading === section || !industry}
          className={`px-4 py-2 text-sm rounded ${
            isLoading === section || !industry
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
          }`}
        >
          {isLoading === section ? 'Rewriting...' : 'Rewrite for Survival'}
        </button>
      </div>
    </div>
  );

  const canContinue = content.objective && content.experience && content.skills;

  return (
    <div className="flex gap-8 max-w-6xl mx-auto py-8">
      {/* LEFT: form */}
      <div className="w-1/2 space-y-6">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Your Content</h1>
        {renderTextarea('objective', 'Objective')}
        {renderTextarea('experience', industry === 'tech' ? 'Professional Experience' : 
                                    industry === 'service' ? 'Work Experience' : 
                                    'Clinical Experience')}
        {renderTextarea('skills', industry === 'tech' ? 'Technical Skills' : 
                                 industry === 'service' ? 'Skills' : 
                                 'Clinical Skills')}

        <button
          onClick={() => router.push('/wizard/review')}
          disabled={!canContinue}
          className={`w-full mt-6 px-4 py-3 rounded-lg font-medium transition-colors ${
            canContinue 
              ? 'text-white bg-blue-600 hover:bg-blue-700' 
              : 'text-gray-400 bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
          }`}
        >
          Continue →
        </button>
      </div>

      {/* RIGHT: live preview */}
      <div className="w-1/2 border p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Preview</h2>
        <h3 className="font-bold dark:text-white">Objective</h3>
        <p className="mb-4 dark:text-gray-300">{content.objective}</p>
        <h3 className="font-bold dark:text-white">Experience</h3>
        <ul className="list-disc list-inside mb-4 dark:text-gray-300">
          {content.experience.split('\n').map((line, i) => line && <li key={i}>{line}</li>)}
        </ul>
        <h3 className="font-bold dark:text-white">Skills</h3>
        <ul className="list-disc list-inside dark:text-gray-300">
          {content.skills.split('\n').map((line, i) => line && <li key={i}>{line}</li>)}
        </ul>
      </div>
    </div>
  );
} 