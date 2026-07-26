# 🗺️ Roadmap: Text UI Module Architecture & Standard Alignment

> **Spec**: `.docs/architecture-standards/ui/text-module-spec.md`
> **Scope**: `src/components/Text/` — `Text.js`, `Heading.js`, `TextStyles.js`, `useTextTheme.js`, `index.js`
> **How to use**: Copy the prompt from each step and paste it into the chat. Execute steps strictly in order.

---

## ✅ PROGRESS STATUS

| Step | Task | Model | Status |
|------|------|-------|--------|
| 1 | Audit `TextStyles.js` & token integration against `text-module-spec.md` | 🟡 Gemini 3.6 Flash (Medium) - 1 file | ⬜ |
| 2 | Audit `Text.js` & `Heading.js` API contract & component structure | 🟡 Gemini 3.6 Flash (Medium) - 2 files | ⬜ |
| 3 | Refactor `TextStyles.js` to reference central typography tokens | 🟠 Gemini 3.6 Flash (High) - 1 file | ⬜ |
| 4 | Refactor `Text.js` & `Heading.js` for full spec compliance | 🟡 Gemini 3.6 Flash (Medium) - 2 files | ⬜ |
| 5 | Final architecture compliance check & verification | 🔴 Gemini 3.1 Pro (High) - 5 files | ⬜ |

---

## STEP 1 — Audit `TextStyles.js` & Typography Token Integration · 🟡 Gemini 3.6 Flash (Medium)

**What we check:**
- Preset variant values in `VARIANTS` (`h1`-`h4`, `subtitle1`-`subtitle2`, `body1`-`body2`, `caption`, `overline`) matching `text-module-spec.md`.
- Typography properties referencing `src/theme/tokens.js` rather than raw numbers/strings.
- Semantic color mapping resolution in `getTextColor`.

**📋 PROMPT:**

```
Read `src/components/Text/TextStyles.js` and `.docs/architecture-standards/ui/text-module-spec.md`.

Check compliance with section 3 (Typography Scale & Design Token Integration):
1. Does VARIANTS contain all required variants (h1, h2, h3, h4, subtitle1, subtitle2, body1, body2, caption, overline)?
2. Do variant font sizes, line heights, and weights match the specification table in text-module-spec.md?
3. Are font sizes, line heights, and weights referencing typography tokens from src/theme/tokens.js?
4. Is getTextColor handling all semantic color intents (primary, secondary, muted, accent, error, success, warning, inverse)?

Output: list of violations with file line numbers and recommended fixes.
```

---

## STEP 2 — Audit `Text.js` & `Heading.js` API Contract · 🟡 Gemini 3.6 Flash (Medium)

**What we check:**
- Pure presentational nature of `Text.js`.
- Specialized wrapper contract of `Heading.js`.
- Props pass-through and font override warning behavior.

**📋 PROMPT:**

```
Read `src/components/Text/Text.js`, `src/components/Text/Heading.js`, and `.docs/architecture-standards/ui/text-module-spec.md`.

Check compliance with section 2 & 4 (Standard Typography Module Architecture & API Contract):
1. `Text.js`:
   - Does it accept standard props (variant, color, weight, align, numberOfLines, style, children)?
   - Does it delegate theme & style resolution to `useTextTheme`?
   - Does it render pure React Native `<Text>` without inline layout side-effects?
2. `Heading.js`:
   - Does it map numeric levels (1-4) to corresponding heading variants (h1-h4)?
   - Does it set appropriate accessibility defaults (`accessibilityRole="header"`)?

Output: list of architectural violations (if any) or mark ✅ clean.
```

---

## STEP 3 — Refactor `TextStyles.js` · 🟠 Gemini 3.6 Flash (High)

**📋 PROMPT:**

```
Refactor `src/components/Text/TextStyles.js` to strictly align with `.docs/architecture-standards/ui/text-module-spec.md`.

1. Ensure VARIANTS matches exact specification preset dimensions:
   - h1: size 28, weight 700 (bold), lineHeight 34
   - h2: size 24, weight 700 (bold), lineHeight 30
   - h3: size 20, weight 600 (semibold), lineHeight 26
   - h4: size 16, weight 600 (semibold), lineHeight 22
   - subtitle1: size 16, weight 500 (medium), lineHeight 22
   - subtitle2: size 14, weight 500 (medium), lineHeight 18
   - body1: size 16, weight 400 (regular), lineHeight 24
   - body2: size 14, weight 400 (regular), lineHeight 20
   - caption: size 12, weight 400 (regular), lineHeight 16
   - overline: size 10, weight 700 (bold), lineHeight 14
2. Ensure color resolution supports 'inverse', 'error', 'success', 'warning', 'muted', 'secondary', 'primary', 'accent'.
3. Maintain full backward compatibility for getTextStyle and getTextColor exports.

Output summary of changes made.
```

---

## STEP 4 — Refactor `Text.js` & `Heading.js` · 🟡 Gemini 3.6 Flash (Medium)

**📋 PROMPT:**

```
Refactor `src/components/Text/Text.js` and `src/components/Text/Heading.js` for full compliance with `.docs/architecture-standards/ui/text-module-spec.md`.

1. `Text.js`:
   - Ensure clean prop forward pass-through (`numberOfLines`, `accessibilityRole`, `testID`, `style`, `children`).
   - Preserve custom font override warnings (`warnFontOverrides`).
2. `Heading.js`:
   - Ensure level props (1..4) map cleanly to variants (h1..h4).
   - Set accessibilityRole="header" on RN primitive via Text.

Output summary of changes made.
```

---

## STEP 5 — Final Compliance Check & Verification · 🔴 Gemini 3.1 Pro (High)

**📋 PROMPT:**

```
Perform a final audit of all files in `src/components/Text/` (`Text.js`, `Heading.js`, `TextStyles.js`, `useTextTheme.js`, `index.js`) against `.docs/architecture-standards/ui/text-module-spec.md`.

Verify:
1. Directory layout and exports in `index.js`.
2. Variant presetting compliance.
3. Proper design token usage.
4. No broken imports across the codebase.

Output final compliance report.
```

---

## 📌 Notes

- **Steps 1–2**: Audit only.
- **Steps 3–4**: Refactoring.
- **Step 5**: Final verification.
- Update progress status table after completing each step.
