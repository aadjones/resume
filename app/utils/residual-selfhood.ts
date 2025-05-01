type ResidualSelfhoodReport = {
  residualHumanity: number;
  corporateCompliance: number;
  soulFragmentsDetected: number;
  dominantAura: string;
  warning: string;
};

const AURA_SPECTRUM = [
  "Soft Blue",
  "Muted Beige",
  "Strategic Gray",
  "Corporate Chrome",
  "Bleeding Magenta",
  "Glitching Violet"
] as const;

export function getResidualSelfhoodReport(distortionIndex: number): ResidualSelfhoodReport {
  // Calculate residual humanity (minimum 0)
  const residualHumanity = Math.max(0, 100 - distortionIndex * 13);

  // Calculate corporate compliance (maximum 100)
  const corporateCompliance = Math.min(100, distortionIndex * 18);

  // Calculate soul fragments (minimum 0)
  const soulFragmentsDetected = Math.max(0, 4 - Math.floor(distortionIndex / 2));

  // Determine dominant aura based on distortion index
  const auraIndex = Math.min(distortionIndex, AURA_SPECTRUM.length - 1);
  const dominantAura = AURA_SPECTRUM[auraIndex];

  // Generate warning based on residual humanity
  let warning: string;
  if (residualHumanity >= 80) {
    warning = "Your essence remains largely intact. Proceed with caution.";
  } else if (residualHumanity >= 50) {
    warning = "Significant distortion detected. Consider recalibration.";
  } else if (residualHumanity >= 20) {
    warning = "Critical levels of corporate assimilation. Immediate intervention recommended.";
  } else {
    warning = "WARNING: Complete corporate convergence imminent. Seek immediate deprogramming.";
  }

  return {
    residualHumanity,
    corporateCompliance,
    soulFragmentsDetected,
    dominantAura,
    warning
  };
} 