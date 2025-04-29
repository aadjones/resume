'use client';
import { useWizard } from '../../context/WizardContext';
import { useRouter } from 'next/navigation';

type Industry = 'tech' | 'service' | 'healthcare';

export default function IndustryStep() {
  const { industry, setIndustry } = useWizard();
  const router = useRouter();

  const industries: Industry[] = ['tech', 'service', 'healthcare'];

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Choose Your Industry</h1>
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
          onClick={() => router.push('/wizard/identity')}
          className="w-full mt-6 px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          Continue →
        </button>
      )}
    </div>
  );
} 