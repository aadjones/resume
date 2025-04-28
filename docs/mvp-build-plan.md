## **Phase 1: Core Infrastructure Setup**

- [ ] Create Frontend project (Next.js or basic React app)

- [ ] Create Backend serverless function scaffold (Vercel API route, AWS Lambda, etc.)

- [ ] Install basic frontend libraries (html2pdf.js for download, axios/fetch for API calls)

- [ ] Set up Environment Variables for LLM API keys (backend only)

- [ ] Configure CORS/headers for safe frontend/backend communication

---

## **Phase 2: Basic Screens and Navigation**

- [ ] Build Industry Selection Page

      - [ ] Dropdown or radio buttons for industry choices

      - [ ] "Continue" button to move to Input Page

- [ ] Build Resume Input Page

      - [ ] Render 3 dynamic fields based on industry mapping

      - [ ] Layout Auto-Fill \+ Rewrite for Survival buttons per field

- [ ] Build Preview Page

      - [ ] Format Applicant Header (Applicant \#XXXX, City, Email)

      - [ ] Render field sections cleanly (Objective, Experience, Skills/Certifications)

      - [ ] Add Back and Download buttons

---

##  **Phase 3: Core Functionalities**

- [ ] Implement Applicant Header Generator (random number \+ city/email)

- [ ] Implement Static Auto-Fill (pull from placeholder priming dictionaries)

- [ ] Implement Rewrite for Survival Button

      - [ ] POST user text \+ industry to backend

      - [ ] Display loading spinner during API call

      - [ ] Replace field text with rewritten survivalist version

- [ ] Handle Rewrite errors gracefully (retry available)

---

## **Phase 4: Resume Assembly and Polish**

- [ ] Assemble resume properly into final Preview format

- [ ] Implement Download as PDF button (html2pdf.js)

      - [ ] File naming convention (e.g., survival\_resume\_applicantXXXX.pdf)

- [ ] Handle empty fields by hiding section headers if needed

- [ ] Minimal mobile responsiveness (stack fields vertically on small screens)

- [ ] Tiny disclosures ("Auto-Fill uses static text", "Rewrite uses secure LLM call")

---

## **Phase 5: Content Fill-In (after basic build)**

- [ ] Draft Priming Dictionaries for each industry/field (Auto-Fill phrases)

- [ ] Refine Prompt Templates if needed (for better Rewrite outputs)

- [ ] Test randomization/variety of Auto-Fill survival phrases

- [ ] Test survival Rewrite quality with real user-typed inputs

