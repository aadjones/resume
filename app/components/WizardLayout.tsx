import { ReactNode, useState } from "react";
import FinalPreview from "./FinalPreview";
import MobilePreviewModal from "./MobilePreviewModal";
import { EyeIcon } from "@heroicons/react/24/outline";

interface WizardLayoutProps {
  children: ReactNode;
}

export default function WizardLayout({ children }: WizardLayoutProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <main className="w-full lg:w-2/3 p-6 overflow-auto">
        {children}
        {/* Mobile Preview Button */}
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <EyeIcon className="h-6 w-6" />
          <span className="sr-only">View Preview</span>
        </button>
      </main>
      <aside className="hidden lg:block lg:w-1/3 border-l p-6 overflow-auto">
        <FinalPreview />
      </aside>
      <MobilePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
