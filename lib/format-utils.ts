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

/**
 * Converts simple Markdown text to clean HTML suitable for PDF generation.
 * Handles headings (h2), bullet points, and paragraphs.
 * 
 * @param markdownText - The Markdown text to convert
 * @returns Clean HTML string with basic tags only
 * 
 * @example
 * convertMarkdownToHtmlForPdf("## Title\n- Bullet 1\n- Bullet 2\nNormal text")
 * // Returns: "<h2>Title</h2><ul><li>Bullet 1</li><li>Bullet 2</li></ul><p>Normal text</p>"
 */
export function convertMarkdownToHtmlForPdf(markdownText: string): string {
  const lines = markdownText.split('\n');
  let html = '';
  let inBulletList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;

    // Handle headings
    if (line.startsWith('## ')) {
      if (inBulletList) {
        html += '</ul>';
        inBulletList = false;
      }
      html += `<h2>${line.slice(3)}</h2>`;
      continue;
    }

    // Handle bullet points
    if (line.startsWith('- ')) {
      if (!inBulletList) {
        html += '<ul>';
        inBulletList = true;
      }
      html += `<li>${line.slice(2)}</li>`;
      continue;
    }

    // Handle regular paragraphs
    if (inBulletList) {
      html += '</ul>';
      inBulletList = false;
    }
    html += `<p>${line}</p>`;
  }

  // Close any open bullet list
  if (inBulletList) {
    html += '</ul>';
  }

  return html;
} 