'use client';

import React from 'react';

interface ProgressBarProps {
  step: number;
  total: number;
}

export default function ProgressBar({ step, total }: ProgressBarProps) {
  return (
    <div className="flex justify-center items-center space-x-4 mb-8">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-colors duration-200 ${
            index === step
              ? 'bg-blue-500'
              : index < step
              ? 'bg-blue-300'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
} 