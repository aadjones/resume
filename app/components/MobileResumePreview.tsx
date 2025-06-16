import { useWizard } from "../context/WizardContext";
import type { ExperienceEntry } from "../context/WizardContext";

export default function MobileResumePreview() {
  const { content, identity } = useWizard();
  const { objective, experience, skills } = content;

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {identity.name || "Your Name"}
        </h1>
        <div className="text-gray-600 mt-1">
          {identity.city && <span className="italic">{identity.city}</span>}
          {identity.city && identity.email && <span> • </span>}
          {identity.email && <span>{identity.email}</span>}
        </div>
      </div>

      {/* Objective */}
      {objective && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-3">
            Objective
          </h2>
          <p className="text-gray-700">{objective}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-3">
            Experience
          </h2>
          {experience.map((job: ExperienceEntry, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{job.company}</h3>
                  <p className="text-gray-700 italic">{job.title}</p>
                </div>
                <div className="text-right">
                  <div className="text-gray-600 italic">{job.location}</div>
                  <div className="text-gray-600">{job.dateRange}</div>
                </div>
              </div>
              {job.responsibilities && (
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  {job.responsibilities.map((resp: string, idx: number) => (
                    <li key={idx} className="ml-4">
                      {resp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-3">
            Skills
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {skills.map((skill: string, index: number) => (
              <li key={index} className="text-gray-700 ml-4">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
