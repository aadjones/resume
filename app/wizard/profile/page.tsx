'use client';

import { useWizard } from '../../context/WizardContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { survivalPhrases } from '../../data/survival-phrases';
import type { Industry } from '../../data/survival-phrases';

type Section = 'objective' | 'experience' | 'skills';

export default function ProfileStep() {
  const { identity, setIdentity, content, setContent, industry } = useWizard();
  const [isLoading, setIsLoading] = useState<Section | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();

  const handleIdentityChange = (field: 'name' | 'city' | 'email', value: string) => {
    setIdentity({
      ...identity,
      [field]: value
    });
  };

  const handleContentChange = (field: Section, value: string) => {
    setContent({
      ...content,
      [field]: value
    });
  };

  const handleAutoFill = (section: Section) => {
    // Get phrases based on category and industry
    const phrases = survivalPhrases[industry][section];
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
        result.push(selectedPhrases[randomIndex]);
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

  const handleChangeIndustry = () => {
    if (content.objective || content.experience || content.skills) {
      setShowConfirmDialog(true);
    } else {
      router.push('/wizard/industry');
    }
  };

  const handleConfirmChange = () => {
    setShowConfirmDialog(false);
    router.push('/wizard/industry');
  };

  const renderTextarea = (section: Section, label: string) => (
    <div className="space-y-2">
      <label htmlFor={section} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <textarea
        id={section}
        value={content[section]}
        onChange={(e) => handleContentChange(section, e.target.value)}
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
    <>
      <div className="max-w-6xl mx-auto">
        {/* Simple navigation */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <button 
            onClick={handleChangeIndustry}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Industry: {industry.charAt(0).toUpperCase() + industry.slice(1)}
          </button>
          <span className="text-gray-400">→</span>
          <span className="font-medium">Profile</span>
        </div>

        {/* Main content */}
        <div className="flex gap-8">
          {/* LEFT: form */}
          <div className="w-1/2 space-y-6">
            <h1 className="text-2xl font-bold mb-6 dark:text-white">Your Profile</h1>
            
            {/* Identity Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={identity.name}
                    onChange={(e) => handleIdentityChange('name', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={identity.city}
                      onChange={(e) => handleIdentityChange('city', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={identity.email}
                      onChange={(e) => handleIdentityChange('email', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {renderTextarea('objective', 'Objective')}
              {renderTextarea('experience', industry === 'tech' ? 'Professional Experience' : 
                                          industry === 'service' ? 'Work Experience' : 
                                          'Clinical Experience')}
              {renderTextarea('skills', industry === 'tech' ? 'Technical Skills' : 
                                       industry === 'service' ? 'Skills' : 
                                       'Clinical Skills')}
            </div>

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

          {/* RIGHT: preview */}
          <div className="w-1/2 border p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Preview</h2>
            <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{identity.name || 'Your Name'}</h3>
              <div className="mt-2 text-gray-600 dark:text-gray-300">
                <span>{identity.city || 'Your City'}</span>
                <span className="mx-2">•</span>
                <span>{identity.email || 'your.email@example.com'}</span>
              </div>
            </div>
            <h3 className="font-bold dark:text-white mt-6">Objective</h3>
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
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Change Industry?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Changing your industry will clear your current profile information. Are you sure you want to continue?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmChange}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Change Industry
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 