---
name: refactor-codebase
description: Automated refactoring dispatcher and execution workflow.
---

# Refactor Codebase New

Simplified automated codebase refactoring skill using direct file routing and reference mapping.

## Overview
This skill checks non-empty audit log files according to strict priority rules, maps the target audit file to its corresponding reference guide, and performs an incremental refactoring run limiting work to 3–5 issues per execution.

## Workflow
1. Execute `file-router.js` to locate the highest-priority non-empty audit problem file in `.logs/audit/`.
2. Execute `reference-mapper.js` passing the audit file path to determine the matching reference guide under `references/`.
3. Provide the full context (audit file + reference guide) directly to the AI agent.
4. Execute refactoring following the specific reference guide instructions.
5. Limit execution to the first 3–5 issues from the audit file and stop immediately.

## Execution
Run the routing and mapping step using Node.js:

```bash
node .agents/skills/refactor-codebase-new/file-router.js
node .agents/skills/refactor-codebase-new/reference-mapper.js <audit-file-path>
```

When invoking refactoring directly:
1. Locate target problem file with `file-router.js`.
2. Map to reference guide using `reference-mapper.js`.
3. Read the audit problem file.
4. Read the corresponding reference guide in `references/`.
5. Fix the first 3–5 items in the audit file.
6. Verify code modifications and complete the run.

## Context Provided
When this skill runs, the following context is made available:
- **Audit File**: Output file generated under `.logs/audit/` containing detected violations/issues.
- **Reference Guide**: Markdown guide from `references/` with rules and refactoring instructions.
- **Task Limit**: Upper limit of 3–5 issues per invocation to ensure safe and controllable iterations.

## User Instructions
1. Run `skill refactor-codebase-new` (or execute routing scripts) to process current audit issues.
2. After completion of a refactoring run, execute `npm run audit` to refresh audit logs.
3. Repeat the process to address remaining issues incrementally.

## Troubleshooting & Usage Notes
- **Audit File Empty/Missing**: `file-router.js` safely skips empty or missing audit files and checks the next folder/file by priority.
- **Manual Audit Step**: Always run `npm run audit` between skill invocations to ensure accurate priority resolution.
- **Unmapped Audit Types**: If `reference-mapper.js` throws an unknown file type error, add the filename mapping entry to `reference-mapper.js`.
