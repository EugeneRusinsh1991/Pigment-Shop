# Engineering Standard: Badge UI Module Architecture

> [!NOTE]
> Defines the architectural specification, directory layout, API contract, and design token integration for the **Badge** primitive.

---

## 1. Semantic Purpose

`Badge` is a simple visual indicator primitive used to display status labels, counts, or categorical tags.
- **Scope**: Status indicators (Active/Inactive), notification counts, category pills.
- **Complexity**: Simple Primitive (Static styling, state-less).

---

## 2. Module Architecture

```
src/components/Badge/
├── index.js                     # Public export
├── Badge.js                     # Core presentational component
├── BadgeStyles.js               # Style factory using tokens
└── useBadgeTheme.js             # Theme & variant color mapper
```

---

## 3. Design Token Integration

- **Colors**: `colors.accent`, `colors.statusSuccess`, `colors.statusError`, `colors.statusWarning`.
- **Radii**: `layout.radii.xs` (6px), `layout.radii.full` (50px).
- **Typography**: Uses `<Text>` primitive with size `caption` or `micro`.
