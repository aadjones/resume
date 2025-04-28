import html2pdf from 'html2pdf.js';
import { marked } from 'marked';

export const generatePDF = async (markdownContent: string, applicantNumber: string) => {
  // Create a temporary div with minimal styling
  const tempDiv = document.createElement('div');
  tempDiv.style.fontFamily = 'Arial, sans-serif';
  tempDiv.style.lineHeight = '1.5';
  tempDiv.style.padding = '1in';
  tempDiv.style.maxWidth = '8.5in';
  tempDiv.style.margin = '0 auto';
  
  // Convert markdown to HTML using marked
  const htmlContent = await marked(markdownContent, { async: true });
  tempDiv.innerHTML = htmlContent;

  // Add some basic styling for the bullet points
  const style = document.createElement('style');
  style.textContent = `
    ul { list-style-type: disc; padding-left: 20px; margin: 0; }
    li { margin: 0.5em 0; }
    h2 { font-size: 16px; font-weight: bold; margin: 20px 0 10px; }
  `;
  tempDiv.prepend(style);

  // Configure PDF options
  const opt = {
    margin: 0,
    filename: `survival_resume_${applicantNumber.replace('#', '').replace(/\s+/g, '_')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Generate PDF
  await html2pdf().set(opt).from(tempDiv).save();
}; 