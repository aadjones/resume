'use client'

import { useWizard } from '../context/WizardContext'

export default function FinalPreview() {
  const { identity, content, industry } = useWizard()
  const { name, city, email } = identity
  const { objective, experience, skills } = content

  return (
    <div className="p-8 bg-white text-gray-900 max-w-4xl mx-auto">
      {/* HEADER */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{name || 'Your Name'}</h1>
        <div className="text-gray-600 text-lg">
          {city || 'City'} • {email || 'email@example.com'}
        </div>
      </header>

      {/* OBJECTIVE */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Objective</h2>
        <div className="border-b-2 border-black mb-4" />
        <p className="text-lg">{objective}</p>
      </div>

      {/* EXPERIENCE */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Experience</h2>
        <div className="border-b-2 border-black mb-4" />
        {experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-bold">{exp.company}</h3>
              <span>{exp.dateRange}</span>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <p className="text-lg">{exp.title}</p>
              <span className="text-gray-600">{exp.location}</span>
            </div>
            <ul className="list-disc ml-5">
              {exp.responsibilities.map((resp, i) => (
                <li key={i} className="text-lg">{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SKILLS */}
      <div>
        <h2 className="text-2xl font-bold mb-1">Skills</h2>
        <div className="border-b-2 border-black mb-4" />
        <ul className="list-disc ml-5">
          {skills.map((skill, i) => (
            <li key={i} className="text-lg">{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 