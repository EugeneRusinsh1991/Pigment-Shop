# Проблема: Перекрытие теней карточек и элементов макета футером (все страницы)

## Описание проблемы
На всех страницах приложения (`Home`, `Catalog`, `Cart`, `Profile` и др.) перед футером наблюдается перекрытие нижних элементов (в частности, теней карточек `box-shadow`) или обрезка их визуальных слоев футером.

**Скриншот:** `d:\Magazine\_PigmentShop\.logs\manual-browser-log\S_22-07-35_Home.jpg`

---

## Подробный анализ причин возникновения (Stacking Context & Overflow)

### 1. Порядок наложения слоев и `z-index` / `position` у `Footer`
Если у `Footer` или его контейнера заданы:
- `position: relative` (или `fixed`/`sticky`) и `z-index: 1` (или выше),
- а у карточек / списка товаров `z-index: auto` (или отсутствует `position`),

то `Footer` образует контекст наложения с более высоким приоритетом отрисовки. В результате белый/темный фон футера физически перекрывает нижнюю тень карточек (`box-shadow`), находящихся прямо над ним.

### 2. Обрезка теней контейнерами (`overflow: hidden` / `overflow: clip`)
В цепочке родительских компонентов:
`PageScrollLayout` → `SharedLayoutWrapper` → `content` → `CatalogView` → `ProductGrid`

Наличие любого из свойств:
- `overflow: 'hidden'`
- `overflowY: 'hidden'`
- `contain: 'paint'` / `clip-path`

приводит к точной обрезке выходящей за границы карточки тени (`box-shadow`), что визуально выглядит как срезанная граница/перекрытие перед футером.

### 3. Фон футера поверх нижних теней без изолирующего отступа
Фон `Footer` (например, `colors.surfaceDark` или `colors.productCardLight`) рисуется в потоке DOM ниже списка элементов. При отсутствии достаточного внешнего/внутреннего отступа для тени (`box-shadow`), тень физически попадает под плашку фона футера.

### 4. Создание нового Stacking Context родителями
Наличие на родительских блоках карточек свойств, вызывающих новый контекст наложения (например, `transform`, `filter`, `opacity < 1`, `isolation: isolate`), приводит к тому, что `z-index` карточки не может подняться выше `Footer`.

---

## Способы решения проблемы

Чтобы исправить перекрытие и срезание элементов/теней перед футером, необходимо выполнить следующие шаги в коде:

### 1. Исправление обрезки теней (`overflow: 'hidden'`)
В [PageTransition.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Motion/PageTransition/PageTransition.js#L30) и контейнерах карточек изменить `overflow: 'hidden'` на `overflow: 'visible'`:
```javascript
// В PageTransition.js
styles.transitionContainer: {
  flex: 1,
  width: '100%',
  overflow: 'visible', // <-- Было hidden, из-за чего тени срезались по границе
}
```

### 2. Компенсация отступа для выходящих теней (`paddingBottom` / `marginBottom`)
Чтобы нижняя тень (`box-shadow`) последней строчки карточек не прилегала вплотную к верхней границе футера и не обрезалась визуально плашкой фона футера, задать гарантированный отступ у сетки/контейнера:
```javascript
// В DiscountsSection.js / CatalogListFooter.js
footerProductsSection: {
  marginTop: layout.spacing.sm,
  paddingBottom: layout.spacing.md, // <-- Запас высоты для нижней тени карточек
}
```

### 3. Гарантированный отступ в `SharedLayoutWrapper`
В [SharedLayoutWrapperStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/SharedLayoutWrapper/SharedLayoutWrapperStyles.js#L17) убедиться, что область контента дает запасы для выходящих вниз элементов перед `footerRegion`.

---

## План действий по исправлению

- [x] Изменить `overflow: 'hidden'` на `overflow: 'visible'` в `PageTransition.js`.
- [x] Добавить отступ `paddingBottom: layout.spacing.md` для контейнеров секций товаров (`footerProductsSection`), предотвращающий подлезание тени под футер.
- [x] Восстановить стандартный вид футера в `FooterStyles.js` (убрать прозрачность `opacity: 0.3`).



