---
name: model-recommender
description: Evaluates task complexity and recommends the appropriate AI model (Gemini 3.6 Flash Low/Medium/High, Gemini 3.1 Pro High) based on effective file count.
---

## Model Selection Rules

**Base Metrics:**
- **f**: Number of files to edit
- **r**: Number of context files to read (estimated via task scope or hierarchy)
- **Effective Score (S)**: `f + Math.ceil(r / 4)`

**Abbreviated Model Identifiers:**
- `FL`: Gemini 3.6 Flash Low (`S = 1` AND `d = 1`)
- `FM`: Gemini 3.6 Flash Medium (`S ≤ 4`)
- `FH`: Gemini 3.6 Flash High (`S ≤ 8`)
- `PH`: Gemini 3.1 Pro High (`S ≤ 12`)
- `⚠️ BREAK DOWN INTO SUBTASKS`: If task requires decomposition (`S > 12` or `f > 8`)

## Output Format

`<indicator> <Model Code> — <N>d <M>f +<K>r`

Examples:
- `○ FL — 1d 1f +0r`
- `◐ FM — 1d 3f +5r`
- `◕ FH — 2d 5f +10r`
- `★ PH — 4d 10f +8r`
- `⚠️ BREAK DOWN INTO SUBTASKS`

## File In-Place Annotation Rule
If the user provides a file (task/plan file), write evaluation ratings directly inside the file for ALL tasks, phases, or steps without exception. For tasks that can be executed in parallel, include the parallel tag. Write annotations in English.

## Parent Task & Subtask Guidelines
- **Parent Task**: Calculate for entire parent task in single session
- **Subtasks**: Calculate for EACH subtask separately
- **Decomposition**: Add `⚠️ BREAK DOWN INTO SUBTASKS` if `S > 12` or `f > 8`

## Multi-Task Parallelism & Task Target Format
When evaluating multiple tasks/subtasks:
- Evaluate dependency **purely contextually** from task descriptions (no extra file searches).
- **ANNOTATE ALL TASKS**: Write model evaluation ratings for ALL tasks, phases, or steps.
- **SYMMETRIC PARALLEL ANNOTATION**: For parallel tasks, ALWAYS annotate BOTH mutually parallel tasks/phases explicitly referencing each other (e.g., Phase 1 gets `[Parallel with Phase 2]` AND Phase 2 gets `[Parallel with Phase 1]`).
- **SEQUENTIAL TASKS**: Annotate rating without any parallel tag for sequential or dependent tasks.

Format for sequential tasks:
`<indicator> <Model Code> — <N>d <M>f +<K>r`

Format when referencing parallel tasks:
`<indicator> <Model Code> — <N>d <M>f +<K>r — <№step/task/subtask> [Parallel with <№step/task>]`
