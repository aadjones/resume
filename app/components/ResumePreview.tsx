'use client'
import { useWizard } from '../context/WizardContext'

export default function ResumePreview() {
  const { identity, content, industry } = useWizard()
  const { name, city, email } = identity
  const { objective, experience, skills } = content

  return (
    <div className="p-8 bg-white text-gray-900 font-serif max-w-4xl mx-auto">
      {/* HEADER */}
      <header className="flex justify-between items-baseline mb-8">
        <h1 className="text-4xl font-bold">{name || 'Your Name'}</h1>
        <div className="text-base text-gray-700">
          {email || 'email@example.com'} | {city || 'City, ST'}
        </div>
      </header>

      {/* OBJECTIVE */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold pb-3 border-b border-gray-300 mb-4">
          OBJECTIVE
        </h2>
        <p className="text-base leading-relaxed">{objective}</p>
      </section>

      {/* WORK EXPERIENCE */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold pb-3 border-b border-gray-300 mb-4">
          WORK EXPERIENCE
        </h2>
        <ul className="space-y-3">
          {experience.split('\n').map((line: string, i: number) => (
            line.trim() && (
              <li key={i} className="flex items-center text-base leading-relaxed">
                <span className="text-lg mr-4 -mt-0.5">•</span>
                <span>{line}</span>
              </li>
            )
          ))}
        </ul>
      </section>

      {/* SKILLS */}
      <section>
        <h2 className="text-2xl font-bold pb-3 border-b border-gray-300 mb-4">
          SKILLS & CERTIFICATIONS
        </h2>
        <ul className="space-y-3">
          {skills.split('\n').map((line: string, i: number) => (
            line.trim() && (
              <li key={i} className="flex items-center text-base leading-relaxed">
                <span className="text-lg mr-4 -mt-0.5">•</span>
                <span>{line}</span>
              </li>
            )
          ))}
        </ul>
      </section>
    </div>
  )
} 