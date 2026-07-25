# Subtask Breakdown & AI Model Recommendations

Following the **Universal AI Audit Framework v2** model assignment rules (+20% complexity buffer), each task maps to an explicit model tier depending on file touch count, shared state impact, and primitive cross-cutting scope.

---

## 📦 Phase 1: Card Module Standardization (`src/components/Card/`)

### Subtask 1.1: Core Card Module Encapsulation
- **Goal**: Create directory `src/components/Card/`, encapsulate `BaseCard`, `InteractiveCard`, `NavigationCard`, `PlaceholderCard`, `StaticCard`, `CardShadow`, and create `src/components/Card/index.js` public API barrel export.
- **Affected Files**: `src/components/BaseCard.js`, `src/components/InteractiveCard.js`, `src/components/NavigationCard.js`, `src/components/PlaceholderCard.js`, `src/components/StaticCard.js`, `src/components/CardShadow.js`
- **Complexity**: 🟡 Medium (6 files, structural module encapsulation)
- **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**

### Subtask 1.2: Card Consumer Imports Migration
- **Goal**: Update all consumer import sites across `src/features/` and `src/components/` to import directly from `src/components/Card/index.js`, then safely remove root-level proxy shims.
- **Affected Files**: ~15-20 consumer components across Storefront & Admin.
- **Complexity**: 🔴 High (Cross-cutting primitive touch across >10 files)
- **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**

---

## 💬 Phase 2: Modal & Dialog Standardization (`src/components/Modal/`)

### Subtask 2.1: Core Modal Module Encapsulation
- **Goal**: Create `src/components/Modal/`, build base `Modal` primitive with backdrop/animation drivers, and migrate `ConfirmationDialog.js` as a specialized composition component (`ConfirmationModal.js`).
- **Affected Files**: `src/components/ConfirmationDialog.js`, `src/components/Modal/Modal.js`, `src/components/Modal/index.js`
- **Complexity**: 🟡 Medium (Shared modal state & animation drivers)
- **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**

### Subtask 2.2: Dialog Consumer Migration
- **Goal**: Update all dialog consumer sites (Admin & Storefront actions) to use `import { ConfirmationModal } from '@/components/Modal'` and verify backdrop accessibility.
- **Affected Files**: ~8-12 consumer components.
- **Complexity**: 🟡 Medium (>5 files touched)
- **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**

---

## 🚪 Phase 3: Drawer Primitive Standardization (`src/components/Drawer/`)

### Subtask 3.1: Core Drawer Encapsulation & Refactoring
- **Goal**: Move `SideDrawer.js` into `src/components/Drawer/Drawer.js`, add `DrawerHeader`/`DrawerFooter` sub-components, and create `src/components/Drawer/index.js`.
- **Affected Files**: `src/components/SideDrawer.js`, `src/components/Drawer/Drawer.js`, `src/components/Drawer/index.js`
- **Complexity**: 🟢 Low (2-3 files)
- **Recommended Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**

---

## 📋 Model Tier Quick Reference Chart

| Subtask | Recommended Model Tier | Justification |
| :--- | :--- | :--- |
| **Subtask 1.1** (Card Encapsulation) | 🟠 **Gemini 3.6 Flash (High)** | Touches 6 files, defines shared UI primitive foundation |
| **Subtask 1.2** (Card Consumers) | 🟠 **Gemini 3.6 Flash (High)** | Global replacement across >15 files |
| **Subtask 2.1** (Modal Core) | 🟠 **Gemini 3.6 Flash (High)** | Manages animation drivers and backdrop accessibility |
| **Subtask 2.2** (Modal Consumers) | 🟠 **Gemini 3.6 Flash (High)** | Touches >5 files across Admin & Storefront |
| **Subtask 3.1** (Drawer Core) | 🟢 **Gemini 3.6 Flash (Low)** | Isolated single primitive refactor (<4 files) |
