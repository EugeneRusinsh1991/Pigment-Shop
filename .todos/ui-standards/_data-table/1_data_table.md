# Стандарт UI-модуля: DataTable

## 1. Что это за элемент и зачем он нужен
`DataTable` — таблица данных с поддержкой сортировки, пагинации, выбора строк и отображением пустого состояния (`EmptyState`).

## 2. Где находится в коде
- **Путь к исходникам:** [`src/components/DataTable/`](file:///d:/Magazine/_PigmentShop/src/components/DataTable/)
- **Текущие файлы:**
  - `DataTable.js` (монолит)
  - `DataTable.styles.js`
  - `EmptyState.js`

## 3. Пример использования
Таблица заказов, списки пользователей и таблица остатков товаров на складе в административной панели (`/admin`).

## 4. Что требуется для приведения к стандарту `_reference-module-spec.md`
- [ ] Создать `index.js` (публичный экспорт).
- [ ] Переименовать `DataTable.styles.js` в `DataTableStyles.js` и перевести на токены.
- [ ] Выделить хук темы `useDataTableTheme.js`.
- [ ] Выделить хук взаимодействия/анимации `useDataTableAnimation.js` (или хук состояния таблицы).
