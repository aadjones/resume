'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Identity = {
  name: string;
  city: string;
  email: string;
};

type Content = {
  objective: string;
  experience: string;
  skills: string;
};

type WizardState = {
  industry: string;
  identity: Identity;
  content: Content;
};

type WizardContextType = {
  state: WizardState;
  setIndustry: (industry: string) => void;
  setIdentity: (identity: Partial<Identity>) => void;
  setContent: (content: Partial<Content>) => void;
};

const initialState: WizardState = {
  industry: '',
  identity: {
    name: '',
    city: '',
    email: '',
  },
  content: {
    objective: '',
    experience: '',
    skills: '',
  },
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WizardState>(initialState);

  const setIndustry = (industry: string) => {
    setState((prev) => ({ ...prev, industry }));
  };

  const setIdentity = (identity: Partial<Identity>) => {
    setState((prev) => ({
      ...prev,
      identity: { ...prev.identity, ...identity },
    }));
  };

  const setContent = (content: Partial<Content>) => {
    setState((prev) => ({
      ...prev,
      content: { ...prev.content, ...content },
    }));
  };

  return (
    <WizardContext.Provider
      value={{
        state,
        setIndustry,
        setIdentity,
        setContent,
      }}
    >
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