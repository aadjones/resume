'use client';

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
    // Create a temporary div with professional styling
    const tempDiv = document.createElement('div');
    tempDiv.style.fontFamily = 'Georgia, serif';
    tempDiv.style.fontSize = '12pt';
    tempDiv.style.lineHeight = '1.4';
    tempDiv.style.color = '#111827';
    tempDiv.style.backgroundColor = '#ffffff';
    tempDiv.style.padding = '0.75in';
    tempDiv.style.maxWidth = '8.5in';
    tempDiv.style.margin = '0 auto';
    
    // Create custom HTML structure with explicit styling
    const htmlContent = `
      <div style="font-family: Georgia, serif; color: #111827;">
        <!-- Header -->
        <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5em; margin-bottom: 1.5em;">
          <h1 style="font-size: 24pt; font-weight: bold; margin: 0 0 0.5em 0;">${applicantNumber}</h1>
          <div style="color: #4B5563; font-size: 11pt;">
            ${email} | ${city} | <a href="#" style="color: #2563eb; text-decoration: none;">Portfolio/GitHub link</a>
          </div>
        </div>

        <!-- Work Experience -->
        <div style="margin: 1.5em 0;">
          <h2 style="font-size: 14pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.25em; margin: 0 0 1em 0;">
            WORK EXPERIENCE
          </h2>
          <div style="margin: 1em 0;">
            ${experience.split('\n')
              .map(line => line.trim())
              .filter(line => line)
              .map(line => `
                <div style="display: flex; margin: 0.5em 0;">
                  <span style="margin-right: 0.5em; color: #4B5563;">•</span>
                  <span>${line.replace(/^-\s*/, '')}</span>
                </div>
              `)
              .join('')}
          </div>
        </div>

        <!-- Skills -->
        <div style="margin: 1.5em 0;">
          <h2 style="font-size: 14pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.25em; margin: 0 0 1em 0;">
            ${industry === 'tech' ? 'TECHNICAL SKILLS' : 
              industry === 'service' ? 'SKILLS' : 
              'CERTIFICATIONS & SKILLS'}
          </h2>
          <div style="margin: 1em 0;">
            ${skills.split('\n')
              .map(line => line.trim())
              .filter(line => line)
              .map(line => `
                <div style="display: flex; margin: 0.5em 0;">
                  <span style="margin-right: 0.5em; color: #4B5563;">•</span>
                  <span>${line.replace(/^-\s*/, '')}</span>
                </div>
              `)
              .join('')}
          </div>
        </div>
      </div>
    `;

    tempDiv.innerHTML = htmlContent;

    // Configure PDF options
    const opt = {
      margin: 0,
      filename: `survival_resume_${applicantNumber.replace('#', '').replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait',
        putOnlyUsedFonts: true
      }
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