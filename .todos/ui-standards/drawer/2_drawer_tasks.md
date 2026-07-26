# План миграции UI-модуля: Drawer

> Основан на стандарте разработки [`drawer-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/drawer-module-spec.md) и базовом регламенте [`_reference-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/_reference-module-spec.md).

---

## 1. Обзор текущего состояния
- **Текущая директория:** [`src/components/Drawer/`](file:///d:/Magazine/_PigmentShop/src/components/Drawer/)
- **Текущие файлы:**
  - `Drawer.js` (монолитный компонент: внутри смешаны рендеринг, `Animated.Value`, жеты/тайминги и локальные стили `StyleSheet.create`)
  - `index.js` (базовый экспорт)

---

## 2. Пошаговые задачи рефакторинга

### Шаг 1: Создание фабрики стилей `DrawerStyles.js`
- [ ] Создать файл `src/components/Drawer/DrawerStyles.js`.
- [ ] Перенести `StyleSheet.create` из `Drawer.js`.
- [ ] Заменить все хардкод-значения (цвета, размеры, radiuses, zIndex) на токены из [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js).
- [ ] Добавить расчет динамических стилей в зависимости от пропа `position` (`left`, `right`, `top`, `bottom`).

### Шаг 2: Вынос логики темы в `useDrawerTheme.js`
- [ ] Создать хук `src/components/Drawer/useDrawerTheme.js`.
- [ ] Реализовать резолвинг `ThemeContext` (светлая/тёмная тема).
- [ ] Возвращать готовые стили контейнера, оверлея (`OverlayBackdrop`) и границ.

### Шаг 3: Вынос анимации и жестов в `useDrawerAnimation.js`
- [ ] Создать хук `src/components/Drawer/useDrawerAnimation.js`.
- [ ] Перенести инициализацию `Animated.Value` (`slideAnim`, `backdropOpacity`).
- [ ] Реализовать функции открытия/закрытия с использованием параметров `motion.drawer` из `tokens.js`.
- [ ] Безопасно вызывать `onClose` колбэк только после завершения анимации выезда.

### Шаг 4: Рефакторинг основного компонента `Drawer.js`
- [ ] Очистить `Drawer.js` от анимационной логики и стилей.
- [ ] Подключить `useDrawerTheme` и `useDrawerAnimation`.
- [ ] Оставить только чистую верстку (Overlay + Animated Container + Children).

### Шаг 5: Обновление публичного API `index.js`
- [ ] Проверить экспорты в `src/components/Drawer/index.js`.
- [ ] Добавить экспорт хуков `useDrawerTheme` и `useDrawerAnimation` при необходимости.

---

## 3. Критерии приемки (Definition of Done)
- [ ] Модуль состоит из 5 файлов согласно архитектурному стандарту.
- [ ] Нет ни одного хардкод-цвета, px-отступа или магической длительности анимации.
- [ ] Отсутствуют console warning'и при открытии/закрытии.
- [ ] Сохранена 100% обратная совместимость с существующими вызовами `<Drawer />`.
