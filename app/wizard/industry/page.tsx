'use client';
import { useWizard } from '../../context/WizardContext';
import { useRouter } from 'next/navigation';
import { BUTTON_TEXT, DISTORTION_MULTIPLIERS } from '../../constants/ui-strings';

type Industry = 'tech' | 'service' | 'healthcare';

export default function IndustryStep() {
  const { industry, setIndustry, incrementDistortionIndex } = useWizard();
  const router = useRouter();

  const industries: Industry[] = ['tech', 'service', 'healthcare'];

  const handleAutofill = () => {
    const unselectedIndustries = industries.filter(ind => ind !== industry);
    if (unselectedIndustries.length > 0) {
      const randomIndex = Math.floor(Math.random() * unselectedIndustries.length);
      setIndustry(unselectedIndustries[randomIndex]);
      incrementDistortionIndex(DISTORTION_MULTIPLIERS.INDIVIDUAL_FIELD);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Choose Your Industry</h1>
          <p className="text-gray-600">Select the industry that best matches your experience</p>
        </div>
        <button
          onClick={handleAutofill}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <span>🪄</span> Autofill
        </button>
      </div>

      <div className="space-y-4">
        {industries.map((opt) => (
          <label
            key={opt}
            className={`block p-6 border rounded-lg cursor-pointer transition-colors ${
              industry === opt 
                ? 'bg-blue-50 border-blue-300 dark:bg-blue-900/50 dark:border-blue-700' 
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="industry"
                value={opt}
                checked={industry === opt}
                onChange={() => setIndustry(opt)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-lg">
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </span>
            </div>
          </label>
        ))}
      </div>
      
      {industry && (
        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t p-4">
          <button
            onClick={() => router.push('/wizard/profile')}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
} 