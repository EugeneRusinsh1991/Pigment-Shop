# Engineering Standard: TextField UI Module Architecture

> [!NOTE]
> This engineering standard defines the semantic purpose, architectural layout, hook breakdown, API props contract, and design token integration for the **TextField** UI primitive in PigmentShop.

---

## 1. Semantic Purpose & Interaction Model

### 1.1 Semantic Purpose
The `TextField` is a single-line or multi-line text input primitive allowing user data entry. 

- **Primary Scope**: Form inputs, text area fields, search queries, password inputs.
- **State Model**: Manages focus/blur states, validation error state rendering, label floating behavior, and input clearing.

---

## 2. Module Architecture

```
src/components/ui/TextField/
├── index.js                      # Public API barrel export
├── TextField.js                  # Core input component
├── TextFieldStyles.js            # Style factory consuming design tokens
├── useTextFieldTheme.js          # Theme, border focus, and error state hook
└── useTextFieldAnimation.js      # Floating label & focus transition hook
```

---

## 3. Design Token Integration

All styling MUST reference [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js):
- **Colors**: `colors.surface`, `colors.borderLight`, `colors.textPrimary`, `colors.statusError`, `colors.focusRing`.
- **Typography & Radii**: `fonts.sans`, `layout.radii.sm` (8px), `typography.sizes.body`.
- **Heights**: `layout.inputHeights.md` (40px), `layout.inputHeights.lg` (48px).

---

## 4. API Props Contract

```typescript
interface TextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

---

## 5. Compliance Checklist

- [ ] Style factory extracted to `TextFieldStyles.js`.
- [ ] Theme, error state colors, and active focus outline resolved in `useTextFieldTheme.js`.
- [ ] Focus animations / label position driven by `useTextFieldAnimation.js`.
- [ ] Clean public exports in `index.js`.
