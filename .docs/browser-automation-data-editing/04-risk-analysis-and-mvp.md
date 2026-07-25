# 04 - Technical Risk Analysis & Simplified MVP

## 1. Top Technical Risks

### Risk 1: Async Side-Effects & Background Persistence Triggers
- **Issue**: Submitting an admin form may trigger async backend tasks (e.g. Firebase triggers, search index re-indexing, audit logs) that cannot be undone by reverting the form UI alone.
- **Severity**: High
- **Mitigation**: Restrict editing tests to isolated non-indexed staging fields, or wrap mutations in database-level transactions/emulator snapshots.

### Risk 2: Partial Rollback Failure On Validation Errors
- **Issue**: If the rollback step fails to restore a field (due to frontend validation errors or disabled submit buttons), test data remains permanently in the system.
- **Severity**: High
- **Mitigation**: Require strict validation check before mutation; enforce API-level direct restore if UI rollback fails.

### Risk 3: Flaky DOM State During Animation / Transition
- **Issue**: Form inputs might be disabled or detached from DOM during state transitions, leading to false-negative test failures.
- **Severity**: Medium
- **Mitigation**: Wait for network idle and element interactability before snapshotting and filling.

---

## 2. Simplified MVP Alternative

Instead of full bi-directional mutation, submission, and DB rollback across arbitrary forms:

### Proposed Minimal Viable Product (MVP):
1. **Scope**: Test **only 1 designated safe field** per admin page (e.g. `Notes` or `Internal Title`).
2. **Dry-Run / Client-Side State Verification**: Test input typing and form change detection *without clicking the final Save button*, verifying field reactivity and dirty state flags.
3. **Targeted Isolated Restore**: For full end-to-end submit validation, restrict tests to dedicated ephemeral test records created specifically for automation (rather than editing existing records).
