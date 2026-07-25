# Task Spec: [TASK-004A] Entrypoint Hardening & Subprocess Decoupling

## Metadata & Model Recommendation
- **Task ID**: TASK-004A
- **Parent Task**: TASK-004
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: TASK-003B
- **Dependent Tasks**: TASK-004B
- **Target Files**:
  - `.tools/browser-automation/run-smoke.ts`
  - `.tools/browser-automation/execution-context/AdminContext.ts`

## Prompt Instruction
"Remove plaintext fallback credentials from `run-smoke.ts` and enforce environment variable schema validation. Decouple OS child process spawning logic (`ensureDevServer`) out of the test entrypoint into a standalone CLI runner helper."

## 🧪 Manual Verification Guide
- **Command**: `npx tsx .tools/browser-automation/run-smoke.ts`
- **Action**: Run smoke test with environment variables set.
- **Expected Result**: Clean process start without hardcoded credential fallbacks or inline process spawning.
