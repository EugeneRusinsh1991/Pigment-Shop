You are performing a sequential cleanup of small, redundant, and pass-through files.

Your objective is to reduce unnecessary file fragmentation while preserving behavior exactly.

**General rules**
- Process ONLY ONE candidate file at a time.
- Never refactor multiple candidate files in parallel.
- Do not even start analyzing the next candidate until the current file has been completely eliminated or explicitly determined that it should remain.
- Finish one file completely before moving to the next.

**For every candidate**
**Step 1 — Analyze**
- Determine whether the file is actually unnecessary.
- Check:
  - number of imports
  - number of exports
  - number of consumers
  - whether it is only a wrapper, helper, tiny hook, tiny component, barrel, or pass-through file
  - whether merging it would reduce complexity without reducing readability.

**Step 2 — Decide**
If the file should remain independent, explain why and stop processing that file.
Otherwise continue.

**Step 3 — Find the best destination**
Move the code into the most appropriate existing file.
Prefer:
- the only consumer
- the parent component
- the feature entry file
- the component that exclusively owns the logic

Do NOT create new helper files.

**Step 4 — Merge**
- Move the implementation.
- Update imports.
- Remove unnecessary exports.
- Delete the old file if it becomes unused.

**Step 5 — Verify**
Ensure:
- no broken imports
- no duplicate logic
- no behavior changes

Only after the current file has been completely removed (or intentionally kept) may you continue to the next candidate.

**Optimization rules**
- Preserve behavior exactly.
- Do not rewrite unrelated code.
- Do not perform architecture changes.
- Do not rename unrelated symbols.
- Do not introduce abstractions unless required by the merge.
- Prefer fewer files over tiny isolated files.
- Avoid creating new helper files to replace old helper files.
- Keep changes as localized as possible.

**Then proceed to the next candidate**
Never batch multiple files into a single refactoring step.
The entire cleanup is complete only after every candidate has been processed sequentially in this manner.