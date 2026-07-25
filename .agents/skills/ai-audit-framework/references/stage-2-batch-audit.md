# Stage 2 — Batch Audit

## Purpose & Scope
Analyze exactly **one** designated audit batch using the selected Audit Profile. Save the report inside `.docs/ai-audit-framework/batches/<step_id>_batch_<name>.md`.

---

## File Naming Convention (MANDATORY)

File names MUST include the step/sub-batch ID prefix:
- `2.1_batch_ui-forms.md`
- `2.2_batch_ui-views.md`
- `2.3_batch_state.md`

---

## Responsibilities
- Load and follow the target profile guidelines from `profiles/<profile_name>.md` (e.g. `profiles/ui.md`, `profiles/architecture.md`, `profiles/performance.md`, `profiles/security.md`). If a custom profile path is specified in `audit-config.md`, load that file instead.
- **MANDATORY GREP SCAN**: Before writing findings, the model MUST execute `grep_search` across the ENTIRE project repository (e.g. grep `<button`, `<TouchableOpacity`, `<Pressable`, `<input`) to locate 100% of primitive occurrences in all directories (`src/`, `app/`, `components/Admin`, etc.). Model MUST NOT rely on local folder browsing alone.
- **Exhaustive Deep Scan (+20% Coverage Buffer)**: Perform mandatory `grep_search` and `view_file` calls across ALL files in the assigned batch scope to ensure zero blindspots in a single pass.
- Collect concrete code evidence for observations within the assigned batch according to profile focus areas.
- Strictly adhere to the chosen Audit Profile (mark out-of-scope concerns as "Out of Scope").
- Assign Severity (`Critical`, `High`, `Medium`, `Low`) and Confidence (`High`, `Medium`, `Low`).
- Update execution history log in `.docs/ai-audit-framework/audit-config.md`.

---

## Output Template (`.docs/ai-audit-framework/batches/<step_id>_batch_<name>.md`)

```markdown
# Stage 2 — Batch Audit Report: [<Batch Name>]

## Metadata
- **Batch Step ID**: 2.1
- **Profile**: [<Selected Profile>]
- **Scope**: [<Assigned Batch Path>]

## Strengths
- [Key architectural or technical strength]

## Findings
### [FINDING-001]: <Brief Description>
- **Severity**: Critical | High | Medium | Low
- **Confidence**: High | Medium | Low
- **Affected Scope**: `path/to/file.ts#L10-L25`
- **Evidence**:
  ```ts
  // Code snippet proving the issue
  ```
- **Observation**: [Factual description]
- **Impact**: [Technical or maintainability impact]

## Stage Completion Check
- [ ] Saved as `.docs/ai-audit-framework/batches/<step_id>_batch_<name>.md`
- [ ] `audit-config.md` history log updated
- [ ] Ready for next batch or Stage 3
```

---

## Exit Criteria
- Evidence-backed `<step_id>_batch_<name>.md` report generated inside `.docs/ai-audit-framework/batches/`.
