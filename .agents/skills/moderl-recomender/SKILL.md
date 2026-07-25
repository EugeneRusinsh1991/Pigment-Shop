---
name: model-recommender
description: Evaluates task complexity and recommends the appropriate AI model.
---

## Initial Call & Model Escalation Rules (+20% Complexity Buffer)
- **Default Entry Point Model**: 🟢 **Gemini 3.6 Flash (Medium)**.
- **MANDATORY MODEL ESCALATION RULE**:
  - **Medium (3/5) complexity ALWAYS maps to 🟠 Gemini 3.6 Flash (High)**.
  - **Low (1-2/5) complexity** + more than 4 files -> **escalate to 🟠 Gemini 3.6 Flash (High)**.
  - Any task touching global UI primitives, shared state, or >5 files -> **MUST recommend 🟠 Gemini 3.6 Flash (High)**.
