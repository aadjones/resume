'use client';

import { useRouter } from 'next/navigation';
import { useWizard } from '../../context/WizardContext';
import ResidualSelfhoodReport from '../../components/ResidualSelfhoodReport';

export default function ReportPage() {
  const router = useRouter();
  const { distortionIndex, resetWizard } = useWizard();

  const handleStartOver = () => {
    resetWizard();
    router.push('/wizard/industry');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main content area with proper scrolling */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto my-8 p-8">
          <ResidualSelfhoodReport distortionIndex={distortionIndex} />
        </div>
      </div>

      {/* Fixed footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t p-4 flex justify-center items-center">
        <button
          onClick={handleStartOver}
          className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 font-medium text-lg shadow-lg transform transition hover:scale-105"
        >
          Start Over
        </button>
      </div>
    </div>
  );
} 