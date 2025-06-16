"use client";

import SkillsForm from "../../components/SkillsForm";
import WizardPageLayout from "../../components/WizardPageLayout";

export default function SkillsStep() {
  return (
    <WizardPageLayout
      previousStep="/wizard/experience"
      nextStep="/wizard/review"
      nextButtonText="Review Resume"
    >
      <SkillsForm />
    </WizardPageLayout>
  );
}
