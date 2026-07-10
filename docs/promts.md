### REFRACTOR

Continuously refactor while implementing features. Do not leave large files or large methods behind.

**Requirements**
- Keep every change as small and localized as possible.
- Prefer readability, maintainability, and separation of responsibilities.
- Refactor continuously, not only after the feature is finished.
- If implementing a feature causes a file or method to become too large, immediately split it.

**File Guidelines** 
- Target file size: under 150 lines.
- If a file grows beyond ~150 lines, split related functionality into additional files.
- Organize code into logical modules instead of accumulating unrelated logic.
- Create new folders when it improves project structure.

**Method Guidelines**
- Target method size: under 50 lines.
- Each method should perform one clear responsibility.
- Extract reusable or independent logic into private/helper methods.
- Avoid deeply nested conditionals by extracting them into separate functions.

**Architecture**
- Prefer composition over inheritance.
- Prefer dependency injection over tightly coupled code.
- Separate:
  - UI
  - business logic
  - data access
  - utilities
  - constants
  - types
  whenever it improves clarity.

**Refactoring Policy**
- Every newly created file must also follow these rules.
- If splitting creates another oversized file or method, continue refactoring recursively until all resulting files and methods satisfy these guidelines.
- Never stop refactoring simply because code was moved into a new file.
- Avoid duplicate code.
- Extract common logic into shared utilities when appropriate.
- Preserve existing behavior during refactoring.

**Do Not**
- Do not increase complexity solely to satisfy these limits.
- Do not split tightly coupled logic without a readability benefit.
- Do not introduce unnecessary abstractions.
- Do not change functionality unless explicitly requested.
- Do not use npm run audit comand.

**Goal**
The final codebase should consist of small, focused, easy-to-read files and methods with clear responsibilities. No oversized files or methods should remain after implementation.

---
---
---

### AUDIT

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

---
---
---

### PROBLEM

# Task: Create an Implementation Plan Document for a Reported Problem
You will receive a description of a single software issue.
Your task is **NOT** to fix the issue immediately.
Instead, thoroughly investigate the project and create a dedicated implementation document that will later be used to solve the problem.

## Instructions
1. Carefully read and understand the reported issue.
2. Explore the entire project to identify:
   * where the problem occurs;
   * which files, components, services, hooks, utilities, or modules are involved;
   * possible root causes;
   * dependencies that may be affected.
3. Do not make assumptions. Base your findings on the actual project structure and implementation.
4. Create a new Markdown document inside the `docs/` directory.
5. Name the file using a short, descriptive kebab-case version of the issue title.

Example:

```
docs/fix-language-switching.md
docs/order-history-persistence.md
docs/cart-state-synchronization.md
```

## The document must contain the following sections
# Problem

Describe the issue clearly and objectively.
Include:
* what is happening;
* what should happen instead;
* when the issue occurs;
* any important edge cases.

# Project Analysis
Describe what you discovered during your investigation.
Include:
* relevant files;
* relevant folders;
* related components;
* related services;
* related hooks;
* related utilities;
* related state management;
* related APIs or Firebase collections (if applicable);
* any dependencies connected to this issue.

# Root Cause Analysis
Describe the most likely root cause(s).
If multiple causes are possible, list all of them.

# Recommended Solution
Describe the complete implementation strategy.
Break the work into logical stages.
For each stage explain:
* what needs to be changed;
* why it needs to be changed;
* expected outcome.
Do not include actual implementation code.

# Expected Result
Describe the expected behavior after the issue has been fully resolved.
Include both functional and user-visible improvements.

# Implementation Prompts (English)
This is the most important section.

Generate a sequence of implementation prompts for another AI coding agent.

Requirements:
* Write **all prompts in English**.
* Split the implementation into **multiple small prompts** instead of one large prompt.
* Each prompt should focus on a single logical task.
* Prompts should be ordered from analysis to implementation to validation.
* Each prompt should be self-contained and executable.
* Avoid combining unrelated tasks.
* Prefer many focused prompts over one large prompt.

Generate as many implementation prompts as necessary. There is no fixed limit. The goal is to produce a complete execution plan that another AI coding agent can follow step by step.
Do not modify the project. Only investigate the codebase and generate the documentation file.
The reported issue is provided above this instruction.

---
---
---

look at document and do promts at the end of this document step by step, aftect complete ONE PROMT place "check mark" that this step is done and then do backup with -- --step "nameOfStep" 

look at this file, read it, there are promts in the end of this file, try to solve problem from this file and create backup -- --step "nameOfStep" after each promt done
1:55 AM

