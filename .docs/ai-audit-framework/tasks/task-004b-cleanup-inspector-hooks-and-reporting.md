# Task Spec: [TASK-004B] Consolidate Lifecycle Hooks and Reporting Formats

## Metadata & Model Recommendation
- **Task ID**: TASK-004B
- **Parent Task**: TASK-004
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: TASK-004A
- **Dependent Tasks**: None
- **Target Files**:
  - `.tools/browser-automation/execution-context/BaseExecutionContext.ts`
  - `.tools/browser-automation/index.ts`
  - `.tools/browser-automation/plugins/smoke/SmokeReportPrinter.ts`

## Prompt Instruction
"Remove duplicate `setupManualInspector` lifecycle calls between `BaseExecutionContext.ts` and `runUIExplorer` in `index.ts`. Consolidate terminal report formatting logic in `SmokeReportPrinter.ts` with shared observability reporters."

## 🧪 Manual Verification Guide
- **Command**: `npx tsx .tools/browser-automation/run-smoke.ts`
- **Action**: Run smoke test and inspect terminal output.
- **Expected Result**: Single inspector DOM setup and clean, unified console report output.
