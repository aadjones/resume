export const survivalPhrases = {
  objective: [
    "To optimize visible impact velocity while adapting to volatile market conditions and maximizing apparent productivity in a shifting organizational landscape.",
    "Seeking to leverage strategic resource allocation capabilities while maintaining optics-driven performance metrics in a dynamic corporate environment.",
    "Aiming to excel in stakeholder pacification and deadline necromancy while navigating the complex web of corporate survival tactics.",
  ],
  experience: [
    "Spearheaded optics-driven pivot under deadline compression, resulting in enhanced stakeholder satisfaction metrics.",
    "Implemented strategic resource reallocation initiatives while maintaining surface-level productivity indicators.",
    "Optimized stakeholder communication channels to maximize perceived value delivery under resource constraints.",
  ],
  skills: [
    "Deadline Necromancy, API Surface-Level Expansion, Stakeholder Pacification",
    "Resource Optimization, Optics Management, Corporate Survival Tactics",
    "Stakeholder De-escalation, Productivity Theater, Strategic Resource Allocation",
  ],
} as const;

export type PhraseCategory = keyof typeof survivalPhrases;

export function getRandomPhrase(category: PhraseCategory): string {
  const phrases = survivalPhrases[category];
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

export function getRandomPhrases(category: PhraseCategory, count: number): string[] {
  const phrases = [...survivalPhrases[category]];
  const result: string[] = [];
  
  for (let i = 0; i < count && phrases.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    result.push(phrases[randomIndex]);
    phrases.splice(randomIndex, 1);
  }
  
  return result;
} 