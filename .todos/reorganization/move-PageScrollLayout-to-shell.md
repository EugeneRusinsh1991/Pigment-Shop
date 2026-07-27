# Move PageScrollLayout → src/features/shell/

**Rationale:** Tightly couples with `<Footer />` from `src/features/shell/`, not a primitive component.

---

- [ ] 1. Copy folder `src/components/PageScrollLayout/` → `src/features/shell/PageScrollLayout/`
- [ ] 2. Delete original `src/components/PageScrollLayout/`
- [ ] 3. Update import inside moved file — fix `Footer` import path if it changed
- [ ] 4. Global find & replace all imports of `@/components/PageScrollLayout` → `@/features/shell/PageScrollLayout`
- [ ] 5. Verify build compiles with no missing-module errors
