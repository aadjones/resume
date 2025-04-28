# **📜 FRONTEND FIELD REWRITE UX SPECIFICATION**

**Capitalism Survival Guide: Survival Resume Generator**

---

## **1\. Rewrite for Survival Button Placement**

| Element | Behavior |
| ----- | ----- |
| **Per Field Button** | Each text area (Objective, Experience, Skills/Certifications) has a small **Rewrite for Survival** button underneath or adjacent to it. |
| **Visibility** | Button visible **only if** user has typed something manually into the field. |
| **Disabled State** | If the field is empty, the Rewrite button is greyed out or hidden. |

---

## **2\. User Interaction Flow**

| Step | Behavior |
| ----- | ----- |
| **1\. User Types Text** | When user enters any manual text into a field, the Rewrite for Survival button activates (appears or becomes clickable). |
| **2\. User Clicks Rewrite for Survival** | Button triggers a loading spinner or subtle animated state change. |
| **3\. Frontend Sends Request** | Frontend sends `{text: userInput, industry: selectedIndustry}` to `/api/rewrite-for-survival`. |
| **4\. Await API Response** | Display loading spinner directly over field or under button while waiting. |
| **5\. Receive LLM Response** | Replace user-typed text in the field with survivalized version returned by backend. |
| **6\. Allow Manual Edits** | User can freely edit rewritten text afterward if desired. |

---

## **3\. Loading State Behavior**

| State | UX |
| ----- | ----- |
| **During Rewrite** | Show spinner (e.g., tiny animated dots) near button. Disable typing into field during this time. Disable Auto-Fill temporarily to avoid collision. |
| **Timeout Handling** | If no response after 10 seconds, allow user to cancel or retry. |

---

## **4\. Error Handling**

| Error | UX |
| ----- | ----- |
| **API Failure** | Display small error message near button: "Rewrite failed. Please try again." Retry option available. |
| **Network Issue** | Same as API failure handling. |
| **Unexpected Content** | If rewritten text is completely empty, show fallback message: "Rewrite unavailable. Please edit manually." |

---

## **5\. State Behavior**

| State | Behavior |
| ----- | ----- |
| **Preserve Field Contents** | After rewriting, rewritten text becomes field value. |
| **Session Persistence** | If user navigates away (Preview ➔ Back to Edit), rewritten field contents should persist without loss. |
| **Industry Lock** | If user rewrites for one industry, then goes back and changes industry selection, **warning should pop up**: "Changing industry will reset your survival resume." (Optional for MVP.) |

---

## **6\. Frontend API Interaction Spec**

| Property | Details |
| ----- | ----- |
| **POST URL** | `/api/rewrite-for-survival` |
| **Request Payload** | \`{ text: \<string\>, industry: \<'tech' |
| **Response Payload** | `{ rewrittenText: <string> }` |
| **Error Handling** | 502 or 500 responses handled gracefully, suggest retrying. |

---

## **7\. Tiny UX Details (Important)**

| Detail | Reason |
| ----- | ----- |
| **Subtle loading indicators** | Do not block entire screen. Only indicate per-field rewrite happening. |
| **Allow retries easily** | Users will tolerate one failure if retry is immediate. |
| **Editable rewritten text** | Maintain user agency after LLM transformation. |
| **Neutral, boring button style** | No flashing colors or "AI Magic\!" crap — maintain bureaucratic deadpan seriousness. |

---

# **📜 Visual Mockup (Quick Verbal Sketch)**

| Field: Objective |
| ----- |
| \[ Multiline Text Area \] |
| \[Auto-Fill Button\] \[Rewrite for Survival Button\] |
| (Loading spinner appears next to Rewrite button when clicked) |

