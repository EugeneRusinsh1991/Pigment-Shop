# Fix `variant="label"` — Non-Existent Variant (~10 usages)

**Rationale:** `VARIANTS` in `TextStyles.js` has no `"label"` key. All usages fall back silently to `body1`. Replace with `caption` (closest semantic equivalent: xs, regular) or `body2` as appropriate.

---

- [ ] `src/components/TextField/TextField.js` (L28)
- [ ] `src/features/cart/CartSummary.js` (L33, L84)
- [ ] `src/features/profile/ProfileFormCard.js` (L11)
- [ ] `src/features/orders/OrderDetailsCard.js` (L13, L16, L19, L22)
- [ ] `src/features/auth/LoginPageComponents.js` (L113)
- [ ] `src/features/auth/LoginPage.js` (L94)
- [ ] Verify no `variant="label"` remains in `src/`
