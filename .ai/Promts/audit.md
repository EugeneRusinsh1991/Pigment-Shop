Problem

The project does not have a comprehensive architectural audit identifying the most important technical issues that should be addressed first. High-impact structural problems have not been collected into a single prioritized document.

Task

Perform a read-only audit of the entire project.

Before writing the audit, inspect the complete project structure, including source code, modules, routing, state management, services, stores, contexts, hooks, shared components, feature organization, and application architecture.

Do not modify any existing files.

Create a single document:

docs/audit.md

The audit must contain only Critical and High priority issues. Ignore medium and low priority findings.

Focus on identifying issues such as:

Architectural problems.
Incorrect separation of responsibilities.
Files or modules that handle multiple unrelated domains.
Business logic placed in the wrong layer.
Excessive coupling between features.
Duplicate implementations of the same functionality.
Shared modules that have become bottlenecks.
Hidden initialization or side-effect problems.
Large modules that coordinate unrelated functionality.
Structural issues that make maintenance, testing, or future development significantly more difficult.

Do not include:

Formatting or style suggestions.
Naming improvements.
Cosmetic refactoring.
Minor optimizations.
Personal preferences.
Small code smells.

For each finding, use the following structure:

## <Priority> - <Title>

Problem
Describe the issue clearly and concisely.

Location
List the relevant files, folders, modules, stores, services, contexts, hooks, or other project areas involved.
Reference concrete project locations whenever possible.

Why it matters
Explain why this issue is Critical or High priority and what risk it creates for the project.

Recommendation
Provide a short, high-level recommendation describing the direction of the refactor without implementation details.

Requirements:

Analyze the entire project before writing the audit.
Do not stop after finding the first few issues.
Report every Critical and High priority issue you identify.
Prefer accurate findings over a large number of findings.
Every finding must be specific to this project rather than generic software advice.
Whenever possible, reference the exact files, folders, modules, or architectural areas involved.
If multiple files contribute to the same problem, group them into a single finding instead of creating duplicate entries.
Clearly describe the architectural problem instead of making vague statements.
Keep each finding concise but informative, with enough detail that another engineer can understand the issue without investigating the code first.
If no concrete project location can be identified for a finding, do not include it.

Expected Result

A new file docs/audit.md is created containing a prioritized list of the project's Critical and High priority architectural and refactoring issues. Each finding clearly describes the problem, references the affected project areas where possible, explains why the issue is high priority, and includes a brief high-level recommendation. No existing project files are modified.