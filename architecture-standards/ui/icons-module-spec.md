# Engineering Standard: Icons UI Module Architecture

> [!NOTE]
> Defines the architectural specification, icon wrapper interface, and color token integration for the **Icons** module.

---

## 1. Semantic Purpose

`Icons` handles vector/SVG icon rendering ensuring color token bindings and size normalization.
- **Scope**: App-wide UI icons (navigation, buttons, status badges).

---

## 2. Module Architecture

```
src/components/icons/
├── index.js                     # Barrel export for all system icons
├── IconWrapper.js               # Icon container standardizing size & tint color
└── svg/                         # Raw icon components / SVG vectors
```

---

## 3. Design Token Integration

- **Sizes**: `layout.iconSizes.sm` (16px), `md` (20px), `lg` (24px).
- **Colors**: Direct binding to `colors.*` tokens.
