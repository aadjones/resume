'use client';

import { Slot } from '@radix-ui/react-slot';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { WizardProvider, useWizard } from '../context/WizardContext';
import ThemeToggle from '../components/ThemeToggle';

const STEPS = ['industry', 'profile', 'review'] as const;
type Step = typeof STEPS[number];

function WizardLayoutContent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { step: Step };
}) {
  const router = useRouter();
  const currentStepIndex = STEPS.indexOf(params.step);
  const isFirstStep = currentStepIndex === 0;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Resume Builder</h1>
        <ThemeToggle />
      </header>
      <main className="flex-1 p-8">
        {children}
      </main>
      <footer className="border-t p-4">
        {currentStepIndex > 0 && (
          <button
            onClick={() => router.push(`/wizard/${STEPS[currentStepIndex - 1]}`)}
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
  params,
}: {
  children: React.ReactNode;
  params: { step: Step };
}) {
  return (
    <WizardProvider>
      <WizardLayoutContent params={params}>{children}</WizardLayoutContent>
    </WizardProvider>
  );
} 