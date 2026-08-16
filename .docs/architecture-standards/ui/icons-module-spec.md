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
src/components/Icons/
├── index.js                     # Barrel export for all system icons
├── AdminIcons.js                # Icons for back-office administration
├── AppIcons.js                  # General application icons (navigation, UI)
├── CategoryIcons.js             # Product category visual icons
├── ControlIcons.js              # UI control icons (arrows, close, toggles)
├── IconsStyles.js               # Icon sizing and color style map
└── useIconTheme.js              # Hook for theme resolution and color binding
```

---

## 3. Design Token Integration

- **Sizes**: `layout.iconSizes.sm` (16px), `md` (20px), `lg` (24px).
- **Colors**: Direct binding to `colors.*` tokens.
