'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { survivalPhrases, type PhraseCategory } from '../data/survival-phrases';

interface ResumeField {
  id: string;
  label: string;
  value: string;
}

export default function InputPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const industry = searchParams.get('industry') || 'tech'; // Default to tech for testing

  const [fields, setFields] = useState<ResumeField[]>([]);
  const [applicantNumber] = useState(() => Math.floor(1000 + Math.random() * 9000));

  useEffect(() => {
    // Set up fields based on industry
    const fieldLabels = {
      tech: ['Objective', 'Professional Experience', 'Technical Skills'],
      service: ['Objective', 'Work Experience', 'Skills'],
      healthcare: ['Objective', 'Clinical Experience', 'Certifications'],
    };

    setFields(
      fieldLabels[industry as keyof typeof fieldLabels].map((label) => ({
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        value: '',
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
    // TODO: Implement generate functionality
    router.push('/preview');
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Capitalism Survival Guide</h1>
          <p className="mt-2 text-gray-600">
            Applicant #{applicantNumber} | Austin, TX | applicant{applicantNumber}@survivaltactics.io
          </p>
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