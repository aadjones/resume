/**
 * Parses bullet-pointed text into an array of clean strings.
 * Only processes lines that start with "- " and removes the bullet prefix.
 * 
 * @param text - The bullet-pointed text to parse
 * @returns Array of cleaned bullet point strings
 * 
 * @example
 * parseBullets("- Survived quarterly optics review.\n- Adapted to collapsing KPIs.")
 * // Returns: ["Survived quarterly optics review.", "Adapted to collapsing KPIs."]
 */
export function parseBullets(text: string): string[] {
  return text
    .split('\n')
    .filter(line => line.startsWith('- '))
    .map(line => line.slice(2).trim());
} 