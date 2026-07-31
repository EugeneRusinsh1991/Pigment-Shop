# План решения проблемы производительности корзины (Cart Drawer Optimization)

## 1. Выявленная проблема
При клике на `+` / `-` в боковой корзине происходит каскадный перерендер всего дерева компонента:
`CartDrawer` ➔ `CartDrawerList` ➔ `CartDrawerItem` ➔ `IconButton` ➔ `TouchableOpacity`.

Каждый клик заново перерисовывает **все** товары в корзине из-за отсутствия мемоизации и неоптимизированного обмена состоянием через `CartContext`.

---

## 2. Предлагаемое решение

### Шаг 1. Мемоизация элемента списка (`CartDrawerItem`)
Обернуть `CartDrawerItem` в `React.memo`, чтобы перерисовывался **только тот товар**, количество которого изменилось.

```jsx
// src/features/cart/components/CartDrawerItem.js
import React from 'react';

export const CartDrawerItem = React.memo(function CartDrawerItem({ item, onIncrement, onDecrement, onRemove }) {
  // ... existing component logic
});
```

### Шаг 2. Мемоизация коллбэков в `CartDrawerList`
Обернуть функции изменения количества в `useCallback`, чтобы ссылки на функции не пересоздавались при каждом рендере родителя.

```jsx
// src/features/cart/components/CartDrawerList.js
const handleIncrement = useCallback((id) => {
  updateQuantity(id, item.quantity + 1);
}, [updateQuantity]);
```

### Шаг 3. Селекторы и оптимизация `CartContext`
Разделить `CartContext` или оптимизировать провайдер состояния, чтобы компоненты, читающие только действия (например, `updateQuantity`), не перерисовывались при изменении общей стоимости `totalPrice` или массива `items`.

---

## 3. Файлы для изменения
1. `src/features/cart/components/CartDrawerItem.js` — добавить `React.memo`.
2. `src/features/cart/components/CartDrawerList.js` — добавить `useCallback` для обработчиков событий.
3. `src/context/CartContext.js` — оптимизировать значение контекста `useMemo`.

---

## 4. Критерии успеха (Ожидаемый результат)
- Время отклика при клике `+` / `-` сокращается с ~5.4ms на элемент до <1ms.
- В React Profiler при нажатии `+` на 1-й товар перерисовывается **только 1 элемент**, а остальные компоненты списка остаются серыми (Un-rendered).
