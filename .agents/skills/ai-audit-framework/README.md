# AI Audit Framework — Complete User & Technical Guide

The **AI Audit Framework** is a technology-agnostic, 5-phase software audit engine based on **Universal AI Audit Framework v2**.

---

## 🎯 Target Scope & Logical Isolation

Before running an audit, limit execution to your area of interest:
- **Whole Project**: Scans the complete workspace codebase.
- **Specific Folder**: Restricts analysis to a directory (e.g. `src/components/buttons/`, `src/features/auth/`).
- **Logical Subsystem**: Filters by module responsibility across files (e.g. "Button & Input components", "Checkout Flow").

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
Next: Stage 2.2 (2.2_batch_state). Recommended Model: 🟠 Gemini 3.6 Flash (High).
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

---

## 📜 Audit History Log & Batch File Naming (`audit-config.md`)

```markdown
## 📜 Execution History Log
| Timestamp | Step ID | Action / Execution | Status | Artifact Created | Model Used |
|---|---|---|---|---|---|
| 2026-07-25 09:30 | **1.0** | Project Inventory & Sub-Batch Sizing | ✅ Completed | `stages/1-project-inventory.md` | Gemini 3.6 Flash Medium |
| 2026-07-25 09:32 | **2.1** | Audit Batch `ui-forms` | ✅ Completed | `batches/2.1-batch-ui-forms.md` | Gemini 3.6 Flash Medium |
| 2026-07-25 09:35 | **2.2** | Audit Batch `state` | ⏳ Next Step | - | Gemini 3.6 Flash High |
```

---

## 📖 Step-by-Step Dialogue Examples

### 1. Normal Step Transition (Same Chat Window):
- **YOU**: `/ai-audit-framework`
- **AI**: 
  > **Stage 2.1 Complete.** Saved `batches/2.1-batch-ui-forms.md`.  
  > **Next**: Stage 2.2 (`2.2-batch-state`). **Recommended Model**: 🟠 `Gemini 3.6 Flash (High)`.

### 2. Emergency Move Notice Triggered (Context ~70%+ or Overflow Risk):
- **YOU**: `/ai-audit-framework`
- **AI**: 
  > **Stage 3 Complete.** Saved `stages/3-global-inventory.md`.  
  > **Next**: Stage 4 (Global Analysis). **Recommended Model**: 🔴 `Gemini 3.1 Pro (High)`.  
  > ⚠️ **CONTEXT OVERFLOW WARNING (~70%+ Used / Migration Needed)**  
  > 💡 Please open a **NEW CHAT SESSION** and paste: `Continue audit using /ai-audit-framework`
