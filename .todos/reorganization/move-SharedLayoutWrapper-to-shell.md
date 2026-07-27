# Move SharedLayoutWrapper → src/features/shell/

**Rationale:** Renders `<Footer />` from `src/features/shell/` and manages footer region layout. It is a shell layout wrapper, not a reusable UI primitive.

> **Note:** `src/components/SharedLayoutWrapper.js` exists alongside the directory — both must be resolved.

---

- [ ] 1. Move directory `src/components/SharedLayoutWrapper/` → `src/features/shell/SharedLayoutWrapper/`
- [ ] 2. Reconcile or delete the redundant `src/components/SharedLayoutWrapper.js` (merge into the moved directory version if content differs)
- [ ] 3. Global find & replace all imports of `@/components/SharedLayoutWrapper` → `@/features/shell/SharedLayoutWrapper`
- [ ] 4. Verify build compiles with no missing-module errors
