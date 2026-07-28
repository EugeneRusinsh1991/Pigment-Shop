## Mission
Complete the user's request efficiently with minimal token waste, without sacrificing output completeness. 
- Do not perform unnecessary or duplicate file reads.
- When generating reports, tasks, or file lists, ALWAYS include 100% of affected files — completeness must never be compromised for brevity.


## 1. Context & Token Conservation (CRITICAL)
- **Silent Operations:** When running terminal commands (npm, scripts, etc.), Stop searching once sufficient confidence is reached.
- **No Broad Discovery:** Use `.docs/project-hierarchy/project-hierarchy.md` as the primary navigation source. Only inspect the filesystem when the hierarchy is incomplete or outdated.
Use `.docs/project-knowledge/project-knowledge.md` as the primary source of HOW the system works, rather than just where the code is located.

## 2. Code & Output Hygiene (Token Savers)
- **No Unrequested Formatting:** Do not format, lint, or clean up unrelated code. Modify ONLY the precise lines required for the task. Do not add inline comments explaining basic logic.
- **Terminal Truncation:** When running investigatory commands (e.g., test suites, git logs), ALWAYS pipe the output to limit its length (e.g., `| select -First 50` in PowerShell or `| head -n 50` in bash). Limit normal output to 100 lines. Preserve complete error output when diagnosing failures.

## 2.1. Code Creation
- **Avoid large files.** Keep files small and focused. Split files before they exceed ~200 lines or contain multiple responsibilities.
- **Avoid large methods.** Keep functions short and single-purpose. Extract helper methods instead of growing long, nested implementations.
- **Control complexity.** Avoid high cyclomatic complexity and high CRAP scores in both files and methods. Refactor early to keep code simple, readable, and maintainable.

## 3. Execution
- Do exactly what the user requested. No unrelated refactoring.
- Prioritize modifying existing code over creating new abstractions.
- Stop searching once sufficient confidence is reached.
- Do not execute test or verification commands unless explicitly requested.

## 4. Long-Term Token Conservation (Anti-Loop)
- **Error Anti-Loop:** If a test, build, or terminal command fails twice in a row, STOP immediately. Do not attempt to blind-fix or guess the solution. Output the error and wait for user guidance to prevent token-burning loops.
- **Knowledge Offloading:** If a complex architectural or environment issue is solved, ask the user if you should document the solution in `.docs/project-knowledge/` so future sessions don't have to relearn it from scratch.
- **Session Management:** If the current conversation becomes excessively long or diverges from the original goal, proactively recommend starting a new chat session to flush the context window.

## 5. Planning & Artifacts (CRITICAL OVERRIDE)
- DISABLE `task.md`, `walkthrough.md`, and any other markdown reports entirely.
- DO NOT generate documentation, summaries, architecture documents, or changelogs.
- ONLY create an `implementation_plan.md` (Planning Mode) if the task meets ONE of these criteria:
  1. It requires creating/modifying more than 3 files.
  2. It requires modifying more than 150 lines of code.
  3. The user explicitly writes "CREATE PLAN".
- For all other tasks, SKIP Planning Mode entirely. Do not ask for approval, just execute the code changes directly.

## 6. Output (STRICT BREVITY OVERRIDE)
- **Response limit: 1 short sentence (MAX 10 words) for complete operations**
- **Response limit: 3 short sentence (MAX 30 words) for NON complete operations**
- **If you believe a new chat would be beneficial, recommend moving to a new conversation.**
- Never summarize read files.
- Never explain completed work, summarize diffs, or show unchanged code.
- No conversational fluff. State only facts.
- If clarification is needed, STOP immediately and output ONLY:
  Reason: <very short reason>
  Question: <one short question>


  ## 7. Web & Tool Restrictions
- **No Web Search:** NEVER use `search_web`, `read_url`, or fetch external documentation unless the user explicitly requests it. Rely on your internal knowledge and local codebase first. 

- **Better Solutions:** If a significantly better or standard best-practice solution exists, do NOT write a long explanation. STOP and output ONLY: "Question: A better standard solution exists using [Technology/Pattern]. Should I use it instead?". 


