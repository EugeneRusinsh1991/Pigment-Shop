---
name: model-recommender
description: Evaluates task complexity and recommends the appropriate AI model (Gemini 3.7 Flash Low/Medium/High, Gemini 3.1 Pro High) based on effective file count.
---

## Model Selection Rules

**Base Metrics:**
- **f**: Number of files to edit
- **r**: Number of context files to read — use the table below to count accurately:

| Context source | Add to r |
|---|---|
| Each KI artifact file read | +2 |
| project-hierarchy read | +4 |
| implementation_plan.md read | +3 |
| AGENTS.md / SKILL.md read | +1 each |
| Regular source file read | +1 each |

- **d (edit depth)**: Average number of distinct edit operations per file, but never less than 1:

| Depth | d | When to use |
|---|---|---|
| Shallow | 1 | Single-point edit: typo fix, add import, rename, config tweak |
| Medium | 2 | Multiple related edits per file: modify function + update types + adjust imports |
| Deep | 3 | Significant multi-block edits: refactor logic + rewrite tests + update API surface |
| Rewrite | 4 | Near-complete file rewrite or major structural change |

- **Complexity Buffer (b)** based on task nature:
  - `+20%` (`b = 1.20`): Static types, UI styling, configs, plain UI components.
  - `+40%` (`b = 1.40`): Business logic, hooks, state management, pagination, filtering.
  - `+60%` (`b = 1.60`): Math algorithms, animation physics, state machines, core refactoring, debugging with localized root cause.
  - `+70%` (`b = 1.70`): Tracing unknown root cause across multiple modules, unfamiliar codebase investigation.
- **Read weight (rw)**: `Math.ceil(r / 3)`
- **Effective Score (S)**: `Math.ceil((f * d + rw) * b)`

**Abbreviated Model Identifiers:**
- `FL`: Gemini 3.7 Flash Low (`S = 1–2`)
- `FM`: Gemini 3.7 Flash Medium (`S = 3–4`)
- `FH`: Gemini 3.7 Flash High (`S = 5–7`)
- `PH`: Gemini 3.1 Pro High (`S = 8–11`)
- `⚠️ BREAK DOWN INTO SUBTASKS`: If task requires decomposition (`S > 11` or `f > 7`)

**BREAK DOWN rules** (to preserve overall result integrity):
- Each subtask ≤ 4f, target S ≤ 8.
- Every subtask must produce a **shippable artifact** (file, feature slice, or passing test) — never a partial state that breaks the app.
- Define a clear **input contract** (what the subtask receives) and **output contract** (what it delivers) before splitting.
- Independent subtasks → mark `[Parallel]`; dependent subtasks → keep strict order and note the dependency explicitly.
- After all subtasks complete, add a final **integration step** (S ≤ 4) to verify the assembled result end-to-end.

## Anti-Loop Escalation Rule

If a task fails **twice in a row** (Anti-Loop from AGENTS.md triggers):
1. **Re-evaluate S** by multiplying the original score by `2.0` and rounding up.
2. **Skip one tier** from the failed model: `FL→FH`, `FM→PH`, `FH→BREAK DOWN`.
3. **Document the escalation** inline: append `[Escalated from FM → PH after 2 failures]` to the rating.
4. If already at `PH` and still failing — escalate to `⚠️ BREAK DOWN INTO SUBTASKS` regardless of original S.

This prevents token-burning loops caused by under-powered model selection, not by incorrect code.

## Output Format

`<indicator> <Model Code> — <N>d <M>f +<K>r — S<S>`

Examples:
- `○ FL — 1d 1f +0r — S1`
- `○ FL — 1d 2f +1r — S2`
- `◐ FM — 1d 3f +5r — S4`
- `◕ FH — 2d 5f +10r — S8`
- `★ PH — 4d 10f +8r — S12`
- `⚠️ BREAK DOWN INTO SUBTASKS`

**Uncertainty Indicator `[?]`:**
If the agent is not confident in the score evaluation (ambiguous scope, unclear requirements, unfamiliar module), append `[?]` to the output line and recommend **one tier higher** than the calculated result.
Example: `◐ FM [?] — 1d 3f +4r — S4 — uncertain scope, recommending FH`

## File In-Place Annotation Rule
If the user provides a file (task/plan file), write evaluation ratings directly inside the file for ALL tasks, phases, or steps without exception. For tasks that can be executed in parallel, include the parallel tag. Write annotations in English.

## Parent Task & Subtask Guidelines
- **Parent Task**: Calculate for entire parent task in single session
- **Subtasks**: Calculate for EACH subtask separately
- **Decomposition**: Add `⚠️ BREAK DOWN INTO SUBTASKS` if `S > 11` or `f > 7`

## Multi-Task Parallelism & Task Target Format
When evaluating multiple tasks/subtasks:
- Evaluate dependency **purely contextually** from task descriptions (no extra file searches).
- **ANNOTATE ALL TASKS**: Write model evaluation ratings for ALL tasks, phases, or steps.
- **SYMMETRIC PARALLEL ANNOTATION**: For parallel tasks, ALWAYS annotate BOTH mutually parallel tasks/phases explicitly referencing each other (e.g., Phase 1 gets `[Parallel with Phase 2]` AND Phase 2 gets `[Parallel with Phase 1]`).
- **SEQUENTIAL TASKS**: Annotate rating without any parallel tag for sequential or dependent tasks.

Format for sequential tasks:
`<indicator> <Model Code> — <N>d <M>f +<K>r — S<S>`

Format when referencing parallel tasks:
`<indicator> <Model Code> — <N>d <M>f +<K>r — S<S> — <№step/task/subtask> [Parallel with <№step/task>]`
