### 4. `overflow-x: clip` vs. `position: sticky` Compatibility in WebKit
- **Codebase Evidence:**
  - `src/hooks/useHomeScrollHide.js:13-22` dynamically injects a stylesheet into `document.head`:
    ```javascript
    style.textContent = `#root > [data-testid] { overflow-x: clip !important; overflow-y: visible !important; }
    #root > div { overflow-x: clip !important; }`;
    ```
- **Root Cause & Alternative Hypotheses:**
  - *Primary Hypothesis (iOS-Specific Focus):* React Native Web wraps root views in containers with `overflow: hidden`. In WebKit (iOS Safari) CSS specifications, any ancestor with `overflow: hidden` strictly disables `position: sticky` on descendant elements (`StoreSearchHeader`). The author injected `overflow-x: clip` to suppress horizontal overflow without creating a scroll container. However, older iOS Safari versions (prior to iOS 16) and certain WKWebView embedders do not fully support `overflow: clip`, falling back to `hidden` (breaking sticky behavior) or `visible` (allowing horizontal scroll overflow).
  - *Cross-Platform Context (Android/Web):* Unlike iOS Safari, Android Chrome and standard desktop browsers are generally more forgiving with `position: sticky` within `overflow: hidden` containers. Standardizing on `overflow: clip` fixes the strict WebKit layout bug, but we must verify that `clip` does not degrade into `visible` on older Android WebViews, which could inadvertently allow horizontal overflow on Android.
  - *Secondary Hypothesis:* Injecting `<style>` tags via JavaScript DOM manipulation during `useEffect` occurs after browser paint, which can cause layout shifts or Flash of Unstyled Content (FOUC) when navigating back to the home screen across all platforms.
- **Severity:** Medium
- **Recommended Solution:**
  - Move the `overflow-x: clip` override from runtime JS injection into static CSS (`src/theme/appStyles.js` or global stylesheet) and test compatibility in Safari 15/16.
- **Validation Requirements:**
  - *iOS (Primary Focus):* Verify on iOS 15 / 16 Safari simulators that `StoreSearchHeader` remains sticky during vertical scrolling and does not allow horizontal swipe overflow.
  - *Cross-Platform (Secondary):* Ensure no regressions on Android Chrome or Web, specifically confirming that horizontal overflow remains suppressed.
- **Confidence Level:** High (90% — Architectural probability)

---

### Investigation Summary
- **Status:** Probable
- **Severity:** Medium
- **Confidence:** High (90%)
- **Target Locations:** `useHomeScrollHide.js:13-22`
- **Recommended Remediation:** Migrate JS style injection to static CSS tokens

### Task Breakdown

**[COMPLETED] Task 1: Analyze Global CSS Entry Points**
- **Evaluation:** ○ FL — 1d 0f +3r
- **Dependencies:** None
- **Affected Areas:** `src/theme/appStyles.js`, `src/App.js` or `src/index.js`
- **Expected Outcome:** Identify the optimal static location to apply global layout overrides for the `#root` container.

**[COMPLETED] Task 2: Migrate CSS Rules**
- **Evaluation:** ◐ FM — 1d 1f +2r
- **Dependencies:** Task 1
- **Affected Areas:** Selected static CSS file (e.g., `src/theme/appStyles.js`)
- **Expected Outcome:** The CSS rules (`overflow-x: clip !important`, etc.) for `#root > [data-testid]` and `#root > div` are permanently defined in the static stylesheet.

**[COMPLETED] Task 3: Refactor `useHomeScrollHide.js`**
- **Evaluation:** ◐ FM — 1d 2f +2r
- **Dependencies:** Task 2
- **Affected Areas:** `src/hooks/useHomeScrollHide.js` and components consuming the hook
- **Expected Outcome:** The runtime DOM style injection logic is completely removed. The hook is simplified or deleted if it no longer serves another purpose, eliminating FOUC.

**[COMPLETED] Task 4: Platform Compatibility Verification**
- **Evaluation:** ○ FL — 1d 0f +2r
- **Dependencies:** Task 3
- **Affected Areas:** iOS Simulator (Safari 15/16), Android Emulator, Web Browser
- **Expected Outcome:** 
  - *iOS (Primary):* Verified that `StoreSearchHeader` retains sticky behavior during vertical scroll and horizontal overflow is explicitly suppressed.
  - *Android/Web (Cross-Platform):* Confirmed no layout regressions occur; older WebViews appropriately suppress horizontal overflow without disrupting standard layout flow.

---

### Инструкция по проверке UI изменений (Для тестировщика)

#### 1. Где и как открыть проект для тестирования
- Убедитесь, что сервер запущен (`npm run dev`).
- Откройте браузер по адресу: **`http://localhost:3000`** (или открытый локальный адрес приложения).
- Откройте панель разработчика браузера (**F12** или **Ctrl+Shift+I** / **Cmd+Option+I** на Mac).

#### 2. Как эмулировать iOS Safari (Мобильное устройство)
1. В панели разработчика включите эмуляцию мобильных устройств (**Toggle Device Toolbar** / `Ctrl+Shift+M`).
2. В верхнем меню выбора устройств выберите **iPhone 12 / 14 Pro** или **iPad** (либо откройте сайт напрямую в Safari на iOS устройстве / Xcode Simulator).
3. Установите масштаб отображения на 100%.

#### 3. Что именно нажать и как проверить UI изменения (Шаг за шагом)
1. **Проверка работы фиксированной шапки поиска (Sticky Search Header):**
   - Перейдите на **Главную страницу магазина** (`/`).
   - Начните прокручивать страницу вниз (вертикальный скролл).
   - **Ожидаемый результат:** Панель поиска (`StoreSearchHeader`) корректно фиксируется сверху при скролле и плавно скрывается/показывается при смене направления прокрутки, не отваливаясь и не теряя зафиксированное положение (`position: sticky`).
2. **Проверка блокировки горизонтального сдвига (`overflow-x: clip`):**
   - Попробуйте сдвинуть страницу горизонтально вбок пальцем (на тачскрине/эмуляторе) или колесиком мыши.
   - **Ожидаемый результат:** Страница **НЕ сдвигается вбок**, горизонтальная прокрутка заблокирована (`overflow-x: clip`), при этом липкая шапка и вертикальная прокрутка работают штатно без сбоев WebKit.
3. **Проверка отсутствия динамических инъекций и мерцаний (FOUC):**
   - В панели разработчика перейдите на вкладку **Elements (Элементы)**.
   - Откройте тег `<head>` и найдите `<style id="pigment-global-web-styles">`.
   - **Ожидаемый результат:** Глобальные стили `#root > [data-testid]` и `#root > div` заинжектированы единовременно при загрузке приложения. При скролле и переходе между страницами элементы `<style>` не создаются повторно в DOM-дереве.

#### 4. Как проверить отсутствие ошибок (Regression Testing)
1. **Проверка консоли браузера:**
   - Перейдите во вкладку **Console (Консоль)**.
   - Поскролльте главную страницу, откройте каталог, вернитесь обратно.
   - **Ожидаемый результат:** Отсутствуют красные ошибки (Errors) JavaScript или CSS warnings.
2. **Проверка на других платформах (Android Chrome & Desktop Web):**
   - Откройте приложение в режиме эмуляции Android (Pixel 7) и в обычном десктопном режиме.
   - **Ожидаемый результат:** Верстка отображается корректно, полоса горизонтального скролла отсутствует, шапка поиска ведет себя стабильно.
