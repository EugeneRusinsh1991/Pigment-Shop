### 2. Touch Event & Pointer Event Interception in WebKit
- **Codebase Evidence:**
  - `src/hooks/useHomeScrollHide.js:87-90` attaches raw `wheel`, `touchstart`, `touchmove`, and `touchend` listeners directly to `document` in passive mode (`document.addEventListener('touchstart', onTouchStart, { passive: true })`).
  - `src/components/ui/Drawer/Drawer.js:83-90` wraps drawer contents in `<Pressable onPress={(e) => e?.stopPropagation?.()} />`.
- **Root Cause Analysis:**
  - **iOS Safari (Primary Focus):** In WebKit (iOS Safari), direct DOM touch event listeners attached to the global `document` intercept touch gestures before React Native Web's synthetic event handler tree processes them. When a user opens a slide-over component like `CartDrawer` or `MobileMenu` and performs vertical touch drags/scrolls inside the drawer, the global `touchstart` and `touchmove` listeners in `useHomeScrollHide.js` continue tracking `deltaY` relative to the window viewport. This causes background UI elements (such as the sticky search header) to hide or reveal unexpectedly while scrolling inside foreground drawer panels.
  - **Android Chrome & Shared Mobile Context (Cross-Platform):** On Android Chrome and mobile Firefox, passive document touch listeners exhibit the same global interception behavior. Swiping list items or dragging scroll containers within overlays triggers background scroll-hide animations. Standardizing event target checking or scoping scroll-hide touch listeners ensures that overlay interactions remain isolated across both iOS and Android mobile browsers.
  - **Native Environments:** On Native iOS (`Platform.OS === 'ios'`) and Android (`Platform.OS === 'android'`), `useHomeScrollHide` immediately returns early (`if (Platform.OS !== 'web') return;`), so direct DOM touch event interception is strictly isolated to Web environments (`Platform.OS === 'web'`).
- **Severity:** Medium (iOS Safari) / Medium (Cross-Platform Mobile Web)
- **Recommended Solution:**
  - In `useHomeScrollHide.js`, guard global touch/wheel handlers to check if event target originates within an active overlay/modal (e.g. checking `e.target.closest('#app-drawer')` or modal backdrop selectors), or scope touch event listeners to the main page container ref.
  - In `Drawer.js`, ensure native touch event propagation (`e.nativeEvent.stopPropagation()`) is properly handled to prevent touch gesture leakage to global window/document listeners.
- **Alternative Explanations & Rejection:**
  - *Hypothesis:* Touch issues stem from React Native's synthetic event system being broken on Web. (Rejected: React Native Web's pointer implementation is stable; the issue arises strictly because custom document-level DOM listeners bypass React's synthetic component tree).
- **Confidence Level:** High (95% — Direct codebase evidence of raw DOM touch listeners in `useHomeScrollHide.js` and synthetic event propagation limit in `Drawer.js`)

---

### Investigation Summary
- **Status:** Completed
- **Severity:** Medium (iOS Safari) / Medium (Cross-Platform Web)
- **Confidence:** High (95%)
- **Target Locations:** `src/hooks/useHomeScrollHide.js:87-90`, `src/components/ui/Drawer/Drawer.js:83-90`
- **Recommended Remediation:** Guard global touch/wheel handlers against overlay interactions; isolate native touch event propagation inside `Drawer.js`.

---

### Инструкция по проверке UI изменений (Подробно для тестировщика)

#### 1. Где и как открыть проект для проверки:
- Убедитесь, что сервер разработки запущен в консоли проекта (`npm run dev`).
- Откройте веб-браузер (Safari на iOS / iPhone или Chrome на Android / ПК) по адресу: **`http://localhost:8081`** (или соответствующий локальный IP адрес).
- Для проверки на ПК открывайте **DevTools (F12)** -> включите режим эмуляции устройств **Toggle Device Toolbar** (`Ctrl + Shift + M` / `Cmd + Shift + M`).
- Выберите устройство **iPhone 14 Pro** (для проверки iOS Safari) или **Pixel 5** (для проверки Android Chrome).

#### 2. Что конкретно нажать и какие действия выполнить:
1. Перейдите на главную страницу каталога (где отображается шапка поиска `AppHeader`).
2. Нажмите на иконку Корзины или Меню, чтобы открыть боковую панель (`Drawer` / `CartDrawer`).
3. **Проверка скролла внутри открытой панели (Drawer Scroll Interception Test):**
   - Пока шторка/корзина открыта, скролльте или перетаскивайте пальцем (жест swipe up/down) содержимое внутри этой панели (список товаров в корзине или пункты меню).
4. **Проверка поведения шапки на заднем фоне:**
   - Обратите внимание на липкую шапку поиска (`AppHeader`), которая находится на заднем плане за затемненным фоном.

#### 3. Как явно увидеть, что изменилось (Сравнение "Было" и "Стало"):
- **КАК БЫЛО ДО ИСПРАВЛЕНИЯ:** При скролле списка товаров внутри боковой шторки/корзины глобальный обработчик касаний `document.addEventListener('touchmove')` перехватывал движение пальца, из-за чего шапка поиска на заднем плане начинала прятаться или появляться (`scroll hide/show`), хотя сама страница под шторкой не скроллилась.
- **КАК СТАЛО ПОСЛЕ ИСПРАВЛЕНИЯ:** При скролле внутри боковой шторки касания не перетекают на задний план. Шапка на заднем плане остается неподвижной. Жесты скролла и перетаскивания работают строго внутри открытого компонента.

#### 4. Как проверить на наличие ошибок:
- Закройте боковую панель (нажмите на крестик или затемненный фон).
- Поскролльте саму главную страницу вверх и вниз: шапка поиска должна плавно скрываться при скролле вниз и снова появляться при скролле вверх.
- Проверьте, что в консоли браузера (DevTools Console) отсутствуют ошибки вида `TypeError`, `Uncaught Event`, `Invalid passive listener` или предупреждения о производительности при скролле.

---

### Task Breakdown

**Task 1: Guard Global Touch/Wheel Listeners against Overlay Targets in `useHomeScrollHide.js`**
- **Evaluation:** ◐ FM — 1d 1f +1r — Task 1 [Parallel with Task 2]
- **Objective:** Update global DOM listeners (`onTouchMove`, `onWheel`) in `src/hooks/useHomeScrollHide.js` to inspect `e.target` and ignore touch/scroll events originating inside active drawer panels or modal backdrops (e.g. elements inside `#app-drawer` or modal containers).
- **Affected Project Files:** `src/hooks/useHomeScrollHide.js`
- **Dependencies:** None
- **Expected Outcome:** Scroll movements inside overlay components do not update background `accumulatedDelta` or trigger `hide()`/`show()` header animations.

**Task 2: Isolate Native Touch & Pointer Propagation in `Drawer.js`**
- **Evaluation:** ◐ FM — 1d 1f +1r — Task 2 [Parallel with Task 1]
- **Objective:** Enhance event isolation inside `src/components/ui/Drawer/Drawer.js` so that touch drag gestures on the drawer panel do not bubble out to global `document` touch listeners on web platform (`Platform.OS === 'web'`).
- **Affected Project Files:** `src/components/ui/Drawer/Drawer.js`
- **Dependencies:** Task 1
- **Expected Outcome:** Web touch and pointer interactions inside `Drawer` are cleanly contained without side effects on window-level touch handlers.

**Task 3: Cross-Platform & Device Touch Interception Verification**
- **Evaluation:** ○ FL — 1d 0f +2r
- **Objective:** Execute touch gesture testing inside drawers and overlays across iOS Safari (mobile WebKit) and Android Chrome (mobile Blink) to verify touch isolation.
- **Affected Project Files:** None (Verification phase)
- **Dependencies:** Task 1, Task 2
- **Expected Outcome:**
  - **iOS Safari (Primary Focus):** Zero header shift or background scroll-hide triggers when scrolling drawer contents on WebKit.
  - **Android Chrome (Cross-Platform):** Smooth overlay scrolling with total isolation from background scroll-hide hooks.
