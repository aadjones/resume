'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ResumeFieldType } from '../types/resume';
import html2pdf from 'html2pdf.js';

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get applicant info from URL parameters
  const applicantNumber = searchParams.get('applicantNumber') || 'Applicant #0000';
  const city = searchParams.get('city') || 'Unknown City';
  const email = searchParams.get('email') || 'unknown@example.com';
  
  // Get industry from URL parameters
  const industry = searchParams.get('industry') || 'tech';
  
  // Get field values from URL parameters
  const objective = searchParams.get(ResumeFieldType.OBJECTIVE) || '';
  const experience = searchParams.get(ResumeFieldType.EXPERIENCE) || '';
  const skills = searchParams.get(ResumeFieldType.SKILLS) || '';

  const handleDownload = () => {
    const element = document.getElementById('resume-content');
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `survival_resume_${applicantNumber.replace('#', '').replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleBack = () => {
    // Create a new URLSearchParams with all current parameters
    const params = new URLSearchParams();
    // Copy all parameters from the current URL
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });
    router.push(`/input?${params.toString()}`);
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div id="resume-content" className="bg-white p-8 rounded-lg shadow-sm space-y-6">
          <div className="text-center">
            <p className="text-gray-600">
              {applicantNumber} | {city} | {email}
            </p>
          </div>

          {objective && (
            <section>
              <h2 className="text-lg font-semibold mb-2">OBJECTIVE</h2>
              <p className="text-gray-700">{objective}</p>
            </section>
          )}

          {experience && (
            <section>
              <h2 className="text-lg font-semibold mb-2">
                {industry === 'tech' ? 'PROFESSIONAL EXPERIENCE' : 
                 industry === 'service' ? 'WORK EXPERIENCE' : 
                 'CLINICAL EXPERIENCE'}
              </h2>
              <p className="text-gray-700">{experience}</p>
            </section>
          )}

          {skills && (
            <section>
              <h2 className="text-lg font-semibold mb-2">
                {industry === 'tech' ? 'TECHNICAL SKILLS' : 
                 industry === 'service' ? 'SKILLS' : 
                 'CERTIFICATIONS'}
              </h2>
              <p className="text-gray-700">{skills}</p>
            </section>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            Download as PDF
          </button>
          <button
            onClick={handleBack}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Editing
          </button>
        </div>
      </div>
    </main>
  );
} 