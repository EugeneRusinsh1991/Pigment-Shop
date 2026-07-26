---
name: model-recommender
description: Evaluates task complexity and recommends the appropriate AI model (Gemini 3.6 Flash Low/Medium/High, Gemini 3.1 Pro High).
---

## Initial Call & Model Escalation Rules (+20% Complexity Buffer)
- **Default Entry Point Model**: 🟢 **3.6 Flash (Low)** (for simple/trivial tasks).
- **MANDATORY MODEL ESCALATION RULES**:
  - **Trivial/Simple (1/5)** -> 🟢 **3.6 Flash (Low)**
    - *Examples*: Typo fixes, color/spacing CSS tweaks, single-file text edits, simple comments.
  - **Low (2/5) or >2 files** -> 🟡 **3.6 Flash (Medium)**
    - *Examples*: Refactoring an isolated component, fixing single-file bug, adding props.
  - **Medium (3/5) or >4 files** -> 🟠 **3.6 Flash (High)**
    - *Examples*: Multi-file component refactoring, modifying shared hooks/state, 3-4 file edits.
  - **High / Complex (4-5/5) or >5 files / Global Primitives** -> 🔴 **3.1 Pro (High)**
    - *Examples*: Global UI primitive redesign, breaking architectural changes, complex state rewrites, repository audits.
