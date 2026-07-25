# Task Spec: [TASK-002B] Centralize Inline Timeout Magic Numbers in ExplorerConfig

## Metadata & Model Recommendation
- **Task ID**: TASK-002B
- **Parent Task**: TASK-002
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: TASK-002A
- **Dependent Tasks**: TASK-003
- **Target Files**:
  - `.tools/browser-automation/explorer/ExplorerConfig.ts`
  - `.tools/browser-automation/explorer/ElementInteractor.ts`
  - `.tools/browser-automation/explorer/ReadinessManager.ts`

## Prompt Instruction
"Centralize all hardcoded magic numbers for timeouts (e.g. 3000ms click, 2000ms scroll, 150ms SPA breather) from `ElementInteractor.ts` and `ReadinessManager.ts` into strongly-typed parameters inside `ExplorerConfig.ts`."

## 🧪 Manual Verification Guide
- **Command**: `npx tsx .tools/browser-automation/run-smoke.ts`
- **Action**: Run smoke test with modified timeout parameters.
- **Expected Result**: Interactors cleanly respect configured timeouts from `ExplorerConfig`.
