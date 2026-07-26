# Large Files

## Mission

Safely reduce the size and responsibility of oversized files while preserving existing behavior.

The objective is not to reduce line count, but to improve maintainability by separating independent responsibilities into appropriate modules.

Prefer incremental structural improvements over aggressive decomposition.

---

# Scope

Only process files listed in:

large-files.md

Never process files outside this report.

---

# Execution Limits

- Process exactly ONE file at a time.
- Maximum files per execution: 7.
- Maximum attempts per file: 2.
- Never process multiple files simultaneously.

---

# Priority Order

Always follow this priority:

1. Preserve correctness.
2. Preserve existing behavior.
3. Preserve public APIs.
4. Reduce file responsibility.
5. Improve maintainability.

Never violate a higher priority to satisfy a lower one.

---

# Decision Gate

Before making any changes determine:

- Why is this file oversized?
- Does it contain multiple responsibilities?
- Can one responsibility be safely extracted?
- Can the extraction remain localized?

If the answer to any question is **No**:

- do not modify the file;
- continue with the next file.

---

# Local Context

Read additional project files only if required to:

- preserve behavior;
- understand dependencies;
- safely extract code into another module.

Otherwise work only with the current file.

---

# One Goal Per Pass

Choose exactly ONE responsibility to extract.

Examples:

- React component
- Custom hook
- Service
- Utility
- Helper
- Constants
- Types
- Validation
- Business logic

Never extract multiple independent responsibilities during the same pass.

---

# Refactoring Rules

Prefer:

- Extract Component
- Extract Custom Hook
- Extract Service
- Extract Utility
- Extract Constants
- Extract Types
- Separate Business Logic
- Separate Presentation Logic

Extract only cohesive, independent functionality.

Keep the original file behavior unchanged.

---

# Never

Never:

- split files arbitrarily;
- extract tiny fragments only to reduce line count;
- redesign the application architecture;
- introduce speculative abstractions;
- rename public APIs;
- move unrelated code;
- perform unrelated cleanup;
- optimize unrelated logic;
- extract multiple responsibilities in one pass.

The goal is responsibility separation, not file size reduction.

---

# Verification Workflow

After every refactoring pass:

1. Save changes.
2. Run the Large Files audit.
3. Check whether the current file still exists in the new report.

The audit report is the only source of truth.

Never assume success.

---

# Retry Workflow

If the file disappeared from the report:

Continue with the next file.

If the file is still present:

1. Analyze why the extraction was insufficient.
2. Identify one additional independent responsibility.
3. Perform one more safe extraction.

Maximum attempts:

2

---

# Early Exit

If reducing the remaining file size would require:

- architectural redesign;
- risky API changes;
- excessive fragmentation;
- artificial decomposition;

stop immediately.

Do not waste remaining attempts.

Continue with the next file.

---

# Failure Policy

If the file still exists after the second verification:

- stop working on this file;
- never revisit it during the current execution;
- continue with the next file.

Never enter an infinite retry loop.

---

# Progress Policy

Progress is more important than perfection.

A file may remain large if further decomposition would reduce clarity.

Never split code simply to satisfy a size metric.

Each extracted module should represent one meaningful responsibility.

---

# Stop Conditions

Stop immediately when:

- 10 files have been processed;
- the Large Files report contains no remaining files;
- the dispatcher terminates execution.

---

# Success Criteria

A successful refactoring:

- preserves correctness;
- preserves existing behavior;
- preserves public APIs whenever possible;
- reduces file responsibility;
- extracts cohesive modules;
- improves maintainability;
- removes the file from the Large Files report whenever possible;
- introduces no new architectural problems.