'use client';

import { useWizard } from '../../context/WizardContext';

export default function ReviewStep() {
  const { state } = useWizard();

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    console.log('Downloading PDF...');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Review Your Resume</h1>
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download as PDF
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        {/* Header */}
        <div className="text-center border-b pb-6">
          <h2 className="text-3xl font-bold text-gray-900">{state.identity.name}</h2>
          <div className="mt-2 text-gray-600">
            <span>{state.identity.city}</span>
            <span className="mx-2">•</span>
            <span>{state.identity.email}</span>
          </div>
        </div>

        {/* Industry */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry</h3>
          <p className="text-gray-700">{state.industry}</p>
        </div>

        {/* Objective */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Objective</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{state.content.objective}</p>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Experience</h3>
          <div className="text-gray-700">
            {state.content.experience.split('\n').map((bullet, index) => (
              <div key={index} className="flex items-start mb-2">
                <span className="mr-2">•</span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Skills</h3>
          <div className="text-gray-700">
            {state.content.skills.split('\n').map((skill, index) => (
              <div key={index} className="flex items-start mb-2">
                <span className="mr-2">•</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 