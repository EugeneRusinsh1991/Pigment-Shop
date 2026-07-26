# Стандарт UI-модуля: Search

## 1. Что это за элемент и зачем он нужен
`Search` — комплексный модуль поиска с выпадающими подсказками (`SearchInput`, `SearchDropdown`, `AutocompleteSearch`).

## 2. Где находится в коде
- **Путь к исходникам:** [`src/components/Search/`](file:///d:/Magazine/_PigmentShop/src/components/Search/)
- **Текущие файлы:**
  - `SearchInput.js`, `SearchDropdown.js`, `AutocompleteSearch.js`
  - `SearchStyles.js`
  - `useSearchTheme.js`
  - `index.js`

## 3. Пример использования
Поисковая строка в шапке магазина с «живым» полем подбора колеров и пигментов при вводе букв.

## 4. Что требуется для приведения к стандарту `_reference-module-spec.md`
- [ ] Добавить `useSearchAnimation.js` для анимации открытия/закрытия дропдауна результатов.
- [ ] Проверить соблюдение токенов темы.
