# Interactive Mouse & Target Element Highlight on Debug Screenshot Capture

## Overview
When capturing debug screenshots via the manual browser inspector, native mouse cursors and targeted DOM elements are not highlighted by default. Adding semi-transparent visual indicators, target component bounding boxes, and metadata labels makes screenshots immediately understandable for both humans and AI coding agents.

## Architectural Flow & Pipeline
1. **Trigger**: User presses `Alt+1` or clicks gear menu in [ManualBrowserInspector.js](file:///d:/Magazine/_PigmentShop/.tools/manual-browser-inspector/ManualBrowserInspector.js).
2. **Client Inspection**: `document.elementFromPoint(x, y)` gathers target element details (`tagName`, `id`, `className`, `innerText`, `getBoundingClientRect()`).
3. **RPC Payload Transmission**: Coordinates, hover metadata, and window focus status (`document.hasFocus()`) pass into `__playwright_takeScreenshotAndDumpState`.
4. **Playwright Capture**: Node.js in [setupManualInspector.js](file:///d:/Magazine/_PigmentShop/.tools/manual-browser-inspector/setupManualInspector.js) runs `page.screenshot()`.
5. **Canvas Post-Processing**: `takeCompressedScreenshot` in [playwright.helpers.js](file:///d:/Magazine/_PigmentShop/scripts/playwright.helpers.js) scales image and draws highlights & metadata onto the HTML5 Canvas.

---

## Single Implementation Strategy (HTML5 Canvas Post-Processing)

### 1. Client-Side Mouse & Element Tracking (`ManualBrowserInspector.js`)
- Continuously track mouse position via `mousemove` event listener (`window.__lastMousePos = { x, y }`).
- On screenshot trigger:
  - Verify window focus state (`document.hasFocus()`).
  - Retrieve target element under cursor using `document.elementFromPoint(x, y)`.
  - Extract target element bounds: `const rect = targetEl.getBoundingClientRect()`.
  - Construct clean target metadata object:
    ```json
    {
      "mouse": { "x": 420, "y": 310, "active": true },
      "target": {
        "tag": "BUTTON",
        "selector": "button#submit-order",
        "text": "Place Order",
        "rect": { "x": 380, "y": 290, "width": 120, "height": 40 }
      }
    }
    ```

### 2. Canvas Rendering Overlay (`playwright.helpers.js`)
During canvas composition (where `overlayText` is currently drawn):
- **Scale Factor Application**: Multiply mouse coordinates `(x, y)` and bounding rect `(rect.x, rect.y, rect.width, rect.height)` by `scale`.
- **Semi-Transparent Green Cursor Circle**:
  - Draw `ctx.arc(scaledX, scaledY, radius, 0, 2 * Math.PI)` with `fillStyle = 'rgba(34, 197, 94, 0.4)'` and `strokeStyle = '#22C55E'`.
- **Target Element Bounding Box**:
  - Draw `ctx.strokeRect(scaledRect.x, scaledRect.y, scaledRect.w, scaledRect.h)` with semi-transparent green border (`rgba(34, 197, 94, 0.7)`).
- **Floating Badge Tooltip**:
  - Render tooltip pill right above target element: `[BUTTON] #submit-order "Place Order"`.
- **Bottom Status Overlay Line**:
  - Append `Hover: button#submit-order` into the existing bottom status bar overlay.

---

## Verification Criteria
- [ ] Screenshots show semi-transparent green circle at current mouse position when window is active.
- [ ] Target DOM element under mouse cursor has a semi-transparent green outline box.
- [ ] Badge displays concise human/agent readable element description above element.
- [ ] If window is unfocused or mouse is outside canvas, visual highlights skip gracefully without error.
