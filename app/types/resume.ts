export enum ResumeFieldType {
  OBJECTIVE = 'objective',
  EXPERIENCE = 'experience',
  SKILLS = 'skills'
}

export interface ResumeField {
  id: ResumeFieldType;
  label: string;
  value: string;
} 