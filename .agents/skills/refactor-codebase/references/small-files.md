# Small Files

## Mission

Safely reduce unnecessary file fragmentation while preserving existing behavior.

The objective is to improve maintainability by merging files that do not represent an independent architectural responsibility.

Preserve modularity over reducing file count.

Prefer incremental improvements over aggressive consolidation.

---

# Scope

Only process files listed in:

small-files.md

Never process files outside this report.

---

# Execution Limits

- Process sequentially ONE file at a time.
- Upon completing and verifying a file refactor, immediately proceed to the next file without stopping.
- Repeat sequentially until reaching the maximum limit of 10 files per execution session.
- Maximum attempts per file: 1.
- Never process multiple unrelated files simultaneously in a single code edit.

---

# Priority Order

Always follow this priority:

1. Preserve correctness.
2. Preserve existing behavior.
3. Preserve public APIs.
4. Preserve architectural boundaries.
5. Reduce unnecessary fragmentation.

Never violate a higher priority to satisfy a lower one.

---

# Decision Gate

Before making any changes determine:

- Why is this file considered too small?
- Does it represent an independent responsibility?
- Was it intentionally extracted?
- Would merging improve maintainability?
- Would the resulting file remain cohesive?

If the answer to any question is No:

- do not modify the file;
- continue with the next file.

---

# Local Context

Read additional project files only if required to:

- preserve behavior;
- understand dependencies;
- safely merge the file.

Otherwise work only with the current file.

---

# One Goal Per Pass

Choose exactly ONE unnecessary small file.

Never merge multiple independent responsibilities during the same pass.

---

# Refactoring Rules

Prefer:

- Inline trivial wrapper
- Merge tiny helper
- Merge tiny utility
- Merge tiny constant file
- Merge tiny type file
- Merge tiny configuration file

Only merge files whose responsibility naturally belongs to the destination.

The resulting file should become more cohesive, not larger.

---

# Never

Never:

- merge Components;
- merge Custom Hooks;
- merge Services;
- merge Contexts;
- merge Providers;
- merge Feature Modules;
- merge unrelated responsibilities;
- merge files solely because they are small;
- increase coupling to reduce file count;
- create Large Files.

Small size alone is never a sufficient reason to merge.

---

# Verification Workflow

After every refactoring pass:

1. Save changes.
2. Run the Small Files audit.
3. Check whether the current file still exists in the report.

The audit report is the only source of truth.

Never assume success.

---

# Retry Workflow

Maximum attempts:

1

If the file still exists:

- stop working on it;
- continue with the next file.

Never retry.

---

# Early Exit

Stop immediately if merging would require:

- architectural redesign;
- changing public APIs;
- increasing coupling;
- violating module boundaries;
- creating mixed responsibilities.

Continue with the next file.

---

# Failure Policy

If the file still exists after verification:

- never revisit it during the current execution;
- continue with the next file.

---

# Progress Policy

Progress is more important than reducing file count.

A small file may remain small if it represents one clear responsibility.

Never sacrifice architecture for cosmetic metrics.

---

# Stop Conditions

Stop immediately when:

- 20 files have been processed;
- the Small Files report contains no remaining files;
- the dispatcher terminates execution.

---

# Success Criteria

A successful refactoring:

- preserves correctness;
- preserves existing behavior;
- preserves public APIs whenever possible;
- preserves architectural boundaries;
- removes unnecessary fragmentation;
- improves maintainability;
- removes the file from the Small Files report whenever possible;
- introduces no new architectural problems.