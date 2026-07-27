# 🟠 Misplaced Files — Reorganization TODOs

---

## 1. Move `SharedLayoutWrapper` → `src/features/shell/`

**Rationale:** Renders `<Footer />` and manages footer region layout — a shell layout wrapper, not a UI primitive.

> [!NOTE]
> `src/components/SharedLayoutWrapper.js` loose file exists alongside the directory — delete it as part of this move.

- [ ] 1.1 Copy `src/components/SharedLayoutWrapper/` → `src/features/shell/SharedLayoutWrapper/`
- [ ] 1.2 Delete original `src/components/SharedLayoutWrapper/` directory
- [ ] 1.3 Delete redundant `src/components/SharedLayoutWrapper.js` loose file
- [ ] 1.4 Fix `Footer` import path inside the moved file if needed
- [ ] 1.5 Find & replace all consumer imports: `@/components/SharedLayoutWrapper` → `@/features/shell/SharedLayoutWrapper`
- [ ] 1.6 Verify build — no missing-module errors

---

## 2. Move `useThemeUtils.js` → `src/theme/`

**Rationale:** Provides theme helpers (`getIsDarkContext`, `getStyle`) — not a component, belongs alongside `tokens.js` and `commonStyles.js`.

- [ ] 2.1 Move `src/components/useThemeUtils.js` → `src/theme/useThemeUtils.js`
- [ ] 2.2 Find & replace all consumer imports: `@/components/useThemeUtils` → `@/theme/useThemeUtils`
- [ ] 2.3 Verify build — no missing-module errors
