# Task Spec: [TASK-005] Replace Hardcoded Hex Colors with Design Tokens

## Metadata & Model Recommendation
- **Task ID**: TASK-005
- **Complexity Rating**: 4 / 5 (+20% safety margin -> 🟠 **Gemini 3.6 Flash High**)
- **Recommended Agent Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Prerequisite Tasks**: None
- **Dependent Tasks**: None
- **Target Files**:
  - `src/components/NavigationCard.js`
  - `src/components/Footer.js`
  - `src/components/PageNavigation.js`
  - `src/components/FeaturedSections.js`
  - `src/components/NewArrivalsFooter.js`
  - `src/components/OrderCard.helpers.js`
  - `src/components/Media/VideoRenderer.js`
  - `src/components/icons/ControlIcons.js`
  - `src/components/icons/CategoryIcons.js`
  - `src/components/icons/AppIcons.js`
  - `src/components/icons/AdminIcons.js`

## Light Model Prompt Instruction
"Refactor all hardcoded hex color literals (`#0D0D0D`, `#FAF8F6`, `#94a3b8`, `#64748b`, `#38bdf8`, `#7c3aed`) in the target files above to use design tokens imported from `src/theme/tokens.js`."

## 🧪 Manual UI Verification Guide
- **App Screen**: Footer, Featured Sections, Navigation Cards
- **User Action**: Toggle between Light Mode and Dark Mode
- **Expected Result**: All section backgrounds, borders, text, and icons adapt smoothly to theme tokens with no missing or contrasting color artifacts.
