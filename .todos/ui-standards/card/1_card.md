# Стандарт UI-модуля: Card

## 1. Что это за элемент и зачем он нужен
`Card` — универсальный контейнер контента с несколькими подтипами (`BaseCard`, `InteractiveCard`, `NavigationCard`, `StaticCard`, `CardShadow`).

## 2. Где находится в коде
- **Путь к исходникам:** [`src/components/Card/`](file:///d:/Magazine/_PigmentShop/src/components/Card/)
- **Файлы:**
  - `Card.js`, `BaseCard.js`, `InteractiveCard.js`, `NavigationCard.js`, `StaticCard.js`, `CardShadow.js`
  - `CardStyles.js`
  - `useCardTheme.js`
  - `useCardAnimation.js`
  - `index.js`

## 3. Пример использования
Карточки товаров на главной и в каталоге, карточки заказов и аналитики в админ-панели.

## 4. Что требуется для приведения к стандарту `_reference-module-spec.md`
- [ ] Консолидировать подтипы карт в соответствии с принципом Composition Before Proliferation.
- [ ] Синхронизировать API с `card-module-spec.md`.
