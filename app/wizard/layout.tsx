'use client';

import { Slot } from '@radix-ui/react-slot';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const steps = ['industry', 'identity', 'content', 'review'] as const;
type Step = typeof steps[number];

export default function WizardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { step: Step };
}) {
  const router = useRouter();
  const currentStepIndex = steps.indexOf(params.step);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleBack = () => {
    if (!isFirstStep) {
      router.push(`/wizard/${steps[currentStepIndex - 1]}`);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      router.push(`/wizard/${steps[currentStepIndex + 1]}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-8">
        {children}
      </main>
      <footer className="border-t p-4 flex justify-between">
        <button
          onClick={handleBack}
          className={`px-4 py-2 rounded ${
            isFirstStep
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-blue-600 hover:text-blue-800'
          }`}
          disabled={isFirstStep}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className={`px-4 py-2 rounded ${
            isLastStep
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-blue-600 hover:text-blue-800'
          }`}
          disabled={isLastStep}
        >
          Next →
        </button>
      </footer>
    </div>
  );
} 