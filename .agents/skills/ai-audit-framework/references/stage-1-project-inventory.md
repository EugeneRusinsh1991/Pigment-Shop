# Stage 1 — Project Inventory & Model Routing

## Purpose & Scope
Execute Stage 1 of Universal AI Audit Framework v2. Map repository layout, tech stack, and logical boundaries.
Stage 1 initializes the audit environment and MUST produce TWO files in `.todos/ai-audit-framework/`: `audit-config.md` AND `stages/1-project-inventory.md`.

---

## Responsibilities
1. Initialize target directory `.todos/ai-audit-framework/`.
2. Strictly filter project inventory by the selected **Target Scope**. Ignore all files outside this scope during batch generation.
3. **CRITICAL BATCHING RULE FOR UI**: For UI audits, NEVER split batches by folder boundaries (e.g. `src/components/Admin` vs `src/components/Storefront`). Batches MUST be grouped globally across ALL directories by visual primitive category (e.g. Batch 1: All Buttons & Clickables across whole project, Batch 2: All Search & Inputs across whole project, Batch 3: All Modals & Drawers across whole project).
4. Create `.todos/ai-audit-framework/audit-config.md` with metadata, status tracking, audit execution log, New Chat handover prompts, and Model Recommender ratings.
5. Create `.todos/ai-audit-framework/stages/1-project-inventory.md` containing scope overview, tech stack, and sub-batch definitions.

---

## Output Template 1 (`.todos/ai-audit-framework/audit-config.md`)

```markdown
# Audit Configuration, History Log & Progress State

## 📍 Session Metadata
- **Target Scope**: `src/features/checkout/`
- **Profile**: Performance & Bundle Size
- **Started At**: 2026-07-25 09:30

## 🚦 Current Audit Status
- **Active Phase**: Stage 2 (Batch Audit)
- **Completed Steps**: Stage 1, Stage 2.1
- **Next Immediate Step**: Stage 2.2 (`2.2_batch_state`)
- **Recommended Next Model**: `◕ FH — 2d 5f +10r — S8`
- **Recommended Chat Session**: 🆕 **Start New Chat Session** *(Prevents Context Window Bloat)*

## �💬 New Chat Session Handover Prompt
Copy & paste this exact line into a **NEW CHAT SESSION** to resume flawlessly:
> `Continue audit using /ai-audit-framework from .todos/ai-audit-framework/audit-config.md`

## 📜 Execution History Log
| Timestamp | Step ID | Action / Execution | Status | Artifact Created | Model Rating (/model-recommender) |
|---|---|---|---|---|---|
| 2026-07-25 09:30 | **1.0** | Project Inventory & Sub-Batch Sizing | ✅ Completed | `project-inventory.md` | 🟢 FM — 1d 3f +1r — S3 |
| 2026-07-25 09:32 | **2.1** | Audit Batch `ui-forms` | ✅ Completed | `batches/2.1_batch_ui-forms.md` | 🟢 FM — 1d 4f +2r — S4 |
| 2026-07-25 09:35 | **2.2** | Audit Batch `state` | ⏳ Next Step | - | ◕ FH — 2d 5f +10r — S8 |

## 📊 Batches & Stage Execution Plan
| Step ID | Batch / Stage Name | Scope Path | Recommended Model Rating (/model-recommender) | Status |
|---|---|---|---|---|
| 2.1 | `ui-forms` | `src/features/checkout/components/forms/*` | 🟢 FM — 1d 4f +2r — S4 | ✅ Done (`2.1_batch_ui-forms.md`) |
| 2.2 | `state` | `src/features/checkout/store/*` | ◕ FH — 2d 5f +10r — S8 | ⏳ Next |
| 3.1 | Global Consolidation - Pass 1 (Basic) | All `batches/*.md` | 🟢 FM — 1d 3f +1r — S3 | 🛑 Pending |
| 3.2 | Global Consolidation - Pass 2 (Cross-Batch) | Pass 1 Output | 🟢 FM — 1d 3f +1r — S3 | 🛑 Pending |
| 3.3 | Global Consolidation - Pass 3 (Business Impact) | Pass 1 & 2 Output | 🟢 FM — 1d 3f +1r — S3 | 🛑 Pending |
| 4.0 | Global Analysis | Consolidated Findings | ★ PH — 15d 73f +16r — S92 | 🛑 Pending |
| 5.0 | Task Generation | Analysis Findings | ◕ FH — 4d 10f +4r — S12 | 🛑 Pending |
```

---

## Exit Criteria
Stage 1 is complete ONLY when BOTH `audit-config.md` AND `project-inventory.md` exist in `.todos/ai-audit-framework/`.
