'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { convertMarkdownToHtmlForPdf } from '@/lib/format-utils';
import '@/styles/pdf.css';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { PDFDownloadButtonProps } from '@/app/preview/PDFDownloadButton';
import ThemeToggle from '../components/ThemeToggle';

// Dynamically import the PDF generation component
const PDFDownloadButton = dynamic<PDFDownloadButtonProps>(() => import('@/app/preview/PDFDownloadButton'), {
  ssr: false,
  loading: () => (
    <button
      disabled
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md opacity-50"
    >
      Download as PDF
    </button>
  ),
});

function PreviewPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const industry = searchParams?.get('industry') || 'tech';
  const applicantNumber = searchParams?.get('applicantNumber') || '';
  const city = searchParams?.get('city') || '';
  const email = searchParams?.get('email') || '';
  const objective = searchParams?.get('objective') || '';
  const experience = searchParams?.get('experience') || '';
  const skills = searchParams?.get('skills') || '';

  const handleBack = () => {
    const params = new URLSearchParams();
    searchParams?.forEach((value, key) => {
      params.append(key, value);
    });
    router.push(`/input?${params.toString()}`);
  };

  return (
    <main className="min-h-screen p-4 bg-white dark:bg-gray-900">
      <div className="max-w-[8.5in] mx-auto space-y-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        
        {/* Resume Content */}
        <div id="resume-content" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm space-y-6 font-serif">
          {/* Header */}
          <header className="border-b pb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{applicantNumber}</h1>
            <div className="text-gray-600 dark:text-gray-300">
              <span>{email}</span>
              <span className="mx-2">|</span>
              <span>{city}</span>
              <span className="mx-2">|</span>
              <a href="#" className="text-blue-600 hover:text-blue-700">Portfolio/GitHub link</a>
            </div>
          </header>

          {/* Work Experience */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase border-b pb-1 mb-4">
              WORK EXPERIENCE
            </h2>
            {experience && (
              <div className="space-y-4">
                {experience.split('\n')
                  .filter(line => line.trim())
                  .map((line, index) => (
                    <div key={index} className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <span className="text-gray-900 dark:text-white">{line.replace(/^-\s*/, '')}</span>
                    </div>
                  ))}
              </div>
            )}
          </section>

          {/* Skills & Certifications */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase border-b pb-1 mb-4">
              {industry === 'tech' ? 'TECHNICAL SKILLS' : 
               industry === 'service' ? 'SKILLS' : 
               'CERTIFICATIONS & SKILLS'}
            </h2>
            {skills && (
              <div className="space-y-2">
                {skills.split('\n')
                  .filter(line => line.trim())
                  .map((line, index) => (
                    <div key={index} className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <span className="text-gray-900 dark:text-white">{line.replace(/^-\s*/, '')}</span>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <PDFDownloadButton
            applicantNumber={applicantNumber}
            city={city}
            email={email}
            objective={objective}
            experience={experience}
            skills={skills}
            industry={industry}
          />
          <button
            onClick={handleBack}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Back to Editing
          </button>
        </div>
      </div>
    </main>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreviewPageContent />
    </Suspense>
  );
} 