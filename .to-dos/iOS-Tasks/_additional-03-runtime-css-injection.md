### 3. Runtime CSS Overflow Injection Causing Sticky Instability & Scroll Leaks
*(Note: Consolidates findings on Scroll Lock Conflicts & Fixed Position Instability)*
- **Codebase Evidence:**
  - `src/hooks/useHomeScrollHide.js:7-16` dynamically creates `<style id="pigment-sticky-fix">` appending `#root > [data-testid] { overflow-x: clip !important; overflow-y: visible !important; }` and `#root > div { overflow-x: clip !important; }` to `document.head` during component lifecycle on web.
  - `src/theme/appStyles.js:4-16` injects a duplicate `<style id="pigment-global-web-styles">` block on web module initialization.
  - `src/components/ui/Drawer/Drawer.js:59-101` renders web `<Modal>` container without applying `document.body` scroll lock (`overflow: hidden`) or CSS `overscroll-behavior: contain` on drawer scroll view panels.
- **Root Cause Analysis:**
  - **iOS Safari (Primary Focus):** WebKit on iOS Safari implements native elastic inertia scrolling (rubber-banding). When a user scrolls inside an open `CartDrawer` or `MobileMenu` to the top or bottom edge of the list, WebKit propagates the touch scroll momentum upward to the parent page root (`#root` / `document.body`). Because `useHomeScrollHide.js` dynamically forces `overflow-y: visible !important` globally on root containers to preserve CSS `position: sticky`, background page content bounces dynamically behind the drawer backdrop. Furthermore, duplicate runtime `<style>` DOM node injection inside React `useEffect` hooks during component remounting leads to WebKit layout re-computations and sticky position flickering.
  - **Android Chrome & Shared Mobile Context (Cross-Platform):** Android Chrome and mobile browsers handle overscroll using pull-to-refresh or edge glow effects. Without `overscroll-behavior: contain` on drawer containers or `document.body` scroll locks during active modal states, swiping inside drawers on Android triggers page overscroll and unwanted background page movement. Consolidating CSS injection into `appStyles.js` and managing active scroll locks cleanly resolves scroll chaining across all mobile Web engines.
  - **Native Environments:** On Native iOS (`Platform.OS === 'ios'`) and Android (`Platform.OS === 'android'`), native modal components (`React Native Modal`) render outside the JS layout hierarchy, and CSS `overflow` injection is omitted (`if (Platform.OS !== 'web') return;`). This issue is strictly confined to Web (`Platform.OS === 'web'`).
- **Severity:** High (iOS Safari) / Medium (Cross-Platform Mobile Web)
- **Recommended Solution:**
  - Remove duplicate runtime CSS injection in `useHomeScrollHide.js` (lines 7-16) and centralize all root overflow overrides in `src/theme/appStyles.js`.
  - Add dynamic `document.body.style.overflow = 'hidden'` lock inside `Drawer.js` when modal is open on web.
  - Add CSS `overscroll-behavior: contain` to scrollable drawer containers in `DrawerStyles.js`.
  - Apply GPU acceleration hints (`will-change: transform` or `transform: translateZ(0)`) to animated sticky header views to prevent WebKit compositor layer repaints.
- **Confidence Level:** High (95% — Confirmed by direct codebase evidence of duplicate style injections and missing modal scroll lock)

---

### Investigation Summary
- **Status:** Confirmed
- **Severity:** High (iOS Safari) / Medium (Cross-Platform Web)
- **Confidence:** High (95%)
- **Target Locations:** `src/hooks/useHomeScrollHide.js`, `src/theme/appStyles.js`, `src/components/ui/Drawer/Drawer.js`, `src/components/ui/Drawer/DrawerStyles.js`
- **Recommended Remediation:** Consolidate global CSS in `appStyles.js`; implement web modal body scroll locking and `overscroll-behavior: contain`.

---

### Инструкция по проверке UI изменений (Подробно для тестировщика)

#### 1. Где и как открыть проект для проверки:
- Убедитесь, что сервер разработки запущен в консоли проекта (`npm run dev`).
- Откройте веб-браузер (Safari на iOS / iPhone или Chrome на Android / ПК) по адресу: **`http://localhost:8081`** (или соответствующий локальный IP адрес).
- Для проверки на ПК открывайте **DevTools (F12)** -> включите режим эмуляции устройств **Toggle Device Toolbar** (`Ctrl + Shift + M` / `Cmd + Shift + M`).
- Выберите устройство **iPhone 14 Pro** (для проверки iOS Safari) или **Pixel 5** (для проверки Android Chrome).

#### 2. Что конкретно нажать и какие действия выполнить:
1. Перейдите на главную страницу каталога с длинным списком товаров.
2. Откройте корзину (`CartDrawer`) или боковое меню, кликнув на соответствующую иконку.
3. **Проверка скролл-лока фона (Background Scroll Lock Test):**
   - Попробуйте проскроллить главную страницу на заднем плане за затемненным фоном (оверлеем).
4. **Проверка эластичного скролла шторки (Elastic Overscroll Leak Test):**
   - Внутри открытой панели корзины доскролльте список товаров до самого низа или до самого верха и продолжайте тянуть палец дальше вверх/вниз (жест overscroll/rubber-banding).
5. **Проверка плавности шапки поиска при обыкновенном скролле:**
   - Закройте боковую панель и быстро поскролльте главную страницу вверх и вниз.

#### 3. Как явно увидеть, что изменилось (Сравнение "Было" и "Стало"):
- **КАК БЫЛО ДО ИСПРАВЛЕНИЯ:**
  - При открытой корзине прокрутка пальцем на заднем плане или резиновый отскок (overscroll) внутри корзины заставляли задний фон страницы сдвигаться и скроллиться вместе с корзиной.
  - Липкая шапка поиска при быстрой прокрутке подергивалась или мигала на iOS Safari из-за дублирующихся инъекций CSS в `<head>`.
- **КАК СТАЛО ПОСЛЕ ИСПРАВЛЕНИЯ:**
  - При открытой боковой панели задний фон абсолютно заблокирован от скролла (`overflow: hidden`). Достижение края списка в корзине не вызывает прокрутки главной страницы.
  - Анимация скрытия/появления шапки поиска работает плавно без дерганий и мерцаний.

#### 4. Как проверить на наличие ошибок:
- В DevTools во вкладке **Elements** (в теге `<head>`) убедитесь, что при открытии/закрытии модальных окон не плодятся дублирующие теги `<style id="pigment-sticky-fix">`.
- Откройте вкладку **Console** и убедитесь в отсутствии предупреждений об утечках памяти или ошибках манипуляций с DOM (`document.body`).

---

### Task Breakdown

**Task 1: Consolidate Dynamic Web Styles into `appStyles.js` & Remove Duplicate Injection**
- **Evaluation:** ◐ FM — 1d 2f +2r — Task 1 [Parallel with Task 2]
- **Objective:** Remove duplicate runtime `<style>` injection in `src/hooks/useHomeScrollHide.js` (lines 7-16) and ensure all root overflow rules (`#root > [data-testid]`, `#root > div`) are defined strictly inside static web stylesheet injection in `src/theme/appStyles.js`.
- **Affected Project Files:** `src/hooks/useHomeScrollHide.js`, `src/theme/appStyles.js`
- **Dependencies:** None
- **Expected Outcome:** Eliminates redundant dynamic DOM style tag creation on WebKit remounts, preventing layout reflows and sticky header positioning instability.

**Task 2: Implement Body Scroll Lock & `overscroll-behavior: contain` in `Drawer`**
- **Evaluation:** ◐ FM — 1d 2f +2r — Task 2 [Parallel with Task 1]
- **Objective:** Add dynamic `document.body.style.overflow = 'hidden'` lifecycle management when `Drawer` is open on Web (`Platform.OS === 'web'`), and apply `overscroll-behavior: contain` to scrollable drawer containers in `src/components/ui/Drawer/DrawerStyles.js`.
- **Affected Project Files:** `src/components/ui/Drawer/Drawer.js`, `src/components/ui/Drawer/DrawerStyles.js`
- **Dependencies:** None
- **Expected Outcome:** Scroll gestures inside drawer components do not leak momentum or overscroll rubber-banding to background page content.

**Task 3: Apply Hardware Compositor Layer Hints to Animated Sticky Header**
- **Evaluation:** ◐ FM — 1d 1f +1r
- **Objective:** Add `will-change: transform` or `transform: translateZ(0)` style properties to animated sticky header view in `src/features/search/StoreSearchHeader.js`.
- **Affected Project Files:** `src/features/search/StoreSearchHeader.js`
- **Dependencies:** Task 1
- **Expected Outcome:** Mobile WebKit delegates header translateY animations to the GPU compositor layer, eliminating visual flicker during rapid scrolling.

**Task 4: Cross-Platform & Device Verification**
- **Evaluation:** ○ FL — 1d 0f +3r
- **Objective:** Perform manual testing across iOS Safari and Android Chrome to confirm modal scroll lock, zero rubber-band page leakage, and flicker-free header animations.
- **Affected Project Files:** None (Verification phase)
- **Dependencies:** Task 1, Task 2, Task 3
- **Expected Outcome:**
  - **iOS Safari (Primary Focus):** Complete body scroll freeze when drawers are open; zero background rubber-banding on drawer overscroll; smooth 60fps header hide/reveal animations.
  - **Android Chrome (Cross-Platform):** Clean overlay containment without page shift or duplicate DOM style tag creation.
