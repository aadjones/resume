'use client';

import { useEffect } from 'react';
import { useWizard } from '../context/WizardContext';

export default function SkillsForm() {
  const { content, setContent } = useWizard();

  // Initialize with one blank skill
  useEffect(() => {
    if (!content.skills || content.skills.length === 0) {
      setContent(prev => ({
        ...prev,
        skills: ['']
      }));
    }
  }, [content.skills, setContent]);

  const addSkill = () => {
    setContent(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setContent(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill))
    }));
  };

  const removeSkill = (index: number) => {
    setContent(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Skills</h1>
        <p className="text-gray-600 mb-6">List your relevant skills and competencies</p>
      </div>

      <div className="space-y-4">
        {content.skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={skill}
              onChange={e => updateSkill(index, e.target.value)}
              placeholder="Enter a skill"
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {content.skills.length > 1 && (
              <button
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addSkill}
          className="w-full py-2 text-blue-500 hover:text-blue-700 text-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
        >
          + Add a Skill
        </button>
      </div>
    </div>
  );
} 