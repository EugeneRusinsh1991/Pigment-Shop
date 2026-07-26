# Foundation: Solving Admin Typography Console Warnings

## 1. Root Cause Analysis

When accessing `/admin`, the console logs the following warning:
```
[Typography Warning] Custom font override(s) [fontSize] passed to Text via style prop. Use variant or primitive props instead.
```

### Why it occurs only in `/admin`
During previous refactoring phases, main user-facing pages (Home, Catalog, NavMenu, etc.) were migrated to use standard typography props (`variant`, `size`, `weight`, `color`) on `<Text>` and `<Heading>` primitives instead of passing typography styling via the `style` prop.

The `/admin` module and several shared UI primitives rendered within it were not fully migrated. When `<Text style={...}>` receives a style object or style array containing any forbidden keys (`fontSize`, `lineHeight`, `fontWeight`, `fontFamily`), `src/components/Text/Text.js` triggers `warnFontOverrides(style)` in `__DEV__` mode.

---

## 2. Identified Problem Sources

### A. Admin Module Style Definitions
Several Admin style sheets define forbidden typography keys directly within `StyleSheet.create`:
- **`src/components/Admin/Analytics/AnalyticsStyles.js`**:
  - `statIcon`: `{ fontSize: 18 }`
  - `xLabel`: `{ fontSize: 9 }`
  - `presetText`: `{ fontSize: 13 }`
  - `customDateDash`: `{ fontSize: 16 }`
  - `applyBtnText`: `{ fontSize: 14 }`
- **`src/components/Admin/Analytics/RevenueChart.js`**:
  - Uses `<text fontSize="9" ...>` inside SVG rendering.
- **`src/components/Admin/Banners/BannersStyles.js`**:
  - `addCardBtnText`: `{ fontSize: 14 }`
  - `addBtnText`: `{ fontSize: 13 }`
  - `saveBtnText`: `{ fontSize: 13 }`

### B. Shared UI Primitives Rendered in Admin
When Admin renders shared components (`Badge`, `ChipButton`, `Card`), internal style maps containing typography properties are passed down into `<Text>` via the `style` prop:
- **`src/components/Badge/Badge.js` & `BadgeStyles.js`**: Passes `textStyle` (containing `{ fontSize: 10/11/12 }`) to `<Text style={[...textStyle, textStyleProp]}>`.
- **`src/components/Button/ChipButton.js`**: Passes `{ fontSize: sizeToken.fontSize }` inside the `textStyle` prop array to `<Text>`.
- **`src/components/Card/Card.js` & `CardStyles.js`**: Passes `titleStyle` (containing `{ fontSize: 14, fontWeight: '600' }`) directly to `<Text style={[...titleStyle, style]}>`.

---

## 3. Refactoring Strategy (Solution Foundation)

To eliminate the warnings without breaking visual aesthetics or architectural standards:

### Phase 1: Refactor Admin Module Styles
1. **Remove Inline Typography from Stylesheets**: Delete `fontSize`, `fontWeight`, and `lineHeight` from `AnalyticsStyles.js` and `BannersStyles.js`.
2. **Use Primitive Props in Components**: Update consuming Admin components (`AnalyticsDashboard`, `BannersManager`, etc.) to pass typography props directly to `<Text>` (e.g., `<Text variant="body2" size={13} weight="medium">`).

### Phase 2: Refactor Shared UI Primitives (`Badge`, `ChipButton`, `Card`)
1. **Decouple Token Styles from Style Props**: Modify primitive wrappers so typography size and weight tokens are mapped to `<Text>` props (`size`, `variant`, `weight`) rather than passed as style objects in `style={...}`.
2. **Primitive Verification**: Ensure that internal design system tokens do not trigger developer warnings when rendered inside standard container primitives.
