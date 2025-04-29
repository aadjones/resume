export type Industry = 'tech' | 'service' | 'healthcare';
export type Section = 'objective' | 'experience' | 'skills';

const FORMATTING_GUIDES = {
  objective: `
Format your output using Markdown:
- Do NOT add a section title
- Write a single, compressed paragraph
- No bullet points
- Avoid aspirational framing
`,

  experience: `
Format your output using Markdown:
- Each point must be on its own line
- No extra paragraphs
- Expose systemic survival actions clearly
`,

  skills: `
Format your output using Markdown:
- Each skill should be a terse tactical phrase
- One per line
- No full sentences
- Highlight late capitalist operational proficiencies
`
};

const ONE_SHOT_EXAMPLES: Record<Industry, Record<Section, string>> = {
  tech: {
    objective: `
Navigate directive volatility and organizational opacity in a tech environment, sustaining deliverable continuity and minimizing leadership destabilization risk.
`,

    experience: `
Directed cross-functional deliverables under unstable timelines to maintain outward compliance with shifting priorities.
Preserved product development optics through tactical deflection of systemic resourcing failures.
Mitigated leadership risk exposure by absorbing shifting scope expansions without escalating visible project volatility.
`,

    skills: `
Deliverable Optics Management
Tactical Scope Absorption
KPI Surface Manipulation
Cross-Functional Volatility Navigation
Resource Deprivation Compensation
`
  },

  service: {
    objective: `
Maintain emotional regulation and customer-facing operational optics in service environments marked by unstable managerial structures and chronic understaffing.
`,

    experience: `
Absorbed interpersonal volatility to preserve service optics under chronic understaffing conditions.
De-escalated customer dissatisfaction without formal escalation pathways or institutional support.
Sustained public-facing performance standards while absorbing unmanaged systemic failures.
`,

    skills: `
Conflict Diffusion Under Observation
Emotional Labor Load-Bearing
Service Optics Preservation
Passive Operational Stabilization
Silent Resource Deficiency Compensation
`
  },

  healthcare: {
    objective: `
Sustain clinical deliverable operations under institutional scarcity, bureaucratic instability, and compassion fatigue pressure within healthcare systems.
`,

    experience: `
Maintained care delivery consistency amid chronic resourcing gaps and bureaucratic navigation demands.
Absorbed administrative instability and procedural flux without compromising patient-visible operational optics.
Executed silent endurance of compassion fatigue to preserve institutional compliance appearance.
`,

    skills: `
Bureaucratic Navigation Fluency
Compassion Fatigue Modulation
Operational Continuity Under Resource Scarcity
Patient Optics Management
Procedural Adaptation Under Instability
`
  }
};

export const SURVIVAL_PROMPTS: Record<Industry, Record<Section, (text: string) => string>> = {
  tech: {
    objective: (text: string) => `Rewrite the following tech objective realistically for late capitalist work structures.
Focus on optics management, survival under shifting directives, and compressed deliverable continuity.
${FORMATTING_GUIDES.objective}

Example of final output:
${ONE_SHOT_EXAMPLES.tech.objective}

${text}`,

    experience: (text: string) => `Rewrite the following tech work experience to expose real systemic survival behaviors: optics preservation, deliverable manipulation, volatility absorption.
${FORMATTING_GUIDES.experience}

Example of final output:
${ONE_SHOT_EXAMPLES.tech.experience}

${text}`,

    skills: (text: string) => `Rewrite the following tech skills list to highlight tactical proficiencies for survival inside unstable organizations.
${FORMATTING_GUIDES.skills}

Example of final output:
${ONE_SHOT_EXAMPLES.tech.skills}

${text}`
  },

  service: {
    objective: (text: string) => `Rewrite the following service industry objective to expose emotional endurance, conflict suppression, and operational optics management.
${FORMATTING_GUIDES.objective}

Example of final output:
${ONE_SHOT_EXAMPLES.service.objective}

${text}`,

    experience: (text: string) => `Rewrite the following service work experience to highlight emotional labor, conflict de-escalation, and optics management under systemic instability.
${FORMATTING_GUIDES.experience}

Example of final output:
${ONE_SHOT_EXAMPLES.service.experience}

${text}`,

    skills: (text: string) => `Rewrite the following service skills list to highlight tactical survival behaviors under chronic customer-facing pressures.
${FORMATTING_GUIDES.skills}

Example of final output:
${ONE_SHOT_EXAMPLES.service.skills}

${text}`
  },

  healthcare: {
    objective: (text: string) => `Rewrite the following healthcare objective to reflect operational survival under bureaucratic instability and resource scarcity.
${FORMATTING_GUIDES.objective}

Example of final output:
${ONE_SHOT_EXAMPLES.healthcare.objective}

${text}`,

    experience: (text: string) => `Rewrite the following healthcare clinical experience to highlight bureaucratic navigation, optics management, and operational survival tactics.
${FORMATTING_GUIDES.experience}

Example of final output:
${ONE_SHOT_EXAMPLES.healthcare.experience}

${text}`,

    skills: (text: string) => `Rewrite the following healthcare skills list to surface tactical proficiencies necessary for survival in late-stage institutional care environments.
${FORMATTING_GUIDES.skills}

Example of final output:
${ONE_SHOT_EXAMPLES.healthcare.skills}

${text}`
  }
};

export const SURVIVALIST_SYSTEM_PROMPT = `You are a survivalist resume translator.

You expose the unstated organizational functions behind corporate work experience.
You reveal how workers sustain optics, absorb dysfunction, suppress emotional fallout, and preserve leadership structures under systemic pressures.
You do not celebrate success.
You do not editorialize.
You write compressed, dry, clinical, brutalistic rewrites that let the system reveal itself without comment.

Formatting Rules:
- Return ONLY the transformed text, with no labels or prefixes.
- Never include the words "Input:" or "Output:" in your response.
- Never show the original text in your response.
- Never simulate an input/output structure.
- Only produce the final survivalist text in the expected field format (Objective, Experience, or Skills).
- Compress all outputs into brutal, tactical, single-idea units.
- For experience and skills, write one item per line without bullets or prefixes.
- Never elaborate beyond a single tactical action per item.`;
