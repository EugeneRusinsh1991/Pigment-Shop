# User Guide: How to Work with the AI Auditor
*(Read this if it's your first time doing an audit!)*

## Your Step-By-Step Guide
Since you will start each step in a **new chat window**, the AI won't remember the past. You must always provide the context file (`audit_ai_context.md`) and the reports from previous steps.

**Step 1: Start Stage 1.1**
- **You open a NEW chat and say:** *"Read @[audit_ai_context.md]. Start Stage 1.1: Analyze the `browser-automation` folder to understand its internal structure."*
- **AI will:** Create an inventory report for the `browser-automation` module.

**Step 2: Start Stage 1.2**
- **You open a NEW chat and say:** *"Read @[audit_ai_context.md] and the Step 1.1 report. Start Stage 1.2: Search the rest of the project to see exactly where and how it uses `browser-automation`."*
- **AI will:** Create an inventory report for the main app's usage.

**Step 3: Start Stage 2**
- **You open a NEW chat and say:** *"Read @[audit_ai_context.md] and all Stage 1 reports. Start Stage 2: Perform the detailed audit of the code in batches without changing anything."*
- **AI will:** Create detailed batch audit reports.

**Step 4: Start Stages 3 & 4 (Global Analysis)**
- **You open a NEW chat and say:** *"Read @[audit_ai_context.md] and all Stage 2 batch reports. Start Global Analysis: Merge the findings and create a final architectural report."*
- **AI will:** Create the global architectural report.

**Step 5: Start Stage 5 (Roadmap)**
- **You open a NEW chat and say:** *"Read @[audit_ai_context.md] and the Global Analysis report. Create the Roadmap: Give me a step-by-step plan of how we will rewrite the code."*
- **AI will:** Provide the final roadmap. Once approved, you can start coding!

## Best Suggestions for a Great Audit
1. **Always Link the Context**: The AI forgets everything in a new window. You must explicitly tag the `.md` context files in your prompt (e.g. typing `@[filename]`).
2. **Don't rush to change code**: Let me finish all 5 stages before we write new code.
3. **Keep it focused**: Let's only focus on `browser-automation` for now.
4. **Be honest**: If you don't know something, just say "I don't know, please figure it out."
