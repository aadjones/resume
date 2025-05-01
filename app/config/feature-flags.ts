export const FEATURE_FLAGS = {
  ENABLE_RECAST: false, // Feature flag for the Recast button
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS; 