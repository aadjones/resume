"use client";

import { useRouter } from "next/navigation";
import { useWizard } from "../../context/WizardContext";
import ResidualSelfhoodReport from "../../components/ResidualSelfhoodReport";
import FinalPreview from "../../components/FinalPreview";
import { HiOutlineDownload, HiOutlineRefresh } from "react-icons/hi";

export default function ReportPage() {
  const router = useRouter();
  const { distortionIndex, resetWizard } = useWizard();

  const handleExportPdf = async () => {
    const element = document.getElementById("resume-preview-content");
    if (!element) return;
    const html2pdf = (await import("html2pdf.js")).default;
    await html2pdf()
      .set({
        margin: 0,
        filename: "survival_resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  const handleStartOver = () => {
    resetWizard();
    router.push("/wizard/industry");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main content area with proper scrolling */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto my-8 p-8">
          <ResidualSelfhoodReport distortionIndex={distortionIndex} />
          {/* Hidden resume preview for PDF export */}
          <div className="absolute -left-[9999px]">
            <FinalPreview />
          </div>
        </div>
      </div>

      {/* Fixed footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t p-4 flex gap-4 justify-center items-center">
        <button
          onClick={handleExportPdf}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg shadow-lg flex items-center gap-2"
        >
          <HiOutlineDownload className="h-5 w-5" />
          Export Resume PDF
        </button>
        <button
          onClick={handleStartOver}
          className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 font-medium text-lg shadow flex items-center gap-2"
        >
          <HiOutlineRefresh className="h-5 w-5" />
          Start Over
        </button>
      </div>
    </div>
  );
}
