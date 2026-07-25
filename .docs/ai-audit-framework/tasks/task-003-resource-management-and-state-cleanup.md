# Task Spec: [TASK-003] Fix Resource Leaks and Unify State Tracking (Split into Subtasks)

## Metadata & Model Recommendation
- **Task ID**: TASK-003
- **Complexity Rating**: 3 / 5
- **Status**: Split into Subtasks
- **Prerequisite Tasks**: TASK-002B
- **Dependent Tasks**: TASK-004

## 📦 Subtask Breakdown
- 📄 **[TASK-003A] Fix Event Loop Timers & Auth Race** (`task-003a-fix-watchdog-timer-and-auth-race.md`)
  - **Focus**: Un-ref `ExecutionWatchdog` timers and replace hanging `Promise.race` in `AdminContext.ts`.
  - **Complexity**: 2/5 | **Recommended Model**: 🟢 Gemini 3.6 Flash (Medium)
- 📄 **[TASK-003B] Bounded Cache & Unified Tracking** (`task-003b-bounded-cache-and-unified-tracking.md`)
  - **Focus**: Add LRU eviction to `StateCacheManager.ts` and merge duplicate state tracking in `NavigationTracker.ts`.
  - **Complexity**: 3/5 | **Recommended Model**: 🟠 Gemini 3.6 Flash (High)
