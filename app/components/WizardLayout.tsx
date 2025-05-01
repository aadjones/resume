import { ReactNode, useState } from 'react';
import FinalPreview from './FinalPreview';

interface WizardLayoutProps {
  children: ReactNode;
}

export default function WizardLayout({ children }: WizardLayoutProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <button 
        className="lg:hidden fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors" 
        onClick={() => setShow(!show)}
      >
        {show ? '✕ Close' : '👁 Preview'}
      </button>
      <main className="w-full lg:w-2/3 p-6 overflow-auto">{children}</main>
      <aside className={`${show ? 'block' : 'hidden'} lg:block lg:w-1/3 border-l p-6 overflow-auto`}>
        <FinalPreview />
      </aside>
    </div>
  );
} 