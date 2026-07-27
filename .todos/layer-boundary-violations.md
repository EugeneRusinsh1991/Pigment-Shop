# Layer Boundary Violations — Refactor TODOs

---

## 1. Move `PageScrollLayout` → `src/features/shell/`

**Rationale:** Tightly couples with `<Footer />` from `src/features/shell/`, not a primitive component.

- [ ] 1.1 Copy `src/components/PageScrollLayout/` → `src/features/shell/PageScrollLayout/`
- [ ] 1.2 Delete original `src/components/PageScrollLayout/`
- [ ] 1.3 Fix `Footer` import path inside the moved file if needed
- [ ] 1.4 Find & replace all consumer imports: `@/components/PageScrollLayout` → `@/features/shell/PageScrollLayout`
- [ ] 1.5 Verify build — no missing-module errors

---

## 2. Move `SharedLayoutWrapper` → `src/features/shell/`

**Rationale:** Renders `<Footer />` and manages footer region layout — a shell layout wrapper, not a UI primitive.

> [!NOTE]
> `src/components/SharedLayoutWrapper.js` file exists alongside the directory — delete the loose `.js` file as part of this move.

- [ ] 2.1 Copy `src/components/SharedLayoutWrapper/` → `src/features/shell/SharedLayoutWrapper/`
- [ ] 2.2 Delete original `src/components/SharedLayoutWrapper/` directory
- [ ] 2.3 Delete redundant `src/components/SharedLayoutWrapper.js` loose file
- [ ] 2.4 Fix `Footer` import path inside the moved file if needed
- [ ] 2.5 Find & replace all consumer imports: `@/components/SharedLayoutWrapper` → `@/features/shell/SharedLayoutWrapper`
- [ ] 2.6 Verify build — no missing-module errors

---

## 3. Move `useThemeUtils.js` → `src/theme/`

**Rationale:** Provides theme helpers (`getIsDarkContext`, `getStyle`) — belongs alongside `tokens.js` and `commonStyles.js`, not in components.

- [ ] 3.1 Move `src/components/useThemeUtils.js` → `src/theme/useThemeUtils.js`
- [ ] 3.2 Find & replace all consumer imports: `@/components/useThemeUtils` → `@/theme/useThemeUtils`
- [ ] 3.3 Verify build — no missing-module errors
