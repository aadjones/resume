'use client';

import ExperienceForm from '../../components/ExperienceForm';
import WizardPageLayout from '../../components/WizardPageLayout';

export default function ExperienceStep() {
  return (
    <WizardPageLayout
      previousStep="/wizard/profile"
      nextStep="/wizard/skills"
      nextButtonText="Continue to Skills"
    >
      <ExperienceForm />
    </WizardPageLayout>
  );
} 