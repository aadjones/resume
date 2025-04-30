'use client';

import { useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { BUTTON_TEXT, ERROR_MESSAGES, BUTTON_STYLES, BUTTON_TOOLTIPS } from '../constants/ui-strings';
import { survivalPhrases } from '../data/survival-phrases';
import { FEATURE_FLAGS } from '../config/feature-flags';

export default function ObjectiveForm() {
  const { content, setContent, industry } = useWizard();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleObjectiveChange = (value: string) => {
    setContent(prev => ({
      ...prev,
      objective: value
    }));
    setError(null);
  };

  const handleAutoFill = () => {
    const phrases = survivalPhrases[industry].objective;
    const newValue = phrases[Math.floor(Math.random() * phrases.length)];
    handleObjectiveChange(newValue);
  };

  const handleRewriteForSurvival = async () => {
    if (!content.objective) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/rewrite-for-survival', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content.objective,
          industry,
          section: 'objective'
        }),
      });

      if (!response.ok) {
        throw new Error('Rewrite failed');
      }

      const data = await response.json();
      handleObjectiveChange(data.rewrittenText);
    } catch (error) {
      console.error('Error rewriting content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
        Objective
      </label>
      <textarea
        id="objective"
        value={content.objective}
        onChange={(e) => handleObjectiveChange(e.target.value)}
        className="w-full h-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your objective statement"
        disabled={isLoading}
      />
      <div className="flex gap-2">
        <button
          onClick={handleAutoFill}
          disabled={isLoading}
          title={BUTTON_TOOLTIPS.AUTO_FILL}
          className={isLoading ? BUTTON_STYLES.ACTION_DISABLED : BUTTON_STYLES.ACTION}
        >
          {BUTTON_TEXT.AUTO_FILL}
        </button>
        {FEATURE_FLAGS.ENABLE_RECAST && (
          <button
            onClick={handleRewriteForSurvival}
            disabled={isLoading || !content.objective}
            title={BUTTON_TOOLTIPS.REWRITE}
            className={isLoading || !content.objective ? BUTTON_STYLES.ACTION_DISABLED : BUTTON_STYLES.ACTION}
          >
            {isLoading ? BUTTON_TEXT.LOADING : BUTTON_TEXT.REWRITE}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 