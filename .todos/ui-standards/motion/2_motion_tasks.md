# Migration Tasks: Motion

## Model Recommendations
- **Overall Parent Task:** 🟡 Gemini 3.6 Flash (Medium) - 7 files
- **Step 1:** 🟢 Gemini 3.6 Flash (Low) - 3 files
- **Step 2:** 🟢 Gemini 3.6 Flash (Low) - 3 files
- **Step 3:** 🟢 Gemini 3.6 Flash (Low) - 0 files

## Step 1: Standardize PageTransition Animation Hook
- Rename/Refactor `src/components/Motion/PageTransition/useTransitionTheme.js` to `useMotionAnimation.js` (or export standard hook alias `useMotionAnimation`)
- Update `PageTransition.js` and `index.js` to use and re-export `useMotionAnimation`

## Step 2: Standardize ScrollFadeUp Animation Hook
- Alias or harmonize `useScrollAnimation` in `src/components/Motion/ScrollFadeUp/` with standard `useMotionAnimation` naming
- Update `ScrollFadeUp.js` and `index.js` exports

## Step 3: Verification
- Run UI audit and health checks (`npm run audit:ui`, `npm run health`)
