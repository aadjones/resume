'use client';

import { useRouter } from 'next/navigation';

export default function PreviewPage() {
  const router = useRouter();

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
            Applicant #4587 | Austin, TX | applicant4587@survivaltactics.io
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-2">OBJECTIVE</h2>
            <p className="text-gray-700">
              To optimize visible impact velocity while adapting to volatile market conditions and maximizing apparent productivity in a shifting organizational landscape.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">PROFESSIONAL EXPERIENCE</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Spearheaded optics-driven pivot under deadline compression</li>
              <li>Implemented strategic resource reallocation initiatives</li>
              <li>Optimized stakeholder communication channels</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">TECHNICAL SKILLS</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Deadline Necromancy</li>
              <li>API Surface-Level Expansion</li>
              <li>Stakeholder Pacification</li>
            </ul>
          </section>
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