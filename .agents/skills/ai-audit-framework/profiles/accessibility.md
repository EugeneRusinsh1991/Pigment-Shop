# Accessibility (a11y) Audit Profile

## Focus Areas
1. **Semantics & ARIA**:
   - Non-semantic elements (`div`, `span`) used as buttons/links without `role`, `tabIndex`, or keyboard handlers.
   - Missing `alt` attributes or ARIA labels on interactive icons.

2. **Navigation & Contrast**:
   - Inaccessible focus states (`outline: none` without focus replacement).
   - Insufficient color contrast ratios.

## Anti-Patterns & Examples

### Example 1: Div as Click Handler
❌ **Bad: Clickable div without accessibility attributes**
```tsx
<div onClick={handleClick} className="icon-button">
  <IconClose />
</div>
```

✅ **Good: Accessible button with aria-label**
```tsx
<button type="button" onClick={handleClick} aria-label="Close dialog" className="icon-button">
  <IconClose aria-hidden="true" />
</button>
```

### Example 2: Removing Focus Rings
❌ **Bad: Stripping focus outlines completely**
```css
button:focus {
  outline: none;
}
```

✅ **Good: Custom visible focus ring**
```css
button:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
```
