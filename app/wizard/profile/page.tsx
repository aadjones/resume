"use client";

import PersonalForm from "../../components/PersonalForm";
import WizardPageLayout from "../../components/WizardPageLayout";

export default function ProfileStep() {
  return (
    <WizardPageLayout
      previousStep="/wizard/industry"
      nextStep="/wizard/experience"
      nextButtonText="Continue to Experience"
    >
      <PersonalForm />
    </WizardPageLayout>
  );
}
