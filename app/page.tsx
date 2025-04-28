'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const router = useRouter();

  const handleContinue = () => {
    if (selectedIndustry) {
      router.push(`/input?industry=${selectedIndustry}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Capitalism Survival Guide</h1>
          <p className="mt-2 text-gray-600">Choose Your Industry:</p>
        </div>

        <div className="space-y-4">
          {['tech', 'service', 'healthcare'].map((industry) => (
            <div key={industry} className="flex items-center">
              <input
                type="radio"
                id={industry}
                name="industry"
                value={industry}
                checked={selectedIndustry === industry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor={industry} className="ml-2 block text-sm font-medium text-gray-700">
                {industry.charAt(0).toUpperCase() + industry.slice(1)}
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedIndustry}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
