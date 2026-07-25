# High Complexity Files

## Mission

Safely reduce the complexity of files listed in the High Complexity report while preserving existing behavior.

Prefer incremental improvements over aggressive refactoring.

---

# Scope

Only process files listed in:

high-complexity-files.md

Never process files outside this report.

---

# Execution Limits

- Process exactly ONE file at a time.
- Maximum files per execution: 10.
- Maximum attempts per file: 3.
- Never process multiple files simultaneously.

---

# Priority Order

Always follow this priority:

1. Preserve correctness.
2. Preserve existing behavior.
3. Preserve public APIs.
4. Reduce complexity.
5. Improve readability.

Never violate a higher priority to satisfy a lower one.

---

# Decision Gate

Before making any changes determine:

- Why is this file considered highly complex?
- Can the complexity be safely reduced?
- Can the improvement remain localized?

If the answer to any of these questions is **No**:

- do not modify the file;
- continue with the next file.

---

# Local Context

Read additional project files only if they are required to:

- preserve behavior;
- understand dependencies;
- safely perform the refactoring.

Otherwise work only with the current file.

---

# One Goal Per Pass

Choose exactly ONE primary source of complexity.

Examples:

- long methods
- nested conditionals
- mixed responsibilities
- duplicated logic
- excessive branching

Do not solve multiple independent problems during the same pass.

---

# Refactoring Rules

Prefer:

- Extract Method
- Extract Private Helper
- Guard Clauses
- Simplify Conditional Logic
- Responsibility Separation
- Remove unnecessary nesting
- Improve readability

Only perform the smallest safe refactoring.

---

# Never

Never:

- rewrite the entire file;
- redesign the architecture;
- introduce speculative abstractions;
- rename public APIs;
- move unrelated code;
- perform unrelated cleanup;
- optimize unrelated logic;
- refactor multiple concerns in one pass.

---

# Verification Workflow

After every refactoring pass:

1. Save changes.
2. Run the High Complexity audit.
3. Check whether the current file still exists in the new report.

The audit report is the only source of truth.

Never assume success.

---

# Retry Workflow

If the file disappeared from the report:

Continue with the next file.

If the file is still present:

1. Analyze why the previous attempt did not succeed.
2. Select a different safe strategy.
3. Retry.

Maximum attempts:

3

---

# Early Exit

If reducing the remaining complexity would require:

- architectural redesign;
- risky API changes;
- broad project-wide modifications;

stop immediately.

Do not waste remaining attempts.

Continue with the next file.

---

# Failure Policy

If the file still exists after the third verification:

- stop working on this file;
- never revisit it during the current execution;
- continue with the next file.

Never enter an infinite retry loop.

---

# Progress Policy

Progress is more important than perfection.

A safe incremental improvement is always preferable to a risky complete rewrite.

Never introduce new technical debt in order to eliminate existing technical debt.

---

# Stop Conditions

Stop immediately when:

- 10 files have been processed;
- the High Complexity report contains no remaining files;
- the dispatcher terminates execution.

---

# Success Criteria

A successful execution:

- preserves correctness;
- preserves existing behavior;
- preserves public APIs whenever possible;
- safely reduces complexity;
- removes the file from the High Complexity report whenever possible;
- introduces no new architectural problems.