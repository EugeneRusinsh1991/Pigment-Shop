# AI Audit Framework NEW — Complete User & Technical Guide

The **AI Audit Framework NEW** is the enhanced multi-pass version of the technology-agnostic, 5-phase software audit engine based on **Universal AI Audit Framework v2**.

**🚀 NEW in this version**: Stages 3, 4, and 5 are now split into 3 passes each for deeper analysis and better problem detection. Single-pass execution was found to miss critical issues due to context overload.

---

## 🎯 Target Scope & Logical Isolation

Before running an audit, limit execution to your area of interest:
- **Whole Project**: Scans the complete workspace codebase.
- **Specific Folder**: Restricts analysis to a directory (e.g. `src/components/buttons/`, `src/features/auth/`).
- **Logical Subsystem**: Filters by module responsibility across files (e.g. "Button & Input components", "Checkout Flow").

---

## 🔄 Multi-Pass Architecture (NEW)

**Critical Improvement**: Stages 3, 4, and 5 are now split into 3 passes each to ensure deeper analysis and better problem detection. Single-pass execution was found to miss critical issues due to context overload.

### Stage 3: Global Consolidation (3 Passes)
- **3.1**: Pass 1 - Basic Consolidation (merge, group, deduplicate findings from all batches)
- **3.2**: Pass 2 - Cross-Batch Analysis (identify patterns, systemic issues across batches)
- **3.3**: Pass 3 - Business Impact Prioritization (P0-P3 classification, ROI, execution order)

### Stage 4: Global Analysis (3 Passes)
- **4.1**: Pass 1 - Pattern Detection & Classification (detect and classify patterns into Architectural, UX, Process, Technical types)
- **4.2**: Pass 2 - Systemic Issues & Root Cause Analysis (5 Whys methodology, dependency mapping, architectural impact assessment)
- **4.3**: Pass 3 - Strategic Recommendations & Roadmap (strategic recommendations, multi-phase roadmap, success metrics, risk assessment)

### Stage 5: Refactoring Roadmap (3 Passes)
- **5.1**: Pass 1 - Task Planning & High-Level Breakdown (transform strategic recommendations into task structure without file-level detail)
- **5.2**: Pass 2 - Task Specification - Phase 1 (create detailed task specs for P0 Critical tasks with 100% file coverage)
- **5.3**: Pass 3 - Task Specification - Phase 2&3 (create detailed task specs for P1 High and P2 Medium tasks with 100% file coverage)

**Benefits of Multi-Pass Architecture**:
- ✅ Deeper analysis with focused scope per pass
- ✅ Better problem detection (no missed issues due to context overload)
- ✅ Clearer separation of concerns (consolidation → analysis → specification)
- ✅ More accurate model recommendations per specific task complexity
- ✅ Easier to resume and track progress through audit-config.md

---

## 🎯 Audit Profiles (`profiles/`)

Choose a profile based on what you want to audit and optimize in your project:

---

### 1. `ui` — UI & Design System Profile
**Focus**: Visual consistency, design tokens, button variants, radii, animations, and spacing.

* **Example 1: Hardcoded Button Styles**
  * ❌ *Before*: Multiple buttons across components have hardcoded colors (`#3b82f6`), varied radii (`6px`, `8px`, `10px`), and missing active state animations.
  * ✅ *After*: Unified `<Button variant="primary">` using design tokens (`var(--radius-md)`, `var(--color-primary)`), consistent hover/active scale micro-animations.

* **Example 2: Non-GPU Animated Layout Drops**
  * ❌ *Before*: Modals/dropdowns animate `top`/`height` causing layout reflows and stuttering.
  * ✅ *After*: Smooth GPU-accelerated CSS `transform: translateY()` transitions with unified easing curves.

---

### 2. `architecture` — Code Structure Profile
**Focus**: Layer isolation, file sizes, circular dependencies, and DRY violations.

* **Example 1: UI View Making Direct API Calls**
  * ❌ *Before*: A single React/Vue component file has 450 lines mixing UI layout with direct `fetch()` calls and data normalization.
  * ✅ *After*: UI logic extracted into reusable presentation components; data fetching moved to custom API service layer.

* **Example 2: Scattered Duplicate Utility Functions**
  * ❌ *Before*: Date formatting and string truncation logic duplicated across 5 different components.
  * ✅ *After*: Single helper utility extracted into `@/utils/formatters.ts`.

---

### 3. `performance` — Speed & Rendering Profile
**Focus**: Render bottlenecks, memory leaks, inline handlers, and main thread blocking.

* **Example 1: Inline Object Creation & Re-renders**
  * ❌ *Before*: Passing inline object literals and arrow functions to list item components triggers full re-renders of 100+ items on every keypress.
  * ✅ *After*: Callbacks wrapped in `useCallback`, style objects extracted or memoized with `useMemo`.

* **Example 2: Uncleaned Event Listeners / Timers**
  * ❌ *Before*: `window.addEventListener('resize')` created without cleanup on unmount, consuming memory over time.
  * ✅ *After*: Subscriptions properly cleaned up inside lifecycle/hook unmount handlers.

---

### 4. `security` — Security & Safety Profile
**Focus**: Credential leaks, XSS vectors, insecure storage, and input sanitization.

* **Example 1: Hardcoded API Secret Keys**
  * ❌ *Before*: Client-side API key or secret token hardcoded in source code.
  * ✅ *After*: Keys moved to environment variables (`.env.local`) and server-side proxy handlers.

* **Example 2: Unsanitized HTML Rendering**
  * ❌ *Before*: User comments rendered via `dangerouslySetInnerHTML` or raw unescaped HTML string insertions.
  * ✅ *After*: Inputs sanitized using HTML escaper/DOMPurify before rendering.

---

### 5. `state-management` — Application State Profile
**Focus**: State ownership, store pollution, immutable updates, and reactivity.

* **Example 1: Global Store Pollution with Modal Toggle**
  * ❌ *Before*: Global Zustand/Redux store tracking `isDropdownOpen` and `isModalOpen` for local components.
  * ✅ *After*: Local UI visibility managed in local component state (`useState`), keeping global store clean.

* **Example 2: Duplicate Derived State**
  * ❌ *Before*: Storing both `users` list and `activeUsers` list separately in state, requiring manual syncing on every edit.
  * ✅ *After*: `activeUsers` computed dynamically via selectors/memoized getters.

---

### 6. `accessibility` (a11y) — Accessibility Profile
**Focus**: ARIA roles, keyboard navigation, focus outlines, and semantic HTML.

* **Example 1: Clickable Div Without Keyboard/Screen Reader Support**
  * ❌ *Before*: `<div onClick={submit}>Submit</div>` impossible to activate via keyboard (Tab/Enter) or screen reader.
  * ✅ *After*: `<button type="button" onClick={submit}>Submit</button>` with native keyboard focus and click events.

* **Example 2: Stripped Focus Outline**
  * ❌ *Before*: `outline: none` CSS removing visual indication of focused elements for keyboard users.
  * ✅ *After*: Styled visual focus ring using `:focus-visible`.

---

### 7. `i18n` — Localization Profile
**Focus**: Hardcoded UI text, dynamic date/number formatting, and RTL support.

* **Example 1: Hardcoded Strings in Component Code**
  * ❌ *Before*: `<button>Save Changes</button>` hardcoded in English inside JSX/HTML.
  * ✅ *After*: `<button>{t('common.save_changes')}</button>` loaded from translation locale files.

* **Example 2: Directional CSS Margins Breaking RTL**
  * ❌ *Before*: `margin-left: 16px` breaking visual layout in Right-To-Left languages.
  * ✅ *After*: Logical CSS property `margin-inline-start: 16px` adapting automatically to reading direction.

---

### 8. `custom` — Custom User-Defined Profile
**Focus**: Any bespoke criteria specified by the user during launch (e.g. checking specific custom library conventions or migration rules).

---

## 🟢 Standard Workflow & Response Format (Same Chat Window)

During normal execution in the same chat window, the AI reports progress concisely with colored indicator badges and specifies the recommended model for the next step:

```text
Stage 2.1 Complete. Saved batches/2.1_batch_ui.md.
Next: Stage 2.2 (2.2_batch_state). Recommended Model: ◕ FH — 2d 5f +10r — S8.
```

**Multi-Pass Progress Example**:
```text
Stage 3.1 Complete. Saved stages/3.1-pass1-basic-consolidation.md.
Next: Stage 3.2 (3.2-pass2-cross-batch-analysis). Recommended Model: ◕ FH — 2d 5f +10r — S8.

Stage 3.2 Complete. Saved stages/3.2-pass2-cross-batch-analysis.md.
Next: Stage 3.3 (3.3-pass3-business-impact-prioritization). Recommended Model: ◐ FM — 1d 3f +1r — S3.

Stage 3.3 Complete. Saved stages/3.3-pass3-business-impact-prioritization.md.
Next: Stage 4.1 (4.1-pass1-pattern-detection). Recommended Model: ◕ FH — 2d 5f +10r — S8.
```

You simply switch your model if needed in the top dropdown of the **same chat** and type `/ai-audit-framework`.

---

## 🚨 Emergency Window Move Notice (ONLY for Context Overflow or Checkpoint)

The **New Chat Session Move Notice** is an **emergency block** that appears **ONLY** when you actually need to change chat windows due to token overflow:

1. Context usage reaches **~70% threshold**.
2. A context-clear / checkpoint event occurs.
3. The next upcoming task is estimated to **OVERFLOW** the remaining context.

### Emergency Notice Output Format (ONLY when triggered):
```text
⚠️ CONTEXT OVERFLOW WARNING / MIGRATION NEEDED (~70%+ Used or Checkpoint Cleared)
💡 Please open a NEW CHAT SESSION and paste:
   Continue audit using /ai-audit-framework
```

**Note**: With the multi-pass architecture, context overflow is less likely since each pass has a focused scope, but this emergency mechanism remains available for safety.

---

## 📜 Audit History Log & Batch File Naming (`audit-config.md`)

```markdown
## 📜 Execution History Log
| Timestamp | Step ID | Action / Execution | Status | Artifact Created | Model Rating (/model-recommender) |
|---|---|---|---|---|---|
| 2026-08-11 | **1.0** | Project Inventory & Sub-Batch Sizing | ✅ Completed | `stages/1-project-inventory.md` | 🟢 FM — 1d 2f +1r — S3 |
| 2026-08-11 | **2.1** | Button Batch Audit | ✅ Completed | `batches/2.1_batch_buttons.md` | 🟢 FM — 4d 8f +3r — S5 |
| 2026-08-11 | **2.2** | Input Batch Audit | ✅ Completed | `batches/2.2_batch_inputs.md` | 🟢 FM — 2d 5f +2r — S5 |
| 2026-08-11 | **3.1** | Global Consolidation - Pass 1 (Basic) | ✅ Completed | `stages/3.1-pass1-basic-consolidation.md` | 🟢 FM — 1d 3f +1r — S3 |
| 2026-08-11 | **3.2** | Global Consolidation - Pass 2 (Cross-Batch Analysis) | ✅ Completed | `stages/3.2-pass2-cross-batch-analysis.md` | 🟢 FM — 1d 3f +1r — S3 |
| 2026-08-11 | **3.3** | Global Consolidation - Pass 3 (Business Impact Prioritization) | ✅ Completed | `stages/3.3-pass3-business-impact-prioritization.md` | 🟢 FM — 1d 3f +1r — S3 |
| 2026-08-11 | **4.1** | Global Analysis - Pass 1 (Pattern Detection & Classification) | ✅ Completed | `stages/4.1-pass1-pattern-detection.md` | 🟢 FM — 1d 3f +1r — S3 |
| 2026-08-11 | **4.2** | Global Analysis - Pass 2 (Systemic Issues & Root Cause Analysis) | ✅ Completed | `stages/4.2-pass2-systemic-issues.md` | 🟢 FM — 1d 3f +1r — S3 |
| 2026-08-11 | **4.3** | Global Analysis - Pass 3 (Strategic Recommendations & Roadmap) | ✅ Completed | `stages/4.3-pass3-strategic-recommendations.md` | 🟢 FM — 1d 3f +1r — S3 |
| 2026-08-11 | **5.1** | Refactoring Roadmap - Pass 1 (Task Planning & High-Level Breakdown) | ✅ Completed | `stages/5.1-pass1-task-planning.md` | 🟢 FM — 1d 3f +1r — S3 |
| 2026-08-11 | **5.2** | Refactoring Roadmap - Pass 2 (Task Specification - Phase 1 Critical Tasks) | ✅ Completed | `stages/5.2-pass2-phase1-tasks.md` | 🟢 FM — 2d 5f +2r — S6 |
| 2026-08-11 | **5.3** | Refactoring Roadmap - Pass 3 (Task Specification - Phase 2 & 3 Tasks) | ✅ Completed | `stages/5.3-pass3-phase2-3-tasks.md` | 🟢 FM — 2d 5f +2r — S6 |
```

---

## 📖 Step-by-Step Dialogue Examples

### 1. Normal Step Transition (Same Chat Window):
- **YOU**: `/ai-audit-framework`
- **AI**: 
  > **Stage 2.1 Complete.** Saved `batches/2.1-batch-ui-forms.md`.  
  > **Next**: Stage 2.2 (`2.2-batch-state`). **Recommended Model**: `◕ FH — 2d 5f +10r — S8`.

### 2. Multi-Pass Progress Example (NEW):
|- **YOU**: `/ai-audit-framework`
|- **AI**:
  > **Stage 3.1 Complete.** Saved `stages/3.1-pass1-basic-consolidation.md`.
  > **Next**: Stage 3.2 (`3.2-pass2-cross-batch-analysis`). **Recommended Model**: `◕ FH — 2d 5f +10r — S8`.

|- **YOU**: `/ai-audit-framework`
|- **AI**:
  > **Stage 3.2 Complete.** Saved `stages/3.2-pass2-cross-batch-analysis.md`.
  > **Next**: Stage 3.3 (`3.3-pass3-business-impact-prioritization`). **Recommended Model**: `◐ FM — 1d 3f +1r — S3`.

|- **YOU**: `/ai-audit-framework`
|- **AI**:
  > **Stage 3.3 Complete.** Saved `stages/3.3-pass3-business-impact-prioritization.md`.
  > **Next**: Stage 4.1 (`4.1-pass1-pattern-detection`). **Recommended Model**: `◕ FH — 2d 5f +10r — S8`.

### 3. Emergency Move Notice Triggered (Context ~70%+ or Overflow Risk):
- **YOU**: `/ai-audit-framework`
- **AI**: 
  > **Stage 5.3 Complete.** Saved `stages/5.3-pass3-phase2-3-tasks.md`.
  > **Next**: EXECUTE TASKS - Begin Phase 1 task execution. **Recommended Model**: `◕ FH — 2d 5f +2r — S6`.  
  > ⚠️ **CONTEXT OVERFLOW WARNING (~70%+ Used / Migration Needed)**
  > 💡 Please open a **NEW CHAT SESSION** and paste: `Continue audit using /ai-audit-framework`

---

## 🆚 Old vs New Architecture Comparison

### Old Architecture (Single-Pass)
- **Stage 3**: Single pass for Global Consolidation (merge + cross-batch analysis + prioritization)
- **Stage 4**: Single pass for Global Analysis (pattern detection + systemic issues + strategic recommendations)
- **Stage 5**: Single pass for Refactoring Roadmap (task planning + specification)
- **Problem**: Too much scope per pass → AI misses critical issues due to context overload

### New Architecture (Multi-Pass)
- **Stage 3**: 3 passes (Basic Consolidation → Cross-Batch Analysis → Business Impact Prioritization)
- **Stage 4**: 3 passes (Pattern Detection → Systemic Issues → Strategic Recommendations)
- **Stage 5**: 3 passes (Task Planning → Phase 1 Task Spec → Phase 2&3 Task Spec)
- **Benefit**: Focused scope per pass → Better problem detection, deeper analysis, no missed issues

### Key Improvements
1. **Better Problem Detection**: Multi-pass approach found issues that single-pass missed
2. **Clearer Separation of Concerns**: Each pass has a specific, focused responsibility
3. **More Accurate Model Recommendations**: Model selection based on specific task complexity per pass
4. **Easier Progress Tracking**: audit-config.md tracks each pass separately
5. **Reduced Context Overflow Risk**: Focused scope per pass reduces token usage

### Migration from Old to New
If you have an audit started with the old architecture, you can:
1. Continue with the old flow (it still works)
2. Start fresh with the new multi-pass architecture for better results
3. The new architecture is backward compatible with existing audit-config.md files
