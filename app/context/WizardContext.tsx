'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateApplicantHeader } from '../../lib/generateApplicantHeader';

type Industry = 'tech' | 'service' | 'healthcare';

export type ExperienceEntry = {
  company: string;
  title: string;
  dateRange: string;
  location: string;
  responsibilities: string[];
};

type ContentState = {
  objective: string;
  experience: ExperienceEntry[];
  skills: string[];
};

type WizardState = {
  industry: Industry;
  setIndustry: (i: Industry) => void;
  identity: { name: string; city: string; email: string };
  setIdentity: (id: { name: string; city: string; email: string }) => void;
  content: ContentState;
  setContent: React.Dispatch<React.SetStateAction<ContentState>>;
};

const WizardContext = createContext<WizardState | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [industry, setIndustry] = useState<Industry>('tech');
  const [identity, setIdentity] = useState({ 
    name: '',
    city: '',
    email: ''
  });
  const [content, setContent] = useState<ContentState>({ 
    objective: '',
    experience: [],
    skills: []
  });

  useEffect(() => {
    const { applicantNumber, city, email } = generateApplicantHeader();
    setIdentity({
      name: applicantNumber,
      city,
      email
    });
  }, []); // Only run once on mount

  return (
    <WizardContext.Provider value={{ industry, setIndustry, identity, setIdentity, content, setContent }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
} 