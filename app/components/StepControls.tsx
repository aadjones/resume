'use client';

interface StepControlsProps {
  step: number;
  total: number;
  onNext: () => void;
  onBack: () => void;
}

export default function StepControls({
  step,
  total,
  onNext,
  onBack,
}: StepControlsProps) {
  const isLastStep = step === total - 1;

  const getNextButtonText = () => {
    switch(step) {
      case 0:
        return 'Continue to Experience →';
      case 1:
        return 'Continue to Skills →';
      case 2:
        return 'Review Resume →';
      case 3:
        return 'Finish';
      default:
        return 'Next →';
    }
  };

  return (
    <div className="flex-1 max-w-[50%]">
      <div className="flex justify-between mt-8">
        {step > 0 && (
          <button
            onClick={onBack}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
        )}
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
        >
          {getNextButtonText()}
        </button>
      </div>
    </div>
  );
} 