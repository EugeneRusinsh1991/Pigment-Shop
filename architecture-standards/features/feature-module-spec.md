# Engineering Standard: Feature Module Specification

> [!NOTE]
> This engineering standard defines the module architecture, component boundaries, state management, and file structure for all **Feature Modules** (pages and key user flows) across PigmentShop.

---

## 1. Purpose & Semantic Scope

A **Feature** (фича / страница) — это законченный бизнес-сценарий или пользовательский экран приложения (например: `catalog`, `cart`, `admin`, `orders`, `profile`).

### Разница между UI Component и Feature:
- **UI Component** (`src/components/`): Переиспользуемый "кубик" без знания о бизнес-логике (Button, Modal, Input).
- **Feature** (`src/features/`): Полноценная страница/экран, объединяющая бизнес-логику, хуки данных и свои внутренние UI-компоненты.

---

## 2. Public API Strategy (`index.js`)

Каждая фича обязана экспортировать свою точку входа через публичный контракты `index.js`.

### Export Contract:
```javascript
export { default as CatalogPage } from './CatalogPage';
```

---

## 3. Directory & Layer Architecture

```text
src/features/<feature-name>/
├── components/          # Частные UI-компоненты фичи
├── hooks/               # Доменные хуки фичи (фильтрация, запросы)
├── styles/              # Токенизированные стили фичи
├── <FeatureName>Page.js # Корневой компонент страницы
└── index.js             # Публичный контракты фичи
```
