# Engineering Standard: Text UI Module Architecture

> [!NOTE]
> This engineering standard defines the architectural specification, directory layout, variant definitions, API contract, and design token integration patterns for the unified `Text` (and `Heading`) typography primitive module across PigmentShop.

---

## 1. Core Engineering Principles

### 1.1 Semantic Purpose
The `Text` primitive serves as the single source of truth for rendering all textual content (headings, subheadings, body paragraphs, captions, badges, overlines) in the application.

- **`Text`**: Core presentational typography primitive handling semantic variants (`h1`-`h4`, `subtitle1`-`subtitle2`, `body1`-`body2`, `caption`, `overline`), alignment, color intent, and dark/light theme resolution.
- **`Heading`**: Convenient semantic wrapper for screen/section titles (defaulting to heading variants with strict semantic defaults).

*Rule*: No component or screen may apply inline `fontSize`, `fontWeight`, or `lineHeight` manually. All typography rendering must delegate to `Text` or `Heading`.

### 1.2 Composition & Variants
Typography variations are expressed through standard props rather than creating specialized component proliferation.
- **Prefer**: `<Text variant="h2" color="primary" weight="bold">`
- **Avoid**: `HeaderTwoText`, `BoldPrimaryText`, `CaptionText`

---

## 2. Standard Typography Module Architecture

Following the [Reference UI Module Architecture](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/reference-module-spec.md), the `Text` primitive adheres to the standard module layout:

```
src/components/Text/
├── index.js             # Public API barrel export (Text, Heading)
├── Text.js              # Core presentational React Native component
├── TextStyles.js        # Dynamic token-driven typography style factory
├── useTextTheme.js      # Theme resolution hook (dark/light mode & color props)
└── Heading.js           # Semantic specialized sub-primitive for section headers
```

### File Responsibilities:

1. **`index.js` (Public Barrel Export)**:
   - Exposes `Text` (default export), `Heading`, `useTextTheme`, and variant definitions.

2. **`Text.js` (Core Presentational Component)**:
   - Renders React Native `<Text>` with resolved theme styles, handling accessibility (`accessibilityRole`), truncation (`numberOfLines`), and composition (`children`).

3. **`TextStyles.js` (Style Factory)**:
   - Maps design tokens (`tokens.js`) into pre-computed typography scale presets (`h1` through `overline`).

4. **`useTextTheme.js` (Theme Hook)**:
   - Resolves active theme (`ThemeContext`) and maps semantic `color` intents (`primary`, `secondary`, `muted`, `accent`, `error`, `success`, `warning`, `inverse`) to theme colors.

5. **`Heading.js` (Specialized Sub-Primitive)**:
   - Convenience wrapper pre-configured with `accessibilityRole="header"` and default heading variant parameters.

---

## 3. Typography Scale & Design Token Integration

All typography properties MUST originate from `src/theme/tokens.js`:

### 3.1 Variant Presets

| Variant | Font Size | Weight | Line Height | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `h1` | `tokens.typography.sizes.xxl` (28) | `bold` (700) | 34 | Main Screen Titles |
| `h2` | `tokens.typography.sizes.xl` (24) | `bold` (700) | 30 | Section Headings |
| `h3` | `tokens.typography.sizes.lg` (20) | `semibold` (600) | 26 | Card / Sub-section Titles |
| `h4` | `tokens.typography.sizes.md` (16) | `semibold` (600) | 22 | Group / Sub-header Titles |
| `subtitle1` | `tokens.typography.sizes.md` (16) | `medium` (500) | 22 | Emphasized Subtitles |
| `subtitle2` | `tokens.typography.sizes.sm` (14) | `medium` (500) | 18 | Secondary Subtitles |
| `body1` | `tokens.typography.sizes.md` (16) | `regular` (400) | 24 | Primary Body Text |
| `body2` | `tokens.typography.sizes.sm` (14) | `regular` (400) | 20 | Compact Body Text |
| `caption` | `tokens.typography.sizes.xs` (12) | `regular` (400) | 16 | Helper Text, Timestamps |
| `overline` | `tokens.typography.sizes.xs` (10) | `bold` (700) | 14 | Uppercase Labels, Badges |

---

## 4. API Contract & Props Specification

```typescript
interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'error' | 'success' | 'warning' | 'inverse' | string;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  numberOfLines?: number;
  style?: object | object[];
  children: React.ReactNode;
}
```

---

## 5. Compliance Checklist

- [ ] Semantic purpose defined with strict variant rules.
- [ ] Export contract established in `index.js`.
- [ ] Render component `Text.js` pure and presentational.
- [ ] Styles encapsulated in `TextStyles.js` referencing `tokens.js`.
- [ ] Theme resolution logic extracted to `useTextTheme.js`.
- [ ] Zero inline/hardcoded `fontSize`, `fontWeight`, or `lineHeight` in UI components.
