# Task Spec: [TASK-003B] Implement Bounded State Cache & Unify Tracking Model

## Metadata & Model Recommendation
- **Task ID**: TASK-003B
- **Parent Task**: TASK-003
- **Complexity Rating**: 3 / 5
- **Recommended Agent Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Prerequisite Tasks**: TASK-003A
- **Dependent Tasks**: TASK-004
- **Target Files**:
  - `.tools/browser-automation/explorer/StateCacheManager.ts`
  - `.tools/browser-automation/explorer/NavigationTracker.ts`
  - `.tools/browser-automation/explorer/ExplorerContext.ts`

## Prompt Instruction
"Implement LRU cache bounds in `StateCacheManager.ts` to prevent unbounded memory growth during long exploratory runs. Consolidate duplicate visited state tracking between `NavigationTracker.ts` and `ExplorerContext.ts` into a single source of truth."

## 🧪 Manual Verification Guide
- **Command**: `npx tsx .tools/browser-automation/run-smoke.ts`
- **Action**: Run deep smoke exploration.
- **Expected Result**: Stable memory consumption across high interaction counts without tracking model divergence.
