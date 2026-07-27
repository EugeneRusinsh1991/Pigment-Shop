# Move locationContext.js → .tools/browser-automation/utils/

**Rationale:** `locationContext.js` contains test automation visual overlay helpers (`getLocationHierarchy`, `getOverlayText`, `getTimestamp`). It is tooling logic and should not be included in runtime `src/utils/`.

---

- [ ] 1. Move file `src/utils/locationContext.js` → `.tools/browser-automation/utils/locationContext.js`
- [ ] 2. Update imports in `src/utils/appStateDump.js` or any other consumers to reference `.tools/browser-automation/utils/locationContext.js`
- [ ] 3. Verify test automation and build compile with no missing-module errors
