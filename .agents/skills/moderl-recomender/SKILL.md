---
name: model-recommender
description: Evaluates task complexity and recommends the appropriate AI model.
---

## Initial Call & Model Escalation Rules (+20% Complexity Buffer)
- **Default Entry Point Model**: 🟢 **Gemini 3.6 Flash (Low)** (for simple/trivial tasks).
- **MANDATORY MODEL ESCALATION RULES**:
  - **Trivial/Simple (1/5)** -> 🟢 **Gemini 3.6 Flash (Low)**
    - *Examples*: Typo fixes, color/spacing CSS tweaks, single-file text edits, simple comments.
  - **Low (2/5) or >2 files** -> 🟡 **Gemini 3.6 Flash (Medium)**
    - *Examples*: Refactoring a isolated component, fixing single-file bug, adding props.
  - **Medium (3/5) or >4 files** -> 🟠 **Gemini 3.6 Flash (High)**
    - *Examples*: Multi-file component refactoring, modifying shared hooks/state, 3-4 file edits.
  - **High (4-5/5) or >5 files / Global Primitives** -> 🟠 **Gemini 3.6 Flash (High)**
    - *Examples*: Global UI primitive redesign, breaking architectural changes, complex state rewrites.
