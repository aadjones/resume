'use client';

import SkillsForm from '../../components/SkillsForm';
import ResumePreview from '../../components/ResumePreview';
import { useRouter } from 'next/navigation';

export default function SkillsStep() {
  const router = useRouter();

  return (
    <div className="flex gap-8">
      {/* Left Panel - Form */}
      <div className="w-[50%]">
        <SkillsForm />

        {/* Sticky Navigation Footer */}
        <div className="fixed bottom-0 left-0 w-[50%] bg-white dark:bg-gray-900 border-t p-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/wizard/experience')}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <button
            onClick={() => router.push('/wizard/review')}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
          >
            Review Resume →
          </button>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="flex-1">
        <ResumePreview />
      </div>
    </div>
  );
} 