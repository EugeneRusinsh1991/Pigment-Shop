# Task 3.2: Legacy Proxy Cleanup & Smoke Test Verification

## Recommended Model Tier
🟢 **Gemini 3.6 Flash (Low / Medium)**

## Objective
Safely delete legacy proxy files after verifying all consumer import paths and run browser automation smoke test suite.

## Target Files
- [DELETE] `src/components/SearchToolbar.js`
- [DELETE] `src/components/SearchBar.js`
- [DELETE] `src/components/SearchBar/`

## Instructions
1. Verify no remaining imports reference `SearchToolbar` or `SearchBar.js`.
2. Delete legacy shim files.
3. Run `npx tsx .tools/browser-automation/run-smoke.ts` to confirm 100% build and navigation parity.
