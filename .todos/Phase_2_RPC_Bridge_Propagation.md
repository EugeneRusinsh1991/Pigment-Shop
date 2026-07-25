# Phase 2: Playwright RPC Bridge Data Propagation

## Overview
This phase handles the transmission of hover metadata and mouse coordinates from the exposed browser window bridge to Node.js and Playwright's helper methods.

## Objectives & Tasks
1. **Bridge Function Extension**:
   - Update `__playwright_takeScreenshotAndDumpState` signature in `setupManualInspector.js` (and TypeScript definition `setupManualInspector.ts`) to accept an optional `hoverInfo` parameter.
2. **Payload Forwarding**:
   - Forward `hoverInfo` payload object directly into `takeCompressedScreenshot(page, { captureQuality, exportQuality, scale, overlayText, hoverInfo })`.
3. **Fallback & Safety**:
   - Ensure backward compatibility if `hoverInfo` is omitted or null (graceful skip without crashing the screenshot pipeline).

---

## Model Recommender Evaluation

- **Affected Files**: 2 ([setupManualInspector.js](file:///d:/Magazine/_PigmentShop/.tools/manual-browser-inspector/setupManualInspector.js), [setupManualInspector.ts](file:///d:/Magazine/_PigmentShop/.tools/manual-browser-inspector/setupManualInspector.ts))
- **Estimated Lines of Code Changed**: ~15-20 lines
- **Risk & Dependencies**: Low risk, parameter signature updates and parameter passing.
- **Task Complexity**: **1/5 (Low)**

### Recommended Model Tier
- **Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**
- **Rationale**: Simple parameter wiring between Node.js exposed function and helper script.
