# Step-by-step Resolution — Fixing UI Architecture Violations | `� G 3.6 F (M) — 4d | 4f | +6r`

Source report: .docs/audits/audits/01-ui-architecture-violations.log

Objective: Bring component structure in line with standards (Styles, Hooks, Main Component) and fix the reported violations.

> ⚠️ **Action**: BREAK DOWN INTO SUBTASKS

Steps (with difficulty):

1) Preparation  — Difficulty: Easy | `🟢 G 3.6 F (L) — 1d | 0f | +1r`
- Create a separate branch / commit before changes: `git checkout -b fix/ui-architecture`.
- Open the report file: `.docs/audits/audits/01-ui-architecture-violations.log`.

2) Motion — `src/components/Motion/`  — Difficulty: Medium | `🟡 G 3.6 F (M) — 1d | 2f | +2r` ✅ DONE
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

3) Text — `src/components/Text/`  — Difficulty: Easy | `🟢 G 3.6 F (L) — 1d | 1f | +1r` ✅ DONE
- Open `src/components/Text/Text.js`.
- Add the styles import if missing:

```js
import TextStyles from './TextStyles';
```

- Ensure the component uses `TextStyles`, e.g.:

```jsx
<Text style={TextStyles.body}>...</Text>
```

4) Check & Commit  — Difficulty: Easy | `🟢 G 3.6 F (L) — 1d | 0f | +2r`
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
