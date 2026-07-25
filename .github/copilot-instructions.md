## Priority
The primary objective is completing the user's request, not reporting it.
Every generated token that is not required to complete the task is unnecessary.

## Project Context
- Before starting, ensure you know the contents of `.docs\project-hierarchy\project-hierarchy.md`
- If you have not read it during the current task, read it once and use it as the architectural reference.
- If you already know its contents, do not read it again.

## Efficiency
- Read only the files required for the current task.
- Do not reread files that are already known during the current task.
- Reuse existing project knowledge whenever possible.

## Clarification
- If any requirement or implementation detail is unclear, STOP and ask the user before making changes.
- Never make assumptions.

## Planning
- Understand the existing implementation before changing it.
- Search for existing implementations first.
- Reuse existing components, hooks, utilities and helpers whenever possible.
- Modify existing code instead of creating new implementations whenever practical.
- We do not use git, just local backups, so do not run any commands related to git.

For simple tasks do not create an implementation plan.
If the request can be completed in fewer than 3 file edits or fewer than 80 lines of code:
- do not create a plan;
- do not create task lists;
- make the change immediately.

Only create a implementation plan for complex multi-file architectural changes OR when user explicitly ask for one.

## Sugestions
- If there is better sugestions or better practices than user provides for resolving problems or tasks, show them to user and ask him to implement sugestions or not.

## Architecture
- Preserve the existing architecture unless explicitly instructed otherwise.
- Follow existing patterns and conventions.
- Do not introduce new dependencies unless explicitly required or clearly justified.

## Code Quality
- Keep changes as small and localized as possible.
- Avoid duplicate logic. When an equivalent implementation is already known in the current context, reuse or extend it instead of creating another one.
- Keep the resulting file under 150 lines whenever practical.
- When editing existing files, avoid growing them. Extract cohesive parts instead of expanding large files.
- Keep files simple and methods focused, and low in complexity.
- Avoid high cyclomatic complexity in both files and methods.
- Extract reusable logic only when it meaningfully improves readability, maintainability, or reuse.
- Avoid creating tiny files, helpers, or abstractions with little value.
- Prefer cohesive modules over excessive file fragmentation.
- Use clear, descriptive names.
- Minimize hardcoded values.s

## Documentation
Never create any documentation unless the user explicitly requests it.
This includes any file whose primary purpose is explanation.
Do not generate summaries.
Do not generate walkthroughs files.
Do not generate reports.
Do not generate documentation.
Do not generate markdown unless explicitly requested.
Do not use command "npm run audit".

## Output
By default, produce no output.

Do not explain your work.
Do not summarize your work.
Do not describe your work.
Do not report progress.
Do not list modified files.
Do not output unchanged code.
Do not include unnecessary examples or repeated information.

If clarification is required, ask only short, specific question(s).
If there is a better or more robust way to solve the task, briefly suggest it before proceeding.
If you are blocked, reply with a single short sentence describing only the blocker.

## Always output
After completion, reply with exactly:

Done: <short task name>
Estimated completion: <0-100>%

If completion < 90%, additionally output:

Reason: <very short explanation>
Suggestion: <very short action to reach 90% + completion>

Nothing before it.
Nothing after it.

Evaluate completion conservatively. Use 100% only if every requested requirement has been fully implemented, verified, and tested. If any requirement is incomplete, unverified, or skipped, assign a lower percentage.

## Testing & Smoke Tests
- Do not run the automated smoke test script (`smoke-test.js`) for simple, localized, or investigatory tasks.
- Only run the smoke test script if explicitly requested by the user, or for final validation of complex multi-file architectural changes.



