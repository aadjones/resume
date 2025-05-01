import { getResidualSelfhoodReport } from '../utils/residual-selfhood';
import { FEATURE_FLAGS } from '../config/feature-flags';

interface ResidualSelfhoodReportProps {
  distortionIndex: number;
}

export default function ResidualSelfhoodReport({ distortionIndex }: ResidualSelfhoodReportProps) {
  if (!FEATURE_FLAGS.ENABLE_RESIDUAL_REPORT) {
    return null;
  }

  const report = getResidualSelfhoodReport(distortionIndex);

  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <span>🧬</span> Residual Selfhood Report
      </h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Residual Humanity:</span>
          <span className="font-medium">{report.residualHumanity}%</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Corporate Compliance:</span>
          <span className="font-medium">{report.corporateCompliance}%</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Soul Fragments Detected:</span>
          <span className="font-medium">{report.soulFragmentsDetected}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Dominant Aura:</span>
          <span className="font-medium">{report.dominantAura}</span>
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <p className="text-sm italic text-gray-500">{report.warning}</p>
        </div>
      </div>
    </div>
  );
} 