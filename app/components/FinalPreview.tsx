'use client'

import { useWizard } from '../context/WizardContext'

export default function FinalPreview() {
  const { identity, content } = useWizard()
  const { name, city, email } = identity
  const { objective, experience, skills } = content

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-8">
      <div 
        id="resume-preview-content"
        className="bg-white mx-auto shadow-lg border border-gray-200" 
        style={{
          width: '8.5in',
          padding: '0.75in',
          boxSizing: 'border-box',
          fontSize: '11pt',
          lineHeight: '1.3'
        }}
      >
        {/* HEADER */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1 text-center">{name || 'Your Name'}</h1>
          <div className="text-gray-600 text-sm text-center">
            {city || 'City'} • {email || 'email@example.com'}
          </div>
        </div>

        {/* OBJECTIVE */}
        <div className="mb-4">
          <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">Objective</h2>
          <p className="text-sm">{objective}</p>
        </div>

        {/* EXPERIENCE */}
        <div className="mb-4">
          <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">Experience</h2>
          {experience
            .filter(exp => exp.company.trim() !== '' || exp.title.trim() !== '' || exp.dateRange.trim() !== '' || exp.location.trim() !== '')
            .map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-base font-bold">{exp.company}</h3>
                <span className="text-sm">{exp.dateRange}</span>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <p className="text-sm italic">{exp.title}</p>
                <span className="text-xs text-gray-600">{exp.location}</span>
              </div>
              {exp.responsibilities.filter(resp => resp.trim() !== '').length > 0 && (
                <ul className="list-disc ml-4 text-sm">
                  {exp.responsibilities
                    .filter(resp => resp.trim() !== '')
                    .map((resp, i) => (
                    <li key={i} className="mb-0.5">{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* SKILLS */}
        <div>
          <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">Skills</h2>
          {skills.length > 0 && skills[0] !== '' && (
            <ul className="list-disc ml-4 text-sm">
              {skills.map((skill, i) => (
                <li key={i} className="mb-0.5">{skill}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 