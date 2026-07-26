# Audit & Standardization Analysis: Typography & Text Components

## 🎯 Target Goal
Establish complete visual and structural standardization for all text rendered across the application by auditing raw `Text` usages, inline font/color overrides, variant mismatches, and theme inconsistency.

---

## 📌 Summary of Current Architecture & Gaps

### 1. Architectural Foundation
- **Primitives**: `src/components/Text/Text.js` (`Text`) & `src/components/Text/Heading.js` (`Heading`).
- **Styles & Presets**: `src/components/Text/TextStyles.js` defining `VARIANTS` (`h1`-`h4`, `subtitle1`-`subtitle2`, `body1`-`body2`, `caption`, `overline`).
- **Theme Provider Hook**: `src/components/Text/useTextTheme.js` handling light/dark colors and font settings.

---

## ⚠️ Unstandardized Text Findings & Audit Results

### 1. Legacy Direct React Native Text Imports (`import { Text } from 'react-native'`)
The following components bypass the unified typography primitive:
- `src/components/Admin/Products/ProductFormFields.js`
- `src/components/Admin/Media/MediaBrowserItem.js`
- `src/components/Admin/Media/MediaBrowserComponents.js`
- `src/components/Admin/FormModalLayout.js`
- `src/components/Admin/Analytics/OrderStatusChart.js`
- `src/components/Admin/Analytics/RevenueChart.js`
- `src/components/Admin/Analytics/TopProductsChart.js`
- `src/components/Admin/Analytics/DateRangeCalendar.js`
- `src/components/Admin/Analytics/CalendarDayCell.js`
- `src/components/Admin/Analytics/AnalyticsDashboard.js`
- `src/components/Admin/AdminPanel.js`
- `src/components/Badge/Badge.js`
- `src/components/icons/*` (`AppIcons.js`, `ControlIcons.js`, `CategoryIcons.js`, `AdminIcons.js`)

---

### 2. Style Overrides & Visual Discrepancies
- **Direct FontSize & LineHeight Overrides**: Multiple components wrap `<Text>` or `<Heading>` while passing arbitrary `style={{ fontSize: 13, lineHeight: 18 }}` (e.g., `CartViewStyles.js`, `ProductCardStyles.js`), leading to fragmented visual sizes instead of relying strictly on typography variants.
- **Color Inconsistency**: Hardcoded color hex codes (`#3B82F6`, `#D97706`, `#10B981`, `#EF4444`) are used directly in component styles (e.g., `orderStatus.js`) rather than unified color tokens (`color="secondary"`, `color="muted"`, `color="accent"`, `color="danger"`).
- **Font Family Fragmentation**: Mix of `fonts.sans` and explicit inline family definitions in `CartViewStyles`, `ProfilePageStyles`, and `ProductPageStyles`.

---

## 🛠️ Step-by-Step Standardization Action Plan

1. **Phase 1: Admin & Analytics Migration**
   - Replace all instances of `import { Text } from 'react-native'` in `src/components/Admin/` with `import { Text, Heading } from '../Text'`.

2. **Phase 2: Remove Hardcoded Inline Font Styles**
   - Refactor `StyleSheet` objects across `features/` and `components/` to remove static `fontSize` and `fontFamily` overrides in favor of native `variant` props (`body1`, `body2`, `caption`, `subtitle1`, `h1`-`h4`).

3. **Phase 3: Color Preset Standardization**
   - Map all raw hex strings used in texts to unified `color` prop values provided by `useTextTheme.js`.
