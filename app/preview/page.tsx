'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ResumeFieldType } from '../types/resume';

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
    // TODO: Implement PDF download functionality
    console.log('Download clicked');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Capitalism Survival Guide</h1>
          <p className="mt-2 text-gray-600">
            {applicantNumber} | {city} | {email}
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
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