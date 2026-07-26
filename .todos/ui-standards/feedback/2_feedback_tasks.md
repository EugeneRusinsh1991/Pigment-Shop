# Migration Tasks: Feedback

## Model Recommendations
- **Overall Parent Task:** 🟡 Gemini 3.6 Flash (Medium) - 17 files
- **Step 1:** 🟢 Gemini 3.6 Flash (Low) - 3 files
- **Step 2:** 🟢 Gemini 3.6 Flash (Low) - 3 files
- **Step 3:** 🟢 Gemini 3.6 Flash (Low) - 3 files
- **Step 4:** 🟡 Gemini 3.6 Flash (Medium) - 5 files
- **Step 5:** 🟢 Gemini 3.6 Flash (Low) - 3 files
- **Step 6:** 🟢 Gemini 3.6 Flash (Low) - 0 files

## Step 1: Standardize EmptyState
- Align `EmptyState/` layer structure with theme hooks and token styles.

## Step 2: Standardize InlineError
- Align `InlineError/` layer structure with theme hooks and token styles.

## Step 3: Standardize Skeleton
- Align `Skeleton/` loader layer structure with theme hooks and token styles.

## Step 4: Standardize Toast
- Align `Toast/` animation, theme, and view layer structure.

## Step 5: Unify Feedback Root Exports
- Synchronize root `FeedbackStyles.js`, `useFeedbackTheme.js`, and `index.js`.

## Step 6: Verification
- Run UI audit and health checks (`npm run audit:ui`, `npm run health`)
