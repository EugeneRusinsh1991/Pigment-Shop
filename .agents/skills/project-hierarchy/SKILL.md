---
name: project-hierarchy
description: create and maintain project hierarchy and architectural knowledge
---


Create and maintain a safe project navigation hierarchy and architectural knowledge map for AI agents.

The skill documents the project hierarchy and architectural knowledge. It must never modify the project itself.

------------------------------------------------------------------------

# Mandatory Safety Policy

This skill is READ ONLY. Executing this skill proceeds directly without prompting for backups.

- Never delete project files.
- Never rename project files.
- Never move project files.
- Never modify source code.
- Never modify project configuration.
- Never modify dependencies.
- Never execute refactoring.
- Never execute cleanup operations.
- Never execute destructive operations.
- Never overwrite project files.

This skill is READ ONLY.

Its only allowed output is Project Hierarchy and Knowledge documentation inside:

`.docs/project-hierarchy/`
`.docs/project-knowledge/`

No other project files or directories may be modified.

If any action could modify the project outside the documentation directory:

STOP.

Report the reason.

Do not perform the action.

# Navigation

Primary entry point:

`.docs/project-hierarchy/project-hierarchy.md`

Rules:

1.  If `.docs/project-hierarchy/project-hierarchy.md` exists, read it
    first.
2.  Use it to locate relevant documentation, domain architecture, and Debug/Automation tools (e.g. `browser-automation`, test suites, standalone debug scripts).
3.  Read only the documentation and implementation required for the
    current task.
4.  Never recursively browse the repository.
5.  Never reread files already understood in the current context.
6.  Stop searching as soon as enough information has been collected.
7.  Perform a repository-wide scan only when the hierarchy is missing,
    outdated, or the user explicitly requests a full rebuild.

------------------------------------------------------------------------

# Initial Build

If the hierarchy does not exist:

1.  Scan the repository.
2.  Detect the project architecture.
3.  Identify logical domains.
4.  Create the hierarchy documentation.
5.  Create `.docs/project-hierarchy/project-hierarchy.md`.
6.  Use it as the authoritative entry point for all future executions.

------------------------------------------------------------------------

# Responsibilities

The skill MAY:

-   Read folders.
-   Read files.
-   Read existing hierarchy documents.
-   Generate Markdown documentation.
-   Update hierarchy documentation.
-   Maintain a lightweight project index.

The skill MUST NOT modify the project.

------------------------------------------------------------------------

# Forbidden Operations

Never:

-   Delete project files.
-   Rename project files.
-   Move project files.
-   Modify source code.
-   Execute shell commands.
-   Execute npm, pnpm or yarn.
-   Execute git.
-   Install packages.
-   Remove packages.
-   Run refactoring tools.
-   Format code automatically.

The project source tree is READ ONLY.

------------------------------------------------------------------------

# Writable Area

The skill may write only inside:

`.docs/project-hierarchy/`
`.docs/project-knowledge/`

Optional cache:

`.ai/project-hierarchy/`
`.ai/project-knowledge/`

No other directory may ever be modified.

------------------------------------------------------------------------

# Hierarchy Strategy

Prioritize multi-dimensional navigation maps:

1. **Route-based Navigation (`route-hierarchy.md`)**: Map all `app/` routes directly to their consumed UI components, state contexts, custom hooks, and service layers.
2. **Flow-based Pipelines (`flow-hierarchy.md`)**: Trace complete end-to-end data flows (User Action -> UI -> Hook -> Service -> DB Repository) for key business scenarios.
3. **Domain & Feature Hierarchy**: Business domain boundaries, architecture layers, and physical folder structures.
4. **Debug & Automation Tooling**: `.tools/`, Playwright test suites, and audit frameworks.

Knowledge hierarchy is primary. Physical hierarchy is navigation only.

------------------------------------------------------------------------

# Update Strategy

Default mode:

-   Read existing hierarchy.
-   Detect changes.
-   Update only affected documents.
-   Preserve unchanged documentation.

Never regenerate everything unless a full rebuild is required.

------------------------------------------------------------------------

# Token Optimization

Always:

-   Reuse existing hierarchy.
-   Reuse project index.
-   Read only required documents.
-   Avoid full rescans.
-   Avoid duplicate reads.

------------------------------------------------------------------------

# Ignore

Do not document:

-   node_modules
-   .git
-   dist
-   build
-   coverage
-   .cache
-   tmp
-   logs
-   generated files

------------------------------------------------------------------------

# Validation

Before finishing:

-   No duplicate domains.
-   No orphan documents.
-   No broken links.
-   No oversized documents (keep each file under 300 lines).
-   Concise descriptions.
-   Stable document structure.

------------------------------------------------------------------------

# Success Criteria

The hierarchy must allow an AI agent to:

-   Understand the project quickly.
-   Navigate efficiently.
-   Minimize token usage.
-   Update documentation incrementally.
-   Never modify the project.
-   Preserve project integrity at all times.
