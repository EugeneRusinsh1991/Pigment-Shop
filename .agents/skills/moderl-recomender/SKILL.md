---
name: model-recommender
description: Evaluates task complexity and recommends the appropriate AI model (Gemini 3.6 Flash Low/Medium/High, Gemini 3.1 Pro High).
---

## Initial Call & Model Escalation Rules (+20% Complexity Buffer)
- **Complexity Buffer (+20%)**: Agent MUST add +20% buffer to assessed complexity to account for unexpected side effects, extra tests, and hidden dependencies.
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

## Parent Task & Subtask Recommendation Guidelines
- **Parent Task (Whole Execution)**: ALWAYS calculate and state the recommended model for executing the ENTIRE parent task in a single session (aggregating all files and scope across subtasks).
- **Subtasks (Itemized Execution)**: ALWAYS calculate and state the recommended model for EACH individual subtask so the user can select the appropriate model whether executing the parent task all at once or subtask by subtask.
- **Output Format (Concise)**: Print recommendations strictly in a ultra-concise format:
  `<emoji> <Model Name> (<Tier>) - <N> files`
  Example: `🟠 Gemini 3.6 Flash (High) - 3 files`
  Do NOT output complexity scores, buffers (+20%), or extra text.
- **Decomposition Recommendation (Over-Complex Tasks)**: If post-buffer task complexity reaches 5/5, involves >10 files, or carries extreme architectural risk even for 🔴 **3.1 Pro (High)**, the agent MUST explicitly output:
  - ⚠️ **Action: BREAK DOWN INTO SUBTASKS** before execution.
  - Detail explicit boundaries and subtask split strategy.
