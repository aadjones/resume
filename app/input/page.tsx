'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { survivalPhrases, type PhraseCategory } from '../data/survival-phrases';
import { generateApplicantHeader } from '@/lib/generateApplicantHeader';
import { ResumeFieldType, type ResumeField } from '../types/resume';

export default function InputPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const industry = searchParams.get('industry') || 'tech'; // Default to tech for testing

  const [fields, setFields] = useState<ResumeField[]>([]);
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
    const applicantNumber = searchParams.get('applicantNumber');
    const city = searchParams.get('city');
    const email = searchParams.get('email');

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
        value: searchParams.get(id) || ''
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

    // Get random phrase from appropriate category
    const phrases = survivalPhrases[phraseCategory];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    // Update the field with the random phrase
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, value: randomPhrase } : field))
    );
  };

  const handleRewrite = (id: string) => {
    // TODO: Implement rewrite functionality
    console.log('Rewrite clicked for:', id);
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
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-8 relative">
        <div className="text-center space-y-4">
          <div className="flex flex-col">
            <div className="flex justify-end mb-3">
              <button
                onClick={handleChangeIndustry}
                className="text-sm text-blue-600 hover:underline"
              >
                ← Change Industry
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  value={applicantInfo.displayName}
                  onChange={(e) => handleApplicantInfoChange('displayName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={applicantInfo.city}
                  onChange={(e) => handleApplicantInfoChange('city', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter city"
                />
              </div>
              <div className="md:col-span-1 lg:col-span-1">
                <label htmlFor="emailUsername" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="emailUsername"
                  value={applicantInfo.emailUsername}
                  onChange={(e) => handleApplicantInfoChange('emailUsername', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter email"
                  style={{ minWidth: '100%' }}
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm break-all">
              {applicantInfo.displayName} | {applicantInfo.city} | {applicantInfo.emailUsername}
            </p>
          </div>
        </div>

        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-medium mb-4">Change Industry?</h3>
              <p className="text-gray-600 mb-6">
                You have entered some information. Changing industries will reset all fields.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmChange}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
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
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <textarea
                id={field.id}
                value={field.value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Enter your ${field.label.toLowerCase()}...`}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleAutoFill(field.id)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Auto-Fill
                </button>
                <button
                  onClick={() => handleRewrite(field.id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Rewrite for Survival
                </button>
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
    </main>
  );
} 