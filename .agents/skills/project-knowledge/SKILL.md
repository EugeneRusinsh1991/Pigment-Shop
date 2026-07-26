---
name: project-knowledge
description: create and maintain project knowledge
---

Create and maintain an AI engineering knowledge base for the project.

The skill documents how the project works.
It must never modify the project itself.

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

Its only allowed output is Project Knowledge documentation inside:

`.docs/project-knowledge/`

No other project files or directories may be modified.

If any action could modify the project outside the documentation directory:

STOP.

Report the reason.

Do not perform the action.

------------------------------------------------------------------------

# Navigation

Primary entry point:

`.docs/project-knowledge/project-knowledge.md`

Rules:

1. If `.docs/project-hierarchy/project-hierarchy.md` exists, read it first.
2. Use Project Hierarchy as the navigation layer.
3. Read only the documentation and source code required to understand the current architectural area.
4. Never recursively browse the repository.
5. Never reread files already understood.
6. Stop searching as soon as enough knowledge has been collected.
7. Perform a repository-wide scan only when Project Hierarchy is missing or the user explicitly requests a full rebuild.

------------------------------------------------------------------------

# Initial Build

If Project Knowledge does not exist:

1. Read Project Hierarchy.
2. Identify the major architectural systems.
3. Document how they work.
4. Create `.docs/project-knowledge/project-knowledge.md`.
5. Generate additional knowledge documents only when they improve understanding.

------------------------------------------------------------------------

# Responsibilities

The skill MAY:

- Read folders.
- Read files.
- Read Project Hierarchy.
- Read existing Project Knowledge.
- Generate Markdown documentation.
- Update knowledge documentation.
- Maintain an engineering knowledge base.

The skill MUST NOT modify the project.

------------------------------------------------------------------------

# Writable Area

The skill may write only inside:

`.docs/project-knowledge/`

Optional cache:

`.ai/project-knowledge/`

No other directory may ever be modified.

------------------------------------------------------------------------

# Knowledge Strategy

Document architectural knowledge instead of physical structure.

Prioritize:

1. System architecture
2. Responsibilities
3. Execution pipelines
4. Browser Automation
5. Navigation strategy
6. Decision flow
7. State machines
8. Data flow
9. Integration points
10. Known limitations

Explain:

- What the subsystem does.
- Why it exists.
- How it interacts with other subsystems.
- What assumptions it makes.
- Known weaknesses.
- Recommended future improvements.

Avoid documenting implementation details unless they are necessary for understanding the architecture.

------------------------------------------------------------------------

# AI Context

Every major subsystem should include:

- Purpose
- Current state
- Known issues
- Remaining work
- Important assumptions
- Recommended next step

This section is written specifically for future AI assistants.

------------------------------------------------------------------------

# Relationship With Project Hierarchy

Project Hierarchy is the navigation layer.

Project Knowledge is the understanding layer.

Do not duplicate hierarchy documentation.

Reference Project Hierarchy whenever appropriate.

------------------------------------------------------------------------

# Update Strategy

Default mode:

- Read existing Project Knowledge.
- Detect architectural changes.
- Update only affected documents.
- Preserve unchanged documentation.
- Never regenerate everything unless a full rebuild is required.

------------------------------------------------------------------------

# Token Optimization

Always:

- Reuse existing Project Hierarchy.
- Reuse existing Project Knowledge.
- Read only the required files.
- Avoid full repository scans.
- Avoid duplicate reads.
- Stop searching once sufficient understanding has been reached.

------------------------------------------------------------------------

# Ignore

Do not document:

- node_modules
- .git
- dist
- build
- coverage
- .cache
- tmp
- logs
- generated files
- third-party libraries

Focus on the project's own architecture.

------------------------------------------------------------------------

# Validation

Before finishing:

- No duplicate knowledge.
- No duplicated architectural descriptions.
- No oversized documents (keep each file under 300 lines).
- Clear responsibilities.
- Stable document structure.
- Consistent terminology.
- References to Project Hierarchy remain valid.

------------------------------------------------------------------------

# Success Criteria

The generated knowledge must allow an AI agent to:

- Understand the project architecture quickly.
- Understand subsystem responsibilities.
- Understand execution flow.
- Understand Browser Automation.
- Understand navigation and decision making.
- Understand important architectural decisions.
- Understand current project state.
- Continue development without reading the entire repository.
- Minimize future token usage.