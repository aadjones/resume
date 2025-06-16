"use client";

import { useRouter } from "next/navigation";
import { useWizard } from "../../context/WizardContext";
import WizardPageLayout from "../../components/WizardPageLayout";
import MobileResumePreview from "../../components/MobileResumePreview";
import { useEffect, useState } from "react";
import { FEATURE_FLAGS } from "../../config/feature-flags";

export default function ReviewStep() {
  const router = useRouter();
  const { identity } = useWizard();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main content area with proper scrolling */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="lg:hidden">
          <MobileResumePreview />
        </div>
        <div id="resume-preview-content" className="hidden lg:block">
          <div className="max-w-4xl mx-auto bg-white shadow-lg my-8 p-8">
            <MobileResumePreview />
          </div>
        </div>
      </div>

      {/* Fixed footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t p-4 flex justify-between items-center">
        <button
          onClick={() => router.push("/wizard/skills")}
          className="px-6 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Skills
        </button>

        {FEATURE_FLAGS.ENABLE_RESIDUAL_REPORT && (
          <button
            onClick={() => router.push("/wizard/report")}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-lg shadow-lg transform transition hover:scale-105"
          >
            Assess Residual Selfhood
          </button>
        )}
      </div>
    </div>
  );
}
