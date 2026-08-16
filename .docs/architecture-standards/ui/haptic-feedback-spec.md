# Engineering Standard: Haptic Feedback Architecture

> [!NOTE]
> This engineering standard defines the architecture, platform bridges, feedback tiers, and component integration rules for the **Haptic Feedback Subsystem** across PigmentShop.

---

## 1. Core Engineering Principles

### 1.1 Semantic Purpose
The Haptic Feedback subsystem provides physical confirmation for digital interactions, bridging the gap between tactile intent and visual response. It standardizes vibration patterns across native and web platforms to ensure a consistent, premium feel without fatiguing the user.

### 1.2 Platform Abstraction
Haptic triggers must be completely abstracted from the underlying platform:
- **Native (iOS/Android):** Utilizes `expo-haptics` for precise, system-level taptic feedback.
- **Web:** Utilizes the `navigator.vibrate` API with carefully tuned fallback duration patterns that simulate the native feel.
- Components should **never** check `Platform.OS` for haptics. They must invoke semantic functions from `hapticsService.js`.

---

## 2. Standard Architecture & Directory Layout

```
src/
├── theme/
│   └── haptics.js                  # Central definition of semantic haptic tiers
├── hooks/
│   └── useHaptics.js               # React hook exposing safe trigger functions
└── services/
    └── haptics/
        └── hapticsService.js       # Core abstraction bridging Expo and Web Navigator APIs
```

---

## 3. Haptic Feedback Tiers

PigmentShop defines six specific semantic levels of haptic feedback. Component authors must use the semantic tier appropriate for the interaction weight.

| Semantic Tier | Visual/UI Context | Native Fallback | Web Fallback (`navigator.vibrate`) |
| :--- | :--- | :--- | :--- |
| **`selection`** | Picker scrolling, segmented toggle switching, tab changes. | `Selection` | `[10]` |
| **`impactLight`** | Minor taps, small button clicks, expanding accordions. | `Impact.Light` | `[15]` |
| **`impactMedium`** | Standard form submissions, major CTA taps, adding to cart. | `Impact.Medium` | `[25]` |
| **`impactHeavy`** | Destructive actions, confirming deletions, final checkout. | `Impact.Heavy` | `[40]` |
| **`notificationSuccess`** | Task completion, successful order placement. | `Notification.Success` | `[20, 40, 20]` |
| **`notificationError`** | Form validation failure, destructive error boundary. | `Notification.Error` | `[30, 40, 30, 40, 30]` |

---

## 4. Component Integration Rules

### 4.1 Invoking Haptics in UI Primitives
UI primitives (e.g., `Button`, `Toggle`, `Card`) must integrate haptics alongside visual gesture animations. 

**Rule:** Call the haptic trigger at the precise moment of logical interaction (e.g., `onPressIn` or `onPress`), synchronously with the state change or animation start.

```javascript
import { useHaptics } from '../../../hooks/useHaptics';

export default function Button({ onPress, variant }) {
  const { triggerHaptic } = useHaptics();

  const handlePress = (e) => {
    // 1. Trigger haptic
    triggerHaptic(variant === 'danger' ? 'impactHeavy' : 'impactMedium');
    // 2. Execute callback
    if (onPress) onPress(e);
  };

  return <AnimatedPressable onPress={handlePress} />;
}
```

### 4.2 Restraint & Opt-out
- Do not trigger haptics continuously (e.g., during every frame of a scroll or drag).
- Respect device settings: The `hapticsService` must fail silently if the device does not support vibration or if the user has disabled it.
- UI elements must provide an `hapticFeedback={false}` prop for disabling vibration on specific instances.

---

## 5. Compliance Checklist

- [ ] Components use `useHaptics` hook or `hapticsService.js`.
- [ ] No direct imports of `expo-haptics` or `navigator.vibrate` outside the service layer.
- [ ] Uses a semantic tier (e.g., `selection`, `impactMedium`) rather than an arbitrary pattern.
