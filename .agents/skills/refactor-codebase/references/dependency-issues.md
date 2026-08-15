# Dependency Issues Refactoring Subskill

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

Safely resolve verified dependency issues (unused dependencies, unlisted dependencies, and circular dependencies) while preserving project build stability.

---

# Scope

Only process items listed in:

dependency-issues.md

Never modify dependencies outside this report.

---

# Categories of Dependency Issues

1. **Unused Dependencies:** Packages listed in `package.json` that are not imported anywhere in the project.
2. **Unlisted Dependencies:** Packages imported in project files but missing from `package.json`.
3. **Circular Dependencies:** Modules that form circular import cycles (`A -> B -> A`).

---

# Execution Limits

- Process sequentially ONE dependency issue at a time.
- Take ONLY the first 3-5 items from the top.
- Upon completing and verifying a fix, immediately proceed to the next item until 3-5 items are fixed.
- Stop immediately after completing them.
- Maximum attempts per item: 1.

---

# Priority Order

1. Preserve project build and runtime stability.
2. Ensure all imported packages are explicitly listed in `package.json`.
3. Break circular dependency chains.
4. Remove verified unused npm packages.

---

# Verification Workflow

After fixing a dependency issue:

1. Save changes (`package.json` or module refactoring).
2. Run `npm run audit`.
3. Verify project builds and dependency issues disappear from `dependency-issues.md`.

---

# Stop Conditions

Stop immediately when:
- 3-5 dependency issues in `dependency-issues.md` are resolved;
- the dispatcher terminates execution.
