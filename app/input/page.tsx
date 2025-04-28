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
  const [applicantInfo, setApplicantInfo] = useState<{ applicantNumber: string; city: string; email: string } | null>(null);

  useEffect(() => {
    setApplicantInfo(generateApplicantHeader());
  }, []);

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

    setFields(
      fieldLabels[industry as keyof typeof fieldLabels].map(({ id, label }) => ({
        id,
        label,
        value: ''
      }))
    );
  }, [industry]);

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
      params.append('applicantNumber', applicantInfo.applicantNumber);
      params.append('city', applicantInfo.city);
      params.append('email', applicantInfo.email);
    }
    
    // Add industry
    params.append('industry', industry);
    
    // Navigate to preview page with parameters
    router.push(`/preview?${params.toString()}`);
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Capitalism Survival Guide</h1>
          {applicantInfo && (
            <p className="mt-2 text-gray-600">
              {applicantInfo.applicantNumber} | {applicantInfo.city} | {applicantInfo.email}
            </p>
          )}
        </div>

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