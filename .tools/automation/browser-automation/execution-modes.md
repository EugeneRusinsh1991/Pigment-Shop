# Browser Automation Execution Modes

Browser Automation now supports distinct execution modes, tailored to different development workflows. The execution mode can be specified in the `ExplorerConfig` under the `executionMode` property.

## Everyday Development (`everyday-development`)

### Purpose
Optimized for fast, iterative development cycles. This is the default execution mode.

### Workflow
When working on regular features, fixes, or UI changes, developers need immediate feedback without being overwhelmed by excessive logging or waiting for heavy analytical pipelines to finish.

### Outputs
Produces **only concise, high-value execution artifacts** that help a developer quickly understand:
- Exploration progress
- Important navigation events
- Key exploration milestones
- Execution timings
- Current outcome
- Current blocker, if one exists

Artifacts in this mode are intentionally compact, typically bypassing massive payload generations (such as generating full relationship graphs or heavy markdown documentation) in favor of simple smoke reports that answer: *"Did it work? If not, what broke?"*

---

## Deep Diagnostics (`deep-diagnostics`)

### Purpose
Optimized for deep architectural investigation, system analysis, and troubleshooting complex, non-obvious issues.

### Workflow
When fixing obscure bugs, analyzing the complete dependency tree of interactions, or understanding how complex components interact over time, developers need absolute visibility. 

### Outputs
Preserves **complete execution details and all diagnostic information** required for deep architectural analysis. 
This includes:
- Firing up the Knowledge Pipeline
- Executing extensive Analyzers (like RelationshipAnalyzer and CapabilityAnalyzer)
- Writing exhaustive `.json` and `.md` artifacts (`application-knowledge-graph.json` and `application-documentation.md`)

This mode trades speed and brevity for comprehensive depth, capturing every possible data point for offline or post-run analysis.
