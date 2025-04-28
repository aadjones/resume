# **📜 BACKEND API SPECIFICATION**

**Capitalism Survival Guide: LLM Rewrite for Survival Resume Generator**

---

## **1\. Purpose**

Provide a secure, lightweight backend endpoint that:

* Accepts user-typed input text and selected industry.

* Calls an LLM (e.g., OpenAI GPT-4, Anthropic Claude, or similar) to rewrite the input into industry-specific "capitalist survival dialect."

* Returns rewritten survival-formatted text to frontend.

* Protects API keys and user privacy.

---

## **2\. API Endpoint Overview**

| Field | Value |
| ----- | ----- |
| **HTTP Method** | POST |
| **Endpoint URL** | `/api/rewrite-for-survival` |
| **Authentication** | (Optional MVP) None if app is private, otherwise simple API token for production |
| **Rate Limiting** | (Optional MVP) Soft limits (e.g., 5 req/min/user) to prevent abuse |

---

## **3\. Request Payload (Frontend → Backend)**

| Field | Type | Required? | Description |
| ----- | ----- | ----- | ----- |
| `text` | String | ✅ | User-entered text from input field |
| `industry` | Enum (`tech`, `service`, `healthcare`) | ✅ | Industry selected by user to guide LLM priming |

**Example Request:**

json  
CopyEdit  
`{`  
  `"text": "I worked at a cafe where I served customers and made coffee.",`  
  `"industry": "service"`  
`}`

---

## **4\. Response Payload (Backend → Frontend)**

| Field | Type | Description |
| ----- | ----- | ----- |
| `rewrittenText` | String | Survivalized version of the user's original input |

**Example Response:**

json  
CopyEdit  
`{`  
  `"rewrittenText": "Sustained high-volume client de-escalation efforts and rapid consumable production under volatile environmental conditions."`  
`}`

---

## **5\. LLM Interaction Details**

| Parameter | Value |
| ----- | ----- |
| **Model** | GPT-4 (OpenAI) or equivalent capable LLM |
| **Temperature** | 0.7 (light creativity but still believable) |
| **Max Tokens** | 300 per field (no runaway costs) |
| **Timeout** | 10 seconds |

---

## **6\. Prompt Templates**

| Industry | Prompt Structure |
| ----- | ----- |
| **Tech** | "Rewrite the following professional experience to emphasize optics, agility, survival in shifting priorities, and maximizing apparent productivity in a volatile tech organization." |
| **Service** | "Rewrite the following service industry experience to highlight emotional labor, conflict de-escalation, physical endurance, and customer pacification under unstable conditions." |
| **Healthcare** | "Rewrite the following healthcare experience to showcase compassion exhaustion, systemic navigation under resource scarcity, and compliance with shifting institutional demands." |

**Prompt Injection Logic:**

* Each incoming `text` is inserted into a static prompt per selected `industry`.

* Example full prompt sent to LLM:

vbnet  
CopyEdit  
`Rewrite the following service industry experience to highlight emotional labor, conflict de-escalation, physical endurance, and customer pacification under unstable conditions:`

`[User Text Inserted Here]`

---

## **7\. Error Handling**

| Case | Backend Response |
| ----- | ----- |
| Missing `text` or `industry` | 400 Bad Request with error message |
| Invalid `industry` enum | 400 Bad Request with error message |
| LLM call fails (timeout, error) | 502 Bad Gateway with error message |
| Unexpected server error | 500 Internal Server Error |

**Frontend UX on Error:**

* Display message:

   "Rewrite for Survival failed. Please try again."

---

## **8\. Security & Privacy**

| Principle | Application |
| ----- | ----- |
| **No storage** | User input is processed in memory, not logged or stored permanently. |
| **Secure API Key Management** | API keys for OpenAI or equivalent are stored securely in backend environment variables (not exposed to frontend). |
| **Minimal Payloads** | Only `text` and `industry` are sent; no user identifying data needed or collected. |
| **Optional future enhancements** | Add usage monitoring or abuse protection if open to public later. |

---

## **9\. Deployment and Hosting Suggestions**

| Option | Notes |
| ----- | ----- |
| **Vercel Serverless Functions** | Works perfectly with Next.js or lightweight frontends. Scales automatically. |
| **AWS Lambda** | Good if you need deeper infra control. |
| **Cloudflare Workers** | Extremely cheap and fast, good for low-latency needs. |

For MVP, **Vercel serverless** is simplest if you’re already using Vercel for the frontend.

---

# **📜 Full Backend Rewrite API Summary:**

| Property | Value |
| ----- | ----- |
| Endpoint | `/api/rewrite-for-survival` |
| Method | POST |
| Request | `{ "text": "...", "industry": "..." }` |
| Response | `{ "rewrittenText": "..." }` |
| Error Handling | Standard structured responses |
| Privacy | No storage, secure key handling |
| LLM Prompts | Static templates by industry |

