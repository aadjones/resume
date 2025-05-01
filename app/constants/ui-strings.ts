export const BUTTON_TEXT = {
  AUTO_FILL: '🧠 Autofill',
  REWRITE: '⚙️ Recast',
  LOADING: '...'
} as const;

export const BUTTON_TOOLTIPS = {
  AUTO_FILL: 'Give in to the machine',
  REWRITE: 'Give them what they really want'
} as const;

// Add other UI string constants here as needed
export const ERROR_MESSAGES = {
  AUTO_FILL_FAILED: 'Autofill failed. Please try again.',
  REWRITE_FAILED: 'Recast failed. Please try again.'
} as const;

export const DISTORTION_MULTIPLIERS = {
  INDIVIDUAL_FIELD: 1,
  BULK_AUTOFILL: 5
} as const;

export const BUTTON_STYLES = {
  ACTION: 'text-sm text-blue-600 hover:text-blue-800 transition-colors',
  ACTION_DISABLED: 'text-sm text-gray-400 cursor-not-allowed',
  REMOVE: 'text-red-500 hover:text-red-700 transition-colors',
  ADD: 'w-full py-2 text-blue-500 hover:text-blue-700 text-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors'
} as const; 