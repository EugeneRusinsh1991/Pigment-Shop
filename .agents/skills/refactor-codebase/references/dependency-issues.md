# Dependency Issues Refactoring Subskill

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
- Upon completing and verifying a fix, immediately proceed to the next item without stopping.
- Repeat sequentially until reaching the maximum limit of 10 items per execution session.
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
2. Run `npm run health` or `npm run audit:ui`.
3. Verify project builds and dependency issues disappear from `dependency-issues.md`.

---

# Stop Conditions

Stop immediately when:
- All dependency issues in `dependency-issues.md` are resolved;
- the dispatcher terminates execution.
