---
name: ai-audit-framework
description: Universal AI audit framework dispatcher. Executes EXACTLY ONE audit stage per invocation following Universal AI Audit Framework v2 with multi-pass architecture. Stages 3, 4 are split into 3 passes each, Stage 5 is split into 2 passes (P0/P1 tasks only - P2/P3 findings logged but no tasks generated). Stage 5 generates task-dispatcher compatible task files for critical/high priority issues only. Prompts user for scope/profile if omitted, saves progress in .todos/ai-audit-framework/audit-config.md, and delegates task complexity and model selection to model-recommender.
---

# Universal AI Audit Framework Dispatcher

Execute **EXACTLY ONE** audit stage per invocation.

---

## 🚨 STRICT GLOBAL SCOPE & NO-TRUNCATION RULES
- **WHOLE PROJECT MEANS WHOLE PROJECT**: If the user specifies Target Scope as "Whole Project" (`src/`, `app/`, `.`), the skill MUST treat the ENTIRE repository as a single unified system. IT MUST NOT split analysis into isolated sub-batches (e.g. admin vs storefront) unless the user explicitly requests an isolated subset.
- **STRICT NO-TRUNCATION MANDATE (100% FILE COVERAGE)**: Generated task files (`tasks/task-*.md`) MUST list EVERY SINGLE AFFECTED FILE in `Target Files`. It is strictly forbidden to truncate or limit the file list to 3–5 sample files.
- **SINGLE ARCHITECTURE & PRIMITIVE UNITY**: All layers (`app/`, `src/`, contexts, API calls, primitives) MUST be cross-analyzed together. Architectural violations or UI primitives are audited across the entire project at once.
- **100% COVERAGE IN TASKS**: Refactoring tasks generated for "Whole Project" audits MUST encompass every single file in the repository affected by the finding.
- **NO EMPTY AUDIT REPORT FILES**: NEVER create category report markdown files if 0 issues are found for that category. Only write report files for categories that contain active issues, ensuring that the existence of a file guarantees issues inside.

---

## 🎯 CRITICAL/HIGH PRIORITY TASK GENERATION ONLY

**STRICT RULE**: Stage 5 (Task Generation) MUST ONLY create tasks for **P0 (Critical)** and **P1 (High)** issues. **P2 (Medium)** and **P3 (Low)** issues are NEVER converted to tasks.

### Priority Classification Criteria:

**P0 (Critical)** - Generate Tasks:
- Broken functionality (crashes, data loss, security vulnerabilities)
- Critical UX blockers (users cannot complete core flows)
- Severe architectural violations (circular dependencies, breaking design system rules)
- Performance issues causing app freeze or >5s load times
- Accessibility violations blocking screen readers/core navigation

**P1 (High)** - Generate Tasks:
- Inconsistent behavior across similar components (4 cards with same logic but different behavior)
- Architectural violations that don't break functionality but violate patterns
- Performance issues affecting user experience (slow animations, janky scrolling)
- Moderate accessibility issues (missing labels, poor contrast)
- Design system violations across multiple files (hardcoded values, wrong primitives)

**P2 (Medium)** - NO TASKS (Audit Only):
- Minor code duplication (5 similar lines in 2 files)
- Small inconsistencies in styling (margin/padding differences)
- Missing minor optimizations
- Non-critical linting issues

**P3 (Low)** - NO TASKS (Audit Only):
- Cosmetic issues (spacing typos, minor visual inconsistencies)
- Nice-to-have refactoring opportunities
- Documentation gaps
- Very minor accessibility improvements

### Task Generation Filter:
During Stage 5, apply **P0/P1 Filter** before creating any task files:
1. Evaluate all findings from Stage 4 output
2. Classify each as P0, P1, P2, or P3 using criteria above
3. **DISCARD** all P2 and P3 findings (do NOT create tasks)
4. Generate tasks ONLY for P0 and P1 findings
5. In audit-config.md, log total findings vs task-generating findings (e.g., "45 findings total, 12 P0/P1 tasks generated")

---

## 🚨 STRICT GLOBAL PRIMITIVE RULE (PROJECT-WIDE UNITY)
- **NO SUB-DOMAIN SPLITTING**: If auditing UI, controls like Buttons, Inputs, Search, Modals MUST be analyzed as **PROJECT-WIDE PRIMITIVES** across all folders (Admin, Storefront, Pages) simultaneously.
- **100% REPLACEMENT MANDATE**: A UI audit task for a primitive (e.g. Button) MUST include EVERY file in the repository using clickable elements to ensure total visual and animation parity.

---

## ⛔ MANDATORY PRE-CHECK: User Guidance & Scope Selection

**CRITICAL RULE**: NEVER start Stage 1 automatically if the user just invoked `/ai-audit-framework` without providing scope and profile details.

If the user invoked the skill without parameters, **STOP IMMEDIATELY** and ask the user to specify:
1. **Target Scope**: Whole Project, Specific Folder (e.g., `src/components/buttons/`), or Logical Subsystem (e.g., "UI Button System", "Checkout Flow")?
2. **Audit Profile**: Select built-in profile (`ui`, `architecture`, `performance`, `security`, `state-management`, `accessibility`, `i18n`) OR provide a custom description for a tailored audit.
3. **Custom Notes / Preferences**

---

## Model Selection & Escalation Rules (Unified Source of Truth)

- **Mandatory Recommender Integration**: All model evaluations, complexity calculations, and escalation recommendations across Stages 1–5 MUST be strictly calculated using the [/model-recommender](file:///d:/web/Tutorials%20Shop/_tutrorials%20shop/.agents/skills/ai-audit-framework/../../model-recommender/SKILL.md) skill.

---

## Multi-Pass Architecture (Stages 3, 4, 5)

**CRITICAL**: Stages 3, 4, and 5 are split into 3 passes each to ensure deeper analysis and better problem detection. Single-pass execution was found to miss critical issues due to context overload.

### Dynamic Subdivision Logic (AUTO-SCALING PASSES)

**Pre-Execution Complexity Check**: Before executing Stage 3.x, 4.x, or 5.x, the skill MUST run `/model-recommender` to evaluate complexity. If thresholds are exceeded, automatically generate sub-passes.

#### Subdivision Thresholds (Trigger AUTO-SUBDIVIDE):
- **Model-Recommender Output**: > 3d (days) OR > 15f (files) → AUTO-SUBDIVIDE
- **Finding Count**: > 50 total findings across batches → AUTO-SUBDIVIDE
- **File Count**: > 20 files affected in single analysis → AUTO-SUBDIVIDE

#### Subdivision Strategies by Stage:

**Stage 3.x (Global Consolidation)**:
- **Strategy**: Split by batch groups
- **3.1.1**: Batches 2.1-2.3 (Buttons, Inputs, Navigation)
- **3.1.2**: Batches 2.4-2.6 (Modals, Display, Feedback)
- **Pattern**: `3.<pass>.<subgroup>` (e.g., 3.1.1, 3.1.2, 3.2.1, 3.2.2)

**Stage 4.x (Global Analysis)**:
- **Strategy**: Split by finding categories
- **4.1.1**: UI-related findings (Buttons, Inputs, Display)
- **4.1.2**: Architecture-related findings (Navigation, State, Data flow)
- **4.1.3**: Performance/Security findings (if applicable)
- **Pattern**: `4.<pass>.<category>` (e.g., 4.1.1, 4.1.2, 4.2.1, 4.2.2)

**Stage 5.x (Refactoring Roadmap)**:
- **Strategy**: Split by priority tiers (P0/P1 ONLY - P2/P3 discarded)
- **5.2.1**: P0 Critical tasks only
- **5.2.2**: P1 High-priority tasks
- **NOTE**: P2/P3 findings are logged in audit but NO TASKS generated
- **Pattern**: `5.<pass>.<priority>` (e.g., 5.2.1, 5.2.2)

#### Dynamic Subdivision Execution Flow:
1. **Pre-Check**: Run `/model-recommender` on upcoming stage input
2. **Threshold Evaluation**: Check if any threshold exceeded
3. **Subdivision Planning**: If triggered, generate sub-pass plan with specific file groupings
4. **Config Update**: Update `audit-config.md` with subdivision map (new rows for 3.1.1, 3.1.2, etc.)
5. **Sequential Execution**: Execute sub-passes in order, each as independent stage invocation
6. **Context Preservation**: Each sub-pass references previous outputs via file links, not full content

#### Audit Config Update Format for Subdivision:
```markdown
| 3.1.1 | Consolidation Pass 1.1 (Batches 2.1-2.3) | batches/2.1*.md, batches/2.2*.md, batches/2.3*.md | 🟢 FM — 1d 2f +1r — S2 | 🛑 Pending |
| 3.1.2 | Consolidation Pass 1.2 (Batches 2.4-2.6) | batches/2.4*.md, batches/2.5*.md, batches/2.6*.md | 🟢 FM — 1d 2f +1r — S2 | 🛑 Pending |
```

### Stage 3: Global Consolidation (3 Passes - Dynamic)
- **3.1**: Pass 1 - Basic Consolidation (merge, group, deduplicate) [AUTO-SUBDIVIDE > 15f]
- **3.2**: Pass 2 - Cross-Batch Analysis (identify patterns, systemic issues) [AUTO-SUBDIVIDE > 20f]
- **3.3**: Pass 3 - Business Impact Prioritization (P0-P3, ROI, execution order) [AUTO-SUBDIVIDE > 50 findings]

### Stage 4: Global Analysis (3 Passes - Dynamic)
- **4.1**: Pass 1 - Pattern Detection & Classification [AUTO-SUBDIVIDE > 3d OR > 50 findings]
- **4.2**: Pass 2 - Systemic Issues & Root Cause Analysis [AUTO-SUBDIVIDE > 3d OR > 50 findings]
- **4.3**: Pass 3 - Strategic Recommendations & Roadmap [AUTO-SUBDIVIDE > 3d OR > 50 findings]

### Stage 5: Refactoring Roadmap (2 Passes - Dynamic - P0/P1 ONLY)
- **5.1**: Pass 1 - Task Planning & High-Level Breakdown [AUTO-SUBDIVIDE > 20 files]
- **5.2**: Pass 2 - Task Specification (P0 Critical + P1 High Tasks ONLY) [AUTO-SUBDIVIDE > 10 P0/P1 tasks combined]
- **NOTE**: P2 (Medium) and P3 (Low) findings are NOT converted to tasks

**Task-Dispatcher Compatibility**: Stage 5.2 and 5.3 generate task files in TASK_FORMAT.md contract format, enabling automated execution via task-dispatcher skill. Tasks are grouped logically (max 5-7 files per subtask) to prevent overwhelming the dispatcher while preserving all original AI Audit Framework context in Additional Context sections.


---

## 📢 Standard Step Response Protocol (Normal Execution)

For normal step transitions in the **SAME CHAT WINDOW**, use standard concise status output with model-recommender format (`<indicator> <Model Code> — <N>d <M>f +<K>r — S<S>`):

> **Stage 2.1 Complete.** Saved `batches/2.1_batch_ui.md`.  
> **Next**: Stage 2.2 (`2.2_batch_state`). **Recommended Model**: `◕ FH — 2d 5f +10r — S8`.

---

## 🚨 Emergency Window Move Notice (ONLY When Context Migration Needed)

DO NOT output "New Chat Session / Handover" blocks for simple model changes or normal steps!

Include the **Emergency Window Move Notice ONLY** under these 3 conditions:
1. Context window usage reaches **~50% threshold**.
2. A context-clear / checkpoint event occurred.
3. The next step is estimated to **OVERFLOW** the remaining context window capacity.

### Emergency Notice Format (ONLY when triggered above):
> ⚠️ **CONTEXT OVERFLOW WARNING / MIGRATION NEEDED (~50%+ Used or Checkpoint Cleared)**  
> 💡 Please open a **NEW CHAT SESSION** and paste:  
> `Continue audit using /ai-audit-framework`

---

## Execution & History Logging Rules

1. **Check State**: Read `.todos/ai-audit-framework/audit-config.md`.
2. **Directory Structure Rule**: ONLY `audit-config.md` lives at `.todos/ai-audit-framework/`. All other artifacts MUST be saved in subdirectories:
   - `stages/1-project-inventory.md`
   - `batches/<step_id>-batch-<name>.md`
   - **Dynamic Sub-Pass Files** (auto-generated when thresholds exceeded):
     - `stages/3.1.1-pass1-batches-1-3.md`, `stages/3.1.2-pass1-batches-4-6.md`, etc.
     - `stages/4.1.1-pass1-ui-findings.md`, `stages/4.1.2-pass1-architecture-findings.md`, etc.
     - `stages/5.2.1-pass2-p0-tasks.md`, `stages/5.2.2-pass2-p1-tasks.md`, etc.
   - **Standard Pass Files** (when thresholds OK):
     - `stages/3.1-pass1-basic-consolidation.md`
     - `stages/3.2-pass2-cross-batch-analysis.md`
     - `stages/3.3-pass3-business-impact-prioritization.md`
     - `stages/4.1-pass1-pattern-detection.md`
     - `stages/4.2-pass2-systemic-issues.md`
     - `stages/4.3-pass3-strategic-recommendations.md`
     - `stages/5.1-pass1-task-planning.md`
     - `stages/5.2-pass2-phase1-tasks.md` (P0/P1 ONLY - Stage 5.3 removed)
   - Task Specs Location: `.todos/ai-audit-framework/tasks/task-<id>-<name>.md`
3. **Execute Single Stage**:
   - If no state -> Run **Stage 1 ONLY** (`references/stage-1-project-inventory.md`). Create `audit-config.md` AND `stages/1-project-inventory.md`.
   - If Stage 1 done -> Run **Stage 2.x ONLY** for the next batch (`references/stage-2-batch-audit.md`). Save as `batches/<step_id>-batch-<name>.md` and update `audit-config.md`.
   - If Stage 2 done -> **PRE-CHECK**: Run `/model-recommender` on all `batches/*.md` files to evaluate Stage 3.1 complexity
     - If thresholds exceeded (> 3d OR > 15f OR > 50 findings) → Generate sub-pass plan (3.1.1, 3.1.2, etc.) and update `audit-config.md` with subdivision rows
     - If thresholds OK → Run **Stage 3.1 ONLY** (`references/stage-3.1-pass1-basic-consolidation.md`). Create `stages/3.1-pass1-basic-consolidation.md`.
   - If Stage 3.1 (or 3.1.x sub-passes) done → **PRE-CHECK**: Run `/model-recommender` on Stage 3.1 output to evaluate Stage 3.2 complexity
     - If thresholds exceeded → Generate sub-pass plan (3.2.1, 3.2.2, etc.) and update `audit-config.md`
     - If thresholds OK → Run **Stage 3.2 ONLY** (`references/stage-3.2-pass2-cross-batch-analysis.md`). Create `stages/3.2-pass2-cross-batch-analysis.md`.
   - If Stage 3.2 (or 3.2.x sub-passes) done → **PRE-CHECK**: Run `/model-recommender` on Stage 3.2 output to evaluate Stage 3.3 complexity
     - If thresholds exceeded → Generate sub-pass plan (3.3.1, 3.3.2, etc.) and update `audit-config.md`
     - If thresholds OK → Run **Stage 3.3 ONLY** (`references/stage-3.3-pass3-business-impact-prioritization.md`). Create `stages/3.3-pass3-business-impact-prioritization.md`.
   - If Stage 3.3 (or 3.3.x sub-passes) done → **PRE-CHECK**: Run `/model-recommender` on Stage 3.3 output to evaluate Stage 4.1 complexity
     - If thresholds exceeded (> 3d OR > 50 findings) → Generate sub-pass plan (4.1.1, 4.1.2, etc.) and update `audit-config.md`
     - If thresholds OK → Run **Stage 4.1 ONLY** (`references/stage-4.1-pass1-pattern-detection.md`). Create `stages/4.1-pass1-pattern-detection.md`.
   - If Stage 4.1 (or 4.1.x sub-passes) done → **PRE-CHECK**: Run `/model-recommender` on Stage 4.1 output to evaluate Stage 4.2 complexity
     - If thresholds exceeded → Generate sub-pass plan (4.2.1, 4.2.2, etc.) and update `audit-config.md`
     - If thresholds OK → Run **Stage 4.2 ONLY** (`references/stage-4.2-pass2-systemic-issues.md`). Create `stages/4.2-pass2-systemic-issues.md`.
   - If Stage 4.2 (or 4.2.x sub-passes) done → **PRE-CHECK**: Run `/model-recommender` on Stage 4.2 output to evaluate Stage 4.3 complexity
     - If thresholds exceeded → Generate sub-pass plan (4.3.1, 4.3.2, etc.) and update `audit-config.md`
     - If thresholds OK → Run **Stage 4.3 ONLY** (`references/stage-4.3-pass3-strategic-recommendations.md`). Create `stages/4.3-pass3-strategic-recommendations.md`.
   - If Stage 4.3 (or 4.3.x sub-passes) done → **PRE-CHECK**: Run `/model-recommender` on Stage 4.3 output to evaluate Stage 5.1 complexity
     - If thresholds exceeded (> 20 files) → Generate sub-pass plan (5.1.1, 5.1.2, etc.) and update `audit-config.md`
     - If thresholds OK → Run **Stage 5.1 ONLY** (`references/stage-5.1-pass1-task-planning.md`). Create `stages/5.1-pass1-task-planning.md`.
   - If Stage 5.1 (or 5.1.x sub-passes) done → **PRE-CHECK**: Run `/model-recommender` on Stage 5.1 output to evaluate Stage 5.2 complexity
     - If thresholds exceeded (> 10 P0/P1 tasks combined) → Generate sub-pass plan (5.2.1 for P0, 5.2.2 for P1) and update `audit-config.md`
     - If thresholds OK → Run **Stage 5.2 ONLY** (`references/stage-5.2-pass2-phase1-tasks.md`). Create `stages/5.2-pass2-phase1-tasks.md` and individual task files in `.todos/ai-audit-framework/tasks/`.
   - If Stage 5.2 (or 5.2.x sub-passes) done → **AUDIT COMPLETE**. All P0/P1 tasks generated. P2/P3 findings logged but no tasks created.
3. **Output Protocol**:
   - Update `audit-config.md` (Next step & History log).
   - Always output **Standard Step Response** (colored indicator badge & next model recommendation).
   - For task executions, include a 🧪 **Manual UI Verification Guide** (app screen, button/action to test, expected result).
   - Append **Emergency Window Move Notice ONLY** if context limit (~70%+) or overflow risk occurs.