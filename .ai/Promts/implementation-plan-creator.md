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