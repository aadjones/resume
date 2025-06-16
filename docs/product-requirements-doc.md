# **📜 PRODUCT REQUIREMENTS DOCUMENT (PRD)**

**Capitalism Survival Guide: Survival Resume Generator**

---

## **1\. Product Summary**

The Survival Resume Generator is a satirical tool within the broader _Capitalism Survival Guide_ portal.  
 It allows users to generate dystopian, survivalist resumes based on the unspoken realities of different industries, exposing the emotional and systemic realities hidden behind traditional resume formats.

The generator produces resumes that look superficially professional but reveal the transactional, hollow, or brutal values actually demanded by late capitalist labor systems.

---

## **2\. Target Users**

- **Primary:**

  - Disillusioned workers across tech, service, healthcare sectors.

  - People seeking catharsis or dark humor about work and survival.

- **Secondary:**

  - Artists, writers, activists interested in capitalist critique.

  - General internet users looking for satirical novelty.

---

## **3\. Problem Statement**

Modern resumes are sanitized artifacts that mask the survival demands placed on workers.  
 There is no existing tool that allows users to see — and playfully survive — the **true, hidden emotional economics** of job survival under capitalism.

---

## **4\. Core Features**

| Feature                             | Description                                                                                                     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Industry Selection**              | User selects one of 3 industries (Tech, Service, Healthcare) at the start.                                      |
| **Dynamic Resume Fields**           | Based on industry, system loads 3 modular input fields. The specific field mappings for MVP are outlined below. |
| **Optional Field Auto-Fill**        | Each field has an "auto-fill" button to auto-generate satirical content per industry tone.                      |
| **Auto-Generated Applicant Header** | Each resume auto-generates a header like "Applicant \#4587," with fake city/email.                              |
| **Generate Survival Resume**        | User clicks button to compile fields into final formatted resume.                                               |
| **Full-Screen Preview Page**        | Resume preview takes over page; looks serious, plain, and professional at a glance.                             |
| **Download as PDF**                 | After previewing, user can download the resume as a PDF.                                                        |

---

### **4a. Industry-to-Field Mapping**

| Industry       | Field 1   | Field 2                 | Field 3          |
| :------------- | :-------- | :---------------------- | :--------------- |
| **Tech**       | Objective | Professional Experience | Technical Skills |
| **Service**    | Objective | Work Experience         | Skills           |
| **Healthcare** | Objective | Clinical Experience     | Certifications   |

## **5\. User Flow (High Level)**

1. User lands on **Industry Selection Page**.

2. User selects **Tech, Service, or Healthcare**.

3. System loads **3 dynamic input fields**.

4. User types into fields or presses **Auto-fill** to fill each one.

5. User presses **Generate Survival Resume**.

6. System redirects to **Full-Screen Preview Page** showing the compiled resume.

7. User can **Download as PDF** or **Return to Edit**.

---

## **6\. Tone and UX Principles**

| Principle                | Why It Matters                                                              |
| ------------------------ | --------------------------------------------------------------------------- |
| **Deadpan Seriousness**  | Satire must emerge from reading, not from loud design or jokes.             |
| **Speed and Minimalism** | Users should move quickly — this is a survival act, not a major investment. |
| **Respect for Privacy**  | No personal data collected or stored. Everything client-side.               |
| **Optional Playfulness** | "Auto-fill" options encourage light, rapid exploration without pressure.    |

---

## **7\. Scope Boundaries (MVP)**

| Included                             | Excluded                                                   |
| ------------------------------------ | ---------------------------------------------------------- |
| Tech, Service, Healthcare industries | Additional industries (Nonprofit, Finance, Academia, etc.) |
| 3–4 fields per resume                | Complex resume builders (references, publications, etc.)   |
| Per-field Auto-fill                  | Global "theme selector" (serious vs absurd)                |
| Download as PDF                      | Shareable links, cloud saves, or user accounts             |
| Auto-generated Applicant Header      | User-input custom name/email (at MVP)                      |

---

## **8\. Success Criteria (MVP)**

| Metric                                          | Target                                                            |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| Resume generation success rate                  | 95%+ successful generation without frontend errors                |
| Median time to full resume generation           | \<3 minutes                                                       |
| % of users who view Preview page after Generate | 80%+                                                              |
| % of users who Download after Preview           | 50%+                                                              |
| Qualitative feedback (if collected)             | Majority report "darkly funny" or "scarily accurate" as reactions |

---

## **9\. Future Extensions (V2+)**

- Additional industries (Nonprofit, Finance, Academia, Retail Gig Work, etc.)

- "Survival Score" at bottom of resumes.

- Optional "Secret Modes" unlockable after multiple uses (e.g., Burnout Mode).

- Hall of Survived Resumes (anonymous, only for auto-filled ones).

- More elaborate hallucination templates (e.g., Career Progression Simulation).

- Editable Applicant Header customization (with privacy warnings).
