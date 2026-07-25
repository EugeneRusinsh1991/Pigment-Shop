# Browser Automation Data Editing Validation Strategy

## 1. Executive Summary & Core Goal
The objective of extending the Browser Automation suite with Data Editing Validation is to safely test and verify editable form fields within the Admin Panel (and throughout the application) without leaving residual test data or corrupting production/development data.

The system will perform a non-destructive lifecycle test on targeted forms:
1. **Discover & Snapshot**: Capture original values of all fields in the target form.
2. **Mutate**: Inject synthetic, easily-identifiable test data tokens (e.g. `[AUTOTEST_MUTATED_<TIMESTAMP>]`).
3. **Save & Verify**: Submit the form, verify successful API response and DOM persistence.
4. **Restore & Rollback**: Re-inject the original snapshot values, submit the form, and verify full restoration of original state.

---

## 2. Architectural Design & Components

```
+-----------------------------------------------------------------------------------+
|                            Automation Explorer Core                               |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                        DataEditingValidationPlugin                                |
|  - Manages editing lifecycle, safety policies, and emergency cleanup handlers     |
+-----------------------------------------------------------------------------------+
        |                                |                                 |
        v                                v                                 v
+-----------------------+    +-----------------------+    +-------------------------+
| FormStateBackupManager|    | FormMutationDriver    |    | ValidationAssertionEngine|
| - Captures DOM/State  |    | - Field fill/select   |    | - Checks response status|
| - Manages snapshots   |    | - Form submit actions |    | - Verifies DOM state    |
+-----------------------+    +-----------------------+    +-------------------------+
        |                                |                                 |
        +--------------------------------+---------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                         EmergencyRollbackRegistry                                 |
| - Guaranteed execution in finally{} block or process interrupt handlers           |
+-----------------------------------------------------------------------------------+
```

### Key Modules:
- **`DataEditingValidationPlugin`**: Orchestrates the 5-phase data editing test cycle for discovered form contexts.
- **`FormStateBackupManager`**: Reads current value bindings (inputs, textareas, selects, toggles, rich inputs) into an isolated in-memory snapshot before any mutation.
- **`FormMutationDriver`**: Safely types/selects temporary value tokens matching expected input types (string, number, boolean, options).
- **`ValidationAssertionEngine`**: Verifies post-submit DOM state and API response codes.
- **`EmergencyRollbackRegistry`**: Global fallback registry keeping track of pending uncommitted or un-restored state changes. Guarantees cleanup even if browser crashes or tests fail midway.

---

## 3. Data Editing Lifecycle Workflow

```
[Discover Form] ---> [Capture Snapshot] ---> [Inject Test Data] ---> [Submit Form]
                                                                          |
                                                                          v
[Verify Restored State] <-- [Submit Rollback] <-- [Restore Snapshot] <-- [Verify Mutation Success]
```

### Detailed Phase Workflow:
1. **Phase 1: Form Discovery & Field Inspection**
   - Detect forms marked with `data-testid`, `form`, or standard form structures inside Admin views.
   - Inspect field types and check against safety allowlists/blocklists (e.g., exclude password, API key, auth user role fields).

2. **Phase 2: State Snapshotting**
   - Extract raw input values (`element.value`, checked states, select options).
   - Generate a `FormStateSnapshot` object holding `{ fieldId, originalValue, fieldType, selector }`.

3. **Phase 3: Synthetic Data Injection & Mutation**
   - Generate test payload: `TEST_EDIT_<field_name>_<timestamp>`.
   - Use Playwright input controls (`fill`, `check`, `selectOption`) to apply new values.

4. **Phase 4: Save & Assertion**
   - Trigger the form save button (`[type="submit"]` or `Save` button).
   - Await network response (`200 OK`) and success notification / UI toast.
   - Re-inspect form or re-fetch entity view to assert mutated value is displayed.

5. **Phase 5: Automated Rollback & Cleanup**
   - Re-populate all fields using the `FormStateSnapshot`.
   - Submit form again.
   - Assert network response and verify original values are fully restored in UI.

---

## 4. Safety Considerations & Guardrails

### 1. Field Safety Matrix (Allowlist / Blocklist)
- **Blocked Fields**: Password inputs, API secret tokens, User Auth Roles, Stripe/Payment configuration keys, System Environment settings, User deletion switches.
- **Allowed Fields**: Display names, descriptions, non-critical product metadata, image caption labels, category titles.

### 2. Emergency Rollback Guarantees
- **In-Flight Rollback Stack**: Every mutation pushes a rollback task onto a stack.
- **Process Signals (`SIGINT`, `SIGTERM`, unhandled exceptions)**: Triggers an immediate execution of all remaining rollback tasks in the stack before exiting.
- **Transaction Timeout**: If a form submit or verification takes longer than 10 seconds, rollback triggers automatically.

### 3. Isolation & Test Data Tagging
- All injected strings carry a unique signature prefix (`[AUTOMATION_TEST_DATA]`).
- Any periodic cleanup script can identify and remove orphaned test data if a catastrophic infrastructure failure prevents browser-side rollback.

---

## 5. Implementation Phases & Roadmap

| Phase | Description | Deliverables |
| :--- | :--- | :--- |
| **Phase 1: Form Snapshot Engine** | Build `FormStateBackupManager` to reliably capture and restore DOM form field values. | Snapshot/Restore unit utility |
| **Phase 2: Mutation & Assertion Driver** | Implement `FormMutationDriver` and `ValidationAssertionEngine` for input/select handling. | Field interaction driver |
| **Phase 3: Rollback Registry & Safety Guardrails** | Add field blocklists, emergency cleanup hooks, and process interrupt handlers. | Safety & Rollback wrapper |
| **Phase 4: Explorer Integration & Reporting** | Integrate `DataEditingValidationPlugin` into `runSmokeAutomation` & output structured editing reports. | Fully automated Admin Editing plugin |
