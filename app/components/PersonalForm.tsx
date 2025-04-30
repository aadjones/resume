'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizard } from '../context/WizardContext';
import ObjectiveForm from './ObjectiveForm';

export default function PersonalForm() {
  const { identity, setIdentity, content } = useWizard();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();

  const handleIdentityChange = (field: 'name' | 'city' | 'email', value: string) => {
    setIdentity({
      ...identity,
      [field]: value
    });
  };

  const handleChangeIndustry = () => {
    if (content.objective || content.experience.length > 0 || content.skills.length > 0) {
      setShowConfirmDialog(true);
    } else {
      router.push('/wizard/industry');
    }
  };

  return (
    <div className="space-y-6">
      {/* Industry Navigation */}
      <button 
        onClick={handleChangeIndustry}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Industry
      </button>

      <div>
        <h1 className="text-2xl font-bold mb-1">Personal Details</h1>
        <p className="text-gray-600 mb-6">Add your contact information and career objective</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Display Name
          </label>
          <input
            type="text"
            id="name"
            value={identity.name}
            onChange={(e) => handleIdentityChange('name', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              value={identity.city}
              onChange={(e) => handleIdentityChange('city', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              onChange={(e) => handleIdentityChange('email', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <ObjectiveForm />
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-medium mb-4">Confirm Industry Change</h3>
            <p className="mb-4">Changing your industry will reset your experience and skills. Are you sure?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmDialog(false);
                  router.push('/wizard/industry');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 