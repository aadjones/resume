'use client';

import { useRouter } from 'next/navigation';
import { useWizard } from '../context/WizardContext';

interface StepControlsProps {
  step: number;
  total: number;
  onNext: () => void;
  onBack: () => void;
}

export default function StepControls({ step, total, onNext, onBack }: StepControlsProps) {
  const router = useRouter();
  const { setIndustry } = useWizard();
  
  const getStepName = (stepNumber: number) => {
    switch (stepNumber) {
      case 0: return 'Profile';
      case 1: return 'Experience';
      case 2: return 'Skills';
      case 3: return 'Review';
      default: return '';
    }
  };

  const handleBackToIndustry = () => {
    setIndustry('tech'); // Reset to default industry, which will clear all content
    router.push('/wizard/industry');
  };

  return (
    <div className="flex justify-between items-center">
      {step === 0 ? (
        <button
          onClick={handleBackToIndustry}
          className="px-6 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Industry
        </button>
      ) : (
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to {getStepName(step - 1)}
        </button>
      )}
      
      {step < total - 1 && (
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
        >
          Continue to {getStepName(step + 1)} →
        </button>
      )}
      
      {step === total - 1 && (
        <button
          onClick={onNext}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-auto"
        >
          Finish →
        </button>
      )}
    </div>
  );
} 