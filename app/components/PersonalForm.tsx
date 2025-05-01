'use client';

import { useWizard } from '../context/WizardContext';
import ObjectiveForm from './ObjectiveForm';
import { BUTTON_STYLES, BUTTON_TEXT } from '../constants/ui-strings';
import { survivalPhrases, locations } from '../data/survival-phrases';

export default function PersonalForm() {
  const { identity, setIdentity, content, setContent, industry } = useWizard();

  const handleIdentityChange = (field: 'name' | 'city' | 'email', value: string) => {
    setIdentity({
      ...identity,
      [field]: value
    });
  };

  const getRandomNumber = () => Math.floor(Math.random() * 9000) + 1000;

  const getRandomCity = () => {
    const cityList = locations[industry];
    return cityList[Math.floor(Math.random() * cityList.length)];
  };

  const handleAutofillAll = () => {
    // Generate random applicant number
    const applicantNumber = getRandomNumber();
    
    // Update identity with new random values
    setIdentity({
      name: `Applicant #${applicantNumber}`,
      city: getRandomCity(),
      email: `applicant.${applicantNumber}@flow.io`
    });

    // Get random objective
    const objectives = survivalPhrases[industry].objective;
    const randomObjective = objectives[Math.floor(Math.random() * objectives.length)];
    
    // Update content with new random objective
    setContent(prev => ({
      ...prev,
      objective: randomObjective
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Personal Details</h1>
          <p className="text-gray-600">Add your contact information and career objective</p>
        </div>
        <button
          onClick={handleAutofillAll}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <span>🪄</span> Autofill all!
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Display Name</span>
            <div className="space-y-2">
              <input
                type="text"
                id="name"
                value={identity.name}
                onChange={(e) => handleIdentityChange('name', e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your name"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleIdentityChange('name', `Applicant #${getRandomNumber()}`)}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {BUTTON_TEXT.AUTO_FILL}
                </button>
              </div>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">City</span>
              <div className="space-y-2">
                <input
                  type="text"
                  id="city"
                  value={identity.city}
                  onChange={(e) => handleIdentityChange('city', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your city"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleIdentityChange('city', getRandomCity())}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {BUTTON_TEXT.AUTO_FILL}
                  </button>
                </div>
              </div>
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <div className="space-y-2">
                <input
                  type="email"
                  id="email"
                  value={identity.email}
                  onChange={(e) => handleIdentityChange('email', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleIdentityChange('email', `applicant.${getRandomNumber()}@flow.io`)}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {BUTTON_TEXT.AUTO_FILL}
                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>

        <ObjectiveForm />
      </div>
    </div>
  );
} 