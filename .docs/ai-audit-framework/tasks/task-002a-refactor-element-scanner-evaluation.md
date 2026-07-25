# Task Spec: [TASK-002A] Modularize In-Browser Script Evaluation in ElementScanner

## Metadata & Model Recommendation
- **Task ID**: TASK-002A
- **Parent Task**: TASK-002
- **Complexity Rating**: 3 / 5
- **Recommended Agent Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Prerequisite Tasks**: TASK-001B
- **Dependent Tasks**: TASK-002B
- **Target Files**:
  - `.tools/browser-automation/explorer/ElementScanner.ts`

## Prompt Instruction
"Refactor `ElementScanner.ts` to replace massive stringified JS code blocks inside `page.evaluate()` with clean TypeScript functions. Eliminate double DOM scanning by binding `IWebElement` locators in a single-pass return structure without index mismatches."

## 🧪 Manual Verification Guide
- **Command**: `npx tsx .tools/browser-automation/run-smoke.ts`
- **Action**: Run smoke test and inspect scanned elements log.
- **Expected Result**: 30%+ faster page scanning without `detached-element` index errors.
