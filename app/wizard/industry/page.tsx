'use client';
import { useWizard } from '../../context/WizardContext';
import { useRouter } from 'next/navigation';
import { BUTTON_TEXT } from '../../constants/ui-strings';

type Industry = 'tech' | 'service' | 'healthcare';

export default function IndustryStep() {
  const { industry, setIndustry } = useWizard();
  const router = useRouter();

  const industries: Industry[] = ['tech', 'service', 'healthcare'];

  const handleAutofill = () => {
    const unselectedIndustries = industries.filter(ind => ind !== industry);
    const randomIndustry = unselectedIndustries[Math.floor(Math.random() * unselectedIndustries.length)];
    setIndustry(randomIndustry);
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Choose Your Industry</h1>
        <button
          onClick={handleAutofill}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {BUTTON_TEXT.AUTO_FILL}
        </button>
      </div>
      {industries.map((opt) => (
        <label
          key={opt}
          className={`block mb-3 p-4 border rounded-lg cursor-pointer ${
            industry === opt ? 'bg-blue-50 border-blue-300 dark:bg-blue-900 dark:border-blue-700' : 'border-gray-200 dark:border-gray-700'
          }`}
        >
          <input
            type="radio"
            name="industry"
            value={opt}
            checked={industry === opt}
            onChange={() => setIndustry(opt)}
            className="mr-2"
          />
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </label>
      ))}
      
      {industry && (
        <button
          onClick={() => router.push('/wizard/profile')}
          className="w-full mt-6 px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          Continue →
        </button>
      )}
    </div>
  );
} 