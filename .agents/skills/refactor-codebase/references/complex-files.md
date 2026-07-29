# Complex Files

## Mission

Safely reduce file size and/or complexity while preserving existing behavior.

Handle both oversized files and high-complexity files by applying appropriate strategies based on the detected issue.

Prefer incremental improvements over aggressive refactoring.

---

# Scope

Only process files listed in:

large-files.md OR high-complexity-files.md

Never process files outside these reports.

---

# Execution Limits

- Process sequentially ONE file at a time.
- Upon completing and verifying a file refactor, immediately proceed to the next file without stopping.
- Repeat sequentially until reaching the maximum limit of 3 files per execution session.
- Maximum attempts per file: 3.
- Never process multiple files simultaneously in a single code edit.

---

# Priority Order

Always follow this priority:

1. Preserve correctness.
2. Preserve existing behavior.
3. Preserve public APIs.
4. Reduce size/complexity.
5. Improve maintainability.

Never violate a higher priority to satisfy a lower one.

---

# Decision Gate

Before making any changes determine:

- Which report triggered this file? (large-files.md OR high-complexity-files.md)
- Why is this file problematic? (size vs complexity vs both)
- Can the issue be safely reduced?
- Can the improvement remain localized?

If the answer to any question is **No**:

- do not modify the file;
- continue with the next file.

---

# Strategy Selection

Based on the trigger report:

## Large Files Strategy
Focus: Responsibility separation

- Extract Component
- Extract Custom Hook
- Extract Service
- Extract Utility
- Extract Constants
- Extract Types
- Separate Business Logic
- Separate Presentation Logic

## High Complexity Strategy
Focus: Logic simplification

- Extract Method
- Extract Private Helper
- Guard Clauses
- Simplify Conditional Logic
- Remove unnecessary nesting
- Improve readability

## Both Reports
Apply Large Files strategy first (separation often reduces complexity), then High Complexity strategy if needed.

---

# Local Context

Read additional project files only if required to:

- preserve behavior;
- understand dependencies;
- safely extract code into another module.

Otherwise work only with the current file.

---

# One Goal Per Pass

Choose exactly ONE primary issue to address.

Examples:

- One responsibility to extract (Large Files)
- One complex method to simplify (High Complexity)
- One set of nested conditionals to flatten (High Complexity)

Never address multiple independent issues during the same pass.

---

# Refactoring Rules

Prefer:

- Extract cohesive, independent functionality
- Keep original file behavior unchanged
- Use smallest safe refactoring
- Maintain clear separation of concerns

Never:

- split files arbitrarily;
- extract tiny fragments only to reduce metrics;
- redesign application architecture;
- introduce speculative abstractions;
- rename public APIs;
- move unrelated code;
- perform unrelated cleanup;
- optimize unrelated logic;
- address multiple concerns in one pass.

---

# Verification Workflow

After every refactoring pass:

1. Save changes.
2. Run the appropriate audit (Large Files OR High Complexity).
3. Check whether the current file still exists in the new report.

The audit report is the only source of truth.

Never assume success.

---

# Retry Workflow

If the file disappeared from the report:

Continue with the next file.

If the file is still present:

1. Analyze why the previous attempt was insufficient.
2. Select a different safe strategy.
3. Retry.

Maximum attempts:

3

---

# Early Exit

If reducing the remaining issue would require:

- architectural redesign;
- risky API changes;
- excessive fragmentation;
- artificial decomposition;

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

A file may remain large/complex if further reduction would reduce clarity.

Never split code simply to satisfy a size or complexity metric.

Each extracted module should represent one meaningful responsibility.

---

# Stop Conditions

Stop immediately when:

- 10 files have been processed;
- both reports contain no remaining files;
- the dispatcher terminates execution.

---

# Success Criteria

A successful refactoring:

- preserves correctness;
- preserves existing behavior;
- preserves public APIs whenever possible;
- reduces file responsibility OR complexity;
- extracts cohesive modules OR simplifies logic;
- improves maintainability;
- removes the file from the appropriate report whenever possible;
- introduces no new architectural problems.
