import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon } from '@heroicons/react/24/outline';
import ResumePreview from './ResumePreview';
import MobilePreviewModal from './MobilePreviewModal';
import { useState } from 'react';

interface WizardPageLayoutProps {
  children: ReactNode;
  previousStep?: string;
  nextStep?: string;
  nextButtonText?: string;
}

export default function WizardPageLayout({ 
  children, 
  previousStep,
  nextStep,
  nextButtonText = 'Continue'
}: WizardPageLayoutProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-theme(spacing.32))]">
        {/* Form */}
        <div className="w-full lg:w-1/2 pb-20 lg:pb-0">
          {children}
          
          {/* Mobile Preview Button */}
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="lg:hidden fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="View Resume Preview"
          >
            <EyeIcon className="h-6 w-6" />
          </button>

          {/* Navigation Footer */}
          <div className="fixed bottom-0 left-0 right-0 lg:right-1/2 bg-white dark:bg-gray-900 border-t p-4 flex justify-between items-center">
            {previousStep && (
              <button
                onClick={() => router.push(previousStep)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
            )}
            {nextStep && (
              <button
                onClick={() => router.push(nextStep)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
              >
                {nextButtonText} →
              </button>
            )}
          </div>
        </div>

        {/* Desktop Preview */}
        <div className="hidden lg:block lg:flex-1">
          <ResumePreview />
        </div>
      </div>

      {/* Mobile Preview Modal */}
      <MobilePreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
      />
    </>
  );
} 