export const FEATURE_FLAGS = {
  ENABLE_RECAST: false, // Feature flag for the Recast button
  ENABLE_PDF_DOWNLOAD: false, // Feature flag for the PDF download button
  ENABLE_RESIDUAL_REPORT: true, // Feature flag for the Residual Selfhood Report
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS; 