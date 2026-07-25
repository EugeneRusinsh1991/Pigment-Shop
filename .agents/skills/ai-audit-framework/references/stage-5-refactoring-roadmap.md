# Stage 5 — Refactoring Roadmap & Modular Task Specs

## Purpose & Scope
Transform Stage 4 global analysis findings into modular, individual refactoring task specifications saved in `.docs/ai-audit-framework/tasks/`.

---

## Modular Task Specification Rule (Separate Files)

1. **NEVER combine all tasks into a single monolith roadmap document**.
2. **Individual Task Files**: Each task MUST be written to its own separate file under `.docs/ai-audit-framework/tasks/`:
   - `task-001-extract-validation.md`
   - `task-002-auth-context.md`
3. **Explicit Dependencies in File**: Inside each task file, explicitly specify prerequisites and dependents.
4. **MANDATORY GREP STEP FOR TASK GENERATION**:
   - BEFORE creating any task file for a UI primitive (Buttons, Inputs, Modals), run `grep_search` for that primitive across the repository.
   - Copy all file paths returned by `grep_search` into the `Target Files` list of the generated task file.
5. **COMPLETENESS MANDATE**:
   - Ensure `Target Files` lists all affected files identified during the audit without artificial sample limits.
6. **Global Primitive Completeness Check**: When generating UI primitive tasks (e.g. Buttons, Inputs, Modals), the task specification MUST include EVERY file in the repository using that primitive (across Admin, Storefront, Pages, Widgets), guaranteeing 100% replacement without leaving orphan raw HTML or unstandardized controls.
7. **Index Only Roadmap (`.docs/ai-audit-framework/stages/5-refactoring-roadmap.md`)**:
   - `5-refactoring-roadmap.md` serves ONLY as an index table linking to individual task markdown files.

---

## Output Template (`.docs/ai-audit-framework/tasks/task-001-unify-buttons.md`)

```markdown
# Task Spec: [TASK-001] Unify Button Primitives Across Project

## Metadata & Model Recommendation
- **Task ID**: TASK-001
- **Complexity Rating**: 3 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: None
- **Dependent Tasks**: None
- **Target Files**:
  - `src/components/Button.js`
  - `src/components/IconButton.js`
  - `src/components/ChipButton.js`
  - `src/components/AnimatedButton.js`
  - `src/components/Admin/Banners/BannersList.js`
  - `src/components/Admin/Orders/OrderStatusSelector.js`
  - `src/components/Admin/Categories/CategoryRowElements.js`
  - `src/components/ProductPage/ProductReviewSubcomponents.js`
  - `src/components/ProductPage/ProductInfoSubcomponents.js`
  - `src/features/shell/AppHeader/UserDropdown.js`
  - `src/features/shell/NavMenu/CategoryTreeNodeButtons.js`
  - `src/features/shell/NavMenu/NavMenuHeader.js`
  - `src/features/shell/NavMenu/LanguageSelector.js`
  - `src/features/shell/NavMenu/MainMenuContent.js`
  - `src/features/shell/NavMenu/NavItemList.js`
  - `src/features/checkout/ReviewStep.js`
  - `src/features/checkout/PaymentMethod.js`
  - `src/features/auth/LoginActions.js`
  - `src/features/auth/PasswordReset.js`
  - `src/utils/formBuilder/controls/ButtonField.js`

## Light Model Prompt Instruction
"Refactor EVERY SINGLE FILE listed under Target Files above to replace raw touchables/buttons with unified primitives from src/components/."

## 🧪 Manual UI Verification Guide
- **App Screen**: Admin Banners, Product Review, and App Header
- **User Action**: Click buttons across all 3 screens
- **Expected Result**: 100% identical button styles, radii, and press micro-animations.
```

---

## Output Template (`.docs/ai-audit-framework/stages/5-refactoring-roadmap.md` Index)

```markdown
# Stage 5 — Refactoring Roadmap Index

## Phase 1: Foundations
| Task ID | Task Title | Complexity | File Link | Dependencies | Recommended Model |
|---|---|---|---|---|---|
| TASK-001 | Extract Validation Helper | 2/5 | 📄 **[task-001.md](file:///path/to/.docs/ai-audit-framework/tasks/task-001.md)** | None | Gemini 3.6 Flash Medium |
```

---

## Exit Criteria
- Every task created as an independent `.md` file in `.docs/ai-audit-framework/tasks/`.
- `.docs/ai-audit-framework/stages/5-refactoring-roadmap.md` created as a lightweight index table.
