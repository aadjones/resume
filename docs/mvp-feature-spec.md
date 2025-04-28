# **📜 MVP FEATURE SPECIFICATION (REVISED)**

**Capitalism Survival Guide: Survival Resume Generator**

---

## **1\. Overview**

The Survival Resume Generator is a satirical tool that generates realistic-looking resumes exposing the hidden survival logic demanded in different industries under capitalism.  
 Users can:

* Generate a "survivalized" resume based on an industry (Tech, Service, Healthcare).

* Either **Auto-Fill** fields with pre-generated satirical phrases, **or**

* **Rewrite their real typed input** into survival dialect via an LLM backend.

---

## **2\. Core User Flows**

| Flow | Description |
| ----- | ----- |
| **Lazy Survival** | Users click Auto-Fill for instant randomized satirical resume generation (no typing). |
| **Personalized Survival** | Users type real, normal resume-style information, then click Rewrite for Survival, transforming their input into true survival dialect using an LLM. |

---

## **3\. Screens and Components**

| Screen | Components | Actions |
| ----- | ----- | ----- |
| **Industry Selection Page** | Dropdown (Tech, Service, Healthcare), Continue Button | User selects industry |
| **Resume Input Page** | 3 fields based on selected industry | Type manually, Auto-Fill, or Rewrite for Survival |
| **Preview Page** | Fullscreen formatted resume | View, Download PDF, Go Back to Edit |
| **System Components** | Applicant Header Generator, Field Auto-Fill, LLM Rewrite, PDF Generator |  |

---

## **4\. Field Behavior (Per Field)**

| Element | Behavior |
| ----- | ----- |
| **Text Input Area** | Users can type normal text manually. |
| **Auto-Fill Button** | Pulls randomized survival boilerplate from static priming dictionary. |
| **Rewrite for Survival Button** | Sends user-typed input and industry context to backend LLM. Returns rewritten survivalist version. |
| **Editable After Rewriting** | Users can manually tweak survivalized text after Rewrite returns. |
| **Field Labels** | Dynamically loaded based on industry: |

| Industry | Field 1 | Field 2 | Field 3 |
| ----- | ----- | ----- | ----- |
| **Tech** | Objective | Professional Experience | Technical Skills |
| **Service** | Objective | Work Experience | Skills |
| **Healthcare** | Objective | Clinical Experience | Certifications |

---

## **5\. LLM Backend Integration**

| Component | Behavior |
| ----- | ----- |
| **Rewrite for Survival API Endpoint** | Takes user input text \+ industry as parameters. |
| **Prompt Construction** | Inserts user input into industry-specific prompt templates emphasizing survival, optics, emotional suppression, system navigation. |
| **Response Handling** | Returns rewritten survivalist version. |
| **Latency Target** | \<5 seconds round-trip if possible. |
| **Error Handling** | Display “Rewrite failed. Please try again.” if API call errors. |

---

## **6\. Resume Assembly Rules**

| Rule | Details |
| ----- | ----- |
| **Header** | Applicant \#XXXX City, State Email (applicantxxxx@survivaltactics.io) |
| **Order** | Objective → Experience → Skills/Certifications |
| **Formatting** | \- Standard fonts (Arial, Times New Roman) \- Black text on white background \- Professional, dry, boring style |
| **Empty Fields** | If a field is left blank, omit that section heading on final resume. |
| **Applicant Number** | Random 4-digit number (1000–9999) generated per session. |

---

## **7\. Preview and Download Behavior**

| Screen | Behavior |
| ----- | ----- |
| **Preview Page** | Full-screen view of resume, no distractions. |
| **Download as PDF** | Client-side PDF generation (html2pdf.js or equivalent). |
| **Filename** | survival\_resume\_applicantXXXX.pdf |

---

## **8\. State Management**

| Item | Behavior |
| ----- | ----- |
| **Preserve Inputs** | Field entries survive page transitions (Input \<-\> Preview). |
| **Applicant Header State** | Persist through session until hard reset. |
| **Industry Lock-In** | If user navigates backward to Industry Selection, warn that fields will reset. |

---

## **9\. Error Handling**

| Error Case | UX Behavior |
| ----- | ----- |
| LLM Rewrite fails | Show message: "Rewrite for Survival failed. Please try again." Retry option. |
| PDF download fails | Show message: "Download failed. Please try again." |
| Server unreachable | Show: "Service temporarily unavailable. Please try later." (Fallback mode: only Auto-Fill available.) |

---

## **10\. Privacy and Disclosure**

| Item | Disclosure |
| ----- | ----- |
| **Auto-Fill (Static)** | "Auto-Fill phrases generated locally." |
| **Rewrite for Survival (LLM)** | Tiny visible disclosure: "Typed input sent securely for survival conversion." |

---

## **11\. Visual and UX Style**

| Principle | Application |
| ----- | ----- |
| **Deadpan Seriousness** | No obvious jokes, dead-serious resume styling |
| **Immediate Interactions** | Auto-Fill is instant; Rewrite has loading spinner |
| **Minimal Distraction** | No ads, memes, or unrelated visual clutter |
| **Professional Boringness** | Must look at a glance like a real job resume |

