'use client';

import { convertMarkdownToHtmlForPdf } from '@/lib/format-utils';
import html2pdf from 'html2pdf.js';

export interface PDFDownloadButtonProps {
  applicantNumber: string;
  city: string;
  email: string;
  objective: string;
  experience: string;
  skills: string;
  industry: string;
}

const PDFDownloadButton = ({
  applicantNumber,
  city,
  email,
  objective,
  experience,
  skills,
  industry
}: PDFDownloadButtonProps) => {
  const handleDownload = async () => {
    // Format experience and skills as bullet points if they aren't already
    const formatAsBullets = (text: string) => {
      return text.split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .map(line => line.startsWith('- ') ? line : `- ${line}`)
        .join('\n');
    };

    const markdownContent = `${applicantNumber} | ${city} | ${email}

## OBJECTIVE

${objective}

## ${industry === 'tech' ? 'PROFESSIONAL EXPERIENCE' : industry === 'service' ? 'WORK EXPERIENCE' : 'CLINICAL EXPERIENCE'}

${formatAsBullets(experience)}

## ${industry === 'tech' ? 'TECHNICAL SKILLS' : industry === 'service' ? 'SKILLS' : 'CLINICAL SKILLS'}

${formatAsBullets(skills)}`;

    // Convert markdown to clean HTML
    const cleanHtml = convertMarkdownToHtmlForPdf(markdownContent);
    
    // Create a temporary div
    const tempDiv = document.createElement('div');
    
    // Create custom HTML structure with inline styles
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.2; padding: 0.5in;">
        <div style="text-align: center; margin-bottom: 1.5em;">
          <div style="font-size: 24pt; font-weight: bold; margin-bottom: 0.5em;">${applicantNumber}</div>
          <div style="font-size: 12pt; color: #4B5563;">${city} | ${email}</div>
        </div>

        <div style="margin: 1em 0;">
          <div style="font-size: 14pt; font-weight: bold; margin-bottom: 0.3em;">OBJECTIVE</div>
          <div style="margin-bottom: 0.3em;">${objective}</div>
        </div>

        <div style="margin: 1em 0;">
          <div style="font-size: 14pt; font-weight: bold; margin-bottom: 0.3em;">
            ${industry === 'tech' ? 'PROFESSIONAL EXPERIENCE' : 
              industry === 'service' ? 'WORK EXPERIENCE' : 
              'CLINICAL EXPERIENCE'}
          </div>
          <div style="padding-left: 1em;">
            ${experience.split('\n')
              .map(line => line.trim())
              .filter(line => line)
              .map(line => `<div style="margin: 0.4em 0; text-indent: -0.5em; padding-left: 0.5em; line-height: 1.4;">• ${line.replace(/^-\s*/, '')}</div>`)
              .join('')}
          </div>
        </div>

        <div style="margin: 1em 0;">
          <div style="font-size: 14pt; font-weight: bold; margin-bottom: 0.3em;">
            ${industry === 'tech' ? 'TECHNICAL SKILLS' : 
              industry === 'service' ? 'SKILLS' : 
              'CLINICAL SKILLS'}
          </div>
          <div style="padding-left: 1em;">
            ${skills.split('\n')
              .map(line => line.trim())
              .filter(line => line)
              .map(line => `<div style="margin: 0.4em 0; text-indent: -0.5em; padding-left: 0.5em; line-height: 1.4;">• ${line.replace(/^-\s*/, '')}</div>`)
              .join('')}
          </div>
        </div>
      </div>
    `;

    tempDiv.innerHTML = htmlContent;

    // Configure PDF options
    const opt = {
      margin: 0,  // We're handling margins in the HTML
      filename: `survival_resume_${applicantNumber.replace('#', '').replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate PDF
    await html2pdf().set(opt).from(tempDiv).save();
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
    >
      Download as PDF
    </button>
  );
};

export default PDFDownloadButton; 