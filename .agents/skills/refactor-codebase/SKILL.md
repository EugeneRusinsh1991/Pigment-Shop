---
name: refactor-codebase
description: Universal refactoring dispatcher. Determines the required refactoring strategy, loads the appropriate reference, and delegates the entire execution workflow to that reference.
---

# Universal Refactor Dispatcher

## Mission

Determine the correct refactoring strategy for the provided task.

Load exactly one reference guide.

Delegate the entire execution to that reference.

---

## Determine Refactoring Type

Identify the refactoring category from the user request, supplied file, or auditor report.

| Type | Trigger | Reference |
|------|---------|-----------|
| Complex Methods | complexity-health-findings.md | references/complex-methods.md |
| High Complexity Files | high-complexity-files.md | references/high-complexity-files.md |
| Large Files | large-files.md | references/large-files.md |
| Small Files | small-files.md | references/small-files.md |
| Code Duplication | code-duplication.md | references/code-duplication.md |
| Dead Files (Unused) | dead-files.md | references/dead-files.md |
| Unused Exports | unused-exports.md | references/unused-exports.md |
| Dependency Issues | dependency-issues.md | references/dependency-issues.md |

---

## Loading Rules

Load ONLY the reference required for the detected task.

Never load multiple references.

Never combine multiple refactoring strategies during the same execution.

---

## Delegation

Once the correct reference has been loaded:

- stop making routing decisions;
- follow the loaded reference completely;
- allow the reference to control the entire workflow;
- return here only after that workflow finishes.

The reference owns:

- execution;
- retries;
- verification;
- stopping conditions;
- success criteria.

The dispatcher owns only routing.