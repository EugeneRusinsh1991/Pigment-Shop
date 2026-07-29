# Dead Files (Unused) Refactoring Subskill

## Mission

Safely remove verified dead (unreachable / unimported) files while preserving existing application behavior.

---

# Scope

Only process items listed in:

dead-files.md

Never remove files outside this report.

---

# Execution Limits

- Process sequentially ONE logical file at a time.
- Upon completing and verifying a file deletion/cleanup, immediately proceed to the next item without stopping.
- Repeat sequentially until reaching the maximum limit of 10 items per execution session.
- Maximum attempts per item: 1.
- Never chain multiple file deletions simultaneously in a single step.

---

# Priority Order

1. Preserve correctness.
2. Preserve existing behavior.
3. Preserve public APIs.
4. Preserve framework integrity.
5. Remove verified dead files.

---

# Required Evidence

Before deleting a file, verify ALL of the following:

- the file appears in `dead-files.md`;
- no static imports or `require(...)` calls reference this file across the entire repository;
- it is not referenced in framework configs (e.g. `app.json`, `metro.config.js`, `babel.config.js`, `tsconfig.json`, `package.json`);
- it is not loaded dynamically or dynamically required;
- it is not an entry point, route component, or public export;
- it is not intentionally preserved.

Missing evidence is sufficient reason to skip the file. Never guess.

---

# Protected Files

Never automatically remove:

- application entry points (`index.js`, `App.js`, etc.);
- framework bootstrap & config files;
- routing or navigation declarations;
- providers and context definitions;
- barrel files (`index.js`, `index.ts`) if they serve re-export purposes;
- build, test, or tooling scripts.

---

# Verification Workflow

After every file deletion:

1. Save changes.
2. Verify project structure remains consistent.
3. Run `npm run audit:ui` or `npm run health`.
4. Verify the deleted file disappeared from `dead-files.md`.

The audit report is the primary source of truth.

---

# Stop Conditions

Stop immediately when:
- 20 files have been processed;
- `dead-files.md` contains no remaining verified items;
- the dispatcher terminates execution.
