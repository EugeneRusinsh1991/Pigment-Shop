---
name: model-recommender
description: Evaluates task complexity and recommends the appropriate AI model (Gemini 3.6 Flash Low/Medium/High, Gemini 3.1 Pro High) considering edit files, directories, read context, and a 20% complexity buffer.
---

## Model Selection Rules

**Base Metrics:**
- **f**: Number of files to edit
- **d**: Number of affected directories
- **ctx**: Extra context files to read

**Formula (Includes 20% Complexity Shift):**
`Quick Score = (f + d + ctx) × 1.2`

**Escalation Thresholds:**
- **Quick Score ≤ 3**: 🟢 **G 3.6 F (L)** (single simple file)
- **Quick Score 4–7**: 🟡 **G 3.6 F (M)** (small task)
- **Quick Score 8–12**: 🟠 **G 3.6 F (H)** (medium task)
- **Quick Score > 12**: 🔴 **G 3.1 P (H)** (large/complex task)

**Level 2 Deep Assessment:**
If Quick Score is near boundary (±2), apply detailed multipliers from [complexity-matrix.md](file:///d:/Magazine/_PigmentShop/.agents/skills/model-recommender/references/complexity-matrix.md), [heuristics.md](file:///d:/Magazine/_PigmentShop/.agents/skills/model-recommender/references/heuristics.md), and [thresholds.md](file:///d:/Magazine/_PigmentShop/.agents/skills/model-recommender/references/thresholds.md).

## Output Format

`<emoji> <Abbreviated Model> — <N>d | <M>f | +<K>ctx | Score: <S>`

Examples:
- `🟢 G 3.6 F (L) — 1d | 1f | +0ctx | Score: 2.4`
- `🟡 G 3.6 F (M) — 1d | 3f | +1ctx | Score: 6.0`
- `🟠 G 3.6 F (H) — 2d | 5f | +2ctx | Score: 10.8`
- `🔴 G 3.1 P (H) — 4d | 10f | +5ctx | Score: 22.8`

## Parent Task & Subtask Guidelines
- **Parent Task**: Calculate for entire parent task in single session
- **Subtasks**: Calculate for EACH subtask separately
- **Decomposition**: Add `⚠️ Action: BREAK DOWN INTO SUBTASKS` if Score > 12 or files > 8
