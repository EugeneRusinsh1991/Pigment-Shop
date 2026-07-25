# Stage 1 — Project Inventory & Model Routing

## Purpose & Scope
Execute Stage 1 of Universal AI Audit Framework v2. Map repository layout, tech stack, and logical boundaries.
Stage 1 initializes the audit environment and MUST produce TWO files in `.docs/ai-audit-framework/`: `audit-config.md` AND `stages/1-project-inventory.md`.

---

## Responsibilities
1. Initialize target directory `.docs/ai-audit-framework/`.
2. Strictly filter project inventory by the selected **Target Scope**. Ignore all files outside this scope during batch generation.
3. **CRITICAL BATCHING RULE FOR UI**: For UI audits, NEVER split batches by folder boundaries (e.g. `src/components/Admin` vs `src/components/Storefront`). Batches MUST be grouped globally across ALL directories by visual primitive category (e.g. Batch 1: All Buttons & Clickables across whole project, Batch 2: All Search & Inputs across whole project, Batch 3: All Modals & Drawers across whole project).
4. Create `.docs/ai-audit-framework/audit-config.md` with metadata, status tracking, audit execution log, New Chat handover prompts, and Recommended Model Tiers (+20% exhaustive safety buffer).
5. Create `.docs/ai-audit-framework/stages/1-project-inventory.md` containing scope overview, tech stack, and sub-batch definitions.

---

## Output Template 1 (`.docs/ai-audit-framework/audit-config.md`)

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
- **Recommended Next Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Recommended Chat Session**: 🆕 **Start New Chat Session** *(Prevents Context Window Bloat)*

## 💬 New Chat Session Handover Prompt
Copy & paste this exact line into a **NEW CHAT SESSION** to resume flawlessly:
> `Continue audit using /ai-audit-framework from .docs/ai-audit-framework/audit-config.md`

## 📜 Execution History Log
| Timestamp | Step ID | Action / Execution | Status | Artifact Created | Model Used |
|---|---|---|---|---|---|
| 2026-07-25 09:30 | **1.0** | Project Inventory & Sub-Batch Sizing | ✅ Completed | `project-inventory.md` | Gemini 3.6 Flash Medium |
| 2026-07-25 09:32 | **2.1** | Audit Batch `ui-forms` | ✅ Completed | `batches/2.1_batch_ui-forms.md` | Gemini 3.6 Flash Medium |
| 2026-07-25 09:35 | **2.2** | Audit Batch `state` | ⏳ Next Step | - | Gemini 3.6 Flash High |

## 📊 Batches & Stage Execution Plan
| Step ID | Batch / Stage Name | Scope Path | Est. Complexity | Recommended Model Tier | Status |
|---|---|---|---|---|---|
| 2.1 | `ui-forms` | `src/features/checkout/components/forms/*` | 2 / 5 | 🟢 **Gemini 3.6 Flash (Medium)** | ✅ Done (`2.1_batch_ui-forms.md`) |
| 2.2 | `state` | `src/features/checkout/store/*` | 4 / 5 | 🟠 **Gemini 3.6 Flash (High)** | ⏳ Next |
| 3.0 | Global Consolidation | All `batches/*.md` | 2 / 5 | 🟢 **Gemini 3.6 Flash (Medium)** | 🛑 Pending |
| 4.0 | Global Analysis | Consolidated Findings | 5 / 5 | 🔴 **Gemini 3.1 Pro (High)** | 🛑 Pending |
| 5.0 | Task Generation | Analysis Findings | 3 / 5 | 🟠 **Gemini 3.6 Flash (High)** | 🛑 Pending |
```

---

## Exit Criteria
Stage 1 is complete ONLY when BOTH `audit-config.md` AND `project-inventory.md` exist in `.docs/ai-audit-framework/`.
