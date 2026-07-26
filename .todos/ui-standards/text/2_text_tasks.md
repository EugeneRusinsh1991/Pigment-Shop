# 🗺️ Roadmap: Text UI Module & Typography Cleanup

> **Spec**: `.docs/architecture-standards/ui/text-module-spec.md`  
> **Scope**: `src/components/Text/`, `src/components/`, `src/pages/`

---

## 📊 STATUS

| Step | Task | Status |
|------|------|--------|
| 1 | Core module audit & refactoring (`src/components/Text/`) | ✅ |
| 2 | Eliminate font overrides (`fontSize`, `fontWeight`) in UI components | ⬜ |
| 3 | Final UI Auditor verification (zero typography warnings) | ⬜ |

---

## STEP 1 — Core Primitive (`src/components/Text/`) · ✅ DONE

- **Fixes**: Replaced raw numbers in `TextStyles.js` with `tokens.typography`, added `inverse`/`error` colors, added `accessibilityRole="header"` to `Heading.js`.

---

## STEP 2 — Eliminate Font Overrides in UI Components · 🟡 IN PROGRESS

**Goal**: Remove inline `fontSize`, `fontWeight`, `lineHeight` in `style` props across components. Use variants (`overline`, `caption`, `h4`, etc.) instead.

**📋 PROMPT:**
```
Check `src/components/` and `src/pages/` for <Text> usages passing `fontSize` or `fontWeight` in the style prop. Replace them with standard variants (e.g. variant="overline", variant="caption").
```

---

## STEP 3 — Verification · 🔴 PENDING

**Goal**: Run UI Auditor and confirm 0 typography warnings.

**📋 PROMPT:**
```
Run node .tools/ui-auditor/index.js and confirm zero typography override warnings remain.
```
