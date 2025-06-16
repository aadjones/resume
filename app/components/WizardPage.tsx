"use client";

import { useRouter, usePathname } from "next/navigation";
import { useWizard } from "../context/WizardContext";
import PersonalForm from "./PersonalForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import FinalPreview from "./FinalPreview";
import StepControls from "./StepControls";
import ResumePreview from "./ResumePreview";

// Map URLs to step indices
const STEP_MAPPING = {
  profile: 0,
  experience: 1,
  skills: 2,
  review: 3,
} as const;

type Step = keyof typeof STEP_MAPPING;

export default function WizardPage() {
  const router = useRouter();
  const pathname = usePathname() || "/wizard/profile";
  const { content } = useWizard();

  // Extract the current step from the pathname and get its index
  const currentStep = (pathname.split("/").pop() || "profile") as Step;
  const step = STEP_MAPPING[currentStep] ?? 0;

  const handleNext = () => {
    const nextStep = Object.entries(STEP_MAPPING).find(
      ([_, idx]) => idx === step + 1,
    )?.[0];
    if (nextStep) {
      router.push(`/wizard/${nextStep}`);
    }
  };

  const handleBack = () => {
    const prevStep = Object.entries(STEP_MAPPING).find(
      ([_, idx]) => idx === step - 1,
    )?.[0];
    if (prevStep) {
      router.push(`/wizard/${prevStep}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Left Panel - Forms */}
        <div className="w-1/2 relative min-h-full pb-20">
          {step === 0 && <PersonalForm />}
          {step === 1 && <ExperienceForm />}
          {step === 2 && <SkillsForm />}
          {step === 3 && <FinalPreview />}

          {/* Sticky Navigation Footer */}
          <div className="fixed bottom-0 left-0 w-[50%] bg-white dark:bg-gray-900 border-t p-4">
            <StepControls
              step={step}
              total={4}
              onBack={handleBack}
              onNext={handleNext}
            />
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2">
          <div className="sticky top-8">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
