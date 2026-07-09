Refactoring Rules

Continuously refactor while implementing features. Do not leave large files or large methods behind.

Requirements

- Keep every change as small and localized as possible.
- Prefer readability, maintainability, and separation of responsibilities.
- Refactor continuously, not only after the feature is finished.
- If implementing a feature causes a file or method to become too large, immediately split it.

File Guidelines

- Target file size: under 180 lines.
- If a file grows beyond ~1800 lines, split related functionality into additional files.
- Organize code into logical modules instead of accumulating unrelated logic.
- Create new folders when it improves project structure.

Method Guidelines

- Target method size: under 50 lines.
- Each method should perform one clear responsibility.
- Extract reusable or independent logic into private/helper methods.
- Avoid deeply nested conditionals by extracting them into separate functions.

Architecture

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

Refactoring Policy

- Every newly created file must also follow these rules.
- If splitting creates another oversized file or method, continue refactoring recursively until all resulting files and methods satisfy these guidelines.
- Never stop refactoring simply because code was moved into a new file.
- Avoid duplicate code.
- Extract common logic into shared utilities when appropriate.
- Preserve existing behavior during refactoring.

Do Not

- Do not increase complexity solely to satisfy these limits.
- Do not split tightly coupled logic without a readability benefit.
- Do not introduce unnecessary abstractions.
- Do not change functionality unless explicitly requested.

Goal

The final codebase should consist of small, focused, easy-to-read files and methods with clear responsibilities. No oversized files or methods should remain after implementation.