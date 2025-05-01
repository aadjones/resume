'use client';

import FinalPreview from '../../components/FinalPreview';
import { useRouter } from 'next/navigation';
import { useWizard } from '../../context/WizardContext';

export default function ReviewStep() {
  const router = useRouter();
  const { identity } = useWizard();

  const handleDownload = async () => {
    const element = document.getElementById('resume-preview-content');
    if (!element) return;

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
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main content area */}
      <div id="resume-preview-content">
        <FinalPreview />
      </div>

      {/* Fixed footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t p-4 flex justify-between items-center">
        <button
          onClick={() => router.push('/wizard/skills')}
          className="px-6 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Skills
        </button>
        
        <button
          onClick={handleDownload}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-lg shadow-lg transform transition hover:scale-105"
        >
          Download Resume as PDF
        </button>
      </div>
    </div>
  );
} 