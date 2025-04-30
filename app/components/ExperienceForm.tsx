'use client';

import { useEffect, useState } from 'react';
import { useWizard } from '../context/WizardContext';
import type { ExperienceEntry } from '../context/WizardContext';
import { BUTTON_TEXT, ERROR_MESSAGES, BUTTON_STYLES, BUTTON_TOOLTIPS } from '../constants/ui-strings';
import { survivalPhrases, companyNames, jobTitles, dateRanges, locations } from '../data/survival-phrases';
import { FEATURE_FLAGS } from '../config/feature-flags';

// Add loading state tracking
type LoadingState = {
  jobIndex: number;
  respIndex: number;
  type: 'autofill' | 'rewrite' | 'company' | 'title' | 'dateRange';
} | null;

const emptyJob: ExperienceEntry = {
  company: '',
  title: '',
  dateRange: '',
  location: '',
  responsibilities: ['']
};

export default function ExperienceForm() {
  const { content, setContent, industry } = useWizard();
  const [loadingState, setLoadingState] = useState<LoadingState>(null);
  const [error, setError] = useState<string | null>(null);

  // ──────── initialize exactly one empty job on first mount ─────────
  useEffect(() => {
    if (!content.experience || content.experience.length === 0) {
      setContent(prev => ({
        ...prev,
        experience: [{ ...emptyJob }]
      }));
    }
  }, [content.experience, setContent]);

  // ──────── handlers ─────────
  const addNewJob = () => {
    setContent(prev => ({
      ...prev,
      experience: [...prev.experience, { ...emptyJob }]
    }));
  };

  const updateEntry = (
    index: number,
    field: keyof Omit<ExperienceEntry, 'responsibilities'>,
    value: string
  ) => {
    setContent(prev => ({
      ...prev,
      experience: prev.experience.map((entry, i) => 
        i === index ? { ...entry, [field]: value } : entry
      )
    }));
  };

  const updateResponsibility = (jobIndex: number, respIndex: number, value: string) => {
    setContent(prev => ({
      ...prev,
      experience: prev.experience.map((entry, i) => {
        if (i === jobIndex) {
          const newResponsibilities = [...entry.responsibilities];
          newResponsibilities[respIndex] = value;
          return { ...entry, responsibilities: newResponsibilities };
        }
        return entry;
      })
    }));
  };

  const addResponsibility = (jobIndex: number) => {
    setContent(prev => ({
      ...prev,
      experience: prev.experience.map((entry, i) => {
        if (i === jobIndex) {
          return {
            ...entry,
            responsibilities: [...entry.responsibilities, '']
          };
        }
        return entry;
      })
    }));
  };

  const removeResponsibility = (jobIndex: number, respIndex: number) => {
    setContent(prev => ({
      ...prev,
      experience: prev.experience.map((entry, i) => {
        if (i === jobIndex) {
          return {
            ...entry,
            responsibilities: entry.responsibilities.filter((_, idx) => idx !== respIndex)
          };
        }
        return entry;
      })
    }));
  };

  const removeJob = (index: number) => {
    setContent(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  // ──────── render ─────────
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Experience</h1>
        <p className="text-gray-600 mb-6">Add your work history and responsibilities</p>
      </div>

      {content.experience.map((entry, jobIndex) => (
        <div key={jobIndex} className="border rounded-lg p-6 space-y-6">
          {/* header with Job # and optional Remove */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Job #{jobIndex + 1}</h3>
            {jobIndex > 0 && (
              <button
                onClick={() => removeJob(jobIndex)}
                className={BUTTON_STYLES.REMOVE}
              >
                Remove
              </button>
            )}
          </div>

          {/* two-column fields */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {/* left */}
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Company
                </span>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={entry.company}
                    onChange={e => {
                      updateEntry(jobIndex, 'company', e.target.value);
                      setError(null);
                    }}
                    placeholder="Company Name"
                    className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    disabled={loadingState?.jobIndex === jobIndex && loadingState?.type === 'company'}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const companies = companyNames[industry];
                        const newValue = companies[Math.floor(Math.random() * companies.length)];
                        updateEntry(jobIndex, 'company', newValue);
                      }}
                      disabled={loadingState !== null}
                      title={BUTTON_TOOLTIPS.AUTO_FILL}
                      className={loadingState !== null ? BUTTON_STYLES.ACTION_DISABLED : BUTTON_STYLES.ACTION}
                    >
                      {BUTTON_TEXT.AUTO_FILL}
                    </button>
                    
                    {entry.company.trim() !== '' && FEATURE_FLAGS.ENABLE_RECAST && (
                      <button
                        onClick={async () => {
                          try {
                            setLoadingState({ jobIndex, respIndex: -1, type: 'rewrite' });
                            setError(null);
                            const response = await fetch('/api/rewrite-for-survival', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                text: entry.company,
                                industry
                              })
                            });
                            
                            if (!response.ok) throw new Error('Rewrite failed');
                            
                            const { rewrittenText } = await response.json();
                            updateEntry(jobIndex, 'company', rewrittenText);
                          } catch (err) {
                            setError(ERROR_MESSAGES.REWRITE_FAILED);
                          } finally {
                            setLoadingState(null);
                          }
                        }}
                        disabled={loadingState !== null}
                        title={BUTTON_TOOLTIPS.REWRITE}
                        className={loadingState !== null ? BUTTON_STYLES.ACTION_DISABLED : BUTTON_STYLES.ACTION}
                      >
                        {loadingState?.jobIndex === jobIndex && 
                         loadingState?.type === 'rewrite' ? BUTTON_TEXT.LOADING : BUTTON_TEXT.REWRITE}
                      </button>
                    )}
                  </div>
                </div>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Title
                </span>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={entry.title}
                    onChange={e => {
                      updateEntry(jobIndex, 'title', e.target.value);
                      setError(null);
                    }}
                    placeholder="Job Title"
                    className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    disabled={loadingState?.jobIndex === jobIndex && loadingState?.type === 'title'}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const titles = jobTitles[industry];
                        const newValue = titles[Math.floor(Math.random() * titles.length)];
                        updateEntry(jobIndex, 'title', newValue);
                      }}
                      disabled={loadingState !== null}
                      title={BUTTON_TOOLTIPS.AUTO_FILL}
                      className={loadingState !== null ? BUTTON_STYLES.ACTION_DISABLED : BUTTON_STYLES.ACTION}
                    >
                      {BUTTON_TEXT.AUTO_FILL}
                    </button>
                    
                    {entry.title.trim() !== '' && FEATURE_FLAGS.ENABLE_RECAST && (
                      <button
                        onClick={async () => {
                          try {
                            setLoadingState({ jobIndex, respIndex: -1, type: 'rewrite' });
                            setError(null);
                            const response = await fetch('/api/rewrite-for-survival', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                text: entry.title,
                                industry
                              })
                            });
                            
                            if (!response.ok) throw new Error('Rewrite failed');
                            
                            const { rewrittenText } = await response.json();
                            updateEntry(jobIndex, 'title', rewrittenText);
                          } catch (err) {
                            setError(ERROR_MESSAGES.REWRITE_FAILED);
                          } finally {
                            setLoadingState(null);
                          }
                        }}
                        disabled={loadingState !== null}
                        title={BUTTON_TOOLTIPS.REWRITE}
                        className={loadingState !== null ? BUTTON_STYLES.ACTION_DISABLED : BUTTON_STYLES.ACTION}
                      >
                        {loadingState?.jobIndex === jobIndex && 
                         loadingState?.type === 'rewrite' ? BUTTON_TEXT.LOADING : BUTTON_TEXT.REWRITE}
                      </button>
                    )}
                  </div>
                </div>
              </label>
            </div>

            {/* right */}
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Date Range
                </span>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={entry.dateRange}
                    onChange={e => {
                      updateEntry(jobIndex, 'dateRange', e.target.value);
                      setError(null);
                    }}
                    placeholder="e.g., Jan 2020 – Present"
                    className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    disabled={loadingState?.jobIndex === jobIndex && loadingState?.type === 'dateRange'}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const newValue = dateRanges[Math.floor(Math.random() * dateRanges.length)];
                        updateEntry(jobIndex, 'dateRange', newValue);
                      }}
                      disabled={loadingState !== null}
                      title={BUTTON_TOOLTIPS.AUTO_FILL}
                      className={loadingState !== null ? BUTTON_STYLES.ACTION_DISABLED : BUTTON_STYLES.ACTION}
                    >
                      {BUTTON_TEXT.AUTO_FILL}
                    </button>
                    
                    {entry.dateRange.trim() !== '' && FEATURE_FLAGS.ENABLE_RECAST && (
                      <button
                        onClick={async () => {
                          try {
                            setLoadingState({ jobIndex, respIndex: -1, type: 'rewrite' });
                            setError(null);
                            const response = await fetch('/api/rewrite-for-survival', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                text: entry.dateRange,
                                industry
                              })
                            });
                            
                            if (!response.ok) throw new Error('Rewrite failed');
                            
                            const { rewrittenText } = await response.json();
                            updateEntry(jobIndex, 'dateRange', rewrittenText);
                          } catch (err) {
                            setError(ERROR_MESSAGES.REWRITE_FAILED);
                          } finally {
                            setLoadingState(null);
                          }
                        }}
                        disabled={loadingState !== null}
                        title={BUTTON_TOOLTIPS.REWRITE}
                        className={loadingState !== null ? BUTTON_STYLES.ACTION_DISABLED : BUTTON_STYLES.ACTION}
                      >
                        {loadingState?.jobIndex === jobIndex && 
                         loadingState?.type === 'rewrite' ? BUTTON_TEXT.LOADING : BUTTON_TEXT.REWRITE}
                      </button>
                    )}
                  </div>
                </div>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Location
                </span>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={entry.location}
                    onChange={e =>
                      updateEntry(jobIndex, 'location', e.target.value)
                    }
                    placeholder="City, ST"
                    className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const newValue = locations[industry][Math.floor(Math.random() * locations[industry].length)];
                        updateEntry(jobIndex, 'location', newValue);
                      }}
                      disabled={loadingState !== null}
                      title={BUTTON_TOOLTIPS.AUTO_FILL}
                      className={loadingState !== null ? BUTTON_STYLES.ACTION_DISABLED : BUTTON_STYLES.ACTION}
                    >
                      {BUTTON_TEXT.AUTO_FILL}
                    </button>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Responsibilities Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Responsibilities
            </label>
            {entry.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={e => {
                      updateResponsibility(jobIndex, respIndex, e.target.value);
                      setError(null); // Clear any previous errors
                    }}
                    placeholder="Enter a responsibility"
                    className="flex-1 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    disabled={loadingState?.jobIndex === jobIndex && loadingState?.respIndex === respIndex}
                  />
                  {entry.responsibilities.length > 1 && (
                    <button
                      onClick={() => removeResponsibility(jobIndex, respIndex)}
                      className={BUTTON_STYLES.REMOVE}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2 ml-1">
                  <button
                    onClick={() => {
                      const phrases = survivalPhrases[industry].experience;
                      const newValue = phrases[Math.floor(Math.random() * phrases.length)];
                      updateResponsibility(jobIndex, respIndex, newValue);
                    }}
                    disabled={loadingState !== null}
                    title={BUTTON_TOOLTIPS.AUTO_FILL}
                    className={loadingState !== null ? BUTTON_STYLES.ACTION_DISABLED : BUTTON_STYLES.ACTION}
                  >
                    {BUTTON_TEXT.AUTO_FILL}
                  </button>
                  
                  {resp.trim() !== '' && FEATURE_FLAGS.ENABLE_RECAST && (
                    <button
                      onClick={async () => {
                        try {
                          setLoadingState({ jobIndex, respIndex, type: 'rewrite' });
                          setError(null);
                          const response = await fetch('/api/rewrite-for-survival', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              text: resp,
                              industry
                            })
                          });
                          
                          if (!response.ok) throw new Error('Rewrite failed');
                          
                          const { rewrittenText } = await response.json();
                          updateResponsibility(jobIndex, respIndex, rewrittenText);
                        } catch (err) {
                          setError(ERROR_MESSAGES.REWRITE_FAILED);
                        } finally {
                          setLoadingState(null);
                        }
                      }}
                      disabled={loadingState !== null}
                      title={BUTTON_TOOLTIPS.REWRITE}
                      className={loadingState !== null ? BUTTON_STYLES.ACTION_DISABLED : BUTTON_STYLES.ACTION}
                    >
                      {loadingState?.jobIndex === jobIndex && 
                       loadingState?.respIndex === respIndex && 
                       loadingState?.type === 'rewrite' ? BUTTON_TEXT.LOADING : BUTTON_TEXT.REWRITE}
                    </button>
                  )}
                </div>
                
                {/* Error message */}
                {error && loadingState?.jobIndex === jobIndex && 
                 loadingState?.respIndex === respIndex && (
                  <p className="text-sm text-red-500 ml-1">{error}</p>
                )}
              </div>
            ))}

            <button
              onClick={() => addResponsibility(jobIndex)}
              className={BUTTON_STYLES.ADD}
            >
              + Add a Responsibility
            </button>
          </div>
        </div>
      ))}

      {/* add-another button */}
      <button
        onClick={addNewJob}
        className={BUTTON_STYLES.ADD}
      >
        + Add Another Job
      </button>
    </div>
  );
}
