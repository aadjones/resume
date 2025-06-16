"use client";

import { useEffect } from "react";
import { useWizard } from "../context/WizardContext";
import FormLayout from "./FormLayout";
import { survivalPhrases } from "../data/survival-phrases";
import {
  BUTTON_STYLES,
  BUTTON_TEXT,
  BUTTON_TOOLTIPS,
  DISTORTION_MULTIPLIERS,
} from "../constants/ui-strings";

export default function SkillsForm() {
  const { content, setContent, industry, incrementDistortionIndex } =
    useWizard();

  // Initialize with one blank skill
  useEffect(() => {
    if (!content.skills || content.skills.length === 0) {
      setContent((prev) => ({
        ...prev,
        skills: [""],
      }));
    }
  }, [content.skills, setContent]);

  const addSkill = () => {
    setContent((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }));
  };

  const removeSkill = (index: number) => {
    setContent((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleAutofillSkill = (index: number) => {
    const skills = survivalPhrases[industry].skills;
    const randomSkill = skills[Math.floor(Math.random() * skills.length)];
    updateSkill(index, randomSkill);
    // Increment distortion index for individual field autofill
    incrementDistortionIndex(DISTORTION_MULTIPLIERS.INDIVIDUAL_FIELD);
  };

  const handleAutofillAll = () => {
    const skills = survivalPhrases[industry].skills;
    const usedSkills = new Set<string>();

    // Helper to get a unique random skill
    const getUniqueSkill = (): string => {
      const availableSkills = skills.filter((skill) => !usedSkills.has(skill));
      if (availableSkills.length === 0) {
        // If we've used all skills, reset the used set
        usedSkills.clear();
        return skills[Math.floor(Math.random() * skills.length)];
      }
      const skill =
        availableSkills[Math.floor(Math.random() * availableSkills.length)];
      usedSkills.add(skill);
      return skill;
    };

    // If there are fewer than 3 skills, create exactly 3
    if (!content.skills || content.skills.length < 3) {
      setContent((prev) => ({
        ...prev,
        skills: Array(3)
          .fill("")
          .map(() => getUniqueSkill()),
      }));
      return;
    }

    // If there are 3 or more skills, fill all existing ones
    setContent((prev) => ({
      ...prev,
      skills: prev.skills.map(() => getUniqueSkill()),
    }));
  };

  return (
    <FormLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Skills</h1>
            <p className="text-gray-600">
              List your relevant skills and competencies
            </p>
          </div>

          {/* Global Autofill button */}
          <button
            onClick={handleAutofillAll}
            disabled={!industry}
            title="Automatically fill all skills with AI-generated content"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <span>🪄</span> Autofill all!!
          </button>
        </div>

        <div className="space-y-4">
          {content.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                placeholder="Enter a skill"
                className="flex-1 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => handleAutofillSkill(index)}
                  title={BUTTON_TOOLTIPS.AUTO_FILL}
                  className={BUTTON_STYLES.ACTION}
                >
                  {BUTTON_TEXT.AUTO_FILL}
                </button>
                {content.skills.length > 1 && (
                  <button
                    onClick={() => removeSkill(index)}
                    className={BUTTON_STYLES.REMOVE}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={addSkill}
            className="w-full py-3 mt-6 text-blue-500 hover:text-blue-700 text-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
          >
            + Add a Skill
          </button>
        </div>
      </div>
    </FormLayout>
  );
}
