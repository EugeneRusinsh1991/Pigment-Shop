# Prompt: Integrate Dynamic Auditors into Autoclicker

**Task Description:**
We already have the dynamic auditor infrastructure (`.tools/browser-automation/auditors/`) and an autoclicker automation system (`.tools/browser-automation/smoke-automation.ts`) that can launch multiple browsers simultaneously (e.g. `run-smoke.ts` and `run-admin-nav.ts`).

Currently, the auditors are executed once via `run-dynamic-audit.ts`. We need to integrate these two systems so that the autoclicker automatically invokes the auditors and collects metrics during its execution without file conflicts when running in parallel.

**Recommended AI Models:**
- **Parent Task (Full Session):** 🟠 Gemini 3.6 Flash (High) - 4 files
- **Subtask 1 (Append Mode & Deduplication):** 🟡 Gemini 3.6 Flash (Medium) - 1 file
- **Subtask 2 (Parallel Process Isolation):** 🟡 Gemini 3.6 Flash (Medium) - 2 files
- **Subtask 3 (Integration into `smoke-automation.ts`):** 🟠 Gemini 3.6 Flash (High) - 1 file
- **Subtask 4 (Maintain Backward Compatibility):** 🟢 Gemini 3.6 Flash (Low) - 1 file

**Implementation Steps:**

1. **Append Mode & Deduplication:** 🟡 Gemini 3.6 Flash (Medium) - 1 file
   - Modify `.tools/browser-automation/helpers/dynamic-report-writer.ts`.
   - Currently, it overwrites the log file on each call. Change it to **append mode** so that the log preserves violation history throughout the entire autoclicker session.
   - Add in-memory deduplication (e.g., via a global `Set` of error message hashes) so that the exact same error on the same page isn't logged 100 times on every single click.

2. **Parallel Process Isolation (Session ID):** 🟡 Gemini 3.6 Flash (Medium) - 2 files
   - To prevent two parallel clicker instances (smoke and admin-nav) from conflicting when writing logs, extend the signature of `writeDynamicReport`.
   - Add support for `sessionId` (or `instancePrefix`), so logs are saved in the format: `01-dynamic-ui-architecture-<scope>-<sessionId>-violations.log`.
   - Update `RuntimeHealthAuditor` to accept and forward this `sessionId`.

3. **Integration into `smoke-automation.ts`:** 🟠 Gemini 3.6 Flash (High) - 1 file
   - Import the auditors (01, 02, 03, 04) into `smoke-automation.ts`.
   - Attach `RuntimeHealthAuditor` (04) right after the `page` instance is created/obtained so it passively listens for background browser events (`console`, `pageerror`).
   - Invoke visual auditors (01, 02, 03) inside the autoclicker interaction loop. Pick an optimal checkpoint (e.g. after navigating to a new URL or completing an interaction batch) to scan the mutated DOM.

4. **Maintain Backward Compatibility:** 🟢 Gemini 3.6 Flash (Low) - 1 file
   - Ensure the existing `run-dynamic-audit.ts` script continues to function correctly with the new changes (e.g., passing a default `sessionId = "single"`).

**Goal:** After implementing this prompt, running `npm run smoke` or `npm run admin-nav` will automatically generate dynamic audit logs (architecture, i18n, broken-ui, health), accumulating them in `.docs/audits/dynamic-audits/` without log overwrites or file locking conflicts.
