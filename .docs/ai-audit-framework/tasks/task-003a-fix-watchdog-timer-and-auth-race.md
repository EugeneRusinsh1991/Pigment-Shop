# Task Spec: [TASK-003A] Fix Event Loop Timer Leaks and Auth Promise Race

## Metadata & Model Recommendation
- **Task ID**: TASK-003A
- **Parent Task**: TASK-003
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: TASK-002B
- **Dependent Tasks**: TASK-003B
- **Target Files**:
  - `.tools/browser-automation/explorer/diagnostics/ExecutionWatchdog.ts`
  - `.tools/browser-automation/execution-context/AdminContext.ts`

## Prompt Instruction
"Refactor `ExecutionWatchdog.ts` to un-ref timer intervals and ensure timers are cleared on unexpected exceptions. Refactor `AdminContext.ts` to replace hanging `Promise.race` handlers with clean Playwright timeout handling."

## 🧪 Manual Verification Guide
- **Command**: `npx tsx .tools/browser-automation/run-smoke.ts`
- **Action**: Run smoke test and verify exit behavior upon completion.
- **Expected Result**: Node process exits cleanly without lingering background timers.
