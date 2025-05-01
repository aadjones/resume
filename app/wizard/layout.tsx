'use client';

import { Slot } from '@radix-ui/react-slot';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { WizardProvider, useWizard } from '../context/WizardContext';
import ThemeToggle from '../components/ThemeToggle';

// Map URLs to step indices
const STEP_MAPPING = {
  'industry': 0,
  'profile': 1,
  'experience': 2,
  'skills': 3,
  'review': 4
} as const;

type Step = keyof typeof STEP_MAPPING;

function WizardLayoutContent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { step: Step };
}) {
  const router = useRouter();
  const pathname = usePathname() || '/wizard/industry';
  
  // Extract the current step from the pathname and get its index
  const currentStep = (pathname.split('/').pop() || 'industry') as Step;
  const currentStepIndex = STEP_MAPPING[currentStep] ?? 0;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="border-b p-4 flex items-center">
        <h1 className="text-xl font-semibold">Resume Builder</h1>
        <div className="ml-6 flex space-x-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                index === currentStepIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
        <div className="flex-1" />
        <ThemeToggle />
      </header>
      <main className="flex-1 p-8">
        {children}
      </main>
      <footer className="border-t p-4">
        {currentStepIndex > 0 && (
          <button
            onClick={() => {
              const prevStep = Object.entries(STEP_MAPPING).find(([_, idx]) => idx === currentStepIndex - 1)?.[0];
              if (prevStep) {
                router.push(`/wizard/${prevStep}`);
              }
            }}
            className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            ← Back
          </button>
        )}
      </footer>
    </div>
  );
}

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WizardProvider>
      {children}
    </WizardProvider>
  );
} 