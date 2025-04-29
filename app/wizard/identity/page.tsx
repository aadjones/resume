'use client';

import { useWizard } from '../../context/WizardContext';
import { useRouter } from 'next/navigation';

export default function IdentityStep() {
  const { identity, setIdentity } = useWizard();
  const router = useRouter();

  const handleChange = (field: 'name' | 'city' | 'email', value: string) => {
    setIdentity({
      ...identity,
      [field]: value
    });
  };

  const canContinue = identity.name && identity.city && identity.email;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Your Identity</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Display Name
          </label>
          <input
            type="text"
            id="name"
            value={identity.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            value={identity.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your city"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={identity.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your email"
          />
        </div>

        <button
          onClick={() => router.push('/wizard/content')}
          disabled={!canContinue}
          className={`w-full mt-6 px-4 py-3 rounded-lg font-medium transition-colors ${
            canContinue 
              ? 'text-white bg-blue-600 hover:bg-blue-700' 
              : 'text-gray-400 bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
} 