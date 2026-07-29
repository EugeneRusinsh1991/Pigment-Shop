---
name: ai-audit-framework
description: Universal AI audit framework dispatcher. Executes EXACTLY ONE audit stage per invocation following Universal AI Audit Framework v2. Prompts user for scope/profile if omitted, saves progress in .docs/ai-audit-framework/audit-config.md, and recommends model tier for each step.
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

## Initial Call & Model Escalation Rules (+20% Complexity Buffer)
- **Default Entry Point Model**: 🟢 **Gemini 3.6 Flash (Medium)**.
- **MANDATORY MODEL ESCALATION RULE**:
  - **Medium (3/5) complexity ALWAYS maps to 🟠 Gemini 3.6 Flash (High)**.
  - **Low (1-2/5) complexity** + more than 4 files -> **escalate to 🟠 Gemini 3.6 Flash (High)**.
  - Any task touching global UI primitives, shared state, or >5 files -> **MUST recommend 🟠 Gemini 3.6 Flash (High)**.

---

## 📢 Standard Step Response Protocol (Normal Execution)

For normal step transitions in the **SAME CHAT WINDOW**, use standard concise status output with colored indicator badges:

> **Stage 2.1 Complete.** Saved `batches/2.1_batch_ui.md`.  
> **Next**: Stage 2.2 (`2.2_batch_state`). **Recommended Model**: 🟠 `Gemini 3.6 Flash (High)`.

---

## 🚨 Emergency Window Move Notice (ONLY When Context Migration Needed)

DO NOT output "New Chat Session / Handover" blocks for simple model changes or normal steps!

Include the **Emergency Window Move Notice ONLY** under these 3 conditions:
1. Context window usage reaches **~70% threshold**.
2. A context-clear / checkpoint event occurred.
3. The next step is estimated to **OVERFLOW** the remaining context window capacity.

### Emergency Notice Format (ONLY when triggered above):
> ⚠️ **CONTEXT OVERFLOW WARNING / MIGRATION NEEDED (~70%+ Used or Checkpoint Cleared)**  
> 💡 Please open a **NEW CHAT SESSION** and paste:  
> `Continue audit using /ai-audit-framework`

---

## Execution & History Logging Rules

1. **Check State**: Read `.docs/ai-audit-framework/audit-config.md`.
2. **Directory Structure Rule**: ONLY `audit-config.md` lives at `.docs/ai-audit-framework/`. All other artifacts MUST be saved in subdirectories:
   - `stages/1-project-inventory.md`
   - `batches/<step_id>-batch-<name>.md`
   - `stages/3-global-inventory.md`
   - `stages/4-global-analysis.md`
   - `stages/5-refactoring-roadmap.md`
   - `tasks/task-<id>-<name>.md`
3. **Execute Single Stage**:
   - If no state -> Run **Stage 1 ONLY** (`references/stage-1-project-inventory.md`). Create `audit-config.md` AND `stages/1-project-inventory.md`.
   - If Stage 1 done -> Run **Stage 2.x ONLY** for the next batch (`references/stage-2-batch-audit.md`). Save as `batches/<step_id>-batch-<name>.md` and update `audit-config.md`.
   - If Stage 2 done -> Run **Stage 3 ONLY** (`references/stage-3-global-inventory.md`). Create `stages/3-global-inventory.md`.
   - If Stage 3 done -> Run **Stage 4 ONLY** (`references/stage-4-global-analysis.md`). Create `stages/4-global-analysis.md`.
   - If Stage 4 done -> Run **Stage 5 ONLY** (`references/stage-5-refactoring-roadmap.md`). Create `stages/5-refactoring-roadmap.md` and `tasks/*.md` with explicit UI Verification Guides.
3. **Output Protocol**:
   - Update `audit-config.md` (Next step & History log).
   - Always output **Standard Step Response** (colored indicator badge & next model recommendation).
   - For task executions, include a 🧪 **Manual UI Verification Guide** (app screen, button/action to test, expected result).
   - Append **Emergency Window Move Notice ONLY** if context limit (~70%+) or overflow risk occurs.