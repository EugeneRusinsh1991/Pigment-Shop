---
name: model-recommender
description: Evaluates task complexity and recommends the appropriate AI model (Gemini 3.6 Flash Low/Medium/High, Gemini 3.1 Pro High) considering edit files, directories, and read context.
---

## Model Recommendation Matrix (Total Impact Score)
- **Total Impact Score** = `f` (target edit files) + `d` (affected directories) + `ctx` (read-only dependencies, global theme/contexts).
- **MANDATORY ESCALATION RULES**:
  - **Score 1-3** -> 🟢 **G 3.6 F (L)**
  - **Score 4-6** -> 🟡 **G 3.6 F (M)**
  - **Score 7-10** -> 🟠 **G 3.6 F (H)**
  - **Score >10** -> 🔴 **G 3.1 P (H)**

## Parent Task & Subtask Recommendation Guidelines
- **Parent Task**: Calculate recommended model for executing the ENTIRE parent task in a single session.
- **Subtasks**: Calculate recommended model for EACH subtask.
- **Output Format (Ultra-Compact)**:
  `<emoji> <Abbreviated Model> — <N>d | <M>f | +<K>ctx`
  - `d` = directories affected
  - `f` = target edit files
  - `ctx` = read-only context/dependencies (e.g. `src/theme/`, shared hooks)
  - Examples:
    - `🟢 G 3.6 F (L) — 1d | 1f | +0ctx`
    - `🟡 G 3.6 F (M) — 1d | 3f | +1ctx`
    - `🟠 G 3.6 F (H) — 2d | 5f | +2ctx`
    - `🔴 G 3.1 P (H) — 4d | 10f | +5ctx`
- **Decomposition Recommendation**: If Total Impact Score > 15 or target edit files > 10, explicitly add:
  `⚠️ Action: BREAK DOWN INTO SUBTASKS`
