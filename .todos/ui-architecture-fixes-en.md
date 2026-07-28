# Step-by-step Resolution — Fixing UI Architecture Violations | `🔴 G 3.1 P (H) — 7d | 8f | +12r`

Source report: .docs/audits/audits/01-ui-architecture-violations.log

Objective: Bring component structure in line with standards (Styles, Hooks, Main Component) and fix the reported violations.

> ⚠️ **Action**: BREAK DOWN INTO SUBTASKS

Steps (with difficulty):

1) Preparation  — Difficulty: Easy | `🟢 G 3.6 F (L) — 1d | 0f | +1r`
- Create a separate branch / commit before changes: `git checkout -b fix/ui-architecture`.
- Open the report file: `.docs/audits/audits/01-ui-architecture-violations.log`.

2) Badge — `src/components/Badge/`  — Difficulty: Easy | `🟢 G 3.6 F (L) — 1d | 1f | +1r`
- Open `src/components/Badge/Badge.js`.
- Add the styles import if missing:

```js
import BadgeStyles from './BadgeStyles';
```

- Ensure the component uses `BadgeStyles`, e.g.:

```jsx
<View style={BadgeStyles.container}>...</View>
```

3) Button — `src/components/Button/`  — Difficulty: Medium | `🟢 G 3.6 F (L) — 1d | 1f | +1r`
- Open `src/components/Button/useButtonTheme.js`.
- Ensure the hook returns a valid theme object. Minimal example:

```js
export default function useButtonTheme() {
  return {
    container: { padding: 10, borderRadius: 6 },
    text: { color: '#0a0a0a', fontSize: 14 },
  };
}
```

- If your codebase uses a theme context, integrate `useTheme()` and merge values accordingly.

4) Motion — `src/components/Motion/`  — Difficulty: Medium | `🟡 G 3.6 F (M) — 1d | 3f | +2r`
- Create the missing files:
  - `src/components/Motion/MotionStyles.js`
  - `src/components/Motion/useMotionTheme.js`

- Example content:

`MotionStyles.js`
```js
const MotionStyles = {
  container: {},
  animated: {},
};
export default MotionStyles;
```

`useMotionTheme.js`
```js
export default function useMotionTheme() {
  return { duration: 300, easing: 'ease-in-out' };
}
```

5) Search — `src/components/Search/`  — Difficulty: Easy | `🟢 G 3.6 F (L) — 1d | 1f | +1r`
- Open `src/components/Search/useSearchTheme.js`.
- Return a usable theme object, example:

```js
export default function useSearchTheme() {
  return {
    container: { padding: 8 },
    input: { fontSize: 14, color: '#111' },
  };
}
```

6) Text — `src/components/Text/`  — Difficulty: Easy | `🟢 G 3.6 F (L) — 1d | 1f | +1r`
- Open `src/components/Text/Text.js`.
- Add the styles import if missing:

```js
import TextStyles from './TextStyles';
```

- Ensure the component uses `TextStyles`, e.g.:

```jsx
<Text style={TextStyles.body}>...</Text>
```

7) Check & Commit  — Difficulty: Easy | `🟢 G 3.6 F (L) — 1d | 0f | +2r`
- Run linter / typecheck / build if available:

```bash
npm run lint
npm run build
```

- Test screens that use changed components.
- Commit changes and open a PR:

```bash
git add .
git commit -m "fix(ui): resolve component architecture violations"
git push --set-upstream origin fix/ui-architecture
```

Notes:
- Adapt examples to your project's style-import pattern if it differs.
- If hooks should derive values from a theme context, call `const theme = useTheme()` and merge values.

End of document.
