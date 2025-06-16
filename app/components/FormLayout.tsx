import { ReactNode } from "react";

interface FormLayoutProps {
  children: ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <div className="relative min-h-full pb-20">
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {children}
      </div>
    </div>
  );
}
