# Стандарт UI-модуля: SharedLayoutWrapper

## 1. Что это за элемент и зачем он нужен
`SharedLayoutWrapper` — базовый оберточный контейнер экрана (выравнивание, фоновые цвета темы, отступы безопасности SafeArea).

## 2. Где находится в коде
- **Путь к исходникам:** [`src/components/SharedLayoutWrapper.js`](file:///d:/Magazine/_PigmentShop/src/components/SharedLayoutWrapper.js)

## 3. Пример использования
Обертка верхнего уровня на всех основных страницах для одинаковых отступов по краям экрана.

## 4. Что требуется для приведения к стандарту `_reference-module-spec.md`
- [ ] Превратить одиночный файл `SharedLayoutWrapper.js` в отдельный модуль `src/components/SharedLayoutWrapper/` со стандартными файлами (`index.js`, `SharedLayoutWrapper.js`, `SharedLayoutWrapperStyles.js`, `useSharedLayoutWrapperTheme.js`).
