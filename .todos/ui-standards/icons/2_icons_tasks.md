# Задачи по миграции UI-модуля Icons на новую архитектуру

> **Спецификация и требования:** [`1_icons.md`](file:///d:/Magazine/_PigmentShop/.todos/ui-standards/icons/1_icons.md)

---

## 📊 Рекомендации моделей (Model Recommender)

- **Parent Task (Вся миграция целиком):** 🔴 Gemini 3.1 Pro (High) — 8 файлов
- **Пошаговая миграция (Subtasks):**
  - **Шаг 1:** 🟡 Gemini 3.6 Flash (Medium) — 2 файла
  - **Шаг 2:** 🟠 Gemini 3.6 Flash (High) — 4 файла
  - **Шаг 3:** 🟡 Gemini 3.6 Flash (Medium) — 2 файла
  - **Шаг 4:** 🟢 Gemini 3.6 Flash (Low) — 0 файлов (проверка)

---

## 📋 План выполнения шагов

### Шаг 1: Создание структуры модуля `Icons` и тема-хука/стилей
- [ ] Создать директорию [`src/components/Icons/`](file:///d:/Magazine/_PigmentShop/src/components/Icons/)
- [ ] Создать [`src/components/Icons/IconsStyles.js`](file:///d:/Magazine/_PigmentShop/src/components/Icons/IconsStyles.js) с токенами размера и цвета
- [ ] Создать [`src/components/Icons/useIconTheme.js`](file:///d:/Magazine/_PigmentShop/src/components/Icons/useIconTheme.js) для интеграции с `ThemeContext`

### Шаг 2: Перенос и адаптация групп иконок
- [ ] Перенести [`AdminIcons.js`](file:///d:/Magazine/_PigmentShop/src/components/icons/AdminIcons.js) в [`src/components/Icons/AdminIcons.js`](file:///d:/Magazine/_PigmentShop/src/components/Icons/AdminIcons.js)
- [ ] Перенести [`AppIcons.js`](file:///d:/Magazine/_PigmentShop/src/components/icons/AppIcons.js) в [`src/components/Icons/AppIcons.js`](file:///d:/Magazine/_PigmentShop/src/components/Icons/AppIcons.js)
- [ ] Перенести [`CategoryIcons.js`](file:///d:/Magazine/_PigmentShop/src/components/icons/CategoryIcons.js) в [`src/components/Icons/CategoryIcons.js`](file:///d:/Magazine/_PigmentShop/src/components/Icons/CategoryIcons.js)
- [ ] Перенести [`ControlIcons.js`](file:///d:/Magazine/_PigmentShop/src/components/icons/ControlIcons.js) в [`src/components/Icons/ControlIcons.js`](file:///d:/Magazine/_PigmentShop/src/components/Icons/ControlIcons.js)

### Шаг 3: Формирование публичного API и слоя обратной совместимости
- [ ] Создать публичный индекс [`src/components/Icons/index.js`](file:///d:/Magazine/_PigmentShop/src/components/Icons/index.js)
- [ ] Обновить фасад обратной совместимости в [`src/components/Icons.js`](file:///d:/Magazine/_PigmentShop/src/components/Icons.js)
- [ ] Настроить реэкспорт из устаревшей директории [`src/components/icons/`](file:///d:/Magazine/_PigmentShop/src/components/icons/)

### Шаг 4: Верификация и проверка аудитором
- [ ] Запустить `npm run health` (проверка целостности импортов)
- [ ] Запустить `npm run audit:ui` (проверка нарушений UI-архитектуры)
