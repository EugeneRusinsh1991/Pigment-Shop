# Engineering Standard: Modal UI Module Architecture

> [!NOTE]
> This engineering standard defines the semantic purpose, architectural layout, hook breakdown, API props contract, animation mechanics, and design token integration for the **Modal** UI primitive in PigmentShop.

---

## 1. Semantic Purpose & Interaction Model

### 1.1 Semantic Purpose
The `Modal` is a focused, blocking overlay container primitive. It anchors to the center of the screen above a backdrop layer (`OverlayBackdrop`) to command exclusive user attention for critical actions, alerts, or complex task completion.

- **Primary Scope**: Confirmation dialogs, critical warnings, form prompts, order status popups.
- **State Model**: Manages modal visibility state (`isOpen`), backdrop click handling, scroll lock behavior, and mount/unmount focus traps.

### 1.2 Primitive Boundaries
- **Modal vs Drawer**: Modal is centered, highly focused, and blocks workflow until dismissed/completed. Drawer slides out from edge and handles context actions or navigation.

---

## 2. Module Architecture

```
src/components/Modal/
├── index.js                  # Public API barrel export
├── Modal.js                  # Presentational container & dialog wrapper
├── ModalStyles.js            # Dynamic style map factory consuming tokens
├── useModalTheme.js          # Theme, border, and elevation resolution hook
└── useModalAnimation.js      # Zoom/Fade & backdrop animation drivers hook
```

---

## 3. Design Token Integration

All visual and motion properties MUST strictly reference [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js):
- **Colors**: `colors.surface`, `colors.surfaceDark`, `colors.overlayBackdrop`, `colors.borderLight`.
- **Radii & Layout**: `layout.radii.lg` (16px), `layout.modalMaxWidth`, elevation shadows.
- **Motion**: `motion.modal.scaleInDuration` (150ms), `motion.modal.fadeDuration` (200ms).

---

## 4. API Props Contract

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  closeOnOverlayPress?: boolean; // Default: true
  maxWidth?: number | string;
  children: React.ReactNode;
}
```

---

## 5. Compliance Checklist

- [ ] Style definitions extracted to `ModalStyles.js`.
- [ ] Theme, glassmorphism, and border colors resolved in `useModalTheme.js`.
- [ ] Entrance/exit scale and fade animations driven by `useModalAnimation.js`.
- [ ] Clean public exports in `index.js`.
