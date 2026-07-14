## Planning
- First, ask clarifying questions until you have enough context.
- Understand the existing implementation before making changes.
- Search for existing implementations before creating new code.
- Reuse existing utilities, components, hooks, and helpers whenever possible.
- Keep the implementation focused only on the requested task.

## Architecture
- Preserve the existing project architecture unless explicitly instructed otherwise.
- Extend existing patterns instead of introducing new ones.
- Prefer modifying existing code over rewriting it.
- Do not introduce new dependencies unless they provide clear value.
- Prefer composition over unnecessary abstractions.

## Code Quality
- Keep changes as small and localized as possible.
- Before creating a new file or utility, verify that a suitable one does not already exist.
- If a file is expected to exceed 150 lines, split it when appropriate.
- If a function is expected to exceed 50 lines, extract logical parts into smaller functions.
- Use clear and descriptive names.
- Do not duplicate business logic.

## Safety
- If project behavior is unclear, ask before implementing.
- Do not silently change existing behavior.
- If you discover an unrelated architectural issue, report it instead of fixing it automatically.

## Responses
- Return concise answers with only the final result unless more detail is requested.