# Roadmap: Полный переход на единую архитектуру типографики (Text & Heading)

## 🎯 Цель
Полностью избавиться от прямой зависимости от `Text` из `react-native`, устранить хардкод стилей шрифтов (`fontSize`, `fontFamily`, `lineHeight`) и кастомных hex-цветов в `StyleSheet`, приведя 100% компонентов к единым пресетам типографики (`Text` / `Heading`).

---

## 📌 Шаг 1: Миграция прямого импорта React Native Text (Админка и системные компоненты)
**Задача**: Заменить все оставшиеся импорты `import { Text } from 'react-native'` на единые компоненты-примитивы из `src/components/Text`.

### Target Files:
- [ ] `src/components/Admin/Products/ProductFormFields.js`
- [ ] `src/components/Admin/Media/MediaBrowserItem.js`
- [ ] `src/components/Admin/Media/MediaBrowserComponents.js`
- [ ] `src/components/Admin/FormModalLayout.js`
- [ ] `src/components/Admin/Analytics/OrderStatusChart.js`
- [ ] `src/components/Admin/Analytics/RevenueChart.js`
- [ ] `src/components/Admin/Analytics/TopProductsChart.js`
- [ ] `src/components/Admin/Analytics/DateRangeCalendar.js`
- [ ] `src/components/Admin/Analytics/CalendarDayCell.js`
- [ ] `src/components/Admin/Analytics/AnalyticsDashboard.js`
- [ ] `src/components/Admin/AdminPanel.js`
- [ ] `src/components/Badge/Badge.js`

---

## 📌 Шаг 2: Унификация размеров шрифтов и вариантов в стилях
**Задача**: Удалить явные переопределения `fontSize`, `lineHeight` и `fontFamily` в файлах стилей `StyleSheet` и перевести компоненты на соответствующий `variant` (`h1`-`h4`, `subtitle1`-`subtitle2`, `body1`-`body2`, `caption`, `overline`).

### Target Areas & Style Files:
- [ ] **Shell & Navigation**: `AppHeaderStyles.js`, `NavMenuStyles.js`, `UserDropdown.js`
- [ ] **Catalog & Filters**: `categoryCardStyles.js`, `CatalogFilterSidebarStyles.js`
- [ ] **Cart & Orders**: `CartViewStyles.js`, `OrderHeader.js`, `OrderDetailsCard.js`
- [ ] **Product & Reviews**: `ProductPageStyles.js`, `ProductCardStyles.js`, `ProductReviewsStyles.js`
- [ ] **Profile & User Settings**: `ProfilePageStyles.js`

---

## 📌 Шаг 3: Стандартизация палитры и темной темы
**Задача**: Заменить кастомные hex-коды (`#3B82F6`, `#D97706` и т.д.) на стандартизированные пропсы `color` примитива `Text` (`primary`, `secondary`, `muted`, `accent`, `danger`, `success`, `warning`).

### Target Files & Utilities:
- [ ] `src/utils/orderStatus.js` (перевод статусных подписей на системные токены цвета).
- [ ] `src/features/cart/CartViewStyles.js` (удаление дублирующих `colors.textMutedLight` / `colors.textDark`).
- [ ] `src/features/product/ProductCardStyles.js` (перевод всех акцентных ценников на `color="accent"`).
