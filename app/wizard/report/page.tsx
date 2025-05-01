'use client';

import { useRouter } from 'next/navigation';
import { useWizard } from '../../context/WizardContext';
import ResidualSelfhoodReport from '../../components/ResidualSelfhoodReport';

export default function ReportPage() {
  const router = useRouter();
  const { distortionIndex } = useWizard();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main content area with proper scrolling */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto my-8 p-8">
          <ResidualSelfhoodReport distortionIndex={distortionIndex} />
        </div>
      </div>

      {/* Fixed footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t p-4 flex justify-between items-center">
        <button
          onClick={() => router.push('/wizard/review')}
          className="px-6 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Review
        </button>
      </div>
    </div>
  );
} 