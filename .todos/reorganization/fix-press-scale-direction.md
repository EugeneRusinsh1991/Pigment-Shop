# Fix `motion.press.scale: 1.1` — Inverted Press Animation Direction

**Rationale:** The press scale token is `1.1`, meaning elements *grow* on press. Standard UX convention is a subtle *shrink* (`0.97`–`0.98`). Growing on press feels unnatural and inconsistent with platform conventions.

```js
// Current (wrong):
motion.press.scale: 1.1   // ❌ grows on press
// Fix:
motion.press.scale: 0.97  // ✅ shrinks on press — standard feel
```

---

- [ ] 1. Change `motion.press.scale` from `1.1` to `0.97` in `src/theme/tokens.js`
- [ ] 2. Verify `src/components/Button/Button.js` (`scaleTo` prop default) reflects correct press feel
- [ ] 3. Test press animation visually on buttons and interactive elements
