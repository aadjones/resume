import { ReactNode } from 'react';
import FinalPreview from './FinalPreview';

interface WizardLayoutProps {
  children: ReactNode;
}

export default function WizardLayout({ children }: WizardLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <main className="w-full lg:w-2/3 p-6 overflow-auto">{children}</main>
      <aside className="hidden lg:block lg:w-1/3 border-l p-6 overflow-auto">
        <FinalPreview />
      </aside>
    </div>
  );
} 