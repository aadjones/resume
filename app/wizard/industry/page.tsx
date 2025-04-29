'use client';

import { useWizard } from '../../context/WizardContext';
import { useRouter } from 'next/navigation';

const industries = ['Tech', 'Service', 'Healthcare'] as const;

export default function IndustryStep() {
  const { state, setIndustry } = useWizard();
  const router = useRouter();

  const handleIndustryChange = (industry: string) => {
    setIndustry(industry);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Choose Your Industry</h1>
      <div className="space-y-4">
        {industries.map((industry) => (
          <label
            key={industry}
            className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name="industry"
              value={industry}
              checked={state.industry === industry}
              onChange={(e) => handleIndustryChange(e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-lg">{industry}</span>
          </label>
        ))}
      </div>
    </div>
  );
} 