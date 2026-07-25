# Task Spec: [TASK-001] Decouple Driver Interfaces and Remove Circular Callbacks (Split into Subtasks)

## Metadata & Model Recommendation
- **Task ID**: TASK-001
- **Complexity Rating**: 4 / 5
- **Status**: Split into Subtasks
- **Prerequisite Tasks**: None
- **Dependent Tasks**: TASK-002

## 📦 Subtask Breakdown
- 📄 **[TASK-001A] Decouple Driver Interfaces** (`task-001a-decouple-driver-interfaces.md`)
  - **Focus**: Remove direct `playwright` imports from `StateRecoveryManager.ts` and `ReadinessManager.ts`.
  - **Complexity**: 2/5 | **Recommended Model**: 🟢 Gemini 3.6 Flash (Medium)
- 📄 **[TASK-001B] Eliminate Circular Callbacks** (`task-001b-remove-circular-callbacks.md`)
  - **Focus**: Break circular callback dependencies between `UIExplorer`, `InteractionProcessor`, `NavigationHandler`, and `DIContainer`.
  - **Complexity**: 3/5 | **Recommended Model**: 🟠 Gemini 3.6 Flash (High)
