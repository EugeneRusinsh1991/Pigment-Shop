# Task Spec: [TASK-002] Refactor Element Scanner & DOM Locators (Split into Subtasks)

## Metadata & Model Recommendation
- **Task ID**: TASK-002
- **Complexity Rating**: 4 / 5
- **Status**: Split into Subtasks
- **Prerequisite Tasks**: TASK-001B
- **Dependent Tasks**: TASK-003

## 📦 Subtask Breakdown
- 📄 **[TASK-002A] Modularize In-Browser Evaluation** (`task-002a-refactor-element-scanner-evaluation.md`)
  - **Focus**: Eliminate raw polyfilled JS string blocks and double DOM scanning in `ElementScanner.ts`.
  - **Complexity**: 3/5 | **Recommended Model**: 🟠 Gemini 3.6 Flash (High)
- 📄 **[TASK-002B] Centralize Timeout Configurations** (`task-002b-centralize-timeout-config.md`)
  - **Focus**: Move scattered timeout magic numbers into `ExplorerConfig.ts`.
  - **Complexity**: 2/5 | **Recommended Model**: 🟢 Gemini 3.6 Flash (Medium)
