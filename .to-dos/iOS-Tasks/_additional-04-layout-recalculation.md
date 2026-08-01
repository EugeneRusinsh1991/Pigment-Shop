### 4. Layout Recalculation Stale State After Visual Viewport Resizing
- **Codebase Evidence:**
  - Over 25+ project files (e.g., `src/hooks/useAppShell.js`, `src/hooks/useCatalogLayout.js`, `src/hooks/useCardDimensions.js`) import and consume `useWindowDimensions()` from `'react-native'`.
  - `src/components/ui/Modal/Modal.js` and `src/components/ui/Drawer/Drawer.js` rely on static screen height calculation without subscribing to `window.visualViewport` dynamic resize events during soft keyboard display.
- **Root Cause Analysis:**
  - **iOS Safari (Primary Focus):** In mobile WebKit (iOS Safari), when a user focuses a form input (such as search bar or address input), the soft virtual keyboard slides up. iOS Safari resizes `window.visualViewport` (updating `visualViewport.height` and `visualViewport.offsetTop`), but **does not** resize `window.innerWidth`/`innerHeight` or fire standard `window.onresize` window events. Because React Native Web's standard `useWindowDimensions()` hook only listens to standard window `resize` events, layout height calculations remain stale. Consequently, drawer panels, modal forms, and bottom action bars do not adjust their layout positioning, causing focused text inputs or action buttons to become hidden under the virtual keyboard.
  - **Android Chrome & Shared Mobile Context (Cross-Platform):** On Android Chrome, soft keyboard opening resizes the visual viewport, but behavior varies based on `viewport` meta tags and browser settings (`interactive-widget=resizes-visual` vs `resizes-content`). Furthermore, dynamic Chrome address bar expansion/collapse alters `visualViewport.height` before `window.onresize` fires. Providing a unified visual viewport dimensions hook guarantees consistent real-time layout recalculations across both WebKit (iOS Safari) and Blink (Android Chrome) mobile engines.
  - **Native Environments:** On Native iOS (`Platform.OS === 'ios'`) and Android (`Platform.OS === 'android'`), React Native handles keyboard layout adjustments through native `Keyboard` listeners (`Keyboard.addListener('keyboardDidShow')`) and native layout layers. WebKit `visualViewport` events are strictly a Web execution concern (`Platform.OS === 'web'`).
- **Severity:** Medium (iOS Safari) / Medium (Cross-Platform Mobile Web)
- **Recommended Solution:**
  - Create a web-optimized `useVisualViewportDimensions()` custom hook in `src/hooks/useVisualViewportDimensions.js` that subscribes to `window.visualViewport.addEventListener('resize')` on Web and falls back to standard `useWindowDimensions()` on native platforms.
  - Integrate `useVisualViewportDimensions()` in core shell and overlay layouts (`useAppShell.js`, `Drawer.js`, `Modal.js`).
- **Alternative Explanations & Rejection:**
  - *Hypothesis:* React Native Web `useWindowDimensions` automatically tracks `window.visualViewport`. (Rejected: React Native Web binds `Dimensions` strictly to standard window resize event dispatchers. `visualViewport` events are WebKit/Blink visual viewport events that require explicit event listeners).
- **Confidence Level:** High (90% — Codebase confirms widespread reliance on `useWindowDimensions` without `visualViewport` event integration)

---

### Investigation Summary
- **Status:** Confirmed
- **Severity:** Medium (iOS Safari) / Medium (Cross-Platform Web)
- **Confidence:** High (90%)
- **Target Locations:** `src/hooks/useVisualViewportDimensions.js` (NEW), `src/hooks/useAppShell.js`, `src/components/ui/Modal/Modal.js`, `src/components/ui/Drawer/Drawer.js`
- **Recommended Remediation:** Implement `useVisualViewportDimensions()` custom hook and integrate across modal/shell components.

---

### Инструкция по проверке UI изменений (Подробно для тестировщика)

#### 1. Где и как открыть проект для проверки:
- Убедитесь, что сервер разработки запущен в консоли проекта (`npm run dev`).
- Откройте веб-браузер (Safari на iOS / iPhone или Chrome на Android / ПК) по адресу: **`http://localhost:8081`** (или соответствующий локальный IP адрес).
- Для проверки на ПК открывайте **DevTools (F12)** -> включите режим эмуляции устройств **Toggle Device Toolbar** (`Ctrl + Shift + M` / `Cmd + Shift + M`).
- Выберите устройство **iPhone 14 Pro** (для проверки iOS Safari) или **Pixel 5** (для проверки Android Chrome).

#### 2. Что конкретно нажать и какие действия выполнить:
1. Перейдите на любую страницу с текстовыми полями ввода (например, поиск в шапке `AppHeader`, форма оформления заказа в модальном окне или поле ввода количества/ промокода в корзине).
2. Нажмите на текстовое поле ввода (фокус в `input`), чтобы вызвть появление виртуальной экранной клавиатуры на телефоне (или симулируйте появление виртуальной клавиатуры в мобильном режиме браузера).
3. **Проверка подстройки высоты интерфейса (Visual Viewport Resize Test):**
   - Обратите внимание на положение формы ввода и кнопок действий при открытой клавиатуре.
4. **Проверка скролла формы над клавиатурой:**
   - Попробуйте проскроллить модальное окно или форму вверх и вниз при открытой клавиатуре.

#### 3. Как явно увидеть, что изменилось (Сравнение "Было" и "Стало"):
- **КАК БЫЛО ДО ИСПРАВЛЕНИЯ:** При появлении экранной клавиатуры на iOS Safari размер страницы `window.innerHeight` не менялся, из-за чего модальные окна и шторки оставались прежнего размера, а активное поле ввода перекрывалось клавиатурой и "улетало" за пределы видимого экрана.
- **КАК СТАЛО ПОСЛЕ ИСПРАВЛЕНИЯ:** Компоненты динамически пересчитывают высоту по `window.visualViewport`. Активное поле ввода и кнопки подстраиваются под видимую область экрана над виртуальной клавиатурой.

#### 4. Как проверить на наличие ошибок:
- Снимите фокус с поля ввода (нажмите вне поля или кнопку "Готово" / "Done" на клавиатуре).
- Убедитесь, что интерфейс плавно возвращается к исходным 100% высоты без разрывов верстки или зависших пустых областей.
- Откройте **Console** в DevTools и убедитесь, что при вызове клавиатуры не возникает ошибок listener'ов (`TypeError: Cannot read properties of undefined (reading 'addEventListener')`).

---

### Task Breakdown

**Task 1: Implement Web-Optimized `useVisualViewportDimensions` Hook**
- **Evaluation:** ◐ FM — 1d 1f +1r — Task 1 [Parallel with Task 2]
- **Objective:** Create `src/hooks/useVisualViewportDimensions.js` that subscribes to `window.visualViewport` `resize` and `scroll` events on Web (`Platform.OS === 'web'`) and provides fallback to `useWindowDimensions()` on native platforms.
- **Affected Project Files:** `src/hooks/useVisualViewportDimensions.js`
- **Dependencies:** None
- **Expected Outcome:** A unified hook returning `{ width, height, offsetTop, scale }` reflecting real-time visible viewport dimensions.

**Task 2: Integrate `useVisualViewportDimensions` in Core Overlays & Shell**
- **Evaluation:** ◐ FM — 1d 3f +3r — Task 2 [Parallel with Task 1]
- **Objective:** Update `useAppShell.js`, `Modal.js`, and `Drawer.js` to consume `useVisualViewportDimensions()` for visible height calculations instead of static `useWindowDimensions()`.
- **Affected Project Files:** `src/hooks/useAppShell.js`, `src/components/ui/Modal/Modal.js`, `src/components/ui/Drawer/Drawer.js`
- **Dependencies:** Task 1
- **Expected Outcome:** Overlays and main shell containers dynamically resize and reposition content when the virtual keyboard or dynamic address bar alters `visualViewport`.

**Task 3: Cross-Platform & Device Soft Keyboard Verification**
- **Evaluation:** ○ FL — 1d 0f +3r
- **Objective:** Verify input focus, keyboard appearance, and layout recalculations across iOS Safari and Android Chrome.
- **Affected Project Files:** None (Verification phase)
- **Dependencies:** Task 1, Task 2
- **Expected Outcome:**
  - **iOS Safari (Primary Focus):** Focused input fields remain centered and visible above the Safari virtual keyboard; zero layout clipping.
  - **Android Chrome (Cross-Platform):** Smooth visual viewport resize handling without layout glitches during soft keyboard toggle.
