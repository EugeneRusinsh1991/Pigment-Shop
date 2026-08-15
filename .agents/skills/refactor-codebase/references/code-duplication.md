# Code Duplication

## Task Limitation Rule

**CRITICAL**: When working with audit files, follow this strict process:

1. Read the audit file provided in context
2. Extract ONLY the first 3-5 problems from the top of the list (or 3-5 duplication pairs)
3. Fix exactly those 3-5 problems and no more
4. Stop immediately after completing them
5. Do NOT continue to other problems in the file
6. Complete work and exit

This ensures incremental refactoring and allows the user to run audit between iterations.

---

## Mission

Safely eliminate duplicated code while preserving existing behavior.

The objective is to improve maintainability by consolidating identical or substantially similar logic into a single reusable implementation.

Prefer incremental improvements over aggressive consolidation.

---

# Scope

Only process duplicated code reported in:

code-duplication.md

Never process duplication outside this report.

---

# Execution Limits

- Process sequentially ONE duplication at a time.
- Take ONLY the first 3-5 duplication pairs from the top.
- Upon completing and verifying a duplication, immediately proceed to the next duplication until 3-5 problems are fixed.
- Stop immediately after completing them.
- Maximum attempts per duplication: 2.
- Never resolve multiple duplications simultaneously in a single code edit.

---

# Priority Order

Always follow this priority:

1. Preserve correctness.
2. Preserve existing behavior.
3. Preserve public APIs.
4. Remove duplication.
5. Improve maintainability.

Never violate a higher priority to satisfy a lower one.

---

# Decision Gate

Before making any changes determine:

- Is this real duplication?
- Can the duplicated logic be safely unified?
- Will the resulting implementation remain readable?
- Will behavior remain unchanged?

If the answer to any question is **No**:

- do not modify the duplication;
- continue with the next duplication.

---

# Local Context

Read additional project files only if required to:

- preserve behavior;
- understand duplicated logic;
- safely consolidate shared functionality.

Otherwise work only with the current file(s).

---

# One Goal Per Pass

Choose exactly ONE duplicated implementation.

Never remove multiple unrelated duplications during the same pass.

---

# Refactoring Rules

Prefer:

- Extract Shared Method
- Extract Utility Function
- Extract Helper
- Extract Shared Constant
- Extract Shared Type
- Reuse Existing Implementation

Always prefer reuse over copying.

Keep all behavior unchanged.

---

# Never

Never:

- redesign the architecture;
- merge unrelated logic;
- introduce speculative abstractions;
- rename public APIs;
- modify unrelated code;
- perform unrelated cleanup;
- consolidate code with different responsibilities;
- eliminate duplication at the expense of readability.

---

# Verification Workflow

After every refactoring pass:

1. Save changes.
2. Run `npm run audit`.
3. Check whether the duplicate block still appears in the report.

The audit report is the only source of truth.

Never assume success.

---

# Retry Workflow

If the duplication disappeared:

Continue with the next duplication.

If the duplication still exists:

1. Analyze why the previous strategy failed.
2. Select a different safe consolidation strategy.
3. Retry.

Maximum attempts:

2

---

# Early Exit

If eliminating the duplication would require:

- architectural redesign;
- risky API changes;
- forced abstraction;
- merging unrelated responsibilities;

stop immediately.

Do not waste remaining attempts.

Continue with the next duplication.

---

# Failure Policy

If the duplication still exists after the second verification:

- stop working on this duplication;
- never revisit it during the current execution;
- continue with the next duplication.

Never enter an infinite retry loop.

---

# Progress Policy

Progress is more important than perfection.

A small safe reduction in duplication is preferable to a risky generalization.

Never introduce unnecessary abstractions solely to remove duplication.

---

# Stop Conditions

Stop immediately when:

- 3-5 duplications have been processed;
- the Code Duplication report contains no remaining duplications;
- the dispatcher terminates execution.

---

# Success Criteria

A successful refactoring:

- preserves correctness;
- preserves existing behavior;
- preserves public APIs whenever possible;
- safely removes duplicated code;
- improves maintainability;
- removes the duplication from the audit whenever possible;
- introduces no new architectural problems.
