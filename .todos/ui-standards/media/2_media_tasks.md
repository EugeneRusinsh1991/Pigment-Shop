# Migration Tasks: Media

## Model Recommendations
- **Overall Parent Task:** 🟡 Gemini 3.6 Flash (Medium) - 6 files
- **Step 1:** 🟢 Gemini 3.6 Flash (Low) - 1 file
- **Step 2:** 🟢 Gemini 3.6 Flash (Low) - 1 file
- **Step 3:** 🟡 Gemini 3.6 Flash (Medium) - 4 files
- **Step 4:** 🟢 Gemini 3.6 Flash (Low) - 0 files

## Step 1: Extract Media Styles
- Create `MediaStyles.js` in `src/components/Media/` with standard token bindings for image, gif, and video player containers.

## Step 2: Create Theme Hook
- Create `useMediaTheme.js` in `src/components/Media/` for theme-aware background/overlay states.

## Step 3: Refactor Components & Exports
- Update `GifRenderer.js`, `VideoRenderer.js`, and `MediaRenderer.js` to use `useMediaTheme` and `MediaStyles.js`.
- Update `index.js` to re-export `useMediaTheme` and `mediaStyles`.

## Step 4: Verification
- Run UI audit and health checks (`npm run audit:ui`, `npm run health`)
