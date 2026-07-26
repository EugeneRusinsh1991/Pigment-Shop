# Step-by-Step Migration: Hardcoded Styles to Theme Tokens

## Overview
Устранение 1255 захардкоженных стилей (HEX/RGB цвета, отступы, типографика) в 166 файлах и их перенос в централизованную систему токенов темы (`src/theme/`).

## Recommended Models
- **Parent Task (All Steps):** 🔴 G 3.1 P (H) — 15d | 166f | +10ctx
- ⚠️ **Action: BREAK DOWN INTO SUBTASKS** (execute step-by-step)

---

## Step 1: Centralize Theme Tokens
- **Recommended Model:** 🟠 G 3.6 F (H) — 1d | 4f | +2ctx
- Проверить и дополнить токены в `src/theme/` (цвета, отступы, шрифты, радиусы скругления).
- Убедиться, что все часто используемые захардкоженные цвета (например, палитра админки, статусные цвета) присутствуют в теме.

---

## Step 2: Refactor Admin Panel Base & Navigation
- **Recommended Model:** 🟠 G 3.6 F (H) — 2d | 4f | +2ctx
Заменить захардкоженные стили на токены в базовых стилях админки:
- [ ] `src/AppStyles.js`
- [ ] `src/components/Admin/AdminPanel.js`
- [ ] `src/components/Admin/AdminPanelStyles.js`
- [ ] `src/components/Admin/LanguageTabs.js`

---

## Step 3: Admin Analytics (Dashboards & Calendars)
- **Recommended Model:** 🟠 G 3.6 F (H) — 1d | 5f | +2ctx
- [ ] `src/components/Admin/Analytics/AnalyticsDashboard.js`
- [ ] `src/components/Admin/Analytics/AnalyticsStyles.js`
- [ ] `src/components/Admin/Analytics/CalendarDayCell.js`
- [ ] `src/components/Admin/Analytics/DateRangeCalendar.js`
- [ ] `src/components/Admin/Analytics/DateRangeCalendarStyles.js`

---

## Step 4: Admin Analytics (Charts & Pickers)
- **Recommended Model:** 🟠 G 3.6 F (H) — 1d | 4f | +2ctx
- [ ] `src/components/Admin/Analytics/DateRangePicker.js`
- [ ] `src/components/Admin/Analytics/OrderStatusChart.js`
- [ ] `src/components/Admin/Analytics/RevenueChart.js`
- [ ] `src/components/Admin/Analytics/TopProductsChart.js`

---

## Step 5: Admin Banners & Category Forms
- **Recommended Model:** 🟠 G 3.6 F (H) — 2d | 5f | +2ctx
- [ ] `src/components/Admin/Banners/BannersStyles.js`
- [ ] `src/components/Admin/Categories/CategoriesStyles.js`
- [ ] `src/components/Admin/Categories/CategoryFormContent.js`
- [ ] `src/components/Admin/Categories/CategoryFormFields.js`
- [ ] `src/components/Admin/Categories/CategoryFormFooter.js`

---

## Step 6: Admin Category Tables & Rows
- **Recommended Model:** 🟠 G 3.6 F (H) — 1d | 4f | +2ctx
- [ ] `src/components/Admin/Categories/CategoryFormStyles.js`
- [ ] `src/components/Admin/Categories/CategoryProductSection.js`
- [ ] `src/components/Admin/Categories/CategoryRow.js`
- [ ] `src/components/Admin/Categories/CategoryRowElements.js`

---

## Step 7: Admin Orders (Cards & Details)
- **Recommended Model:** 🟠 G 3.6 F (H) — 1d | 5f | +2ctx
- [ ] `src/components/Admin/Orders/AdminNoteSection.js`
- [ ] `src/components/Admin/Orders/OrderCustomerCard.js`
- [ ] `src/components/Admin/Orders/OrderDetails.js`
- [ ] `src/components/Admin/Orders/OrderItemsList.js`
- [ ] `src/components/Admin/Orders/OrderRow.js`

---

## Step 8: Admin Orders (Tables & Dropdowns)
- **Recommended Model:** 🟠 G 3.6 F (H) — 1d | 5f | +2ctx
- [ ] `src/components/Admin/Orders/OrdersStyles.js`
- [ ] `src/components/Admin/Orders/OrdersTable.js`
- [ ] `src/components/Admin/Orders/OrdersTableControls.js`
- [ ] `src/components/Admin/Orders/OrderStatusDropdownMenu.js`
- [ ] `src/components/Admin/Orders/OrderStatusSelector.js`

---

## Step 9: Admin Products (Forms & Modals)
- **Recommended Model:** 🟠 G 3.6 F (H) — 1d | 4f | +2ctx
- [ ] `src/components/Admin/Products/MobileProductRow.js`
- [ ] `src/components/Admin/Products/ProductFormFields.js`
- [ ] `src/components/Admin/Products/ProductFormModal.js`
- [ ] `src/components/Admin/Products/ProductFormStyles.js`

---

## Step 10: Admin Products (Rows & Filters)
- **Recommended Model:** 🟠 G 3.6 F (H) — 1d | 4f | +2ctx
- [ ] `src/components/Admin/Products/ProductRowComponents.js`
- [ ] `src/components/Admin/Products/ProductRowVariants.js`
- [ ] `src/components/Admin/Products/ProductsFilterBar.js`
- [ ] `src/components/Admin/Products/ProductsStyles.js`

---

## Step 11: Verification & Cleanup
- **Recommended Model:** 🟢 G 3.6 F (L) — 0d | 0f | +0ctx
- Запустить UI аудит для проверки устранения нарушений:
  ```bash
  npm run audit:ui
  ```
- Проверить общее здоровье проекта:
  ```bash
  npm run health
  ```
