'use client';

import ExperienceForm from '../../components/ExperienceForm';
import ResumePreview from '../../components/ResumePreview';

export default function ExperienceStep() {
  return (
    <div className="flex gap-8">
      {/* Left Panel - Form */}
      <div className="w-[50%]">
        <ExperienceForm />
      </div>

      {/* Right Panel - Preview */}
      <div className="flex-1">
        <ResumePreview />
      </div>
    </div>
  );
} 