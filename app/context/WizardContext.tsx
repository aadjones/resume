'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Industry = 'tech' | 'service' | 'healthcare';

type WizardState = {
  industry: Industry;
  setIndustry: (i: Industry) => void;
  identity: { name: string; city: string; email: string };
  setIdentity: (id: { name: string; city: string; email: string }) => void;
  content: { objective: string; experience: string; skills: string };
  setContent: (c: WizardState['content']) => void;
};

const WizardContext = createContext<WizardState | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [industry, setIndustry] = useState<Industry>('tech');
  const [identity, setIdentity] = useState({ name: '', city: '', email: '' });
  const [content, setContent] = useState({ objective: '', experience: '', skills: '' });

  return (
    <WizardContext.Provider value={{ industry, setIndustry, identity, setIdentity, content, setContent }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be inside WizardProvider');
  return ctx;
} 