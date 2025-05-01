'use client';

import { useRouter } from 'next/navigation';
import { useWizard } from '../../context/WizardContext';
import WizardPageLayout from '../../components/WizardPageLayout';
import MobileResumePreview from '../../components/MobileResumePreview';
import { useEffect, useState } from 'react';
import { FEATURE_FLAGS } from '../../config/feature-flags';

export default function ReviewStep() {
  const router = useRouter();
  const { identity } = useWizard();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    const element = document.getElementById('resume-preview-content');
    if (!element) {
      setIsDownloading(false);
      return;
    }

    try {
      // Get all stylesheets
      const styles = Array.from(document.styleSheets)
        .map(sheet => {
          try {
            return Array.from(sheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
          } catch (e) {
            // Skip external stylesheets
            return '';
          }
        })
        .join('\n');

      // Create a complete HTML document with styles
      const content = `
        <html>
          <head>
            <style>${styles}</style>
          </head>
          <body style="margin:0;padding:0;">
            ${element.outerHTML}
          </body>
        </html>
      `;

      // Call our API endpoint
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: content }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      // Get the PDF blob
      const blob = await response.blob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `survival_resume_${identity.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main content area with proper scrolling */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="lg:hidden">
          <MobileResumePreview />
        </div>
        <div id="resume-preview-content" className="hidden lg:block">
          <div className="max-w-4xl mx-auto bg-white shadow-lg my-8 p-8">
            <MobileResumePreview />
          </div>
        </div>
      </div>

      {/* Fixed footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t p-4 flex justify-between items-center">
        <button
          onClick={() => router.push('/wizard/skills')}
          className="px-6 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Skills
        </button>
        
        {FEATURE_FLAGS.ENABLE_PDF_DOWNLOAD && (
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isDownloading ? 'Generating PDF...' : 'Download Resume as PDF'}
          </button>
        )}
      </div>
    </div>
  );
} 