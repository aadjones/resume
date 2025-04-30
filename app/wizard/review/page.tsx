'use client';

import FinalPreview from '../../components/FinalPreview';
import { useRouter } from 'next/navigation';
import { useWizard } from '../../context/WizardContext';
import { useEffect, useState } from 'react';

export default function ReviewStep() {
  const router = useRouter();
  const { identity } = useWizard();
  const [html2pdf, setHtml2pdf] = useState<any>(null);

  useEffect(() => {
    import('html2pdf.js').then((module) => {
      setHtml2pdf(() => module.default);
    });
  }, []);

  const handleDownload = async () => {
    if (!html2pdf) return;
    
    const element = document.getElementById('resume-content');
    if (!element) return;

    const opt = {
      margin: 0.5,
      filename: `survival_resume_${identity.name.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 3, // Higher scale for better quality
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: { 
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
      }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => router.push('/wizard/profile')} className="text-gray-600">
          ← Back
        </button>
        <h1 className="text-2xl font-heading font-bold">Review & Export</h1>
        <div /> {/* placeholder for alignment */}
      </div>

      <div id="resume-content" className="bg-white">
        <FinalPreview />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
} 