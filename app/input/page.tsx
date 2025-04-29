'use client';

import React, { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { survivalPhrases, type PhraseCategory } from '../data/survival-phrases';
import { generateApplicantHeader } from '@/lib/generateApplicantHeader';
import { ResumeFieldType, type ResumeField } from '../types/resume';
import ThemeToggle from '../components/ThemeToggle';

function InputPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const industry = searchParams?.get('industry') || 'tech'; // Default to tech for testing

  const [fields, setFields] = useState<ResumeField[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errorStates, setErrorStates] = useState<Record<string, string>>({});
  const [applicantInfo, setApplicantInfo] = useState<{
    displayName: string;
    city: string;
    emailUsername: string;
    hasEditedDisplayName: boolean;
  }>({
    displayName: '',
    city: '',
    emailUsername: '',
    hasEditedDisplayName: false
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    // Check if we have values in URL parameters
    const applicantNumber = searchParams?.get('applicantNumber');
    const city = searchParams?.get('city');
    const email = searchParams?.get('email');

    if (applicantNumber || city || email) {
      // If we have URL parameters, use those values
      setApplicantInfo({
        displayName: applicantNumber || '',
        city: city || '',
        emailUsername: email || '',
        hasEditedDisplayName: false
      });
    } else {
      // Only generate new values if we don't have URL parameters
      const generated = generateApplicantHeader();
      setApplicantInfo({
        displayName: generated.applicantNumber,
        city: generated.city,
        emailUsername: generated.email,
        hasEditedDisplayName: false
      });
    }
  }, [searchParams]); // Add searchParams to dependency array

  useEffect(() => {
    // Set up fields based on industry
    const fieldLabels = {
      tech: [
        { id: ResumeFieldType.OBJECTIVE, label: 'Objective' },
        { id: ResumeFieldType.EXPERIENCE, label: 'Professional Experience' },
        { id: ResumeFieldType.SKILLS, label: 'Technical Skills' }
      ],
      service: [
        { id: ResumeFieldType.OBJECTIVE, label: 'Objective' },
        { id: ResumeFieldType.EXPERIENCE, label: 'Work Experience' },
        { id: ResumeFieldType.SKILLS, label: 'Skills' }
      ],
      healthcare: [
        { id: ResumeFieldType.OBJECTIVE, label: 'Objective' },
        { id: ResumeFieldType.EXPERIENCE, label: 'Clinical Experience' },
        { id: ResumeFieldType.SKILLS, label: 'Certifications' }
      ]
    };

    // Initialize fields with values from URL parameters if they exist
    setFields(
      fieldLabels[industry as keyof typeof fieldLabels].map(({ id, label }) => ({
        id,
        label,
        value: searchParams?.get(id) || ''
      }))
    );
  }, [industry, searchParams]);  // Add searchParams to dependency array

  const handleFieldChange = (id: string, value: string) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleAutoFill = (id: string) => {
    // Map field IDs to phrase categories
    const phraseCategory = id.includes('objective') 
      ? 'objective' 
      : id.includes('experience') 
        ? 'experience' 
        : 'skills' as PhraseCategory;

    // Get phrases based on category
    const phrases = survivalPhrases[phraseCategory];
    let newValue: string;

    if (phraseCategory === 'objective') {
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

    // Update the field with the phrases
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, value: newValue } : field))
    );
  };

  const handleRewrite = async (id: string) => {
    const field = fields.find(f => f.id === id);
    if (!field || !field.value.trim()) return;

    // Set loading state for this field
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    setErrorStates(prev => ({ ...prev, [id]: '' }));

    try {
      const response = await fetch('/api/rewrite-for-survival', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: field.value,
          industry,
          section: id.toLowerCase() // Convert field ID to section name
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Rewrite failed');
      }

      const data = await response.json();
      
      // Update the field with rewritten text
      setFields(prev =>
        prev.map(f => (f.id === id ? { ...f, value: data.rewrittenText } : f))
      );
    } catch (error) {
      setErrorStates(prev => ({ 
        ...prev, 
        [id]: error instanceof Error ? error.message : 'Rewrite failed, please try again.' 
      }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleGenerate = () => {
    // Create URL parameters with field values and applicant info
    const params = new URLSearchParams();
    
    // Add field values
    fields.forEach(field => {
      params.append(field.id, field.value);
    });
    
    // Add applicant info
    if (applicantInfo) {
      params.append('applicantNumber', applicantInfo.displayName);
      params.append('city', applicantInfo.city);
      params.append('email', applicantInfo.emailUsername);
    }
    
    // Add industry
    params.append('industry', industry);
    
    // Navigate to preview page with parameters
    router.push(`/preview?${params.toString()}`);
  };

  const hasFilledFields = () => {
    return fields.some(field => field.value.trim() !== '');
  };

  const handleChangeIndustry = () => {
    if (hasFilledFields()) {
      setShowConfirmDialog(true);
    } else {
      router.push('/');
    }
  };

  const handleConfirmChange = () => {
    setShowConfirmDialog(false);
    router.push('/');
  };

  const handleApplicantInfoChange = (field: keyof typeof applicantInfo, value: string) => {
    setApplicantInfo(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'displayName' ? { hasEditedDisplayName: true } : {})
    }));
  };

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="relative w-full max-w-[1200px] mx-auto">
        <div className="mb-6 sm:mb-8 flex justify-between items-center">
          <button
            onClick={handleChangeIndustry}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Change Industry
          </button>
          <ThemeToggle />
        </div>
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center space-y-4">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    value={applicantInfo.displayName}
                    onChange={(e) => handleApplicantInfoChange('displayName', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={applicantInfo.city}
                    onChange={(e) => handleApplicantInfoChange('city', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter city"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label htmlFor="emailUsername" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="emailUsername"
                    value={applicantInfo.emailUsername}
                    onChange={(e) => handleApplicantInfoChange('emailUsername', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 text-sm"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                <div className="text-center space-y-2">
                  <h1 className="text-xl sm:text-2xl font-bold dark:text-white">{applicantInfo.displayName || 'Applicant #XXXX'}</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {applicantInfo.city || 'City'} | {applicantInfo.emailUsername || 'email@example.com'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showConfirmDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 max-w-sm w-full">
                <h3 className="text-lg font-medium mb-4 dark:text-white">Change Industry?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You have entered some information. Changing industries will reset all fields.
                </p>
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmChange}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Change Industry
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.label}
                </label>
                <textarea
                  id={field.id}
                  value={field.value}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="w-full h-24 sm:h-32 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder={`Enter your ${field.label.toLowerCase()}...`}
                  disabled={loadingStates[field.id]}
                />
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <button
                    onClick={() => handleAutoFill(field.id)}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
                    disabled={loadingStates[field.id]}
                  >
                    Auto-Fill
                  </button>
                  <button
                    onClick={() => handleRewrite(field.id)}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={loadingStates[field.id] || !field.value.trim()}
                  >
                    Rewrite for Survival
                  </button>
                  {loadingStates[field.id] && (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  )}
                  {errorStates[field.id] && (
                    <span className="text-sm text-red-600 dark:text-red-400">{errorStates[field.id]}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Generate Survival Resume
          </button>
        </div>
      </div>
    </main>
  );
}

export default function InputPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InputPageContent />
    </Suspense>
  );
} 