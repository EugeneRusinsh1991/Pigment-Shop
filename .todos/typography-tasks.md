# Typography Warning Resolution: Step-by-Step Action Plan

Based on [typography-solution-foundation.md](file:///d:/Magazine/_PigmentShop/.todos/typography-solution-foundation.md)

**Parent Task (Whole Execution)**: 🔴 Gemini 3.1 Pro (High) - 8 files

---

## Phase 1: Shared UI Primitives Refactoring
**Recommended Model**: 🔴 Gemini 3.1 Pro (High) - 5 files

### Task 1.1: Refactor `Badge` Component & Styles
- **Recommended Model**: 🟡 Gemini 3.6 Flash (Medium) - 2 files
- **Files**:
  - `src/components/Badge/Badge.js`
  - `src/components/Badge/BadgeStyles.js`
- **Actions**:
  1. Remove `fontSize` properties from `BadgeStyles.js` (`smallText`, `mediumText`, `largeText`).
  2. In `Badge.js`, map size tokens (`small`, `medium`, `large`) to `<Text size={...}>` props instead of passing `fontSize` via `style`.
  3. Ensure custom `textStyle` prop does not pass forbidden typography styles directly.

### Task 1.2: Refactor `ChipButton` Component
- **Recommended Model**: 🟡 Gemini 3.6 Flash (Medium) - 1 file
- **Files**:
  - `src/components/Button/ChipButton.js`
- **Actions**:
  1. Inspect `ChipButton.js` where `fontSize: sizeToken.fontSize` is passed in `textStyle`.
  2. Extract `sizeToken.fontSize` and pass it directly as `size={sizeToken.fontSize}` prop to `<Text>`.
  3. Clean up `textStyle` array passed to `<Text>`.

### Task 1.3: Refactor `Card` Component & Styles
- **Recommended Model**: 🟡 Gemini 3.6 Flash (Medium) - 2 files
- **Files**:
  - `src/components/Card/Card.js`
  - `src/components/Card/CardStyles.js`
- **Actions**:
  1. Remove `fontSize` and `fontWeight` from `CardStyles.js` (`titleStyle`).
  2. In `Card.js`, pass `size={14}` and `weight="600"` (or `variant`) as props to `<Text>` instead of via `titleStyle`.

---

## Phase 2: Admin Module Styles Refactoring
**Recommended Model**: 🔴 Gemini 3.1 Pro (High) - 7 files

### Task 2.1: Clean up Admin Analytics Styles & Component
- **Recommended Model**: 🟠 Gemini 3.6 Flash (High) - 3 files
- **Files**:
  - `src/components/Admin/Analytics/AnalyticsStyles.js`
  - Consuming components (e.g. `AnalyticsDashboard.js`, `AnalyticsOverview.js`)
- **Actions**:
  1. In `AnalyticsStyles.js`, remove `fontSize` from `statIcon`, `xLabel`, `presetText`, `customDateDash`, `applyBtnText`.
  2. In consuming JSX components, pass `size` and `weight` props directly on `<Text>` (e.g., `<Text size={13} weight="medium">`).

### Task 2.2: Verify `RevenueChart` SVG Text Usage
- **Recommended Model**: 🟢 Gemini 3.6 Flash (Low) - 1 file
- **Files**:
  - `src/components/Admin/Analytics/RevenueChart.js`
- **Actions**:
  1. Check if SVG `<text>` element is imported from `react-native-svg` or wrapping custom `<Text>`.
  2. If custom `<Text>` is used, refactor to primitive props; if standard SVG `<text>` is used, ensure it is not triggering `warnFontOverrides`.

### Task 2.3: Clean up Admin Banners Styles & Component
- **Recommended Model**: 🟠 Gemini 3.6 Flash (High) - 3 files
- **Files**:
  - `src/components/Admin/Banners/BannersStyles.js`
  - Consuming components (e.g. `BannersManager.js`, `BannerCard.js`)
- **Actions**:
  1. In `BannersStyles.js`, remove `fontSize` from `addCardBtnText`, `addBtnText`, `saveBtnText`.
  2. In consuming components, update `<Text>` usages to use standard props (`size={14}`, `size={13}`).

---

## Phase 3: Verification & Auditing
**Recommended Model**: 🟢 Gemini 3.6 Flash (Low) - 0 files

### Task 3.1: Runtime Warning Audit in `/admin`
- **Recommended Model**: 🟢 Gemini 3.6 Flash (Low) - 0 files
- **Actions**:
  1. Run browser automation or open `/admin` route in DEV mode.
  2. Verify no `[Typography Warning] Custom font override(s)` console warnings appear.
