# Stage 5 — Refactoring Roadmap & Modular Task Specs

## Purpose & Scope
Transform Stage 4 global analysis findings into modular, individual refactoring task specifications saved in `.docs/ai-audit-framework/tasks/`.

---

## Modular Task Specification & Subtask Breakdown Rules

1. **NEVER combine all tasks into a single monolith roadmap document**.
2. **Individual Parent Task Files**: Each parent task MUST be written to its own separate file under `.docs/ai-audit-framework/tasks/`:
   - `task-001-extract-validation.md`
   - `task-002-auth-context.md`
3. **STRICT 100% FILE COVERAGE MANDATE**:
   - `Target Files` MUST list EVERY SINGLE file identified in Stage 4 global analysis. Truncation or omitting files is strictly forbidden.
4. **MANDATORY GREP STEP FOR TASK GENERATION**:
   - BEFORE creating any task file for a UI primitive (Buttons, Inputs, Modals), run `grep_search` for that primitive across the repository.
   - Copy all file paths returned by `grep_search` into the `Target Files` list.
5. **HYBRID LOGICAL & QUANTITATIVE SUBTASK BREAKDOWN (Max 8 Files Per Subtask)**:
   - **Logical Domain Grouping**: Group all target files into clean architectural layers (e.g. UI Primitives, Admin Features, Storefront, Shell/Nav, Custom Hooks).
   - **Strict Quantity Threshold (Max 8–10 files)**:
     - If a domain group has `≤ 8` files (e.g. Storefront has 4 files) -> Keep as 1 subtask.
     - If a domain group has `> 8` files (e.g. Admin has 15 files) -> Split into `Part 1 (8 files)` and `Part 2 (7 files)`.
6. **INTEGRATION WITH `/model-recommender` SKILL**:
   - Calculate effective score: `S = f + Math.ceil(r / 4)` (where `f` = files to edit, `r` = context files to read).
   - Parent Task rating: Add `⚠️ BREAK DOWN INTO SUBTASKS` if `S > 8` or `Total Files > 8`.
   - Each Subtask rating: Calculate independently (`FL`, `FM`, `FH`, `PH`) with metrics string (`<indicator> <Model Code> — <N>d <M>f +<K>r`).
7. **MUTUAL PARALLELISM ANNOTATION**:
   - If subtasks affect non-overlapping component trees, annotate mutually parallel subtasks: `[Parallel with TASK-XXX-B]`.
8. **Interactive Checklist Index (`.docs/ai-audit-framework/stages/5-refactoring-roadmap.md`)**:
   - `5-refactoring-roadmap.md` serves as a master index containing interactive checkboxes for all tasks and subtasks.

---

## Output Template (`.docs/ai-audit-framework/tasks/task-003-memoization.md`)

```markdown
# Task Spec: [TASK-003] Memoize UI Primitives, Admin Feature Trees, Navigation Shell, and Form Hook Handlers

## Metadata & Model Recommendation
- **Task ID**: TASK-003
- **Complexity Rating**: 5 / 5 (S = 92 > 8)
- **Parent Task Model Rating**: ⚠️ BREAK DOWN INTO SUBTASKS (★ PH — 15d 73f +16r)
- **Prerequisite Tasks**: TASK-001, TASK-002
- **Dependent Tasks**: TASK-007

---

## 🔀 Subtask Breakdown & Model Evaluation (Max 8-10 files per subtask)

### Subtask TASK-003-A: UI Primitives (Buttons, Cards, Modals)
- **Scope**: Wrap primitive UI elements in `React.memo`.
- **Model Recommendation**: ★ PH — 4d 10f +4r [Parallel with TASK-003-B]
- **Target Files** (10 files):
  - `src/components/ui/Button/Button.js`
  - `src/components/ui/Button/IconButton.js`
  ... (Max 8-10 files)

### Subtask TASK-003-B: UI Media & Admin Products Management
- **Scope**: Memoize media renderers and product table/row renderers.
- **Model Recommendation**: ★ PH — 4d 10f +4r [Parallel with TASK-003-A]
- **Target Files** (10 files):
  - `src/components/ui/Media/MediaRenderer.js`
  ... (Max 8-10 files)

---

## 📋 Detailed Agent Implementation Guidelines
- [Domain specific instructions...]

---

## 🧪 Detailed Verification & Navigation Guide
- **App Screen**: Admin Products, Product Details, App Header
- **User Action**: Filter table, click dropdowns
- **Expected Result**: Smooth UI updates without unneeded re-renders.
```

---

## Output Template (`.docs/ai-audit-framework/stages/5-refactoring-roadmap.md` Index)

```markdown
# Stage 5 — Refactoring Roadmap Index

## Phase 1: Foundations
| Task ID | Task Title | Complexity | File Link | Dependencies | Recommended Model |
|---|---|---|---|---|---|
| TASK-001 | Extract Validation Helper | 2/5 | 📄 **[task-001.md](file:///path/to/.docs/ai-audit-framework/tasks/task-001.md)** | None | Gemini 3.6 Flash Medium |

## Interactive Task Progress Checklist
- [ ] **TASK-001**: Extract Validation Helper
- [ ] **TASK-002**: Auth Context Provider Cleanup
- [ ] **TASK-003**: Memoize UI Primitives & Admin Features
  - [ ] `- [ ]` **TASK-003-A**: UI Primitives (Buttons, Cards, Modals)
  - [ ] `- [ ]` **TASK-003-B**: UI Media & Admin Products Management
  - [ ] `- [ ]` **TASK-003-C**: Admin Orders & Categories Part 1
  - [ ] `- [ ]` **TASK-003-D**: Admin Categories Part 2 & Admin Users
```

---

## Exit Criteria
- Every parent task created as an independent `.md` file in `.docs/ai-audit-framework/tasks/`.
- Every task exceeding 8 files split into logical subtasks (max 8-10 files each) evaluated with `/model-recommender`.
- `.docs/ai-audit-framework/stages/5-refactoring-roadmap.md` created as an index table with interactive checkboxes for all subtasks.

