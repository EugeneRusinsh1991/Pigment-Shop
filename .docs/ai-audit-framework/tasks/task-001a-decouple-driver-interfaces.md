# Task Spec: [TASK-001A] Decouple Driver Interfaces from Recovery and Readiness Managers

## Metadata & Model Recommendation
- **Task ID**: TASK-001A
- **Parent Task**: TASK-001
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: None
- **Dependent Tasks**: TASK-001B
- **Target Files**:
  - `.tools/browser-automation/explorer/StateRecoveryManager.ts`
  - `.tools/browser-automation/explorer/ReadinessManager.ts`

## Prompt Instruction
"Refactor `StateRecoveryManager.ts` and `ReadinessManager.ts` to strictly import driver interfaces (`IWebPage`, `IWebElement`) from `driver/DriverInterfaces` instead of importing direct `Page` or `Locator` types from `'playwright'`. Ensure all method signatures and internal locator references adhere to `IWebPage` and `IWebElement` abstractions."

## 🧪 Manual Verification Guide
- **Command**: `npx tsx .tools/browser-automation/run-smoke.ts`
- **Action**: Run smoke test suite.
- **Expected Result**: Clean compilation with 0 direct Playwright imports in `StateRecoveryManager` and `ReadinessManager`.
