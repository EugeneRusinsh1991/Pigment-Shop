# Typography Warning Resolution: Step-by-Step Action Plan

Based on [typography-solution-foundation.md](file:///d:/Magazine/_PigmentShop/.todos/typography-solution-foundation.md)

**Parent Task (Whole Execution)**: 🔴 Gemini 3.1 Pro (High) - 8 files

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
  2. In consuming JSX components, use standard typography variants or primitive props on `<Text>` (e.g., `variant="caption"`, `variant="body2"`).

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
  2. In consuming components, update `<Text>` usages to use standard typography variants (e.g., `variant="body2"`, `variant="caption"`).

---

## Phase 3: Verification & Auditing
**Recommended Model**: 🟢 Gemini 3.6 Flash (Low) - 0 files

### Task 3.1: Runtime Warning Audit in `/admin`
- **Recommended Model**: 🟢 Gemini 3.6 Flash (Low) - 0 files
- **Actions**:
  1. Run browser automation or open `/admin` route in DEV mode.
  2. Verify no `[Typography Warning] Custom font override(s)` console warnings appear.
