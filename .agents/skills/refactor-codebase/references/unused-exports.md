# Unused Exports Refactoring Subskill

## Task Limitation Rule

**CRITICAL**: When working with audit files, follow this strict process:

1. Read the audit file provided in context
2. Extract ONLY the first 3-5 problems from the top of the list
3. Fix exactly those 3-5 problems and no more
4. Stop immediately after completing them
5. Do NOT continue to other problems in the file
6. Complete work and exit

This ensures incremental refactoring and allows the user to run audit between iterations.

---

## Mission

Safely clean up verified unused exports from active files while preserving existing application behavior and public APIs.

---

# Scope

Only process items listed in:

unused-exports.md

Never remove exports outside this report.

---

# Execution Limits

- Process sequentially ONE unused export at a time.
- Take ONLY the first 3-5 items from the top.
- Upon completing and verifying an export removal, immediately proceed to the next item until 3-5 items are processed.
- Stop immediately after completing them.
- Maximum attempts per item: 1.
- Never chain multiple export removals simultaneously in a single code edit.

---

# Priority Order

1. Preserve correctness.
2. Preserve existing behavior.
3. Preserve public API contracts.
4. Remove verified unused exports.

---

# Required Evidence

Before removing an export (or converting an exported function/variable to a local non-exported function/variable, or removing it if completely unused locally), verify ALL of the following:

- the export appears in `unused-exports.md`;
- no static references across the codebase consume this exported symbol;
- it is not exported as part of a public library interface or framework contract;
- it is not dynamically accessed via index/string lookup.

If the function or variable is used inside the file itself, remove only the `export` keyword. If it is entirely unused locally as well, it may be safely removed.

Missing evidence is sufficient reason to skip the item.

---

# Verification Workflow

After every export modification:

1. Save changes.
2. Verify imports and usage in dependent files remain valid.
3. Run `npm run audit`.
4. Verify the export issue disappeared from `unused-exports.md`.

---

# Stop Conditions

Stop immediately when:
- 3-5 items have been processed;
- `unused-exports.md` contains no remaining verified items;
- the dispatcher terminates execution.
