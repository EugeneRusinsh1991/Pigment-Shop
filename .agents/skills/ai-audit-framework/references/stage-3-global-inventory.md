# Stage 3 — Audit Consolidation & Indexing

## Purpose & Scope
Consolidate all Stage 2 batch audit reports (`batches/*.md`) into `.docs/ai-audit-framework/stages/3-global-inventory.md`.

---

## Modular Storage Rule (No Monoliths)

1. **NEVER merge all batch content into a single monolith file**.
2. **Keep Batches Isolated**: Every `<step_id>-batch-<name>.md` remains an independent document in `.docs/ai-audit-framework/batches/`.
3. **Cross-Batch Dependencies**: If a batch finding depends on or affects another batch, explicitly record it in the batch document under `## Dependencies & Interactions`.
4. **Index Only Output (`.docs/ai-audit-framework/stages/3-global-inventory.md`)**:
   - `3-global-inventory.md` serves ONLY as an index of links pointing to individual batch files with brief 1-line metadata summaries.

---

## Output Template (`.docs/ai-audit-framework/stages/3-global-inventory.md` Index)

```markdown
# Stage 3 — Global Inventory Index

## Isolated Batch Registry
- 📄 **[2.1-batch-ui.md](file:///path/to/.docs/ai-audit-framework/batches/2.1-batch-ui.md)** (3 findings | Dependencies: None)
- 📄 **[2.2-batch-state.md](file:///path/to/.docs/ai-audit-framework/batches/2.2-batch-state.md)** (2 findings | Dependencies: `2.1-batch-ui.md`)
- 📄 **[2.3-batch-api.md](file:///path/to/.docs/ai-audit-framework/batches/2.3-batch-api.md)** (4 findings | Dependencies: `2.2-batch-state.md`)
```

---

## Exit Criteria
- Individual batch files preserved separately under `.docs/ai-audit-framework/batches/`.
- `.docs/ai-audit-framework/stages/3-global-inventory.md` generated as an index-only document.
