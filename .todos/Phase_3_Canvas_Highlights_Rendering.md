# Phase 3: HTML5 Canvas Mouse & Target Element Highlight Rendering

## Overview
This phase implements the visual drawing logic inside `takeCompressedScreenshot` in `playwright.helpers.js` to render the semi-transparent green cursor, target element bounding box, floating metadata badge, and extended overlay text onto the screenshot canvas.

## Objectives & Tasks
1. **Coordinate Scaling**:
   - Apply `scale` factor to mouse `(x, y)` and bounding rect `(x, y, width, height)`.
2. **Cursor Spot Rendering**:
   - Draw semi-transparent green circle (`rgba(34, 197, 94, 0.4)`) with stroke `#22C55E` at scaled mouse position if `active === true`.
3. **Target Element Bounding Box**:
   - Draw semi-transparent green stroke rectangle (`rgba(34, 197, 94, 0.7)`, 2px width) around the target element's scaled bounding box.
4. **Floating Metadata Badge**:
   - Render a formatted tooltip container above/near the target element displaying `[TAG] #id "Label/Text"`.
5. **Bottom Overlay Line Update**:
   - Append `Hovered: <selector>` to the bottom diagnostic overlay bar text.

---

## Model Recommender Evaluation

- **Affected Files**: 1 ([playwright.helpers.js](file:///d:/Magazine/_PigmentShop/scripts/playwright.helpers.js))
- **Estimated Lines of Code Changed**: ~45-60 lines
- **Risk & Dependencies**: Low-Medium risk (requires precise 2D Canvas math and boundary clamping so tooltips don't draw outside canvas limits).
- **Task Complexity**: **2/5 (Low-Medium)**

### Recommended Model Tier
- **Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**
- **Rationale**: Isolated 2D Canvas drawing calculations within a single helper script.
