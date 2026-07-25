# Complex Methods

## Mission

Safely reduce the complexity of individual methods while preserving existing behavior.

The objective is to improve readability, maintainability, and testability by simplifying complex methods without changing their external behavior.

Prefer incremental improvements over aggressive rewrites.

---

# Scope

Only process methods listed in:

complexity-health-findings.md

Never process methods outside this report.

---

# Execution Limits

- Process exactly ONE method at a time.
- Maximum methods per execution: 15.
- Maximum attempts per method: 3.
- Never refactor multiple methods simultaneously.

---

# Priority Order

Always follow this priority:

1. Preserve correctness.
2. Preserve existing behavior.
3. Preserve public APIs.
4. Reduce method complexity.
5. Improve readability.

Never violate a higher priority to satisfy a lower one.

---

# Decision Gate

Before making any changes determine:

- Why is this method considered complex?
- Can the complexity be reduced safely?
- Can the improvement remain localized?
- Can the method become simpler without changing its behavior?

If the answer to any question is **No**:

- do not modify the method;
- continue with the next method.

---

# Local Context

Read additional project files only if required to:

- preserve behavior;
- understand dependencies;
- safely refactor the method.

Otherwise work only with the current file.

---

# One Goal Per Pass

Choose exactly ONE primary source of complexity.

Examples:

- excessive branching
- deep nesting
- long method
- duplicated logic
- mixed responsibilities
- complex conditional logic
- excessive parameters

Never solve multiple independent problems during the same pass.

---

# Refactoring Rules

Prefer:

- Extract Method
- Guard Clauses
- Early Return
- Simplify Conditional Logic
- Replace Nested Logic
- Remove Duplicate Logic
- Introduce Well-Named Local Variables
- Separate Independent Responsibilities

Keep every change localized.

Only perform the smallest safe refactoring.

---

# Never

Never:

- rewrite the entire class;
- redesign the architecture;
- rename public APIs;
- modify unrelated methods;
- introduce speculative abstractions;
- perform unrelated cleanup;
- optimize unrelated logic;
- refactor multiple methods during one pass.

---

# Verification Workflow

After every refactoring pass:

1. Save changes.
2. Run the Complexity Health audit.
3. Check whether the current method still appears in the report.

The audit report is the only source of truth.

Never assume success.

---

# Retry Workflow

If the method disappeared from the report:

Continue with the next method.

If the method is still present:

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
- changing external behavior;
- broad project-wide modifications;

stop immediately.

Do not waste remaining attempts.

Continue with the next method.

---

# Failure Policy

If the method still exists after the third verification:

- stop working on this method;
- never revisit it during the current execution;
- continue with the next method.

Never enter an infinite retry loop.

---

# Progress Policy

Progress is more important than perfection.

A safe incremental improvement is always preferable to a risky complete rewrite.

Never introduce new technical debt in order to eliminate existing technical debt.

---

# Stop Conditions

Stop immediately when:

- 15 methods have been processed;
- the Complexity Health report contains no remaining methods;
- the dispatcher terminates execution.

---

# Success Criteria

A successful refactoring:

- preserves correctness;
- preserves existing behavior;
- preserves public APIs whenever possible;
- safely reduces method complexity;
- improves readability and maintainability;
- removes the method from the Complexity Health report whenever possible;
- introduces no new architectural problems.