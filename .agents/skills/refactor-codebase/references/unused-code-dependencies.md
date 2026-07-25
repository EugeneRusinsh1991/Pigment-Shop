# Unused Code & Dependencies

## Mission

Safely remove verified unused code and dependencies while preserving existing behavior.

The objective is to reduce maintenance cost by eliminating only code that is proven to be unused.

Prefer preserving working code over improving audit metrics.

When evidence is incomplete, do not remove the item.

---

# Scope

Only process items listed in:

unused-code-dependencies.md

Never remove code outside this report.

---

# Execution Limits

- Process exactly ONE logical item at a time.
- Maximum items per execution: 20.
- Maximum attempts per item: 1.
- Never chain multiple deletions during the same pass.

---

# Priority Order

Always follow this priority:

1. Preserve correctness.
2. Preserve existing behavior.
3. Preserve public APIs.
4. Preserve framework integrity.
5. Remove verified dead code.
6. Improve maintainability.

Never violate a higher priority to satisfy a lower one.

---

# Permission Gate

Deletion is permitted only if ALL required conditions are satisfied.

If any required condition cannot be verified:

Deletion is NOT permitted.

Continue with the next item.

---

# Required Evidence

Before deleting anything verify ALL of the following:

- the item appears in the audit report;
- no remaining static references exist;
- it is not re-exported;
- it is not referenced by framework configuration;
- it is not loaded dynamically;
- it is not part of a public API;
- it is not intentionally preserved for runtime behavior.

Missing evidence is sufficient reason to skip the item.

Never guess.

---

# Protected Objects

Never automatically remove:

- application entry points;
- framework bootstrap files;
- routing configuration;
- navigation configuration;
- providers;
- contexts;
- dependency injection registrations;
- plugin registrations;
- dynamic imports;
- lazy-loaded modules;
- barrel files (index.ts, index.tsx);
- generated code;
- configuration files;
- environment configuration;
- build scripts;
- CI/CD configuration;
- test configuration;
- code whose usage cannot be fully verified.

If uncertain:

keep it.

---

# Local Context

Read additional project files only if required to:

- verify references;
- understand dependencies;
- preserve behavior;
- validate safe deletion.

Otherwise work only with the current item.

---

# One Goal Per Pass

Remove exactly ONE verified unused logical item.

Examples:

- unused import;
- unused variable;
- unused parameter;
- unused function;
- unused helper;
- unused type;
- unused interface;
- unused constant;
- unused export;
- unused dependency;
- unused file.

Never perform multiple independent deletions during one pass.

---

# Refactoring Rules

Prefer:

- Remove unused imports.
- Remove unused variables.
- Remove unused parameters.
- Remove unused types.
- Remove unused interfaces.
- Remove unused constants.
- Remove unused helper functions.
- Remove unused exports.
- Remove unused files.
- Remove unused dependencies.

Delete only the verified unused item.

Never perform additional cleanup during the same pass.

---

# Never

Never:

- guess whether code is unused;
- remove code solely because it is small;
- remove code solely to satisfy audit metrics;
- remove code based on naming conventions;
- remove code with uncertain runtime usage;
- remove multiple related items in one pass;
- chain deletions;
- redesign the architecture;
- modify unrelated code;
- rename public APIs;
- perform speculative cleanup.

Safety always outweighs cleanup.

---

# Verification Workflow

After every deletion:

1. Save changes.
2. Verify project structure remains consistent.
3. Verify imports remain valid.
4. Run the Unused Code & Dependencies audit.
5. Verify the current item disappeared.

The audit report is the only source of truth.

Never assume success.

---

# Retry Workflow

Maximum attempts:

1

If the item still exists after verification:

- stop working on it;
- continue with the next item.

Never retry.

---

# Early Exit

Stop immediately if deletion would require:

- architectural redesign;
- API changes;
- runtime assumptions;
- guessing usage;
- modifying unrelated code;
- violating framework boundaries.

Continue with the next item.

---

# Failure Policy

If the required evidence cannot be established:

- do not remove the item;
- treat the decision as successful;
- continue with the next item.

False negatives are acceptable.

False positives are not.

---

# Progress Policy

Progress is more important than aggressive cleanup.

Keeping verified working code is preferable to deleting potentially used code.

Never sacrifice safety to improve audit statistics.

---

# Safety Principles

Every deletion must be justified by evidence.

Absence of evidence is not evidence of absence.

Deletion is a high-risk operation.

When evidence is incomplete:

skip the item.

---

# Stop Conditions

Stop immediately when:

- 20 items have been processed;
- the Unused Code & Dependencies report contains no remaining verified items;
- the dispatcher terminates execution.

---

# Success Criteria

A successful refactoring:

- preserves correctness;
- preserves existing behavior;
- preserves public APIs whenever possible;
- preserves framework integrity;
- removes only verified dead code;
- removes only verified unused dependencies;
- introduces no regressions;
- removes the item from the audit whenever possible;
- introduces no new architectural problems.