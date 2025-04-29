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
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <div id="resume-content" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{applicantNumber}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {city} | {email}
            </p>
          </div>

          {objective && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">OBJECTIVE</h2>
              <div className="prose dark:prose-invert">
                <ReactMarkdown>{objective}</ReactMarkdown>
              </div>
            </section>
          )}

          {experience && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {industry === 'tech' ? 'PROFESSIONAL EXPERIENCE' : 
                 industry === 'service' ? 'WORK EXPERIENCE' : 
                 'CLINICAL EXPERIENCE'}
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-900 dark:text-white">
                {experience.split('\n')
                  .filter(line => line.trim())
                  .map((line, index) => (
                    <li key={index}>{line.replace(/^-\s*/, '')}</li>
                  ))}
              </ul>
            </section>
          )}

          {skills && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {industry === 'tech' ? 'TECHNICAL SKILLS' : 
                 industry === 'service' ? 'SKILLS' : 
                 'CLINICAL SKILLS'}
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-900 dark:text-white">
                {skills.split('\n')
                  .filter(line => line.trim())
                  .map((line, index) => (
                    <li key={index}>{line.replace(/^-\s*/, '')}</li>
                  ))}
              </ul>
            </section>
          )}
        </div>

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