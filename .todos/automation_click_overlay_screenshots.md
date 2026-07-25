# Automation Click Overlay & Hover Info Tasks

## Task 1: DOM Hover & Click Info Extraction Helper
- Recommended Model: 🟢 **Gemini 3.6 Flash (Low)** (Complexity: 1/5, single DOM helper extraction)
- [x] Add a utility helper (`hoverInfoHelper.ts`) to extract DOM element bounding rect, selector, text content, and calculated click coordinates `(x, y)`.
- [x] Support formatting `hoverInfo` structure matching `takeCompressedScreenshot` expectations:
  ```json
  {
    "mouse": { "x": 120, "y": 250, "active": true },
    "target": {
      "rect": { "x": 100, "y": 230, "width": 100, "height": 40 },
      "tag": "BUTTON",
      "selector": "#submit-btn",
      "text": "Submit"
    }
  }
  ```

## Task 2: Capture Click Context in Playwright Driver
- Recommended Model: 🟡 **Gemini 3.6 Flash (Medium)** (Overall Complexity: 2/5)
- [ ] Subtask 2.1: Add `lastHoverInfo` state and accessor methods to `IWebPage` / `PlaywrightPage`. 🟢 **Gemini 3.6 Flash (Low)** (Interface extension)
- [ ] Subtask 2.2: Wrap DOM extraction in `PlaywrightElement.click()` in a non-blocking `try/catch` **strictly BEFORE** `locator.click()`. 🟡 **Gemini 3.6 Flash (Medium)** (Driver execution isolation)
- [ ] Subtask 2.3: Provide reset mechanism `clearHoverInfo()` after click metadata is consumed. 🟢 **Gemini 3.6 Flash (Low)** (Simple helper logic)

## Task 3: Propagate Click Metadata to Explorer Events
- Recommended Model: 🟡 **Gemini 3.6 Flash (Medium)** (Overall Complexity: 2/5)
- [ ] Subtask 3.1: Extend `ActionExecuted` event interface in `ExplorerEventEmitter` to support optional `hoverInfo`. 🟢 **Gemini 3.6 Flash (Low)** (Type payload edit)
- [ ] Subtask 3.2: Emit `ActionExecuted` containing `hoverInfo` when automated click/fill actions complete. 🟡 **Gemini 3.6 Flash (Medium)** (Event emitter wiring)

## Task 4: Integrate Hover Info with Screenshot Listener
- Recommended Model: 🟡 **Gemini 3.6 Flash (Medium)** (Overall Complexity: 2/5)
- [ ] Subtask 4.1: Update `AutomationScreenshotListener.ts` to capture screenshots with `hoverInfo` on `ActionExecuted` events. 🟡 **Gemini 3.6 Flash (Medium)** (Listener update)
- [ ] Subtask 4.2: Ensure `hoverInfo` is cleared/set to `null` on `ScreenEntered` / `NavigationCompleted` to avoid rendering stale cursor info on newly loaded screens. 🟢 **Gemini 3.6 Flash (Low)** (State cleanup logic)
- [ ] Subtask 4.3: Execute a smoke test run and verify generated screenshots in `.docs/automation-browser-log/screenshots` feature green target bounds and cursor badge overlay. 🟡 **Gemini 3.6 Flash (Medium)** (Execution & verification)

