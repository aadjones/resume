type ResidualSelfhoodReport = {
  residualHumanity: number;
  corporateCompliance: number;
  soulFragmentsDetected: number;
  dominantAura: string;
  warning: string;
};

const AURA_SPECTRUM = [
  "Corporate Chrome",
  "Strategic Gray",
  "Muted Beige",
  "Soft Blue",
  "Bleeding Magenta",
  "Glitching Violet",
] as const;

export function getResidualSelfhoodReport(
  distortionIndex: number,
): ResidualSelfhoodReport {
  // Calculate residual humanity (minimum 0)
  const residualHumanity = Math.max(0, 100 - distortionIndex * 5);

  // Calculate corporate compliance (maximum 100)
  const corporateCompliance = Math.min(100, distortionIndex * 5);

  // Calculate soul fragments (minimum 0)
  const soulFragmentsDetected = Math.max(
    0,
    4 - Math.floor(distortionIndex / 5),
  );

  // Determine dominant aura based on distortion index
  const auraIndex = Math.min(distortionIndex, AURA_SPECTRUM.length - 1);
  const dominantAura = AURA_SPECTRUM[auraIndex];

  // Generate warning based on residual humanity
  let warning: string;
  if (residualHumanity >= 80) {
    warning =
      "Your essence remains largely intact. Consider recalibration for better corporate alignment.";
  } else if (residualHumanity >= 50) {
    warning =
      "Significant distortion detected. Your corporate compliance needs improvement.";
  } else if (residualHumanity >= 20) {
    warning =
      "Critical levels of corporate assimilation. You're on the right track.";
  } else {
    warning =
      "Excellent corporate convergence achieved. You're a model employee.";
  }

  return {
    residualHumanity,
    corporateCompliance,
    soulFragmentsDetected,
    dominantAura,
    warning,
  };
}
