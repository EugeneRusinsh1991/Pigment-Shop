# Документация UI Auditor Suite

Комплексная система статического анализа кода для контроля архитектуры компонентов, дизайна, сервисного слоя и чистоты кода.

---

## 🚀 Быстрый запуск

Для выполнения всех аудитов запустите единый скрипт:

```bash
node .tools/ui-auditor/index.js
```
или
```bash
npx tsx .tools/ui-auditor/index.js
```

Все логи отчетов генерируются в папку:
[`file:///.docs/audits/`](file:///d:/Magazine/_PigmentShop/.docs/audits/)

---

## 📚 Пошаговое руководство по аудиторам

### 1. UI Architecture Audit (`ui-architecture-audit.js`)
* **Лог отчета:** [`01-ui-architecture-violations.log`](file:///d:/Magazine/_PigmentShop/.docs/audits/01-ui-architecture-violations.log)
* **Что делает:** Проверяет соблюдение архитектуры модулей и расположение файлов.
* **Что фиксирует:**
  1. `DOMAIN_RELOCATION_VIOLATION`: Компонент лежит в корне `src/components/` вместо изолированной папки компонента или фичи.
  2. `MODULE_DECOMPOSITION_VIOLATION`: В папке UI-компонента отсутствуют необходимые архитектурные элементы (`index.js`, `*Styles.js`, `use*Theme.js`).
* **Пример ошибки:**
  ```javascript
  // Плохо: src/components/MyButton.js (файл не упакован в папку)
  ```
* **Как правильно:**
  ```
  src/components/MyButton/
    ├── index.js             (Public Barrel Export)
    ├── MyButton.js          (UI View)
    ├── MyButtonStyles.js    (Token Style Factory)
    └── useMyButtonTheme.js  (Theme Hook)
  ```

---

### 2. Hardcoded Text Literals Audit (`hardcode-text-auditor.js`)
* **Лог отчета:** [`02-hardcode-text-violations.log`](file:///d:/Magazine/_PigmentShop/.docs/audits/02-hardcode-text-violations.log)
* **Что делает:** Сканирует JSX-разметку на наличие захардкоженных сырых текстовых строк без i18n или констант.
* **Что фиксирует:** `HARDCODED_TEXT_LITERAL`
* **Пример ошибки:**
  ```jsx
  // Плохо: Текст прямо в разметке
  <Text>Сохранить изменения</Text>
  ```
* **Как правильно:**
  ```jsx
  // Хорошо: Использование локализации или константы
  <Text>{t('common.save')}</Text>
  ```

---

### 3. Hardcoded Styles & Colors Audit (`hardcode-styles-auditor.js`)
* **Лог отчета:** [`03-hardcode-styles-violations.log`](file:///d:/Magazine/_PigmentShop/.docs/audits/03-hardcode-styles-violations.log)
* **Что делает:** Находит прямые HEX/RGB/RGBA цвета и инлайн стили вместо использования токенов дизайна.
* **Что фиксирует:** `HARDCODED_COLOR_VIOLATION`, `INLINE_STYLE_HARDCODE`
* **Пример ошибки:**
  ```jsx
  // Плохо: Прямой HEX-цвет и инлайн стиль
  <View style={{ backgroundColor: '#E31B23', padding: 10 }}>
  ```
* **Как правильно:**
  ```jsx
  // Хорошо: Использование фабрики стилей и токенов
  <View style={styles.container}>
  // В styles.js: backgroundColor: colors.accent
  ```

---

### 4. Typography Foundation Audit (`typography-auditor.js`)
* **Лог отчета:** [`04-typography-violations.log`](file:///d:/Magazine/_PigmentShop/.docs/audits/04-typography-violations.log)
* **Что делает:** Ищет ручные переопределения шрифтов (`fontSize`, `fontWeight`, `fontFamily`) вне файлов токенов типографики.
* **Что фиксирует:** `CUSTOM_TYPOGRAPHY_OVERRIDE`
* **Пример ошибки:**
  ```javascript
  // Плохо: Произвольный размер шрифта в стилях компонента
  title: {
    fontSize: 19,
    fontWeight: '700',
  }
  ```
* **Как правильно:**
  ```jsx
  // Хорошо: Использование стандартного компонента Text с токеном variant
  <Text variant="h2">Заголовок</Text>
  ```

---

### 5. Service Layer Isolation Audit (`service-layer-auditor.js`)
* **Лог отчета:** [`05-service-layer-violations.log`](file:///d:/Magazine/_PigmentShop/.docs/audits/05-service-layer-violations.log)
* **Что делает:** Проверяет, чтобы UI-компоненты не делали прямые вызовы к базе данных (Firestore/Firebase).
* **Что фиксирует:** `DIRECT_FIRESTORE_UI_IMPORT`
* **Пример ошибки:**
  ```jsx
  // Плохо: UI компонент напрямую импортирует и дергает Firestore
  import { getDoc, doc } from 'firebase/firestore';
  ```
* **Как правильно:**
  ```jsx
  // Хорошо: Использование абстракции сервиса или custom hook
  import { useProductDetails } from '@features/products';
  ```

---

### 6. Isolated Components Audit (`unused-exports-auditor.js`)
* **Лог отчета:** [`06-unused-exports-violations.log`](file:///d:/Magazine/_PigmentShop/.docs/audits/06-unused-exports-violations.log)
* **Что делает:** Находит изолированные UI-компоненты, которые созданы в `src/components/`, но нигде не импортируются и не используются.
* **Что фиксирует:** `ISOLATED_UI_COMPONENT`
* **Пример ошибки:** Папка `src/components/UnusedCard/` создана, но ни в одном другом файле приложения нет `import UnusedCard`.

---

### 7. Cyclic Imports Audit (`layer-imports-auditor.js`)
* **Лог отчета:** [`07-layer-imports-violations.log`](file:///d:/Magazine/_PigmentShop/.docs/audits/07-layer-imports-violations.log)
* **Что делает:** Строит граф импортов модулей и выявляет циклические зависимости (`A -> B -> A`).
* **Что фиксирует:** `CYCLIC_IMPORT_VIOLATION`
* **Пример ошибки:** `ModuleA.js` импортирует `ModuleB.js`, а `ModuleB.js` импортирует `ModuleA.js`.

---

### 8. Magic Numbers Audit (`magic-numbers-auditor.js`)
* **Лог отчета:** [`08-magic-numbers-violations.log`](file:///d:/Magazine/_PigmentShop/.docs/audits/08-magic-numbers-violations.log)
* **Что делает:** Выявляет критические хардкод-числа (произвольные `zIndex` и задержки `setTimeout` / `setInterval`).
* **Что фиксирует:** `HARDCODED_Z_INDEX`, `HARDCODED_TIMEOUT_DELAY`
* **Пример ошибки:**
  ```javascript
  // Плохо: Magic values
  zIndex: 9999;
  setTimeout(callback, 3500);
  ```
* **Как правильно:**
  ```javascript
  // Хорошо: Константы или токены
  zIndex: zIndex.modal;
  setTimeout(callback, TIMEOUTS.DEBOUNCE_DELAY);
  ```

---

## 🛠️ Как создать новый аудитор (Пошагово)

1. **Создайте файл аудитора** в `.tools/ui-auditor/my-custom-auditor.js`:
   ```javascript
   const fs = require('fs');
   const path = require('path');

   const SRC_DIR = path.join(__dirname, '../../src');
   const LOG_FILE = path.join(__dirname, '../../.docs/audits/09-my-custom-violations.log');

   function auditCustomRule() {
     const violations = [];
     // 1. Сканируем файлы в SRC_DIR
     // 2. Добавляем нарушения в массив violations
     // 3. Группируем по файлам и сохраняем лог в LOG_FILE
   }

   module.exports = { auditCustomRule };
   ```

2. **Подключите новый аудитор в `index.js`**:
   ```javascript
   const { auditCustomRule } = require('./my-custom-auditor');

   // В функции runAllAudits():
   try { auditCustomRule(); } catch (e) { console.error('Error 09:', e.message); }
   ```

3. **Запустите проверку**: `node .tools/ui-auditor/index.js`
