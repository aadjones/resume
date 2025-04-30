'use client';

import { useState } from 'react';
import { useWizard } from '../context/WizardContext';
import PersonalForm from './PersonalForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import FinalPreview from './FinalPreview';
import ProgressBar from './ProgressBar';
import StepControls from './StepControls';

export default function WizardPage() {
  const [step, setStep] = useState(0);
  const { content } = useWizard();

  return (
    <div className="space-y-6">
      <ProgressBar step={step} total={4} />
      
      <div className="flex gap-8">
        {/* Left Panel */}
        <div className="w-[45%] space-y-6">
          {step === 0 && <PersonalForm />}
          {step === 1 && <ExperienceForm />}
          {step === 2 && <SkillsForm />}
          {step === 3 && <FinalPreview />}
          
          <StepControls 
            step={step}
            total={4}
            onBack={() => setStep(step - 1)} 
            onNext={() => setStep(step + 1)} 
          />
        </div>

        {/* Right Panel */}
        <div className="hidden lg:block flex-1">
          <FinalPreview />
        </div>
      </div>
    </div>
  );
} 