# Task Spec: [TASK-004] Entrypoint Hardening & SRP Refactoring (Split into Subtasks)

## Metadata & Model Recommendation
- **Task ID**: TASK-004
- **Complexity Rating**: 3 / 5
- **Status**: Split into Subtasks
- **Prerequisite Tasks**: TASK-003B
- **Dependent Tasks**: None

## 📦 Subtask Breakdown
- 📄 **[TASK-004A] Entrypoint Hardening & Decoupling** (`task-004a-entrypoint-srp-and-credential-security.md`)
  - **Focus**: Remove fallback credentials and extract OS dev server spawning into a separate runner utility.
  - **Complexity**: 2/5 | **Recommended Model**: 🟢 Gemini 3.6 Flash (Medium)
- 📄 **[TASK-004B] Inspector Hooks & Reporting Consolidation** (`task-004b-cleanup-inspector-hooks-and-reporting.md`)
  - **Focus**: Remove duplicate inspector setup calls and consolidate report formatting logic.
  - **Complexity**: 2/5 | **Recommended Model**: 🟢 Gemini 3.6 Flash (Medium)
