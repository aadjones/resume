'use client';

import { useWizard } from '../../context/WizardContext';
import { useRouter } from 'next/navigation';

export default function ReviewStep() {
  const { industry, identity, content } = useWizard();
  const router = useRouter();

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    console.log('Downloading PDF...');
  };

  const handleBack = () => {
    router.push('/wizard/content');
  };

  const handleFinish = () => {
    // Create URL parameters with all the data
    const params = new URLSearchParams({
      industry,
      applicantNumber: identity.name,
      city: identity.city,
      email: identity.email,
      objective: content.objective,
      experience: content.experience,
      skills: content.skills
    });
    
    router.push(`/preview?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold dark:text-white">Review Your Resume</h1>
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleFinish}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue to Preview
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 space-y-6">
        {/* Header */}
        <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{identity.name || 'Your Name'}</h2>
          <div className="mt-2 text-gray-600 dark:text-gray-300">
            <span>{identity.city || 'Your City'}</span>
            <span className="mx-2">•</span>
            <span>{identity.email || 'your.email@example.com'}</span>
          </div>
        </div>

        {/* Industry */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Industry</h3>
          <p className="text-gray-700 dark:text-gray-300 capitalize">{industry}</p>
        </div>

        {/* Objective */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Objective</h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{content.objective}</p>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {industry === 'tech' ? 'Professional Experience' : 
             industry === 'service' ? 'Work Experience' : 
             'Clinical Experience'}
          </h3>
          <div className="text-gray-700 dark:text-gray-300">
            {content.experience.split('\n').map((bullet: string, index: number) => (
              <div key={index} className="flex items-start mb-2">
                <span className="mr-2">•</span>
                <span>{bullet.replace(/^-\s*/, '')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {industry === 'tech' ? 'Technical Skills' : 
             industry === 'service' ? 'Skills' : 
             'Clinical Skills'}
          </h3>
          <div className="text-gray-700 dark:text-gray-300">
            {content.skills.split('\n').map((skill: string, index: number) => (
              <div key={index} className="flex items-start mb-2">
                <span className="mr-2">•</span>
                <span>{skill.replace(/^-\s*/, '')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 