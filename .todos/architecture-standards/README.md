# 🚀 Инструкция по работе с Архитектурными Стандартами

Этот документ описывает пошаговый порядок выполнения работ по архитектуре проекта и рекомендуемые модели ИИ.

---

## 🤖 Рекомендуемые Модели

- **При пошаговом выполнении (1 шаг за 1 раз)**:
  - Создание стандарта (markdown): 🟡 **Gemini 3.6 Flash (Medium)**
  - Аудит кода и роадмап (20+ файлов): 🔴 **Gemini 3.1 Pro (High)**
  - Написание кода / рефакторинг: 🟠 **Gemini 3.6 Flash (High)** / 🔴 **3.1 Pro**

- **При пакетном выполнении (все 3 шага за раз)**:
  - 🔴 **Gemini 3.1 Pro (High)** (обязательно из-за огромного контекста всей системы).

---

## 📌 Порядок выполнения (по приоритету)

1. **`_1_service-layer`** — Слои работы с данными, API и Firebase.
2. **`_2_state-management`** — Управление состоянием и React Context.
3. **`_3_domain-layer`** — Выделение чистой бизнес-логики.

---

## 💬 Готовые промпты для работы в новом окне

### 🔹 Шаг 1: Service Layer
**Промпт 1.1 (Создание спецификации)** — 🟡 Flash Medium:
```text
@.todos/architecture-standards/_1_service-layer/README.md проанализируй задачу и создай стандарт .docs/architecture-standards/services-module-spec.md
```
**Промпт 1.2 (Аудит и план)** — 🔴 Pro High:
```text
проведи аудит файлов в src/services/ на соответствие .docs/architecture-standards/services-module-spec.md и состави роадмап рефакторинга
```
**Промпт 1.3 (Выполнение)** — 🟠 Flash High:
```text
выполни шаг 1 из роадмапа рефакторинга сервисов
```

---

### 🔹 Шаг 2: State Management
**Промпт 2.1 (Создание спецификации)** — 🟡 Flash Medium:
```text
@.todos/architecture-standards/_2_state-management/README.md проанализируй задачу и создай стандарт .docs/architecture-standards/state-module-spec.md
```
**Промпт 2.2 (Аудит и план)** — 🔴 Pro High:
```text
проведи аудит контекстов в src/context/ на соответствие state-module-spec.md и исправь проблемы с лишними ререндерами
```

---

### 🔹 Шаг 3: Domain Layer
**Промпт 3.1 (Создание спецификации)** — 🟡 Flash Medium:
```text
@.todos/architecture-standards/_3_domain-layer/README.md проанализируй задачу и создай стандарт .docs/architecture-standards/domain-module-spec.md
```
**Промпт 3.2 (Выделение чистой логики)** — 🔴 Pro High:
```text
выдели чистую бизнес-логику из сервисов и компонентов в src/domain/ по новому стандарту
```
