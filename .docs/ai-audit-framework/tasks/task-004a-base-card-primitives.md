# Task Spec: [TASK-004A] Base Card Primitives & Card Unification

## Metadata & Model Recommendation
- **Task ID**: TASK-004A
- **Complexity Rating**: 3 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: None
- **Dependent Tasks**: TASK-004C
- **Target Files**: 
  - `src/components/BaseCard.js`
  - `src/components/ProductCard.js`
  - `src/components/ProductCardStyles.js`
  - `src/components/CategoryCard.js`
  - `src/components/InteractiveCard.js`
  - `src/components/NavigationCard.js`
  - `src/components/PlaceholderCard.js`
  - `src/components/StaticCard.js`
  - `src/components/OrderCard.js`
  - `src/components/OrderCard.helpers.js`
  - `src/features/orders/OrderDetailsCard.js`
  - `src/features/profile/ProfileFormCard.js`

## Light Model Prompt Instruction
"Refactor `ProductCard`, `CategoryCard`, `OrderDetailsCard`, `InteractiveCard`, `NavigationCard`, `PlaceholderCard`, `StaticCard`, `OrderCard`, and `ProfileFormCard` to inherit from the core `<BaseCard>` primitive, unifying elevation shadows and border-radii design tokens across all card components."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Catalog Grid, Favorites Page, Order Details & Profile Edit Card
- **User Action**: Inspect all card components across shop and admin views.
- **Expected Result**: All card surfaces use uniform border-radius and shadow depth from theme tokens.
