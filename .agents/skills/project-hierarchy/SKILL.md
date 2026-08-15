---
name: project-hierarchy
description: Create and maintain a 4-dimensional project hierarchy (Physical, Business Logic, State/Data Flow, Layered Architecture) and architectural knowledge.
---

Create and maintain a safe project navigation hierarchy and architectural knowledge map for AI agents across 4 core dimensions.

This skill documents the project hierarchy and architectural knowledge in `.docs/project-hierarchy/`. It must never modify the source code.

------------------------------------------------------------------------

# Execution Modes

When invoking this skill, determine the target mode:

1. **FULL REBUILD (Полная перестройка)**:
   - Scans the entire codebase.
   - Re-analyzes all 4 dimensions from scratch.
   - Overwrites the `.docs/project-hierarchy/` files (README.md, business-logic.md, state-data-flow.md, layered-architecture.md).

2. **INCREMENTAL UPDATE (Частичное обновление)**:
   - Reads existing `.docs/project-hierarchy/` files.
   - Inspects recent changes or targeted subdirectories.
   - Updates the specific `.docs/project-hierarchy/` file (e.g. `business-logic.md`) that relates to the change.

------------------------------------------------------------------------

# The 4 Core Dimensions (Multi-File Schema)

The project hierarchy documentation must be organized into a **multi-file structure** rooted in `.docs/project-hierarchy/` to optimize context window usage and prevent file bloat.

The documentation is split into the following files:

1. `README.md` (Physical File Tree & Active Structure)
   - MUST contain the core physical file tree and links to the other 3 files.
   - Maps file tree structure, key directories (`app/`, `src/`, `tools/`).
   - Categorizes files by extension and purpose.

2. `business-logic.md` (Business Logic & Domain Boundaries)
   - Maps domain entities, user workflows, store logic, and business rules.
   - Associates features with business goals and domain boundaries.

3. `state-data-flow.md` (State & Data Flow Cascades)
   - Traces end-to-end data flows (User Input -> Component -> Hook/State -> API/Service -> DB/Storage).
   - Maps state contexts, props cascades, and event handlers.

4. `layered-architecture.md` (Layered Architecture & Dependency Invariants)
   - Maps architectural layers (Presentation, Application, Domain, Infrastructure, Tooling).
   - Tracks cross-cutting concerns, dependency rules, and entry points.

------------------------------------------------------------------------

# Mandatory Safety Policy

This skill is READ ONLY for source code.

- Never delete or modify source code files.
- Never modify project configurations or dependencies.
- Output ONLY inside `.docs/project-hierarchy/` and `.docs/project-knowledge/`.

------------------------------------------------------------------------

# Navigation & Strategy

1. Always read `.docs/project-hierarchy/README.md` first.
2. Read the other files (`business-logic.md`, `state-data-flow.md`, `layered-architecture.md`) ONLY if you specifically need that information for the task.
3. Do not include `node_modules`, `.git`, `dist`, `build`, `.expo`, or cache dirs in hierarchy logs.
