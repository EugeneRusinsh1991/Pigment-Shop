---
name: model-recommender
description: Evaluates task complexity and recommends the appropriate AI model (Gemini 3.6 Flash Low/Medium/High, Gemini 3.1 Pro High) based on effective file count.
---

## Model Selection Rules

**Base Metrics:**
- **f**: Number of files to edit
- **r**: Number of context files to read (estimated via task scope or hierarchy)
- **Effective Score (S)**: `f + Math.ceil(r / 4)`

**Simple Rules:**
- If S = 1 AND d = 1 → G 3.6 F (L) (single file)
- If S ≤ 4 → G 3.6 F (M) (small task)
- If S ≤ 8 → G 3.6 F (H) (medium task)
- If S > 8 → G 3.1 P (H) (large task)

## Output Format

`<emoji> <Abbreviated Model> — <N>d | <M>f | +<K>r`

Examples:
- `🟢 G 3.6 F (L) — 1d | 1f | +0r`
- `🟡 G 3.6 F (M) — 1d | 3f | +5r`
- `🟠 G 3.6 F (H) — 2d | 5f | +10r`
- `🔴 G 3.1 P (H) — 4d | 8f | +20r`

## Parent Task & Subtask Guidelines
- **Parent Task**: Calculate for entire parent task in single session
- **Subtasks**: Calculate for EACH subtask separately
- **Decomposition**: Add `⚠️ Action: BREAK DOWN INTO SUBTASKS` if S > 8
