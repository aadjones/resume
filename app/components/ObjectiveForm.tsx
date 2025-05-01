'use client';

import { useWizard } from '../context/WizardContext';
import { survivalPhrases } from '../data/survival-phrases';
import { BUTTON_STYLES } from '../constants/ui-strings';

export default function ObjectiveForm() {
  const { content, setContent, industry } = useWizard();

  const handleObjectiveChange = (value: string) => {
    setContent(prev => ({
      ...prev,
      objective: value
    }));
  };

  const handleAutofill = () => {
    const objectives = survivalPhrases[industry].objective;
    const randomObjective = objectives[Math.floor(Math.random() * objectives.length)];
    handleObjectiveChange(randomObjective);
  };

  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Objective</span>
        <div className="space-y-2">
          <textarea
            value={content.objective}
            onChange={(e) => handleObjectiveChange(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your objective statement"
            rows={4}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAutofill}
              className={BUTTON_STYLES.ACTION}
            >
              Autofill
            </button>
          </div>
        </div>
      </label>
    </div>
  );
} 