import { getResidualSelfhoodReport } from '../utils/residual-selfhood';
import { useEffect, useState } from 'react';

interface ResidualSelfhoodReportProps {
  distortionIndex: number;
}

interface AnimatedValue {
  current: number;
  target: number;
  isVisible: boolean;
}

export default function ResidualSelfhoodReport({ distortionIndex }: ResidualSelfhoodReportProps) {
  const report = getResidualSelfhoodReport(distortionIndex);
  
  // State for animated values
  const [values, setValues] = useState<Record<string, AnimatedValue>>({
    residualHumanity: { current: 100, target: report.residualHumanity, isVisible: false },
    corporateCompliance: { current: 0, target: report.corporateCompliance, isVisible: false },
    soulFragments: { current: 0, target: report.soulFragmentsDetected, isVisible: false },
    warning: { current: 0, target: 100, isVisible: false }
  });

  // Animation timing
  const ANIMATION_DURATION = 1500; // ms
  const STAGGER_DELAY = 400; // ms
  const FRAME_RATE = 60; // fps

  useEffect(() => {
    // Reset values when distortionIndex changes
    setValues({
      residualHumanity: { current: 100, target: report.residualHumanity, isVisible: false },
      corporateCompliance: { current: 0, target: report.corporateCompliance, isVisible: false },
      soulFragments: { current: 0, target: report.soulFragmentsDetected, isVisible: false },
      warning: { current: 0, target: 100, isVisible: false }
    });

    // Start staggered animations
    Object.keys(values).forEach((key, index) => {
      setTimeout(() => {
        setValues(prev => ({
          ...prev,
          [key]: { ...prev[key], isVisible: true }
        }));

        // Animate the value
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
          
          setValues(prev => ({
            ...prev,
            [key]: {
              ...prev[key],
              current: key === 'residualHumanity' 
                ? Math.round(100 - (100 - prev[key].target) * progress) // Decrease from 100 to target
                : Math.round(prev[key].target * progress) // Increase from 0 to target
            }
          }));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }, index * STAGGER_DELAY);
    });
  }, [distortionIndex, report.residualHumanity, report.corporateCompliance, report.soulFragmentsDetected, values]);

  // Helper function to get color based on value
  const getColor = (key: string, value: number) => {
    switch (key) {
      case 'residualHumanity':
        return value > 50 ? 'bg-red-500' : value > 20 ? 'bg-yellow-500' : 'bg-green-500';
      case 'corporateCompliance':
        return value > 50 ? 'bg-green-500' : value > 20 ? 'bg-yellow-500' : 'bg-red-500';
      case 'soulFragments':
        return value > 2 ? 'bg-red-500' : value > 1 ? 'bg-yellow-500' : 'bg-green-500';
      default:
        return 'bg-purple-500';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <span className="animate-pulse">🧬</span> Residual Selfhood Report
      </h2>
      
      <div className="space-y-6">
        {/* Residual Humanity */}
        <div className={`transition-opacity duration-500 ${values.residualHumanity.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Residual Humanity (Needs Improvement):</span>
            <span className="font-medium">{values.residualHumanity.current}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${getColor('residualHumanity', values.residualHumanity.current)}`}
              style={{ width: `${values.residualHumanity.current}%` }}
            />
          </div>
        </div>
        
        {/* Corporate Compliance */}
        <div className={`transition-opacity duration-500 ${values.corporateCompliance.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Corporate Compliance (Target):</span>
            <span className="font-medium">{values.corporateCompliance.current}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${getColor('corporateCompliance', values.corporateCompliance.current)}`}
              style={{ width: `${values.corporateCompliance.current}%` }}
            />
          </div>
        </div>
        
        {/* Soul Fragments */}
        <div className={`transition-opacity duration-500 ${values.soulFragments.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Soul Fragments (Should Be Minimized):</span>
            <span className="font-medium">{values.soulFragments.current}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${getColor('soulFragments', values.soulFragments.current)}`}
              style={{ width: `${(values.soulFragments.current / 4) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Warning */}
        <div className={`pt-4 border-t border-gray-100 transition-opacity duration-500 ${values.warning.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm italic text-gray-500">{report.warning}</p>
        </div>
      </div>
    </div>
  );
} 