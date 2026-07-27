---
name: model-recommender
description: Evaluates task complexity and recommends the appropriate AI model (Gemini 3.6 Flash Low/Medium/High, Gemini 3.1 Pro High) considering edit files, directories, and read context.
---

## Quick Assessment (70% of cases)

**Base Metrics:**
- **f**: Number of files to edit
- **d**: Number of affected directories
- **Quick Score** = `f + d`

**Simple Rules:**
- If f ≤ 2 AND d ≤ 1 → G 3.6 F (L) (trivial)
- If Quick Score ≤ 2 → G 3.6 F (L)
- If Quick Score 3-5 → G 3.6 F (M)
- If f > 50 → G 3.1 P (H) (massive)
- If f > 30 → G 3.6 F (H) (large)
- If Quick Score > 5 → Read references below (gray zone)

## Deep Assessment (30% of cases)

**When to use:** Quick Score > 5 or task has non-obvious complexity

**Read references in order:**
1. `references/heuristics.md` - assessment strategy
2. `references/complexity-matrix.md` - multipliers
3. `references/thresholds.md` - model selection

## Output Format

`<emoji> <Abbreviated Model> — <N>d | <M>f | +<K>ctx`

Examples:
- `🟢 G 3.6 F (L) — 1d | 1f | +0ctx`
- `🟡 G 3.6 F (M) — 1d | 3f | +1ctx`
- `🟠 G 3.6 F (H) — 2d | 5f | +2ctx`
- `🔴 G 3.1 P (H) — 4d | 10f | +5ctx`

## Parent Task & Subtask Guidelines
- **Parent Task**: Calculate for entire parent task in single session
- **Subtasks**: Calculate for EACH subtask separately
- **Decomposition**: Add `⚠️ Action: BREAK DOWN INTO SUBTASKS` if score > 15 or files > 10
